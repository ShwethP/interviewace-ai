interface ResumeInterviewInput {
    resumeText: string;
    jobDescription?: string | null;
    strengths: string[];
    improvements: string[];
    missingSkills: string[];
    interviewPreparation: string[];
    likelyQuestions: string[];
}

export function buildResumeInterviewPrompt(data: ResumeInterviewInput) {
    return `
You are an experienced technical interviewer.

Generate exactly 10 personalized interview questions.

Use the candidate's resume as the primary source.
Use the job description to understand the target role and its requirements.

CANDIDATE RESUME:
${data.resumeText}

JOB DESCRIPTION:
${data.jobDescription || "No job description provided. Base the interview on the resume."}

RESUME ANALYSIS:

Strengths:
${data.strengths.join(", ")}

Areas for improvement:
${data.improvements.join(", ")}

Missing skills:
${data.missingSkills.join(", ")}

Interview preparation topics:
${data.interviewPreparation.join(", ")}

Previously identified likely questions:
${data.likelyQuestions.join("\n")}

INTERVIEW INSTRUCTIONS:

1. Ask questions about actual projects and technologies mentioned in the resume.
2. Test the candidate's understanding of their claimed experience.
3. When a job description is provided, include questions relevant to its requirements.
4. Test missing job skills without assuming the candidate already knows them.
5. Include practical, scenario-based and technical questions.
6. Avoid simply repeating the likely questions listed above.
7. Make questions appropriate for a software engineering interview.
8. Do not invent experience or projects for the candidate.

Return ONLY valid JSON in this format:

{
  "questions": [
    {
      "question": "",
      "category": "",
      "difficulty": ""
    }
  ]
}
`;
}