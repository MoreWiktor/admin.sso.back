import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from '../entities';
import { Repository } from 'typeorm';
import { Enums } from '@shared/types/page-init-data';
import { Either, left, right } from '@sweet-monads/either';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
  ) {}

  public async getInitData(where: {
    type: Enums.PagesEnum;
    company: {
      id: string;
    };
  }): Promise<Either<Error, PageEntity>> {
    try {
      const page = await this.pageRepository.findOneOrFail({
        where,
        relations: {
          background: { style: true },
          form: { style: true },
          buttons: { style: true },
          fields: { style: true },
        },
      });
      return right(page);
    } catch (error) {
      return left(error);
    }
  }
}
