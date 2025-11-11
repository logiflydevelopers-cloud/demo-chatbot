import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple answer generator
export const getAnswerFromOpenAI = async (question, context) => {
  try {
    const prompt = `
You are a helpful chatbot trained on a company's website data.
Use the context below to answer accurately.

CONTEXT:
${context}

QUESTION:
${question}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    return "I'm having trouble fetching an answer right now.";
  }
};
