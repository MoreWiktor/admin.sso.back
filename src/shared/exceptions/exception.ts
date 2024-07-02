import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

export enum ExceptionTypeEnum {
  'UNKNOWN_ERROR',
  'COMPANY_WITH_NAME_ALREADY_EXIST',
  'COMPANY_NOT_FOUND',
  'USER_WITH_NAME_ALREADY_EXIST',
  'USER_NOT_FOUND',
}

export class Exception {
  private readonly logger = new Logger(Exception.name);
  constructor(
    public readonly payload: string,
    public readonly type: ExceptionTypeEnum = ExceptionTypeEnum.UNKNOWN_ERROR,
  ) {}

  public getHttpException() {
    switch (this.type) {
      case ExceptionTypeEnum.UNKNOWN_ERROR: {
        const message = `Unknown error: ${this.payload}`;
        this.logger.error(message);
        return new InternalServerErrorException(message);
      }

      case ExceptionTypeEnum.COMPANY_WITH_NAME_ALREADY_EXIST: {
        const message = ` with name "${this.payload}" already exist`;
        this.logger.error(message);
        return new BadRequestException(message);
      }

      case ExceptionTypeEnum.COMPANY_NOT_FOUND: {
        const message = ` with name "${this.payload}" not found`;
        this.logger.error(message);
        return new NotFoundException(message);
      }

      case ExceptionTypeEnum.USER_WITH_NAME_ALREADY_EXIST: {
        const message = `User with name "${this.payload}" already exist`;
        this.logger.error(message);
        return new BadRequestException(message);
      }

      case ExceptionTypeEnum.USER_NOT_FOUND: {
        const message = `User "${this.payload}" not found`;
        this.logger.error(message);
        return new NotFoundException(message);
      }
    }
  }
}
