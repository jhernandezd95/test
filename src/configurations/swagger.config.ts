import { DocumentBuilder } from '@nestjs/swagger';

const SwaggerConfig = new DocumentBuilder()
  .setTitle('API documentation')
  .setDescription('The endpoints description')
  .setVersion('1.0')
  .build();

export = SwaggerConfig;
