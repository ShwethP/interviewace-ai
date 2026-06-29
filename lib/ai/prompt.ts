interface PromptInput {
    company: string;
    role: string;
    experience: number;
    difficulty: string;
    interviewType: string;
    techStack: string;
}

export function buildInterviewPrompt(data: PromptInput) {
    return `
You are a senior software engineering interviewer.

Generate exactly 10 interview questions.

Candidate Details:

Company: ${data.company}
Role: ${data.role}
Experience: ${data.experience}
Difficulty: ${data.difficulty}
Interview Type: ${data.interviewType}
Tech Stack: ${data.techStack}

Return ONLY valid JSON.

Use this format:

{
  "questions":[
    {
      "question":"",
      "category":"",
      "difficulty":""
    }
  ]
}
`;
}