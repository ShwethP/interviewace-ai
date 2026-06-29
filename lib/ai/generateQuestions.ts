import { ai } from "./client";
import { buildInterviewPrompt } from "./prompt";
import {
    InterviewResponse,
    InterviewResponseSchema,
} from "./schema";

interface GenerateInput {
    company: string;
    role: string;
    experience: number;
    difficulty: string;
    interviewType: string;
    techStack: string;
}

export async function generateQuestions(
    data: GenerateInput
): Promise<InterviewResponse> {

    const prompt = buildInterviewPrompt(data);

    for (let i = 0; i < 3; i++) {
        try {
            const response = await ai.chat.completions.create({
                model: "openai/gpt-oss-20b:free",

                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],

                response_format: {
                    type: "json_object",
                },
            });

            const json = JSON.parse(
                response.choices[0].message.content!
            );

            return InterviewResponseSchema.parse(json);

        } catch (error) {
            if (i === 2) throw error;

            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
        }
    }

    throw new Error("Unable to generate interview.");
}