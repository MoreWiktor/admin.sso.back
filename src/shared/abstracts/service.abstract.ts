import { left, right } from '@sweet-monads/either';

export class ServiceAbstract {
  constructor() {}
  protected left = left;
  protected rigth = right;
}
