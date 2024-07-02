import { AppConfigType } from '@infra/app-config/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigTypeEnum } from '@shared/enums/app';
import { Exception } from '@shared/exceptions';
import * as BC from 'bcrypt';

@Injectable()
export class HashHelper {
  private readonly HASH_SECRET: string;
  constructor(configService: ConfigService) {
    this.HASH_SECRET = configService.getOrThrow<AppConfigType>(
      ConfigTypeEnum.APP,
    ).cryptoSecret;
  }

  public async hash(string: string): Promise<{ salt: string; hash: string }> {
    try {
      const salt = await BC.genSalt();
      const hash = await BC.hash(string, salt);
      return { salt, hash };
    } catch (error) {
      throw new Exception('Неизвестная ошибка');
    }
  }

  public async verify(hash: string, string: string): Promise<boolean> {
    try {
      return BC.compare(string, hash);
    } catch (error) {
      throw new Exception('Неизвестная ошибка');
    }
  }
}
