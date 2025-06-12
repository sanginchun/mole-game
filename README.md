# 두더지 게임

## 기술 스택

- React v19
- React-Router
- Sass
- Zustand
- Immer

## 개발 환경

- vite
- eslint
- prettier

## 실행 방법

### 패키지 설치 및 개발 서버 실행

필요시 [pnpm 설치](https://pnpm.io/installation) 후,

```bash
# 의존성 설치
pnpm install

# 개발서버 실행
pnpm dev
```

### 빌드

```bash
# 빌드
pnpm build

# 빌드 결과물 실행
pnpm preview
```

## 프로젝트 구조

```
src/
├── assets/             # 정적 리소스
├── configs/            # UI 사용자 설정값 관련 상수
├── hooks/
│   └── useMoleGame.ts  # 게임 로직과 리액트 연결 훅
├── screens/            # 페이지 각각에 컴포넌트 및 스타일링
│   ├── layout/         # 공통 레이아웃
│   ├── Settings/       # 시작 화면
│   ├── Play/           # 게임 화면
│   ├── Result/         # 결과 화면
│   └── Scoreboard/     # 순위 화면
├── services/
│   └── MoleGame.ts     # 비즈니스(게임) 로직
├── store/              # 전역 상태 관리
│   ├── game-result.ts
│   └── game-setting.ts
├── styles/             # 전역 스타일
└── utils/              # 유틸리티 함수
```

## 성능 개선 노력

- 두더지 애니메이션 transition 속성을 `bottom`에서 `transform`으로 변경하여 Layout Shift를 줄였습니다.
