export const Config = {
  auth: {
    publicURL:
      process.env.REACT_APP_KRATOS_PUBLIC_URL || "http://127.0.0.1:4433",
    adminURL: process.env.REACT_APP_KRATOS_ADMIN_URL || "http://127.0.0.1:4434",
  },
};
