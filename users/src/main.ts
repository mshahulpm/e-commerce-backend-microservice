import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/CustomExceptionFilter';

const PORT = process.env.PORT || 7003;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // cors enable 
  app.enableCors()

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RABITMQ_URL] as string[],
  //     queue: 'user_queue',
  //     queueOptions: {
  //       durable: true
  //     }
  //   }
  // })

  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  // Global exception error handling 
  const host = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(host))


  await app.startAllMicroservices()

  await app.listen(PORT);
  console.log('User service is running on port ' + PORT);

}
bootstrap();
