import { CompanyEntity } from '@core/company/entities';
import { Action, RecordActionResponse } from 'adminjs';
import { Repository } from 'typeorm';

export const newCompanyActionFactory = (
  companyRepository: Repository<CompanyEntity>,
): Partial<Action<RecordActionResponse>> => ({
  handler: async (req) => {
    const result: RecordActionResponse = {
      record: {
        baseError: {
          message: '',
          type: '',
        },
        bulkActions: [],
        errors: {},
        id: '',
        params: {},
        populated: {},
        recordActions: [],
        title: '',
      },
      notice: {
        message: 'ГОТОВО',
      },
    };
    try {
      await companyRepository.insert(req.payload);
    } catch (error) {
      result.notice.message = error.message;
    }
    return result;
  },
});
