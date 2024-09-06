import { Controller, Get, Param } from '@nestjs/common';
import { GetPageStylesParamsDto, GetPageStylesResponseDto } from '../dtos';

@Controller('styles')
export class StylesController {
  @Get(':page/:companyId')
  public async getPageStyles(
    @Param() params: GetPageStylesParamsDto,
  ): Promise<GetPageStylesResponseDto> {
    return {
      data: {
        id: params.companyId,
        title: params.page,
      },
      meta: {
        count: 0,
        page: 0,
        total: 0,
      },
    };
  }
}
