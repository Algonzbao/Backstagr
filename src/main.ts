import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { API } from './app/http-api/routes/route.constants';
import { ErrorResponseNormalizerFilter } from './app/http-api/response-normalizer/error-response-normalizer.filter';
import { SuccessResponseNormalizerInterceptor } from './app/http-api/response-normalizer/success-response-normalizer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API);
  app.useGlobalFilters(app.get(ErrorResponseNormalizerFilter));
  app.useGlobalInterceptors(app.get(SuccessResponseNormalizerInterceptor));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
