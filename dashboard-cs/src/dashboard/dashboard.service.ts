import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  async getSummary(user_id: string) {
    const [total, pending, progress, completed, deleted] = await Promise.all([
      this.prisma.tasks.count({ where: { user_id, deleted_at: null } }),
      this.prisma.tasks.count({ where: { user_id, status: 'PENDING', deleted_at: null } }),
      this.prisma.tasks.count({ where: { user_id, status: 'IN_PROGRESS', deleted_at: null } }),
      this.prisma.tasks.count({ where: { user_id, status: 'COMPLETED', deleted_at: null } }),
      this.prisma.tasks.count({ where: { user_id, deleted_at: { not: null } } }),
    ]);

    return {
      total,
      pending,
      progress,
      completed,
      deleted,
      completionRate: total > 0 ? Number(((completed / total) * 100).toFixed(2)) : 0,
    };
  }

  async getCompletionRate(user_id: string) {
    const [total, completed] = await Promise.all([
      this.prisma.tasks.count({ where: { user_id, deleted_at: null } }),
      this.prisma.tasks.count({ where: { user_id, status: 'COMPLETED', deleted_at: null } })
    ]);

    return {
      total,
      completed,
      rate: total > 0 ? Number(((completed / total) * 100).toFixed(2)) : 0,
    };
  }

  async getWeeklyTrend(user_id: string) {
    const completedTasks = await this.prisma.tasks.findMany({
      where: {
        user_id,
        status: 'COMPLETED',
        completed_at: { not: null },
        deleted_at: null,
      },
      select: { completed_at: true },
    });

    const trend: Record<string, number> = {};
    for (const task of completedTasks) {
      if (!task.completed_at) continue;
      console.log('taskCompleted: ', task.completed_at);
      const week = this.getISOWeek(task.completed_at);
      trend[week] = (trend[week] || 0) + 1;
    }

    return Object.fromEntries(
      Object.entries(trend)
        .sort((a, b) => {
          const getWeekNumber = (weekStr: string) => {
            const match = weekStr.match(/W(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };

          const yearA = parseInt(a[0].split("-W")[0]);
          const yearB = parseInt(b[0].split("-W")[0]);
          const weekA = getWeekNumber(a[0]);
          const weekB = getWeekNumber(b[0]);

          if (yearA === yearB) {
            return weekA - weekB;
          }
          return yearA - yearB;
        })
    );
  }

  async getProductivityByDay(user_id: string) {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        user_id,
        status: 'COMPLETED',
        completed_at: { not: null },
        deleted_at: null,
      },
      select: { completed_at: true },
    });

    const dayCounts: Record<string, number> = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    for (const task of tasks) {
      if (!task.completed_at) continue;

      const adjustedDate = new Date(task.completed_at.getTime() + 5 * 60 * 60 * 1000);
      const dayIndex = adjustedDate.getDay();
      const dayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][dayIndex];

      dayCounts[dayName]++;
    }

    return dayCounts;
  }

  async getAverageCompletionTime(user_id: string) {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        user_id,
        status: 'COMPLETED',
        completed_at: { not: null },
        deleted_at: null,
      },
      select: { created_at: true, completed_at: true },
    });

    if (tasks.length === 0) {
      return { tasksCompleted: 0, averageMinutes: 0, averageHours: 0 };
    }

    const totalMinutes = tasks.reduce((acc, task) => {
      const duration = (task.completed_at!.getTime() - task.created_at.getTime()) / 60000;
      return acc + duration;
    }, 0);

    const avgMinutes = totalMinutes / tasks.length;
    return {
      tasksCompleted: tasks.length,
      averageMinutes: Number(avgMinutes.toFixed(2)),
      averageHours: Number((avgMinutes / 60).toFixed(2)),
    };
  }

  async getTasksByCategory(user_id: string) {
    const grouped = await this.prisma.tasks.groupBy({
      by: ['category'],
      where: {
        user_id,
        deleted_at: null,
      },
      _count: { category: true },
      orderBy: {
        _count: { category: 'desc' },
      },
    });

    const result: Record<string, number> = {};
    for (const item of grouped) {
      result[item.category] = item._count.category;
    }

    return result;
  }

  async getAbandonmentRate(user_id: string) {
    const total = await this.prisma.tasks.count({ where: { user_id } });
    const abandoned = await this.prisma.tasks.count({
      where: {
        user_id,
        deleted_at: { not: null },
        status: { in: ['PENDING', 'IN_PROGRESS'] },
      },
    });

    const abandonment_rate = total > 0 ? Number(((abandoned / total) * 100).toFixed(2)) : 0;
    return { total, abandoned, abandonment_rate };
  }

  private getISOWeek(date: Date): string {
    const adjustedDate = new Date(date.getTime() + 5 * 60 * 60 * 1000);
    console.log(`date: ${date} | adjustedDate: ${adjustedDate}`);

    const year = adjustedDate.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const pastDays = Math.floor((adjustedDate.getTime() - startOfYear.getTime()) / 86400000);
    const week = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);

    return `${year}-W${week}`;
  }
}
