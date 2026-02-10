"use client";

import { useState } from 'react';
import pastLivesData from '@/data/past_lives.json';

export default function Home() {
    const [name, setName] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const findPastLife = async () => {
        if (!name.trim()) return;

        setLoading(true);
        try {
            // 1. Randomly pick occupation from 300 lives
            const lives = pastLivesData.past_lives;
            const occupation = lives[Math.floor(Math.random() * lives.length)];

            // 2. Randomly pick birth year between BC 30,000 and AD 2,000
            const year = Math.floor(Math.random() * (2000 - (-30000) + 1)) + (-30000);
            const yearStr = year < 0 ? `기원전 ${Math.abs(year)}년` : `서기 ${year}년`;

            // 3. Get story from API
            const response = await fetch('/api/storytelling', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, year: yearStr, occupation }),
            });

            const data = await response.json();

            setResult({
                occupation,
                year: yearStr,
                story: data.story || '전생의 기억을 불러오는 데 실패했습니다.',
            });
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
            <div className="w-full max-w-2xl glass-morphism p-8 rounded-2xl text-center space-y-8">
                <h1 className="text-4xl font-bold glow-text mb-2">당신의 전생은 무엇이었나요?</h1>
                <p className="text-gray-400">이름을 입력하고 시간을 거슬러 올라가 보세요.</p>

                <div className="flex flex-col items-center gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름을 입력하세요"
                        className="w-full max-w-md p-4 bg-white/10 rounded-lg border border-white/20 text-center text-xl focus:border-purple-500 transition-all"
                    />
                    <button
                        onClick={findPastLife}
                        disabled={loading || !name}
                        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-xl font-semibold mystical-gradient disabled:opacity-50"
                    >
                        {loading ? '영혼을 탐색 중...' : '전생 확인하기'}
                    </button>
                </div>

                {result && (
                    <div className="mt-12 p-6 border-t border-white/10 animate-fade-in space-y-4">
                        <h2 className="text-2xl font-semibold text-purple-300">
                            {name}님, 당신은 전생에 <span className="text-white">[{result.occupation}]</span>이었습니다.
                        </h2>
                        <p className="text-lg text-gray-400">출생 연대: {result.year}</p>
                        <div className="p-6 bg-white/5 rounded-xl italic text-gray-200 leading-relaxed text-lg">
                            "{result.story}"
                        </div>
                        <button
                            onClick={() => { setName(''); setResult(null); }}
                            className="mt-4 text-sm text-gray-500 hover:text-white underline"
                        >
                            다시 확인하기
                        </button>
                    </div>
                )}
            </div>

            <footer className="mt-8 text-gray-600 text-sm">
                Vercel Deployment Initial Version
            </footer>
        </main>
    );
}
