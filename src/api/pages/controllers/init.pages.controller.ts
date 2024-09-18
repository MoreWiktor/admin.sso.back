import { Controller, Get, Param } from '@nestjs/common';
import { GetPageInitDataParamsDto } from '../dtos';
import { GetPageInitDataUseCase } from '../use-case';

@Controller('pages/init')
export class InitPagesController {
  constructor(private readonly initPagesUseCase: GetPageInitDataUseCase) {}

  @Get(':page/:companyId')
  public async getPageInitData(@Param() params: GetPageInitDataParamsDto) {
    return this.initPagesUseCase.execute(params);
  }
}
