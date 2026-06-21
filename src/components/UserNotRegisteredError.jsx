import React from "react";

const UserNotRegisteredError = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-slate-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-100 bg-white p-8 text-center shadow-lg">
        <h1 className="mb-3 text-3xl font-bold text-slate-900">Access Restricted</h1>
        <p className="text-slate-600">
          This placeholder is kept only for legacy compatibility. The public SkimRoute site does not use app registration.
        </p>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;
