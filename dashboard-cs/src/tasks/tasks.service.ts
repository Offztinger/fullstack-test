// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateTaskDto, user_id: string) {
    return this.prisma.tasks.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        user: {
          connect: { id: user_id },
        },
      },
    });
  }

  findAll(user_id: string) {
    return this.prisma.tasks.findMany({
      where: {
        user_id: user_id,
        deleted_at: null
      },
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.tasks.findUnique({ where: { id: id, deleted_at: null } });
  }

  update(id: string, data: Prisma.tasksUpdateInput) {
    return this.prisma.tasks.update({
      where: { id: id, deleted_at: null },
      data,
    });
  }

  async updateStatus(id: string, status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') {
    return this.prisma.tasks.update({
      where: { id: id, deleted_at: null },
      data: {
        status,
        completed_at: status === 'COMPLETED' ? new Date() : null,
      },
    });
  }

  async markAsCompleted(id: string) {
    return this.prisma.tasks.update({
      where: { id: id, deleted_at: null },
      data: {
        status: 'COMPLETED',
        completed_at: new Date(),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.tasks.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
