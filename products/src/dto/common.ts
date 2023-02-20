import { Field, InputType, Int } from "@nestjs/graphql";
import { IsOptional, Min } from "class-validator";


@InputType()
export class Pagination {

    @IsOptional()
    @Min(0)
    @Field(() => Int, { nullable: true })
    page?: number

    @Field(() => String, { nullable: true })
    search?: string

    @IsOptional()
    @Min(0)
    @Field(() => Int, { nullable: true })
    limit: number
}