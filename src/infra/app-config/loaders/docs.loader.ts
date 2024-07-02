import { registerAs } from '@nestjs/config';
import { AppEnums } from '@shared/enums';
import { ConfigTypes } from '..';

export const docsLoader = registerAs(
  AppEnums.ConfigTypeEnum.DOCS,
  (): ConfigTypes.DocsConfigType => ({
    user: process.env.DOCS_USER,
    pass: process.env.DOCS_PASS,
  }),
);
