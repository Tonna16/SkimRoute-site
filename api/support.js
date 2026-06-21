import { createSign, randomBytes } from "node:crypto";

const DEFAULT_SPREADSHEET_ID = "1Ci2cYFcNF5yLUD3ic7u03piYfH9gWdQaf-cSrN-M6WQ";
const DEFAULT_SHEET_TAB = "Sheet1";
const DEFAULT_SHEET_GID = 0;
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";
const SCHEMA_MARKER = "SKIMROUTE_SUPPORT_SCHEMA_V3";
const SCHEMA_MARKER_CELL = "Z1";
const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const EMAILJS_PUBLIC_KEY = "SlF7gCnp0LJ19lte0";
const EMAILJS_SERVICE_ID = "service_rnnec5q";
const EMAILJS_CONTACT_TEMPLATE_ID = "template_oe26dtf";
const EMAILJS_AUTOREPLY_TEMPLATE_ID = "template_t58ez6i";
const SUPPORT_EMAIL = "skimroutesupport@gmail.com";
const DELIVERY_SENT = "Sent";
const DELIVERY_PENDING = "Pending";
const DELIVERY_FAILED = "Failed";

const HEADERS = [
  "Submission ID",
  "Submitted At",
  "Type",
  "Name",
  "Email",
  "Subject",
  "Message",
  "Status",
  "Priority",
  "Notes",
  "Last Updated",
];

const OLD_HEADERS = ["Submitted At (ET)", "Name", "Email", "Subject", "Message", "Status"];
const REQUEST_TYPES = new Set([
  "General question",
  "Bug report",
  "Feature request",
  "PDF issue",
  "Billing or account",
  "Other",
]);
const STATUS_OPTIONS = ["New", "In Progress", "Waiting for User", "Resolved"];
const PRIORITY_OPTIONS = ["Low", "Normal", "High", "Urgent"];
const SUBMISSION_ID_PATTERN = /^SR-\d{8}-[A-Z2-9]{4}$/;
const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

let accessTokenCache = {
  serviceAccountEmail: "",
  token: "",
  expiresAt: 0,
};

const inFlightSubmissions = new Map();

function sendJson(res, status, payload) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(payload);
}

function parseRequestBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizePrivateKey(value) {
  if (!value) return "";

  let normalized = value.trim();
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1);
  }

  return normalized.replace(/\\n/g, "\n");
}

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function quoteSheetTab(tabName) {
  return `'${tabName.replace(/'/g, "''")}'`;
}

function formatDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}${values.month}${values.day}`;
}

function generateSubmissionId(date = new Date()) {
  const bytes = randomBytes(4);
  const suffix = Array.from(bytes, (byte) => ID_ALPHABET[byte % ID_ALPHABET.length]).join("");
  return `SR-${formatDateParts(date)}-${suffix}`;
}

function formatEasternTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function createServiceAccountJwt(serviceAccountEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: serviceAccountEmail,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsignedToken = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(privateKey).toString("base64url");
  return `${unsignedToken}.${signature}`;
}

async function getGoogleAccessToken(serviceAccountEmail, privateKey) {
  const now = Date.now();
  if (
    accessTokenCache.serviceAccountEmail === serviceAccountEmail &&
    accessTokenCache.token &&
    accessTokenCache.expiresAt > now + 60_000
  ) {
    return accessTokenCache.token;
  }

  const assertion = createServiceAccountJwt(serviceAccountEmail, privateKey);
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || "Google authentication failed.");
  }

  const expiresInSeconds = Number(data.expires_in) || 3600;
  accessTokenCache = {
    serviceAccountEmail,
    token: data.access_token,
    expiresAt: now + expiresInSeconds * 1000,
  };

  return data.access_token;
}

async function sheetsRequest(url, accessToken, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || `Google Sheets request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return data;
}

function valuesUrl(spreadsheetId, range) {
  return `${SHEETS_API_BASE}/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`;
}

