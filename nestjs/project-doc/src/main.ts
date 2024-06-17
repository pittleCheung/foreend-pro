// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { LoggingInterceptor } from './cats/interceptor/logging.interceptor';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalInterceptors(new LoggingInterceptor());
//   await app.listen(3000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen();
}
bootstrap();
