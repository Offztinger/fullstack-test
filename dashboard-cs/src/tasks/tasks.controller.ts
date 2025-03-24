import { Controller, Get, Post, Body, Param, Patch, Delete, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

 
  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.tasksService.create(dto, userId);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/complete')
  markAsCompleted(@Param('id') id: string) {
    return this.tasksService.markAsCompleted(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}