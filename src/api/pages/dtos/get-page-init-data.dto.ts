import { GetResponseMetaDto } from '@shared/dtos';
import { Enums, Interfaces } from '@shared/types/page-init-data';
import { PageInitDataDto } from './init-data.dto';
import { IsEnum, IsUUID } from 'class-validator';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { PageEntity } from '@core/page/entities';
import { CompanyIdVO, IdVO } from '@shared/value-objects';

export class GetPageInitDataParamsDto
  implements Interfaces.IGetPageInitDataParams
{
  @IsUUID()
  companyId: string;

  @IsEnum(Enums.PagesEnum)
  page: Enums.PagesEnum;
}

export class FindPagePayloadDto extends IntersectionType(
  PickType(PageEntity, ['type']),
  CompanyIdVO,
) {
  type: Enums.PagesEnum;
  company: IdVO;
}

export class GetInitDataResponseDto
  implements Interfaces.IGetPageInitDataResponse
{
  data: PageInitDataDto;
  meta: GetResponseMetaDto;
}
