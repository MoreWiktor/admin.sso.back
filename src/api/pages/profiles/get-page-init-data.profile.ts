import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
  mapWith,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  GetPageInitDataParamsDto,
  GetInitDataResponseDto,
  PageInitDataDto,
  FindPagePayloadDto,
} from '../dtos';
import { PageEntity } from '@core/page/entities';

export class GetPageInitDataProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public readonly defaultMetaData = {
    page: 0,
    count: 0,
    total: 0,
  };

  get profile(): MappingProfile {
    return (mapper) => {
      // Payload
      createMap(
        mapper,
        GetPageInitDataParamsDto,
        FindPagePayloadDto,
        forMember(
          (d) => d.type,
          mapFrom((s) => s.page),
        ),
        forMember(
          (d) => d.company.id,
          mapFrom((s) => s.companyId),
        ),
      );
      // Response
      createMap(
        mapper,
        PageEntity,
        GetInitDataResponseDto,
        forMember(
          (d) => d.data,
          mapWith(PageInitDataDto, PageEntity, (s) => s),
        ),
        forMember(
          (d) => d.meta,
          mapFrom(() => this.defaultMetaData),
        ),
      );
    };
  }
}
