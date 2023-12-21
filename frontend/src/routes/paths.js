function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "app"),
  },
};

export const PATH_AUTH = {
  root: ROOTS_DASHBOARD,
  general: {
    login: path(ROOTS_DASHBOARD, "auth/login"),
  },
};
