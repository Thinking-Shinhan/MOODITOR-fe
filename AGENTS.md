<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 에이븐 스튜디오 - AI Agent 가이드

## 프로젝트 개요

에이븐(Aven) 브랜드의 AI 기반 콘텐츠 제작 도구.
핵심 가치: 누가 만들어도 에이븐다운 무드가 유지되는 콘텐츠 생성.
운영사: 쿨베어스(Coolbears)

## 기술 스택

- Next.js 16 + TypeScript (strict mode)
- Tailwind CSS v4
- App Router (Pages Router 사용 금지)
- Konva / react-konva (캔버스 에디터)
- TanStack Query (서버 상태)
- Zustand (클라이언트 상태)
- React Hook Form + Zod (폼 유효성 검사)

## 폴더 구조

src/
app/ # Next.js App Router (케밥케이스)
components/
commons/ # 공통 컴포넌트 (PascalCase)
features/ # 기능별 컴포넌트 (폴더 kebab-case, 파일 PascalCase)
hooks/ # 커스텀 훅 (use+PascalCase.ts)
libs/ # 인프라성 코드 (apiClient, konva 설정 등)
services/ # API 호출 함수 (brandService, imageService 등)
stores/ # Zustand 스토어 (camelCase+Store.ts)
constants/ # 상수값 (브랜드 메타데이터 키, API 엔드포인트 등)
config/ # 환경변수 래핑, 앱 설정값
styles/ # 전역 CSS, 폰트
types/ # 타입, 인터페이스 정의
utils/ # 유틸 함수

## 네이밍 규칙

- app/ 내부 폴더: kebab-case (ex. brand-analysis)
- 컴포넌트 파일: PascalCase (ex. BrandMoodCard.tsx)
- 훅 파일: use+PascalCase (ex. useBrandMetadata.ts)
- 서비스/유틸 파일: camelCase (ex. brandService.ts)
- 스토어 파일: camelCase+Store.ts (ex. brandStore.ts)
- 타입/상수 파일: 소문자 (ex. brand.ts)

## 절대 금지

- `any` 타입 사용 금지
- 에러 처리 없는 async 함수 금지
- 인라인 스타일 사용 금지 (Tailwind 클래스만 사용)
- 브랜드 컬러값 하드코딩 금지 (반드시 Tailwind 토큰 사용)
- Pages Router 사용 금지
- named export 외 default export 금지 (app/ 디렉토리 제외)

## API 호출 규칙

- 모든 API 호출은 src/libs/apiClient.ts 를 통해서만
- 서버 상태는 TanStack Query로 관리
- 직접 fetch/axios 호출 금지 (services/ 레이어 반드시 거칠 것)

## 브랜드 관련 규칙

- 브랜드 메타데이터 스키마 변경 시 임의 수정 금지
- 브랜드 컬러, 카메라 설정값, 조명 디스크립터 임의 변경 금지
- eco/outdoor 관련 언어 사용 금지 (에이븐 브랜드 방향과 맞지 않음)
