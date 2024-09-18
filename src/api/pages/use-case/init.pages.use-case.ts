import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  GetPageInitDataParamsDto,
  GetInitDataResponseDto,
  FindPagePayloadDto,
} from '../dtos';
import { PageService } from '@core/page/services';
import { PageEntity } from '@core/page/entities';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Either, left, right } from '@sweet-monads/either';

@Injectable()
export class GetPageInitDataUseCase {
  constructor(
    private readonly pageService: PageService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  public async execute(
    params: GetPageInitDataParamsDto,
  ): Promise<GetInitDataResponseDto> {
    return this.mapGetPageStylesParamsToPageEntity(params)
      .asyncChain(
        async (payload) => await this.pageService.getInitData(payload),
      )
      .then((either) =>
        either
          .chain((payload) =>
            this.mapPageEntityToGetPageStylesResponse(payload),
          )
          .unwrap(this.handledError),
      );
  }

  public mapGetPageStylesParamsToPageEntity(
    params: GetPageInitDataParamsDto,
  ): Either<Error, FindPagePayloadDto> {
    try {
      return right(
        this.mapper.map(params, GetPageInitDataParamsDto, FindPagePayloadDto),
      );
    } catch (error) {
      return left(error);
    }
  }

  public mapPageEntityToGetPageStylesResponse = (
    data: PageEntity,
  ): Either<Error, GetInitDataResponseDto> => {
    try {
      return right(this.mapper.map(data, PageEntity, GetInitDataResponseDto));
    } catch (error) {
      return left(error);
    }
  };

  public handledError(error: Error) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  }
}
