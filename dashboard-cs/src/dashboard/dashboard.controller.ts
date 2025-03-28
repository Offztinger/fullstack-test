// src/dashboard/dashboard.controller.ts
import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/types/request-with-user';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('export')
  async exportDashboardData(@Req() req: RequestWithUser, @Res() res: Response) {
    const data = await this.dashboardService.getFullReport(req.user.id);

    res.setHeader('Content-Disposition', 'attachment; filename="dashboard_report.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 2));
  }

  @Get('summary')
  getSummary(@Req() req: RequestWithUser) {
    return this.dashboardService.getSummary(req.user.id);
  }

  @Get('abandonment-rate')
  getAbandonmentRate(@Req() req: RequestWithUser) {
    return this.dashboardService.getAbandonmentRate(req.user.id);
  }

  @Get('productivity-by-day')
  getProductivityByDay(@Req() req: RequestWithUser) {
    return this.dashboardService.getProductivityByDay(req.user.id);
  }

  @Get('category-average')
  getTasksByCategory(@Req() req: RequestWithUser) {
    return this.dashboardService.getTasksByCategory(req.user.id);
  }

  @Get('average-completion')
  getAverageCompletionTime(@Req() req: RequestWithUser) {
    return this.dashboardService.getAverageCompletionTime(req.user.id);
  }

  @Get('completion-rate')
  getCompletionRate(@Req() req: RequestWithUser) {
    return this.dashboardService.getCompletionRate(req.user.id);
  }

  @Get('productivity-trend')
  getTrend(@Req() req: RequestWithUser) {
    return this.dashboardService.getWeeklyTrend(req.user.id);
  }
}
