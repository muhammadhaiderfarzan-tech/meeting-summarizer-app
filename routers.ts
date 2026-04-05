import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  summarizer: router({
    summarize: publicProcedure
      .input(
        z.object({
          transcript: z.string().min(1, "Transcript cannot be empty"),
        })
      )
      .mutation(async ({ input }) => {
        const { transcript } = input;

        try {
          const systemPrompt = `You are an expert at analyzing student lecture notes and meeting transcripts.
Your task is to extract and organize information into four categories:
1. Summary: 5-7 bullet points of key topics
2. Assignments: List of tasks with due dates
3. Exams: Upcoming exams/tests with prep notes
4. Action Items: Prioritized to-do items

Return ONLY valid JSON matching this exact structure:
{
  "summary": ["bullet 1", "bullet 2"],
  "assignments": [{"task": "description", "due_date": "date", "details": "optional"}],
  "exams": [{"exam": "name", "date": "date", "prep_notes": "optional"}],
  "actionItems": [{"text": "action", "priority": "High", "assignee": "optional"}],
  "detectedDates": ["date1"]
}`;

          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: `Please analyze this transcript and extract all relevant information:\n\n${transcript}`,
              },
            ],
            response_format: {
              type: "json_object",
            },
          });

          const content = response.choices[0].message.content;
          const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
          const result = JSON.parse(contentStr);

          return {
            success: true,
            data: result as any,
          };
        } catch (error) {
          console.error("Summarization error:", error);
          throw new Error(
            `Failed to summarize transcript: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
