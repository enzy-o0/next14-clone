Next 14 학습하기

Next + React Query로 SNS 서비스 만들기

## 시작하기

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 기술 스택
- Next 14
- SCSS

## Next 14 개념 학습
### layout.tsx vs template.tsx
- RootLayout 개념
    - layout.tsx:, 페이지 이동시, 리렌더링 X
    - template.tsx: 페이지 이동시, 리렌더링 O
### next/navigation > redirect 추가
- 간단하게 redirect 가능
### Parallel Routes
- A 페이지 위에, B 페이지 중첩 가능
- 같은 폴더 내에 있어야 함
- 폴더명 앞에 “@” 사용
- 주소창 영향 X
- default.tsx
    - 패러렐 라우트가 필요 없을 때 디폴트 페이지
### 서버 컴포넌트
- 데이터 다룰 때 장점
- 서버 컴포넌트는 클라이언트 컴포넌트를 import 할 수 있으나, 클라이언트 컴포넌트는 서버 컴포넌트를 import 할 수 없음
- 이벤트 핸들러나 use hook 사용 시 대부분 클라이언트 컴포넌트
    - 최상단 'use client' 작성
### 인터셉트 라우팅
- 서로 url 주소가 다르나, 뜰 수 있게 해줌 
-  `(..)i`
    - (..)이나 (.)은 브라우저 주소 기준
    - 해당 주소에 해당하는 부분을 인터셉트함
- 클라이언트에서 라우팅할 때만 인터셉트 라우팅이 적용됨
- 주소창 영향 X
### private folder(_폴더)
- 공통 파일, 폴더 정리용
- 주소창 영향 X
### useSelectedLayoutSegment
- 현재 경로의 최상단 페이지 이름 추출