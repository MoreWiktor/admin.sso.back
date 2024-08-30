import { AdminJSOptions, BaseAuthProvider, CurrentAdmin } from 'adminjs';
import { SessionOptions } from 'express-session';

export interface ExpressFormidableOptions {
  encoding?: string;
  uploadDir?: string;
  keepExtensions?: boolean;
  type?: 'multipart' | 'urlencoded';
  maxFileSize?: number;
  maxFieldsSize?: number;
  maxFields?: number;
  hash?: boolean | 'sha1' | 'md5';
  multiples?: boolean;
}

export type AdminModuleOptions = {
  adminJsOptions: AdminJSOptions;
  auth?: {
    authenticate?: (
      email: string,
      password: string,
      ctx?: any,
    ) => Promise<CurrentAdmin | null>;
    cookiePassword: string;
    cookieName: string;
    provider?: BaseAuthProvider;
  };
  formidableOptions?: ExpressFormidableOptions;
  sessionOptions?: SessionOptions;
  shouldBeInitialized?: boolean;
};
