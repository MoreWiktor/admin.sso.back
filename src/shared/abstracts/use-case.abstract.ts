import { Exception, ExceptionTypeEnum } from '@shared/exceptions'; 
import { Either } from '@sweet-monads/either';
import { ExceptionAbstract } from './exception.abstract';

export class UseCaseAbstract {
  constructor() {}

  protected throwException(exception: Exception) {
    throw exception.getHttpException();
  }

  protected readonly getResult = <T = any>(
    result: Either<Exception, T>,
    excludeExceptions?: ExceptionTypeEnum[],
  ) => {
    if (result.isLeft() && excludeExceptions?.includes(result.value.type)) {
      return null;
    }
    return result.unwrap(this.throwException);
  };
}
