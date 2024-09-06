import { IGetResponse, IGetResponseMeta } from '@shared/types/common';

export class GetResponseMetaDto implements IGetResponseMeta {
  page: number;
  count: number;
  total: number;
}

export class GetResponseDto<DataType> implements IGetResponse<DataType> {
  data: DataType;
  meta: IGetResponseMeta;
}
