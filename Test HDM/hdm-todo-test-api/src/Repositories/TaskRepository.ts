import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data: 
    Prisma.TaskCreateInput | 
    Prisma.TaskUpdateInput) {
    if ('id' in data && data.id) {
      return this.prisma.task.update({
        where: { id: data.id },
        data,
      });
    } else {
      return this.prisma.task.create({ data });
    }
  }
}
