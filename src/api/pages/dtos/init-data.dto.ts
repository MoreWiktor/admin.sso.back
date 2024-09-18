import { Types, Enums } from '@shared/types/page-init-data';

export class FieldStyleDto implements Types.FieldStyleType {
  container?: string;
  input?: string;
  label?: string;
}

export class FieldDto implements Types.FieldType {
  title: string;
  type: Enums.InputTypeEnum;
  style?: FieldStyleDto;
  required?: boolean;
}

export class ButtonStyleDto implements Types.ButtonStyleType {
  base?: string;
  primary?: string;
  done?: string;
  error?: string;
  loading?: string;
}

export class ButtonDto implements Types.ButtonType {
  title: string;
  type: Enums.ButtonTypeEnum;
  style?: ButtonStyleDto;
}

export class FormStyleDto implements Types.FormStyleType {
  container?: string;
  title?: string;
}

export class FormDto implements Types.FormType {
  title: string;
  style?: FormStyleDto;
}

export class BackgroundStyleDto implements Types.BackgroundStyleType {
  container?: string;
}

export class BackgroundDto implements Types.BackgroundType {
  style?: BackgroundStyleDto;
}

export class PageInitDataDto implements Types.PageInitDataType {
  page: Enums.PagesEnum;
  fields: FieldDto[];
  buttons: ButtonDto[];
  form: FormDto;
  background: BackgroundDto;
}
