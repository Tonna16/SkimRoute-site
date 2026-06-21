import { Outlet } from "react-router-dom";

/**
 * SkimRoute site is public-facing, so this component just renders the route tree.
 * It remains as a harmless fallback for any legacy imports.
 */
export default function ProtectedRoute() {
  return <Outlet />;
}
