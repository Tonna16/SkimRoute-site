const svgToDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const commonBg = (accent1, accent2) => `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent1}" />
      <stop offset="100%" stop-color="${accent2}" />
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.98)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.88)" />
    </linearGradient>
  </defs>
`;

const browserFrame = (title, subtitle, accent = "#6f7cff") => `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" fill="none">
  ${commonBg("#f6f8ff", "#eef5ff")}
  <rect width="1600" height="900" rx="40" fill="url(#bg)"/>
  <circle cx="1200" cy="120" r="260" fill="${accent}" opacity="0.12"/>
  <circle cx="250" cy="760" r="220" fill="${accent}" opacity="0.10"/>
  <rect x="80" y="80" width="1440" height="740" rx="28" fill="rgba(255,255,255,0.78)" stroke="rgba(17,24,39,0.08)" stroke-width="2"/>
  <rect x="80" y="80" width="1440" height="72" rx="28" fill="rgba(17,24,39,0.04)"/>
  <circle cx="122" cy="116" r="10" fill="rgba(17,24,39,0.18)"/>
  <circle cx="156" cy="116" r="10" fill="rgba(17,24,39,0.12)"/>
  <circle cx="190" cy="116" r="10" fill="rgba(17,24,39,0.08)"/>
  <text x="248" y="124" fill="#1f2937" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">${title}</text>
  <text x="248" y="162" fill="#6b7280" font-family="Inter, Arial, sans-serif" font-size="16">${subtitle}</text>
`;

const pageLines = (x, y, widths, fill = "#dbe4ff") => widths.map((w, i) => `<rect x="${x}" y="${y + i * 34}" width="${w}" height="14" rx="7" fill="${fill}" opacity="${Math.max(0.22, 1 - i * 0.08)}"/>`).join("");

const mockPage = (accent = "#6f7cff") => `
  <rect x="120" y="190" width="900" height="560" rx="28" fill="url(#panel)" stroke="rgba(17,24,39,0.08)" stroke-width="2"/>
  <rect x="120" y="190" width="900" height="74" rx="28" fill="rgba(111,124,255,0.10)"/>
  <rect x="160" y="224" width="260" height="18" rx="9" fill="#111827" opacity="0.16"/>
  <rect x="160" y="270" width="760" height="16" rx="8" fill="#111827" opacity="0.10"/>
  <rect x="160" y="306" width="700" height="16" rx="8" fill="#111827" opacity="0.10"/>
  <rect x="160" y="342" width="620" height="16" rx="8" fill="#111827" opacity="0.10"/>
  <rect x="160" y="402" width="200" height="18" rx="9" fill="${accent}" opacity="0.25"/>
  <rect x="160" y="438" width="740" height="16" rx="8" fill="#111827" opacity="0.10"/>
  <rect x="160" y="474" width="720" height="16" rx="8" fill="#111827" opacity="0.10"/>
  <rect x="160" y="510" width="680" height="16" rx="8" fill="#111827" opacity="0.10"/>
  <rect x="160" y="570" width="170" height="18" rx="9" fill="${accent}" opacity="0.25"/>
  <rect x="160" y="606" width="760" height="16" rx="8" fill="#111827" opacity="0.10"/>
  <rect x="160" y="642" width="660" height="16" rx="8" fill="#111827" opacity="0.10"/>
  <rect x="160" y="678" width="540" height="16" rx="8" fill="#111827" opacity="0.10"/>
`;

