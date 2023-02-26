import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo'
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/schema.gql')
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
