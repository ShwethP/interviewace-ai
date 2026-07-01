import { ai } from "./client";
import { buildResumePrompt } from "./resumePrompt";
import { ResumeResponse, ResumeSchema } from "./resumeSchema";

export async function evaluateResume(
    resumeText: string,
    jobDescription?: string
): Promise<ResumeResponse> {

    const prompt = buildResumePrompt(
        resumeText,
        jobDescription
    );

    const response = await ai.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        response_format: {
            type: "json_object",
        },
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const content = response.choices[0].message.content ?? "";
    console.log("content from openAI resume ...****************", content);

    const match = content.match(/\{[\s\S]*\}/);

    if (!match) {
        throw new Error("AI did not return valid JSON");
    }

    const json = JSON.parse(match[0]);

    console.log("JSON FROM AI");
    console.dir(json, { depth: null });

    const normalized = {
        atsScore: json.atsScore ?? 0,

        jobMatchScore: json.jobMatchScore ?? 0,

        shortlistChance: json.shortlistChance ?? 0,

        strengths: json.strengths ?? [],

        improvements: json.improvements ?? [],

        missingSkills: json.missingSkills ?? [],

        interviewPreparation: json.interviewPreparation ?? [],

        likelyQuestions: json.likelyQuestions ?? [],

        recruiterSummary: json.recruiterSummary ?? "",

    };

    const parsed = ResumeSchema.parse(normalized);

    return parsed;
}