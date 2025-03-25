import { IsString, IsOptional, IsEnum, Length } from 'class-validator';
import { tasks_status, tasks_category } from '@prisma/client';

export class CreateTaskDto {
    @IsString()
    @Length(1, 100)
    title: string;

    @IsOptional()
    @IsString()
    @Length(0, 500)
    description?: string;

    @IsOptional()
    @IsEnum(tasks_category)
    category: tasks_category;

    @IsOptional()
    @IsEnum(tasks_status)
    status: tasks_status;
}