const sidebar = (accent = "#6f7cff", items = ["Best start", "Section 1", "Section 2", "Section 3"]) => `
  <rect x="1080" y="190" width="400" height="560" rx="28" fill="rgba(255,255,255,0.92)" stroke="rgba(17,24,39,0.08)" stroke-width="2"/>
  <rect x="1120" y="228" width="148" height="20" rx="10" fill="#111827" opacity="0.18"/>
  ${items.map((label, i) => `
    <rect x="1120" y="${280 + i * 78}" width="${i === 0 ? 240 : 200}" height="18" rx="9" fill="${i === 0 ? accent : "#111827"}" opacity="${i === 0 ? 0.28 : 0.12}"/>
    <rect x="1120" y="${307 + i * 78}" width="${i === 0 ? 280 : 240}" height="12" rx="6" fill="#111827" opacity="0.08"/>
  `).join("")}
  <rect x="1120" y="612" width="300" height="82" rx="20" fill="${accent}" opacity="0.12"/>
  <rect x="1142" y="636" width="130" height="14" rx="7" fill="#111827" opacity="0.16"/>
  <rect x="1142" y="660" width="220" height="12" rx="6" fill="#111827" opacity="0.10"/>
`;

export const HERO_ILLUSTRATION = svgToDataUri(`
${browserFrame("SkimRoute", "Find the useful part of long pages and AI chats")}
${mockPage("#6f7cff")}
${sidebar("#6f7cff", ["Jump straight to the answer", "Important section", "Nested subsection", "Code block"]) }
<rect x="160" y="742" width="220" height="18" rx="9" fill="#111827" opacity="0.18"/>
<rect x="160" y="770" width="540" height="12" rx="6" fill="#111827" opacity="0.08"/>
</svg>`);

export const HOW_ILLUSTRATION = svgToDataUri(`
${browserFrame("How it works", "Open a long page, let SkimRoute map it, then jump")}
<rect x="120" y="210" width="1420" height="540" rx="28" fill="rgba(255,255,255,0.84)" stroke="rgba(17,24,39,0.08)" stroke-width="2"/>
<rect x="170" y="260" width="380" height="26" rx="13" fill="#111827" opacity="0.14"/>
<rect x="170" y="304" width="820" height="14" rx="7" fill="#111827" opacity="0.10"/>
<rect x="170" y="336" width="760" height="14" rx="7" fill="#111827" opacity="0.10"/>
<rect x="170" y="368" width="700" height="14" rx="7" fill="#111827" opacity="0.10"/>
<rect x="170" y="430" width="250" height="64" rx="18" fill="#6f7cff" opacity="0.16"/>
<rect x="170" y="430" width="250" height="64" rx="18" fill="none" stroke="#6f7cff" stroke-opacity="0.35" stroke-width="2"/>
<rect x="170" y="524" width="230" height="64" rx="18" fill="#6f7cff" opacity="0.12"/>
<rect x="170" y="524" width="230" height="64" rx="18" fill="none" stroke="#6f7cff" stroke-opacity="0.28" stroke-width="2"/>
<rect x="170" y="618" width="270" height="64" rx="18" fill="#6f7cff" opacity="0.08"/>
<rect x="170" y="618" width="270" height="64" rx="18" fill="none" stroke="#6f7cff" stroke-opacity="0.22" stroke-width="2"/>
<rect x="560" y="410" width="860" height="210" rx="22" fill="rgba(111,124,255,0.08)" stroke="rgba(111,124,255,0.18)" stroke-width="2"/>
<rect x="596" y="448" width="420" height="16" rx="8" fill="#111827" opacity="0.14"/>
<rect x="596" y="488" width="300" height="16" rx="8" fill="#111827" opacity="0.10"/>
<rect x="596" y="528" width="350" height="16" rx="8" fill="#111827" opacity="0.10"/>
<rect x="980" y="448" width="340" height="180" rx="16" fill="white" opacity="0.92"/>
<rect x="1008" y="476" width="160" height="16" rx="8" fill="#111827" opacity="0.14"/>
<rect x="1008" y="510" width="220" height="12" rx="6" fill="#111827" opacity="0.08"/>
<rect x="1008" y="540" width="200" height="12" rx="6" fill="#111827" opacity="0.08"/>
<rect x="1008" y="570" width="240" height="12" rx="6" fill="#111827" opacity="0.08"/>
</svg>`);

export const FEATURE_ILLUSTRATION_1 = svgToDataUri(`
${browserFrame("Smart Jump", "SkimRoute finds the strongest starting point")}
${mockPage("#6f7cff")}
${sidebar("#6f7cff", ["Best start", "Overview", "Details", "Conclusion"])}
<rect x="160" y="742" width="180" height="18" rx="9" fill="#111827" opacity="0.14"/>
</svg>`);

