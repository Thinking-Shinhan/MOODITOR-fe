<div align="center">
<img width="1920" height="1080" alt="무디터 표지" src="https://github.com/user-attachments/assets/9d3076a0-1287-4406-a5fa-cc8360edfb89" />

`EDIT THE MOOD`

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Konva](https://img.shields.io/badge/Konva-Canvas-0D83CD)](https://konvajs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-state-brown)](https://github.com/pmndrs/zustand)

🏆 신한 스퀘어브릿지 청년 해커톤 3기 **혁신상**

[🔗 배포 링크](https://aven-frontend-kmlplxyt3q-du.a.run.app) · [📑 발표 자료](https://drive.google.com/file/d/1r2HfghPLR_nrINm06LYq8mFMK5qMeubu/view?usp=drive_link)

</div>

<br />

## 프로젝트 소개

**MOODITOR**는 신한 스퀘어브릿지 청년 해커톤 3기(x Coolbears)에서 4인 팀 **씽킹(Thinking)** 이 6주간 기획부터 개발까지 진행한 프로젝트입니다. (**혁신상 수상**)
친환경 패션테크 기업 쿨베어스의 스포츠웨어 브랜드 **에이븐(aven)** 을 대상으로, 온라인 쇼핑몰 운영자가 반복적으로 겪는 콘텐츠 제작 문제를 해결하기 위해 만들었습니다.

기업 인터뷰와 유저 리서치(온라인 의류 구매자 126명 설문)를 통해 확인한 핵심 문제는 **"AI로 이미지는 쉽게 만들 수 있어도, 브랜드다운 일관성은 유지하기 어렵다"** 는 점이었습니다. MOODITOR는 이 문제를 아래 3가지 방향으로 풀었습니다.

| 문제                                                     | 해결                                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 모델 섭외-촬영-편집까지 1~2개월이 걸리는 콘텐츠 제작     | AI 이미지 생성으로 다양한 콘텐츠를 빠르게 제작                                   |
| AI 결과물에 브랜드 아이덴티티가 일관적으로 반영되지 않음 | 브랜드 홈페이지·자료를 분석해 도출한 **브랜드 무드**를 모든 생성 과정에 반영     |
| 이미지 생성과 상세페이지 편집이 분리되어 반복 작업 발생  | 상품 연동 → 무드 분석 → 이미지 생성 → 상세페이지 제작을 하나의 워크플로우로 통합 |

> 이 레포지토리는 **프론트엔드**를 담당합니다. AI 이미지 생성·브랜드 무드 분석 등 서버 로직은 별도 백엔드(Spring Boot)에서 처리하며, 본 문서는 프론트엔드 관점에서 구현한 내용 위주로 작성했습니다.

<br />

## 핵심 기능

### 1. 브랜드 무드 분석

https://github.com/user-attachments/assets/c097e23a-f87f-4218-8dad-fd7d4c837b1d

웹사이트 링크와 브랜드 자료를 입력하면 톤·색온도·채도·대비·조명·질감·배경무드·구도 8개 요소를 구조화해, 48,384개 조합 중 브랜드에 최적화된 무드 조합을 도출합니다. 분석 결과는 이후 모든 이미지 생성 요청에 자동으로 반영됩니다.

### 2. 상품 연동 (Google Sheets)

https://github.com/user-attachments/assets/796e6382-98e6-4634-8ba2-713da7e4aecb

구글 시트 링크를 연결하면 상품 코드·소재·사이즈·실측 정보가 주기적으로 동기화되어, 반복 입력 없이 최신 상품 정보로 콘텐츠를 생성할 수 있습니다.

### 3. 모델컷 생성

https://github.com/user-attachments/assets/d085e47c-7ca7-4202-9653-ecac2c962d18

모델·배경·포즈를 선택하면 브랜드 무드에 맞는 모델컷이 생성됩니다. 모델의 신체 스펙과 의류 실측값을 함께 반영해 핏과 실루엣의 정확도를 높였고, 한 번에 최대 4장을 동시 생성해 결과를 빠르게 비교할 수 있습니다.

### 4. 제품컷 생성

https://github.com/user-attachments/assets/994dfd70-6a77-4061-b4fe-7ddbd500c597

상품 앞·뒷면 이미지를 첨부하고 제품 구도·배경·색온도를 선택하면, 상품의 실제 색상·로고·소재·실루엣을 유지한 채로 이미지가 생성됩니다.

### 5. 상세페이지 - 편집 (템플릿 배치)

https://github.com/user-attachments/assets/5d801302-1942-4fe5-8247-e882773e315f

Konva 기반 캔버스 에디터입니다. 템플릿(배경 + 이미지 슬롯 + 텍스트)을 좌측 패널에서 드래그앤드롭으로 캔버스에 배치하고, 순서 변경·삭제·줌·텍스트 인라인 편집을 지원합니다.

### 6. 상세페이지 - AI 자동배치

https://github.com/user-attachments/assets/d0025152-c026-40cf-93e1-b1030b69606d

클릭 한 번으로 AI가 이미지 배치부터 문구 생성까지 전체(또는 선택한 템플릿 단위로) 자동으로 채웁니다. 일부만 채워져 온 경우에도 완료된 부분은 그대로 반영되어 이어서 수정할 수 있습니다.

### 7. 상세페이지 - AI 문구 검수

https://github.com/user-attachments/assets/c8d4305b-f10c-4ecd-8092-810c27964313

상품-이미지 일치성, 근거 없는 표현, 페이지 맥락 일관성, 브랜드 적합성 4가지 기준으로 상세페이지 문구를 점검하고 수정안까지 제안합니다.

### 8. 상세페이지 - 미리보기 / 저장 / 내보내기

https://github.com/user-attachments/assets/ce7cc9da-b0c8-4696-ac81-832472bec590

완성된 상세페이지를 미리보기로 확인하고, 라이브러리에 저장하거나 이미지로 내보내 실제 쇼핑몰에 바로 등록할 수 있습니다.

### 9. 라이브러리

https://github.com/user-attachments/assets/66fa7352-af5e-4763-acda-3ff7f05fb39b

생성된 모든 이미지·상세페이지를 한곳에서 관리하고, 좋아요 표시한 이미지를 자동배치에 우선 활용합니다.

<br />

## 기술적으로 신경 쓴 부분

프론트엔드에서 마주친 문제와 해결 방식 위주로 정리했습니다.

<details>
<summary><b>캔버스 드래그앤드롭 이원화 (네이티브 DnD + dnd-kit)</b></summary>
<br />

캔버스 에디터엔 성격이 다른 두 드래그가 있습니다. **패널 → 캔버스로 새 템플릿을 놓는 것**은 서로 다른 컴포넌트 트리 간 단발성 전달이라 네이티브 HTML5 Drag&Drop을, **이미 놓인 블록끼리 순서를 바꾸는 것**은 실시간 정렬 애니메이션·충돌 판정이 필요해 `@dnd-kit`을 택해 두 시스템을 병행했습니다.

여기에 더해, Konva 도형은 HTML5 드롭 이벤트를 받지 못하기 때문에 이미지를 슬롯에 드롭하는 흐름은 Stage의 DOM 컨테이너에 직접 리스너를 걸고, 포인터 좌표를 Stage 상대 좌표로 변환한 뒤 `getIntersection`으로 히트테스트해 어떤 슬롯에 놓였는지 판별했습니다. 파일 드래그와 템플릿 드래그가 같은 `dragover` 이벤트를 공유하는 문제는 `dataTransfer.types`에 템플릿 드래그용 커스텀 시그니처를 심어 구분했습니다.

</details>

<details>
<summary><b>블록별 독립 Stage + 내보내기 시점 재조합</b></summary>
<br />

상세페이지 전체를 하나의 Konva Stage로 그리는 대신, 템플릿 블록마다 별도의 Stage로 분리해 렌더링했습니다. 편집 중엔 재정렬·삭제·높이 재계산을 블록 단위로 격리해 단순하게 처리할 수 있기 때문입니다.

대신 이미지로 내보낼 땐 경계 없는 하나의 이미지여야 하므로, 전역 레지스트리에 각 Stage 참조를 모아두고 `toCanvas()` 결과를 순서대로 이어붙여 하나의 연속된 이미지로 합성하는 구조를 설계했습니다.

</details>

<details>
<summary><b>Konva 좌표계 ↔ DOM 좌표계 변환 (캔버스 줌 + 텍스트 편집)</b></summary>
<br />

캔버스에 줌 기능을 추가한 뒤, 텍스트를 인라인으로 편집할 때 사용하는 DOM `<textarea>` 오버레이 위치가 실제 텍스트와 어긋나는 문제가 있었습니다. Konva 내부 좌표계와 브라우저 픽셀 좌표계가 서로 다르고, 여기에 줌 배율까지 반영해야 정확한 위치를 계산할 수 있었습니다.

`textNode.absolutePosition()` 값에 줌 스케일을 곱해 화면 좌표를 역산하고, 뷰포트 오프셋·스크롤량까지 더해 보정했습니다. 폰트 크기도 동일한 비율로 스케일링해, 어떤 줌 배율·스크롤 위치에서도 편집 UI가 실제 텍스트 위치와 정확히 일치합니다.

</details>

<details>
<summary><b>object-fit: cover 직접 구현 (이미지 슬롯 크롭)</b></summary>
<br />

Konva의 `Image`는 CSS `object-fit`을 지원하지 않아, 이미지 원본 비율과 슬롯 비율을 비교해 크롭 좌표(x, y, width, height)를 직접 계산하는 로직을 구현했습니다.

</details>

<details>
<summary><b>TanStack Query 낙관적 업데이트 + 화면 간 캐시 정합성</b></summary>
<br />

좋아요·삭제 등 여러 뮤테이션에 스냅샷 → 즉시 반영 → 실패 시 롤백 → 재검증 패턴을 공통 팩토리로 묶어 적용했습니다.

이후 같은 좋아요 API를 쓰는 두 화면(라이브러리 / 이미지 생성 결과)이 서로 다른 상태 관리 방식(쿼리 캐시 vs 로컬 state)을 써서 화면 간 좋아요 상태가 어긋나는 문제와, 연속 클릭 시 뮤테이션끼리 롤백을 덮어쓸 수 있는 레이스를 발견해 각각 캐시 무효화·항목 단위 잠금으로 방어했습니다.

</details>

<details>
<summary><b>호버 기반 예측 프리패치</b></summary>
<br />

사이드바 메뉴에 마우스를 올리는 시점을 "다음 화면으로 이동하려는 의도" 신호로 삼아, 해당 화면의 데이터를 미리 요청하도록 했습니다. 프리패치에 쓰는 쿼리 키를 실제 화면에서 쓰는 쿼리 키와 정확히 일치시켜, 이동 시 로딩 없이 캐시된 데이터가 바로 표시됩니다. 홈 진입 직후 인증 확인과 동시에도 같은 프리패치를 한 번 실행해 세션 초반 화면 전환을 매끄럽게 했습니다.

</details>

<details>
<summary><b>로딩 진행률 UX (즉시완료 vs 폴링, 두 시나리오 분리)</b></summary>
<br />

이미지 생성/자동배치는 처리 시간이 일정하지 않아, 실제 진행률만 보여주면 로딩이 멈춰 있는 것처럼 보이는 문제가 있었습니다.

- **진행률 신호가 없는 작업**(자동배치, 브랜드 무드 분석): 체감 진행률을 조금씩 증가시키되 90%에서 멈추고, 완료 전엔 100%를 보여주지 않아 "가짜 완료"를 피했습니다.
- **폴링으로 실제 진행률이 들어오는 작업**(이미지 생성): 2초 간격 폴링 사이의 끊김을 보간용 값으로 메우되, 실제 값이 도착하면 그쪽이 즉시 우선권을 갖도록(`Math.max`) 해 역행 없이 이어지게 했습니다.

</details>

<br />

## 기술 스택

**Core**
`Next.js 16 (App Router)` · `TypeScript (strict)` · `Tailwind CSS v4`

**Canvas / Editor**
`Konva` · `react-konva` · `@dnd-kit`

**State / Data**
`TanStack Query` · `Zustand` · `React Hook Form` · `Zod`

**Infra**
`Docker` · `GitHub Actions` · `GCP Cloud Run`

<br />

## 폴더 구조

```
src/
├─ app/                  # Next.js App Router (라우트 단위)
├─ components/
│  ├─ commons/           # 공통 컴포넌트 (Button, Modal, Toast, ProgressRing 등)
│  └─ features/          # 기능별 컴포넌트 (캔버스 에디터, 이미지 생성, 라이브러리 등)
├─ hooks/                # 커스텀 훅 (뮤테이션/쿼리, 로딩 진행률 등)
├─ libs/                 # apiClient 등 인프라성 코드
├─ services/             # API 호출 함수
├─ stores/               # Zustand 스토어
├─ constants/            # 상수
├─ config/               # 환경변수 래핑
├─ types/                # 타입 정의
└─ utils/                # 유틸 함수
```

<br />

## Getting Started

```bash
npm install

# .env.local
NEXT_PUBLIC_API_BASE_URL=<백엔드 API 주소>

npm run dev
```

<br />

## Team 씽킹 (Thinking)

신한 스퀘어브릿지 청년 해커톤 3기 x Coolbears

| Frontend | Backend | Backend | UX/UI Design |
| :------: | :-----: | :-----: | :----------: |
|  강은우  | 김형주  | 이다은  |    김유희    |

**강은우 (Frontend, 본인)** — 상세페이지 캔버스 에디터, AI 이미지 생성 플로우, 상품/라이브러리 관리 등 서비스 전 영역의 UI 설계·구현·API 연동