async function getSubmissionState(spreadsheetId, sheetTab, accessToken) {
  const idRange = `${quoteSheetTab(sheetTab)}!A2:A`;
  const deliveryRange = `${quoteSheetTab(sheetTab)}!L2:M`;
  const markerRange = `${quoteSheetTab(sheetTab)}!${SCHEMA_MARKER_CELL}`;
  const query = new URLSearchParams();
  query.append("majorDimension", "ROWS");
  query.append("ranges", idRange);
  query.append("ranges", deliveryRange);
  query.append("ranges", markerRange);

  const url = `${SHEETS_API_BASE}/${encodeURIComponent(spreadsheetId)}/values:batchGet?${query}`;
  const data = await sheetsRequest(url, accessToken);
  const [idValues = {}, deliveryValues = {}, markerValues = {}] = data.valueRanges || [];
  const ids = idValues.values || [];
  const deliveries = deliveryValues.values || [];
  const submissions = new Map();

  ids.forEach((row, index) => {
    const submissionId = String(row?.[0] || "").trim();
    if (!submissionId) return;

    submissions.set(submissionId, {
      rowNumber: index + 2,
      supportEmailStatus: String(deliveries[index]?.[0] || "").trim(),
      autoReplyStatus: String(deliveries[index]?.[1] || "").trim(),
    });
  });

  return {
    submissions,
    schemaMarker: String(markerValues.values?.[0]?.[0] || "").trim(),
  };
}

function headersMatch(actual, expected) {
  return expected.every((header, index) => String(actual[index] || "").trim() === header);
}

function migrateLegacyRows(values) {
  const legacyRows = values.slice(1).filter((row) => row.some((cell) => String(cell || "").trim()));

  return legacyRows.map((row, index) => {
    const submittedAt = String(row[0] || "").trim();
    const oldStatus = String(row[5] || "").trim();
    return [
      `SR-LEGACY-${String(index + 1).padStart(4, "0")}`,
      submittedAt,
      "Other",
      String(row[1] || ""),
      String(row[2] || ""),
      String(row[3] || ""),
      String(row[4] || ""),
      STATUS_OPTIONS.includes(oldStatus) ? oldStatus : "New",
      "Normal",
      "",
      submittedAt,
    ];
  });
}

async function initializeSheetSchema(spreadsheetId, sheetTab, sheetGid, accessToken) {
  const existingRange = `${quoteSheetTab(sheetTab)}!A1:K`;
  const existing = await sheetsRequest(valuesUrl(spreadsheetId, existingRange), accessToken);
  const existingValues = Array.isArray(existing.values) ? existing.values : [];
  const currentHeaders = existingValues[0] || [];

  let rowsToWrite = null;
  if (existingValues.length === 0 || !currentHeaders.some((value) => String(value || "").trim())) {
    rowsToWrite = [HEADERS];
  } else if (headersMatch(currentHeaders, HEADERS)) {
    // The data layout is already current; only validation/styling and the marker are needed.
  } else if (headersMatch(currentHeaders, OLD_HEADERS)) {
    rowsToWrite = [HEADERS, ...migrateLegacyRows(existingValues)];
  } else {
    throw new Error(
      `The support sheet tab "${sheetTab}" has an unexpected header layout. Back it up, then use the setup guide to restore the expected columns.`,
    );
  }

  if (rowsToWrite) {
    // Updating the complete populated range preserves the existing data even if a later setup step fails.
    const writeRange = `${quoteSheetTab(sheetTab)}!A1:K${rowsToWrite.length}`;
    await sheetsRequest(`${valuesUrl(spreadsheetId, writeRange)}?valueInputOption=RAW`, accessToken, {
      method: "PUT",
      body: JSON.stringify({
        range: writeRange,
        majorDimension: "ROWS",
        values: rowsToWrite,
      }),
    });
  }

  const finalRowCount = rowsToWrite ? rowsToWrite.length : existingValues.length;
  const deliveryRowCount = Math.max(finalRowCount, 1);
  const deliveryRange = `${quoteSheetTab(sheetTab)}!L1:M${deliveryRowCount}`;
  const deliveryValues = [["Support Email Delivery", "Auto Reply Delivery"]];
  for (let rowIndex = 1; rowIndex < deliveryRowCount; rowIndex += 1) {
    // Existing submissions predate delivery tracking. Treat them as already sent so
    // a later retry cannot create duplicate emails.
    deliveryValues.push([DELIVERY_SENT, DELIVERY_SENT]);
  }

  await sheetsRequest(`${valuesUrl(spreadsheetId, deliveryRange)}?valueInputOption=RAW`, accessToken, {
    method: "PUT",
    body: JSON.stringify({
      range: deliveryRange,
      majorDimension: "ROWS",
      values: deliveryValues,
    }),
  });

  const batchUpdateUrl = `${SHEETS_API_BASE}/${encodeURIComponent(spreadsheetId)}:batchUpdate`;
  await sheetsRequest(batchUpdateUrl, accessToken, {
    method: "POST",
    body: JSON.stringify({
      requests: [
        {
          updateSheetProperties: {
            properties: {
              sheetId: sheetGid,
              gridProperties: { frozenRowCount: 1 },
            },
            fields: "gridProperties.frozenRowCount",
          },
        },
        {
          repeatCell: {
            range: {
              sheetId: sheetGid,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 11,
            },
            cell: {
              userEnteredFormat: {
                textFormat: { bold: true },
                horizontalAlignment: "CENTER",
              },
            },
            fields: "userEnteredFormat(textFormat,horizontalAlignment)",
          },
        },
        {
          setDataValidation: {
            range: {
              sheetId: sheetGid,
              startRowIndex: 1,
              startColumnIndex: 7,
              endColumnIndex: 8,
            },
            rule: {
              condition: {
                type: "ONE_OF_LIST",
                values: STATUS_OPTIONS.map((userEnteredValue) => ({ userEnteredValue })),
              },
              strict: true,
              showCustomUi: true,
            },
          },
        },
        {
          setDataValidation: {
            range: {
              sheetId: sheetGid,
              startRowIndex: 1,
              startColumnIndex: 8,
              endColumnIndex: 9,
            },
            rule: {
              condition: {
                type: "ONE_OF_LIST",
                values: PRIORITY_OPTIONS.map((userEnteredValue) => ({ userEnteredValue })),
              },
              strict: true,
              showCustomUi: true,
            },
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: sheetGid,
              dimension: "COLUMNS",
              startIndex: 11,
              endIndex: 13,
            },
            properties: { hiddenByUser: true },
            fields: "hiddenByUser",
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: sheetGid,
              dimension: "COLUMNS",
              startIndex: 25,
              endIndex: 26,
            },
            properties: { hiddenByUser: true },
            fields: "hiddenByUser",
          },
        },
      ],
    }),
  });

  const markerRange = `${quoteSheetTab(sheetTab)}!${SCHEMA_MARKER_CELL}`;
  await sheetsRequest(`${valuesUrl(spreadsheetId, markerRange)}?valueInputOption=RAW`, accessToken, {
    method: "PUT",
    body: JSON.stringify({
      range: markerRange,
      majorDimension: "ROWS",
      values: [[SCHEMA_MARKER]],
    }),
  });
}

