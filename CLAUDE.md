@AGENTS.md

# Claude Code 행동 규칙

## 기본 원칙

모르거나 불확실한 부분은 추측하지 말고 반드시 질문할 것.
확인되지 않은 가정으로 진행하지 않는다. (ReAct 패턴)

## 구현 순서

1. 타입/인터페이스 뼈대 먼저 제안
2. 승인 후 구현 진행
3. 구현 완료 후 엣지케이스 스스로 체크 후 보고

## 코드 작성 규칙

- 컴포넌트는 반드시 named export
- props 타입은 컴포넌트 파일 상단에 별도 타입으로 정의
- async 함수는 반드시 try/catch 포함
- Zod 스키마는 types/ 가 아닌 해당 기능 폴더 안에 위치

## 컴포넌트 구현 규칙

- 토큰 사용 시 Tailwind arbitrary value: className="bg-[var(--color-btn-primary-fill)]"
- 버튼 높이는 --size-height-* 토큰 참조
- 버튼 radius는 --radius-medium1 기준
- hover/pressed/disabled 상태 반드시 구현 (토큰에 상태별 컬러 정의돼있음)

## 커밋 메시지 형식

feat: 이미지 생성 탭 UI 추가
fix: 무드 메타데이터 저장 오류 수정
refactor: Konva 레이어 구조 개선
chore: 환경변수 설정 추가
style: Button 컴포넌트 hover 스타일 수정

## 금지 행동

- 브랜드 관련 상수값 임의 수정
- 기존 타입 구조 무단 변경
- 주석 없는 복잡한 로직 작성
- 테스트 없이 핵심 유틸 함수 수정 제안

## 참고

공통 규칙은 AGENTS.md 참조.