export const FEATURE_ILLUSTRATION_2 = svgToDataUri(`
${browserFrame("AI Chat Navigation", "Turns, summaries, code, and final answers")}
<rect x="126" y="194" width="734" height="544" rx="28" fill="rgba(255,255,255,0.88)" stroke="rgba(17,24,39,0.08)" stroke-width="2"/>
<rect x="164" y="244" width="220" height="28" rx="14" fill="#111827" opacity="0.14"/>
<rect x="198" y="302" width="420" height="72" rx="24" fill="#6f7cff" opacity="0.16"/>
<rect x="198" y="396" width="520" height="72" rx="24" fill="#111827" opacity="0.07"/>
<rect x="198" y="490" width="470" height="72" rx="24" fill="#6f7cff" opacity="0.12"/>
<rect x="198" y="584" width="550" height="72" rx="24" fill="#111827" opacity="0.07"/>
<rect x="170" y="270" width="22" height="22" rx="11" fill="#6f7cff"/>
<rect x="706" y="620" width="82" height="28" rx="14" fill="#6f7cff" opacity="0.20"/>
<rect x="944" y="194" width="520" height="544" rx="28" fill="rgba(255,255,255,0.92)" stroke="rgba(17,24,39,0.08)" stroke-width="2"/>
<rect x="980" y="236" width="180" height="18" rx="9" fill="#111827" opacity="0.16"/>
<rect x="980" y="282" width="300" height="12" rx="6" fill="#111827" opacity="0.10"/>
<rect x="980" y="316" width="260" height="12" rx="6" fill="#111827" opacity="0.10"/>
<rect x="980" y="366" width="240" height="18" rx="9" fill="#6f7cff" opacity="0.24"/>
<rect x="980" y="402" width="320" height="12" rx="6" fill="#111827" opacity="0.10"/>
<rect x="980" y="434" width="280" height="12" rx="6" fill="#111827" opacity="0.10"/>
<rect x="980" y="486" width="220" height="18" rx="9" fill="#6f7cff" opacity="0.22"/>
<rect x="980" y="522" width="340" height="12" rx="6" fill="#111827" opacity="0.10"/>
<rect x="980" y="554" width="260" height="12" rx="6" fill="#111827" opacity="0.10"/>
<rect x="980" y="606" width="180" height="18" rx="9" fill="#6f7cff" opacity="0.22"/>
</svg>`);

export const FEATURE_ILLUSTRATION_3 = svgToDataUri(`
${browserFrame("Nested Page Map", "Collapsible subsections with live scroll tracking")}
${mockPage("#6f7cff")}
<rect x="1080" y="190" width="400" height="560" rx="28" fill="rgba(255,255,255,0.92)" stroke="rgba(17,24,39,0.08)" stroke-width="2"/>
<rect x="1120" y="228" width="188" height="20" rx="10" fill="#111827" opacity="0.18"/>
<rect x="1120" y="278" width="250" height="18" rx="9" fill="#6f7cff" opacity="0.26"/>
<rect x="1148" y="310" width="180" height="12" rx="6" fill="#111827" opacity="0.08"/>
<rect x="1148" y="342" width="210" height="12" rx="6" fill="#111827" opacity="0.08"/>
<rect x="1120" y="392" width="220" height="18" rx="9" fill="#111827" opacity="0.12"/>
<rect x="1148" y="424" width="170" height="12" rx="6" fill="#111827" opacity="0.08"/>
<rect x="1148" y="456" width="190" height="12" rx="6" fill="#111827" opacity="0.08"/>
<rect x="1120" y="508" width="180" height="18" rx="9" fill="#111827" opacity="0.12"/>
<rect x="1148" y="540" width="150" height="12" rx="6" fill="#111827" opacity="0.08"/>
<rect x="1120" y="602" width="300" height="82" rx="20" fill="#6f7cff" opacity="0.12"/>
</svg>`);
