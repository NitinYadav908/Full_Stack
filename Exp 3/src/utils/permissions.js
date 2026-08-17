export const permissions = {
  admin: {
    canView: true,
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },

  editor: {
    canView: true,
    canCreate: false,
    canEdit: true,
    canDelete: false,
  },

  viewer: {
    canView: true,
    canCreate: false,
    canEdit: false,
    canDelete: false,
  },
};

export function hasPermission(role, action) {
  return permissions[role]?.[action] ?? false;
}