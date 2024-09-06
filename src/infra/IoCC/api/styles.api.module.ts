import { styleControllers } from '@api/styles';
import { Module } from '@nestjs/common';

@Module({
  controllers: styleControllers,
})
export class StylesApiModule {}
