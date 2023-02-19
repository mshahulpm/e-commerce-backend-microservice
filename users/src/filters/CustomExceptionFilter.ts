import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {

    baseException: BaseExceptionFilter;

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {
        this.baseException = new BaseExceptionFilter(httpAdapterHost.httpAdapter)
    }

    catch(exception, host: ArgumentsHost): void {

        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const gqlHost = GqlArgumentsHost.create(host)
        const { httpAdapter } = this.httpAdapterHost;


        const ctx = host.switchToHttp();

        /**
        *   Handling prisma client exception
        */

        if (exception instanceof Prisma.NotFoundError) {

            httpAdapter.reply(ctx.getResponse(), {
                statusCode: 404,
                ...exception,
                message: 'Record Not Found',
            }, 404)
            return
        }

        if (exception instanceof Prisma.PrismaClientKnownRequestError) {

            console.log(exception)

            let httpStatus = HttpStatus.BAD_REQUEST, message = 'Prisma error';

            // No record found 
            if (exception.code === 'P2025') {
                httpStatus = HttpStatus.BAD_REQUEST
                message = 'No Record found to update'
            }

            const responseBody = {
                statusCode: httpStatus,
                message: message,
            };

            httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

        } else this.baseException.catch(exception, host)

    }
}


