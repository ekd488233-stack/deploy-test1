# Past Life Microservice

당신의 이름을 입력하면 전생의 직업과 연대, 그리고 그 시절의 숨겨진 이야기를 들려주는 마이크로서비스입니다.

## 주요 기능
- **300가지 전생**: 역사 속의 다양한 직업, 영적인 존재, 동식물을 포함한 방대한 데이터베이스.
- **연대 생성**: 기원전 30,000년부터 서기 2,000년까지의 랜덤 출생 연도.
- **AI 스토리텔링**: OpenAI GPT-3.5를 활용하여 이름과 전생에 걸맞은 몰입감 있는 이야기 생성.
- **프리미엄 UI**: Glassmorphism과 Mystical Gradient를 적용한 세련된 다크 모드 디자인.

## 로컬 실행 방법
1. Node.js가 설치되어 있어야 합니다.
2. 프로젝트 루트 폴더에서 의존성을 설치합니다:
   ```bash
   npm install
   ```
3. `.env` 파일에 `OPENAI_API_KEY`가 올바른지 확인합니다.
4. 개발 서버를 실행합니다:
   ```bash
   npm run dev
   ```
5. 브라우저에서 `http://localhost:3000`에 접속합니다.

## Vercel 배포 방법
1. GitHub 저장소에 코드를 푸시합니다.
2. [Vercel](https://vercel.com)에 로그인 후 "New Project"를 선택합니다.
3. 저장소를 연결합니다.
4. **Environment Variables** 설정 섹션에서 `OPENAI_API_KEY`를 추가합니다.
5. "Deploy" 버튼을 클릭하면 배포가 완료됩니다.
