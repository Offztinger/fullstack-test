import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { toZonedTime } from 'date-fns-tz';
import { getISOWeek, getISOWeekYear } from "date-fns";
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

    if (total === 0) return null;

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

    if (total === 0) return null;

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

    if (completedTasks.length === 0) return null;

    const trend: Record<string, number> = {};
    for (const task of completedTasks) {
      const week = this.getISOWeekFormatted(task.completed_at!);
      trend[week] = (trend[week] || 0) + 1;
    }

    return Object.fromEntries(
      Object.entries(trend).sort((a, b) => {
        const getWeekNumber = (weekStr: string) => parseInt(weekStr.split("-W")[1]);
        const yearA = parseInt(a[0].split("-W")[0]);
        const yearB = parseInt(b[0].split("-W")[0]);
        const weekA = getWeekNumber(a[0]);
        const weekB = getWeekNumber(b[0]);
        return yearA === yearB ? weekA - weekB : yearA - yearB;
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

    if (tasks.length === 0) return null;

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
      const dayIndex = task.completed_at.getDay();
      const dayName = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
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

    if (tasks.length === 0) return null;

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
      where: { user_id, deleted_at: null },
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    });

    if (grouped.length === 0) return null;

    const result: Record<string, number> = {};
    for (const item of grouped) {
      result[item.category] = item._count.category;
    }

    return result;
  }

  async getAbandonmentRate(user_id: string) {
    const total = await this.prisma.tasks.count({
      where: {
        user_id,
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        completed_at: null,
      },
    });

    const abandoned = await this.prisma.tasks.count({
      where: {
        user_id,
        deleted_at: { not: null },
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        completed_at: null,
      },
    });

    if (total === 0) return null;

    const abandonment_rate = Number(((abandoned / total) * 100).toFixed(2));

    return { total, abandoned, abandonment_rate };
  }

  private getISOWeekFormatted(date: Date): string {
    const time = date.getTime() - 5 * 60 * 60 * 1000
    const formattedDate = new Date(time)
    const zonedDate = toZonedTime(formattedDate, "America/Bogota");

    const year = getISOWeekYear(zonedDate);
    const week = getISOWeek(zonedDate);

    const paddedWeek = String(week).padStart(2, "0");
    return `${year}-W${paddedWeek}`;
  }
}
