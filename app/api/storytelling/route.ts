import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { name, year, occupation } = await req.json();

        if (!name || !year || !occupation) {
            return NextResponse.json({ error: 'Missing information' }, { status: 400 });
        }

        const prompt = `
      유저 이름: ${name}
      출생 연도: ${year}
      전생 직업/신분: ${occupation}

      위 정보를 바탕으로 이 사람의 전생 이야기를 텍스트로 들려주세요. 
      분위기는 신비롭고 몰입감 있어야 합니다. 
      너무 길지 않게 3~4문장 정도로 한국어로 작성해주세요.
      "당신은 전생에..." 로 시작하지 말고, 그 시대의 배경과 삶의 한 장면을 묘사하듯이 써주세요.
    `;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.8,
        });

        const story = response.choices[0].message.content;

        return NextResponse.json({ story });
    } catch (error) {
        console.error('Error with OpenAI:', error);
        return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
    }
}
