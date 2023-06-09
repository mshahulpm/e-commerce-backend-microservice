import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/CustomExceptionFilter';
import { QUEUES } from './config'

const PORT = process.env.PORT || 7001;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // cors enable 
  app.enableCors()

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL] as string[],
      queue: QUEUES.ORDER,
      queueOptions: {
        durable: true
      }
    }
  })

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
  app.useGlobalFilters(new AllExceptionsFilter())



  await app.startAllMicroservices()

  await app.listen(PORT);
  console.log('Order service is running on port ' + PORT);

}
bootstrap();
