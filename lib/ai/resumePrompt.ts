export function buildResumePrompt(resumeText: string) {

    return `
You are an expert ATS resume reviewer.

Analyze the resume and return ONLY valid JSON.

{
  "atsScore": 0-100,
  "strengths": [
    "..."
  ],
  "improvements": [
    "..."
  ],
  "missingSkills": [
    "..."
  ],
  "overallFeedback": "..."
}

Resume:

${resumeText}`;

}