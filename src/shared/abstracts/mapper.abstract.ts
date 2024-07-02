import {
  Mapper,
  MappingProfile,
  forMember,
  mapFrom,
  undefinedSubstitution,
} from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';

export abstract class MapperAbstract extends AutomapperProfile {
  constructor(mapper: Mapper) {
    super(mapper);
  }
  abstract get profile(): MappingProfile;

  // companyId

  protected readonly mapFromCompanyId = <
    T extends { companyId: string },
    D extends { company: { id: string } },
  >() =>
    forMember<T, D>(
      (d) => d.company.id,
      mapFrom((source) => source.companyId),
    );

  protected readonly mapToCompanyId = <
    T extends { company: { id: string } },
    D extends { companyId: string },
  >() =>
    forMember<T, D>(
      (d) => d.companyId,
      mapFrom((source) => source.company.id),
    );

  // pagination

  protected readonly mapPageMetadata = <
    T extends { skip: number; take: number },
    D extends { metadata: { page: number } },
  >() =>
    forMember<T, D>(
      (d) => d.metadata.page,
      mapFrom((sourse) => sourse.skip / sourse.take + 1),
    );

  protected readonly mapLimitMetadata = <
    T extends { skip: number; take: number },
    D extends { metadata: { limit: number } },
  >() =>
    forMember<T, D>(
      (d) => d.metadata.limit,
      mapFrom((sourse) => sourse.take),
    );

  protected readonly mapPaginationSkip = <
    T extends {
      pagination: { page: number; limit: number };
      companyId: string;
    },
    D extends { pagination: { skip: number } },
  >() =>
    forMember<T, D>(
      (d) => d.pagination.skip,
      mapFrom(
        (sourse) => (sourse.pagination.page - 1) * sourse.pagination.limit,
      ),
    );

  protected readonly mapPaginationTake = <
    T extends {
      pagination: { page: number; limit: number };
      companyId: string;
    },
    D extends { pagination: { take: number } },
  >() =>
    forMember<T, D>(
      (d) => d.pagination.take,
      mapFrom((sourse) => sourse.pagination.limit),
    );

  // null to undefined fields

  protected readonly undefinedSubstitutionToNull = <T, D>(key: keyof D) =>
    forMember<T, D>((d) => d[key], undefinedSubstitution(null));
}
