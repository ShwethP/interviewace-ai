import { ai } from "./client";
import { buildEvaluationPrompt } from "./evaluatePrompt";
import {
    EvaluationResponse,
    EvaluationResponseSchema,
} from "./evaluationSchema";

interface EvaluationInput {
    company: string;
    role: string;
    interviewType: string;
    difficulty: string;
    questions: {
        id: string;
        question: string;
        answer: string;
    }[];
}

export async function evaluateInterview(
    data: EvaluationInput
): Promise<EvaluationResponse> {

    const prompt = buildEvaluationPrompt(data);

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

    return EvaluationResponseSchema.parse(json);
}