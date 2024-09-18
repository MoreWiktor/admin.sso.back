import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  BackgroundDto,
  ButtonDto,
  FieldDto,
  FormDto,
  PageInitDataDto,
} from '../dtos';
import {
  BackgroundEntity,
  ButtonEntity,
  FieldEntity,
  FormEntity,
  PageEntity,
} from '@core/page/entities';

export class PageInitDataProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      // Page
      createMap(mapper, PageEntity, PageInitDataDto);
      // Buttons
      createMap(
        mapper,
        ButtonEntity,
        ButtonDto,
        forMember(
          (d) => d.style,
          mapFrom((s) => s.style.style),
        ),
      );
      // Fields
      createMap(
        mapper,
        FieldEntity,
        FieldDto,
        forMember(
          (d) => d.style,
          mapFrom((s) => s.style.style),
        ),
      );
      // Form
      createMap(
        mapper,
        FormEntity,
        FormDto,
        forMember(
          (d) => d.style,
          mapFrom((s) => s.style.style),
        ),
      );
      // Background
      createMap(
        mapper,
        BackgroundEntity,
        BackgroundDto,
        forMember(
          (d) => d.style,
          mapFrom((s) => s.style.style),
        ),
      );
    };
  }
}