function parseAppendedRowNumber(updatedRange) {
  const match = String(updatedRange || "").match(/!A(\d+):M\d+$/);
  return match ? Number.parseInt(match[1], 10) : null;
}

async function appendSubmission(spreadsheetId, sheetTab, accessToken, submission) {
  const appendRange = `${quoteSheetTab(sheetTab)}!A:M`;
  const url =
    `${valuesUrl(spreadsheetId, appendRange)}:append` +
    "?valueInputOption=RAW&insertDataOption=INSERT_ROWS";
  const timestamp = formatEasternTimestamp();

  const data = await sheetsRequest(url, accessToken, {
    method: "POST",
    body: JSON.stringify({
      majorDimension: "ROWS",
      values: [[
        submission.submissionId,
        timestamp,
        submission.type,
        submission.name,
        submission.email,
        submission.subject,
        submission.message,
        "New",
        "Normal",
        "",
        timestamp,
        DELIVERY_PENDING,
        DELIVERY_PENDING,
      ]],
    }),
  });

  return parseAppendedRowNumber(data?.updates?.updatedRange);
}

async function saveSubmission({
  spreadsheetId,
  sheetTab,
  sheetGid,
  serviceAccountEmail,
  privateKey,
  submission,
}) {
  const accessToken = await getGoogleAccessToken(serviceAccountEmail, privateKey);
  let state = await getSubmissionState(spreadsheetId, sheetTab, accessToken);

  if (state.schemaMarker !== SCHEMA_MARKER) {
    await initializeSheetSchema(spreadsheetId, sheetTab, sheetGid, accessToken);
    state = await getSubmissionState(spreadsheetId, sheetTab, accessToken);
  }

  const existing = state.submissions.get(submission.submissionId);
  if (existing) {
    return {
      accessToken,
      duplicate: true,
      ...existing,
    };
  }

  let rowNumber = await appendSubmission(spreadsheetId, sheetTab, accessToken, submission);
  if (!rowNumber) {
    const refreshedState = await getSubmissionState(spreadsheetId, sheetTab, accessToken);
    rowNumber = refreshedState.submissions.get(submission.submissionId)?.rowNumber || null;
  }

  if (!rowNumber) {
    throw new Error("The support submission was saved, but its Sheet row could not be identified.");
  }

  return {
    accessToken,
    duplicate: false,
    rowNumber,
    supportEmailStatus: DELIVERY_PENDING,
    autoReplyStatus: DELIVERY_PENDING,
  };
}

