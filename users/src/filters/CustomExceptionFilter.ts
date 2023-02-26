import {
    Catch,
    ArgumentsHost,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {

    catch(exception, host: ArgumentsHost): void {

        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const gqlHost = GqlArgumentsHost.create(host)

        /**
        *   Handling prisma client exception
        */

        if (exception instanceof Prisma.NotFoundError) {

            throw new NotFoundException()
        }

        if (exception instanceof Prisma.PrismaClientKnownRequestError) {

            // No record found 
            if (exception.code === 'P2025') {
                throw new BadRequestException('No Record found to update')
            }

            // unique field error 
            if (exception.code === 'P2002') {
                throw new BadRequestException(exception.meta?.target?.[0] + ' should be unique')
            }

            console.log(exception)

            throw new BadRequestException(exception.message)

        }

        return exception

    }
}


