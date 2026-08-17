import { hasPermission } from "../utils/permissions";

function ProtectedAction({ role, permission, children }) {
  if (!hasPermission(role, permission)) {
    return null;
  }

  return children;
}

export default ProtectedAction;