function deliveryWasSent(status) {
  return status === DELIVERY_SENT;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function getRequestOrigin(req) {
  const configuredOrigin = cleanText(process.env.EMAILJS_ORIGIN, 300);
  if (configuredOrigin) return configuredOrigin.replace(/\/$/, "");

  const requestOrigin = cleanText(req?.headers?.origin, 300);
  if (/^https?:\/\//i.test(requestOrigin)) {
    return requestOrigin.replace(/\/$/, "");
  }

  const forwardedHost = cleanText(req?.headers?.["x-forwarded-host"], 300);
  const host = forwardedHost || cleanText(req?.headers?.host, 300);
  if (!host) return "";

  const forwardedProto = cleanText(req?.headers?.["x-forwarded-proto"], 20);
  const protocol = forwardedProto === "http" ? "http" : "https";
  return `${protocol}://${host}`;
}

async function sendEmailJS(templateId, templateParams, requestOrigin) {
  const headers = { "Content-Type": "application/json" };

  // EmailJS domain restrictions inspect the source/origin. A browser adds this
  // automatically, but a Vercel server request does not, so forward the site's
  // origin when one is available.
  if (requestOrigin) {
    headers.Origin = requestOrigin;
    headers.Referer = `${requestOrigin}/`;
  }

  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: templateId,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: templateParams,
  };

  const emailJsPrivateKey = cleanText(process.env.EMAILJS_PRIVATE_KEY, 500);
  if (emailJsPrivateKey) {
    payload.accessToken = emailJsPrivateKey;
  }

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `EmailJS request failed with status ${response.status}.`);
  }
}

async function updateDeliveryStatuses(
  spreadsheetId,
  sheetTab,
  accessToken,
  rowNumber,
  supportEmailStatus,
  autoReplyStatus,
) {
  const range = `${quoteSheetTab(sheetTab)}!L${rowNumber}:M${rowNumber}`;
  await sheetsRequest(`${valuesUrl(spreadsheetId, range)}?valueInputOption=RAW`, accessToken, {
    method: "PUT",
    body: JSON.stringify({
      range,
      majorDimension: "ROWS",
      values: [[supportEmailStatus, autoReplyStatus]],
    }),
  });
}

async function deliverSubmissionEmails({
  spreadsheetId,
  sheetTab,
  submission,
  savedSubmission,
  requestOrigin,
}) {
  const shouldSendSupportEmail = !deliveryWasSent(savedSubmission.supportEmailStatus);
  const shouldSendAutoReply = !deliveryWasSent(savedSubmission.autoReplyStatus);

  if (!shouldSendSupportEmail && !shouldSendAutoReply) {
    return { supportEmailSent: true, autoReplySent: true, deliveryWarning: false };
  }

  const emailSubject = `[${submission.submissionId}] ${submission.subject}`;
  const emailMessage = [
    `Reference ID: ${submission.submissionId}`,
    `Request type: ${submission.type}`,
    "",
    submission.message,
  ].join("\n");
  const sharedTemplateParams = {
    submission_id: submission.submissionId,
    request_type: submission.type,
    original_subject: submission.subject,
    original_message: submission.message,
    name: submission.name,
    email: submission.email,
    subject: emailSubject,
    message: emailMessage,
  };

  let supportResult = { status: "fulfilled" };
  let autoReplyResult = { status: "fulfilled" };

  if (shouldSendSupportEmail) {
    try {
      await sendEmailJS(
        EMAILJS_CONTACT_TEMPLATE_ID,
        {
          ...sharedTemplateParams,
          to_email: SUPPORT_EMAIL,
          from_name: submission.name,
          reply_to: submission.email,
        },
        requestOrigin,
      );
    } catch (error) {
      supportResult = { status: "rejected", reason: error };
    }
  }

  // EmailJS documents a one-request-per-second REST limit. Keep the auto-reply
  // separate from the support notification so neither request is rate-limited.
  if (shouldSendSupportEmail && shouldSendAutoReply) {
    await wait(1100);
  }

  if (shouldSendAutoReply) {
    try {
      await sendEmailJS(
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        {
          ...sharedTemplateParams,
          to_email: submission.email,
          from_name: "SkimRoute Support",
          reply_to: SUPPORT_EMAIL,
        },
        requestOrigin,
      );
    } catch (error) {
      autoReplyResult = { status: "rejected", reason: error };
    }
  }

  const supportEmailSent = !shouldSendSupportEmail || supportResult.status === "fulfilled";
  const autoReplySent = !shouldSendAutoReply || autoReplyResult.status === "fulfilled";

  try {
    await updateDeliveryStatuses(
      spreadsheetId,
      sheetTab,
      savedSubmission.accessToken,
      savedSubmission.rowNumber,
      supportEmailSent ? DELIVERY_SENT : DELIVERY_FAILED,
      autoReplySent ? DELIVERY_SENT : DELIVERY_FAILED,
    );
  } catch (error) {
    console.error("Email delivery status update failed:", error instanceof Error ? error.message : error);
  }

  if (supportResult.status === "rejected") {
    console.error("Support notification email failed:", supportResult.reason);
  }
  if (autoReplyResult.status === "rejected") {
    console.error("Support auto-reply email failed:", autoReplyResult.reason);
  }

  return {
    supportEmailSent,
    autoReplySent,
    deliveryWarning: !supportEmailSent || !autoReplySent,
  };
}

