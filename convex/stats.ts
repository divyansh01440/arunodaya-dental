import { query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export const overview = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);

    const all = await ctx.db.query("appointments").collect();
    const today = isoDate(new Date());
    const sevenDaysAgo = isoDate(new Date(Date.now() - 7 * 86400000));
    const thirtyDaysAgo = isoDate(new Date(Date.now() - 30 * 86400000));
    const fourteenDaysAgo = isoDate(new Date(Date.now() - 14 * 86400000));

    const todayList = all.filter((a) => a.appointmentDate === today);
    const todayConfirmed = todayList.filter((a) => a.status === "confirmed").length;

    // Top services last 30 days
    const recent30 = all.filter((a) => a.appointmentDate >= thirtyDaysAgo);
    const serviceMap: Record<string, number> = {};
    const doctorMap: Record<string, number> = {};
    for (const a of recent30) {
      serviceMap[a.service] = (serviceMap[a.service] || 0) + 1;
      doctorMap[a.doctorName] = (doctorMap[a.doctorName] || 0) + 1;
    }
    const byService = Object.entries(serviceMap)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
    const byDoctor = Object.entries(doctorMap).map(([_id, count]) => ({ _id, count }));

    // 14-day time series
    const seriesMap: Record<string, number> = {};
    for (const a of all) {
      if (a.appointmentDate >= fourteenDaysAgo) {
        seriesMap[a.appointmentDate] = (seriesMap[a.appointmentDate] || 0) + 1;
      }
    }
    const series = Object.entries(seriesMap)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => a._id.localeCompare(b._id));

    // Upcoming
    const upcoming = all
      .filter(
        (a) =>
          a.appointmentDate >= today &&
          (a.status === "pending" || a.status === "confirmed")
      )
      .sort((a, b) => {
        if (a.appointmentDate !== b.appointmentDate) {
          return a.appointmentDate.localeCompare(b.appointmentDate);
        }
        return a.appointmentTime.localeCompare(b.appointmentTime);
      })
      .slice(0, 8);

    return {
      totalAll: all.length,
      todayCount: todayList.length,
      todayConfirmed,
      pending: all.filter((a) => a.status === "pending").length,
      thisWeek: all.filter((a) => a.appointmentDate >= sevenDaysAgo).length,
      thisMonth: all.filter((a) => a.appointmentDate >= thirtyDaysAgo).length,
      cancelledThisMonth: recent30.filter((a) => a.status === "cancelled").length,
      completedThisMonth: recent30.filter((a) => a.status === "completed").length,
      byService,
      byDoctor,
      upcoming,
      series,
    };
  },
});
