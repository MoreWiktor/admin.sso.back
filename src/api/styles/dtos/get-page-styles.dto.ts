import { GetResponseMetaDto } from '@shared/dtos';
import {
  PagesEnum,
  IGetPageStylesParams,
  IGetPageStylesResponse,
} from '@shared/types/page-styles';
import { StylesDto } from './styles.dto';

export class GetPageStylesParamsDto implements IGetPageStylesParams {
  companyId: string;
  page: PagesEnum;
}

export class GetPageStylesResponseDto implements IGetPageStylesResponse {
  data: StylesDto;
  meta: GetResponseMetaDto;
}
