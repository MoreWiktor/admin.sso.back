import { BadRequestException } from '@nestjs/common';
import { ExceptionUnionType } from '@shared/enums/exception';

export abstract class ExceptionAbstract extends Error {
  constructor(
    protected payload: string,
    public type: ExceptionUnionType,
  ) {
    super(payload);
  }

  public getHttpException() {
    return new BadRequestException(this.payload);
  }
}
