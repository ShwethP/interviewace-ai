import { ai } from "./client";
import { buildInterviewPrompt } from "./prompt";
import { buildResumeInterviewPrompt } from "./resumeInterviewPrompt";
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

async function requestQuestions(
    prompt: string
): Promise<InterviewResponse> {

    for (let i = 0; i < 3; i++) {
        try {
            const response = await ai.chat.completions.create({
                model: "openrouter/free",

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

export async function generateQuestions(
    data: GenerateInput
): Promise<InterviewResponse> {

    return requestQuestions(buildInterviewPrompt(data));
}

export async function generateResumeQuestions(data: {
    resumeText: string;
    jobDescription?: string | null;
    strengths: string[];
    improvements: string[];
    missingSkills: string[];
    interviewPreparation: string[];
    likelyQuestions: string[];
}): Promise<InterviewResponse> {

    const prompt = buildResumeInterviewPrompt(data);

    return requestQuestions(prompt);
}