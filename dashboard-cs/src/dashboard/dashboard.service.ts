import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getSummary(user_id: string) {
        const total = await this.prisma.tasks.count({ where: { user_id } });
        const progress = await this.prisma.tasks.count({
            where: { user_id, status: 'IN_PROGRESS' },
        });
        const completed = await this.prisma.tasks.count({
            where: { user_id, status: 'COMPLETED' },
        });

        return {
            total,
            completed,
            pending: total - completed,
            progress: progress,
            completionRate: total > 0 ? (completed / total) * 100 : 0,
        };
    }

    async getCompletionRate(user_id: string) {
        const [total, completed] = await Promise.all([
            this.prisma.tasks.count({ where: { user_id } }),
            this.prisma.tasks.count({
                where: { user_id, status: 'COMPLETED' },
            }),
        ]);

        return {
            total,
            completed,
            rate: total > 0 ? (completed / total) * 100 : 0,
        };
    }

    async getWeeklyTrend(user_id: string) {
        const completedTasks = await this.prisma.tasks.findMany({
            where: {
                user_id,
                status: 'COMPLETED',
                completed_at: { not: null },
            },
            select: { completed_at: true },
        });

        // Agrupar por semana (esto puede afinarse con date-fns)
        const trend = {};
        for (const tasks of completedTasks) {
            if (!tasks.completed_at) continue;
            const week = this.getISOWeek(tasks.completed_at);
            trend[week] = (trend[week] || 0) + 1;
        }

        return trend;
    }

    async getProductivityByDay(userId: string) {
        const tasks = await this.prisma.tasks.findMany({
            where: {
                user_id: userId,
                status: 'COMPLETED',
                completed_at: { not: null },
            },
            select: {
                completed_at: true,
            },
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
            const dayIndex = task.completed_at.getDay(); // 0 (Sunday) - 6 (Saturday)
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


    async getAverageCompletionTime(userId: string) {
        const tasks = await this.prisma.tasks.findMany({
            where: {
                user_id: userId,
                status: 'COMPLETED',
                completed_at: { not: null },
            },
            select: {
                created_at: true,
                completed_at: true,
            },
        });

        if (tasks.length === 0) return { averageMinutes: 0, averageHours: 0 };

        const totalMinutes = tasks.reduce((acc: any, task: any) => {
            const start = task.created_at.getTime();
            const end = task.completed_at!.getTime();
            const durationInMinutes = (end - start) / 1000 / 60;
            return acc + durationInMinutes;
        }, 0);

        const avgMinutes = totalMinutes / tasks.length;
        const avgHours = avgMinutes / 60;

        return {
            tasksCompleted: tasks.length,
            averageMinutes: Number(avgMinutes.toFixed(2)),
            averageHours: Number(avgHours.toFixed(2)),
        };
    }


    async getTasksByCategory(userId: string) {
        const grouped = await this.prisma.tasks.groupBy({
            by: ['category'],
            where: {
                user_id: userId,
            },
            _count: {
                category: true,
            },
            orderBy: {
                _count: {
                    category: 'desc',
                },
            },
        });

        const result: Record<string, number> = {};
        for (const item of grouped) {
            result[item.category] = item._count.category;
        }

        return result;
    }

    async getAbandonmentRate(user_id: string) {
        const total = await this.prisma.tasks.count({
            where: { user_id: user_id },
        });

        const abandoned = await this.prisma.tasks.count({
            where: {
                user_id: user_id,
                deleted_at: { not: null },
                status: {
                    in: ['PENDING', 'IN_PROGRESS'],
                }
            },
        });

        const abandonment_rate = total > 0 ? Number(((abandoned / total) * 100).toFixed(2)) : 0

        return {
            total,
            abandoned,
            abandonment_rate: abandonment_rate,
        };
    }



    private getISOWeek(date: Date): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const startOfYear = new Date(year, 0, 1);
        const pastDaysOfYear = (d.getTime() - startOfYear.getTime()) / 86400000;
        const week = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
        return `${year}-W${week}`;
    }
}
