import { COOKIE_NAME } from "@shared/const";
import { Resend } from "resend";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const resend = new Resend(process.env.RESEND_API_KEY);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          role: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const roleLabels: Record<string, string> = {
          agent: "סוכן ביטוח עצמאי",
          agency_owner: "בעלים / מנהל סוכנות",
          employee: "עובד סוכנות",
          consultant: "יועץ ביטוח",
          other: "אחר",
        };
        const roleLabel = input.role ? (roleLabels[input.role] ?? input.role) : "לא צוין";

        const html = `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8f9fa; border-radius: 8px;">
            <h2 style="color: #1a2744; margin-bottom: 4px;">בקשת הצטרפות לפיילוט — Verra</h2>
            <p style="color: #64748b; margin-top: 0; margin-bottom: 24px; font-size: 14px;">התקבלה בקשה חדשה דרך טופס האתר</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 12px; background: #fff; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1a2744; width: 120px;">שם</td>
                <td style="padding: 10px 12px; background: #fff; border-bottom: 1px solid #e2e8f0; color: #334155;">${input.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; background: #f8f9fa; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1a2744;">אימייל</td>
                <td style="padding: 10px 12px; background: #f8f9fa; border-bottom: 1px solid #e2e8f0; color: #334155;"><a href="mailto:${input.email}" style="color: #1a2744;">${input.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; background: #fff; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1a2744;">תפקיד</td>
                <td style="padding: 10px 12px; background: #fff; border-bottom: 1px solid #e2e8f0; color: #334155;">${roleLabel}</td>
              </tr>
              ${input.message ? `
              <tr>
                <td style="padding: 10px 12px; background: #f8f9fa; font-weight: bold; color: #1a2744; vertical-align: top;">הערות</td>
                <td style="padding: 10px 12px; background: #f8f9fa; color: #334155; white-space: pre-wrap;">${input.message}</td>
              </tr>` : ""}
            </table>
            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">נשלח מ-askverra.ai</p>
          </div>
        `;

        const { error } = await resend.emails.send({
          from: "Verra Pilot <onboarding@resend.dev>",
          to: ["info@askverra.com"],
          replyTo: input.email,
          subject: `בקשת פיילוט חדשה מ-${input.name}`,
          html,
        });

        if (error) {
          console.error("[Resend] Failed to send email:", error);
          throw new Error("שגיאה בשליחת הטופס. נסה שוב מאוחר יותר.");
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