async function processSubmission(options) {
  const savedSubmission = await saveSubmission(options);
  const delivery = await deliverSubmissionEmails({
    spreadsheetId: options.spreadsheetId,
    sheetTab: options.sheetTab,
    submission: options.submission,
    savedSubmission,
    requestOrigin: options.requestOrigin,
  });

  return {
    duplicate: savedSubmission.duplicate,
    ...delivery,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { ok: false, error: "Method not allowed." });
  }

  const body = parseRequestBody(req.body);

  // Hidden honeypot field. Real users never fill this in.
  if (cleanText(body.website, 200)) {
    return sendJson(res, 200, { ok: true, saved: true });
  }

  const requestedSubmissionId = cleanText(body.submissionId, 40).toUpperCase();
  const submission = {
    submissionId: SUBMISSION_ID_PATTERN.test(requestedSubmissionId)
      ? requestedSubmissionId
      : generateSubmissionId(),
    type: cleanText(body.type, 80),
    name: cleanText(body.name, 120),
    email: cleanText(body.email, 254),
    subject: cleanText(body.subject, 200),
    message: cleanText(body.message, 5000),
  };

  if (!submission.name || !submission.email || !submission.subject || !submission.message || !submission.type) {
    return sendJson(res, 400, { ok: false, error: "All form fields are required." });
  }

  if (!REQUEST_TYPES.has(submission.type)) {
    return sendJson(res, 400, { ok: false, error: "Please choose a valid request type." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return sendJson(res, 400, { ok: false, error: "Please enter a valid email address." });
  }

  const spreadsheetId = process.env.GOOGLE_SHEET_ID || DEFAULT_SPREADSHEET_ID;
  const sheetTab = cleanText(process.env.GOOGLE_SHEET_TAB || DEFAULT_SHEET_TAB, 100);
  const parsedSheetGid = Number.parseInt(process.env.GOOGLE_SHEET_GID || String(DEFAULT_SHEET_GID), 10);
  const sheetGid = Number.isInteger(parsedSheetGid) && parsedSheetGid >= 0
    ? parsedSheetGid
    : DEFAULT_SHEET_GID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!spreadsheetId || !sheetTab || !serviceAccountEmail || !privateKey) {
    console.error("Google Sheets environment variables are not fully configured.");
    return sendJson(res, 503, {
      ok: false,
      error: "Support submissions are temporarily unavailable.",
    });
  }

  let ownsInFlightSubmission = false;
  try {
    let pendingSubmission = inFlightSubmissions.get(submission.submissionId);
    if (!pendingSubmission) {
      ownsInFlightSubmission = true;
      pendingSubmission = processSubmission({
        spreadsheetId,
        sheetTab,
        sheetGid,
        serviceAccountEmail,
        privateKey,
        submission,
        requestOrigin: getRequestOrigin(req),
      });
      inFlightSubmissions.set(submission.submissionId, pendingSubmission);
    }

    const result = await pendingSubmission;
    return sendJson(res, 200, {
      ok: true,
      saved: true,
      duplicate: result.duplicate || !ownsInFlightSubmission,
      submissionId: submission.submissionId,
      supportEmailSent: result.supportEmailSent,
      autoReplySent: result.autoReplySent,
      deliveryWarning: result.deliveryWarning,
    });
  } catch (error) {
    console.error("Support submission failed:", error instanceof Error ? error.message : error);
    return sendJson(res, 502, {
      ok: false,
      error: "Your message could not be saved right now. Please try again.",
    });
  } finally {
    if (ownsInFlightSubmission) {
      inFlightSubmissions.delete(submission.submissionId);
    }
  }
}
