import { z } from "zod";

export const CopilotSettingsSchema = z.object({
	tone: z.enum(["professional", "balanced", "friendly"]),
	temperature: z.number().min(0).max(2).default(0.7),
	topP: z.number().min(0).max(1).default(0.9),
	topK: z.number().int().min(1).max(100).default(40),
	maxTokens: z.number().int().min(256).max(4096).default(2048),
	presencePenalty: z.number().min(-2).max(2).default(0),
	frequencyPenalty: z.number().min(-2).max(2).default(0),
	show_intermediate_steps: z.boolean().optional(),
});

export type CopilotSettings = z.infer<typeof CopilotSettingsSchema>;

// Partial schema for updating settings
export const CopilotSettingsUpdateSchema = CopilotSettingsSchema.partial();
export type CopilotSettingsUpdate = z.infer<typeof CopilotSettingsUpdateSchema>;
