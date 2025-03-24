import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}