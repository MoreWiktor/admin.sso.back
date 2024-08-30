import { PasswordEntity, UserEntity } from '@core/user/entities';
import { Action, RecordActionResponse } from 'adminjs';
import { Repository } from 'typeorm';

export const newUserActionFactory = (
  userRepository: Repository<UserEntity>,
  passwordRepository: Repository<PasswordEntity>,
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
      await userRepository.insert(req.payload);
    } catch (error) {
      result.notice.message = error.message;
    }

    return result;
  },
});
