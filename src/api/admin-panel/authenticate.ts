const DEFAULT_ADMIN = {
  email: 'admin@mail.com',
  password: 'password',
};

export const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
