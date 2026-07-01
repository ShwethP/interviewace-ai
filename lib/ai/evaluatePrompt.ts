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

export function buildEvaluationPrompt(
  data: EvaluationInput
) {
  return `
You are a Senior Software Engineering interviewer.

Evaluate the candidate professionally.

Company:
${data.company}

Role:
${data.role}

Interview Type:
${data.interviewType}

Difficulty:
${data.difficulty}

You MUST evaluate every question.

Each question contains an "id".

IMPORTANT:

You MUST return EXACTLY the same "id" as "questionId".

Never invent IDs.

Never change IDs.

For each answer provide:

- questionId
- score (0-10)
- feedback
- idealAnswer

Also provide:

- overallScore (0-100)
- overallFeedback

Return ONLY valid JSON.

Candidate Answers:

${JSON.stringify(data.questions, null, 2)}

Expected JSON format:

{
  "overallScore": 85,
  "overallFeedback": "...",
  "questions": [
    {
      "questionId": "THE EXACT ID PROVIDED ABOVE",
      "score": 8,
      "feedback": "...",
      "idealAnswer": "..."
    }
  ]
}
`;
}