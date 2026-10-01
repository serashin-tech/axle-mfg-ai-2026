---
name: Codepresso Report
description: 코드프레소 보고·발표용 라이트 테마. 흰 캔버스, 코드프레소 블루 한 가지 강조, 오른쪽 회색 띠와 큰 C 모티프.
mode: light
---

# Codepresso Report

착수보고회 템플릿(`착수보고회_AI 활용 가상융합 기술 지원 및 컨설팅_V20260724.pptx`)의 시각 언어를 코드프레소 브랜드 가이드(`codepresso-brand`) 값으로 옮긴 테마입니다. 템플릿과 브랜드 가이드가 다르면 **브랜드 가이드가 우선**합니다.

## Palette

| Role | Value | Notes |
| --- | --- | --- |
| bg | `#FFFFFF` | 캔버스 (Canvas) |
| text | `#0A0B0D` | 제목·강조 본문 (Ink) |
| accent | `#0052FF` | 코드프레소 블루. 제목 핵심어, 번호, 세로선. 페이지당 1~2곳 |
| body | `#5B616E` | 본문 |
| muted | `#7C828A` | 부제, 머리글·바닥글, 캡션 |
| hairline | `#DEE1E6` | 카드·표 1px 테두리 |
| blueSoft | `#E5EDFF` | 강조 카드·Callout 배경, STEP 알약 라벨 |
| band | `#EEF0F3` | 표지·간지 오른쪽 회색 띠 |
| surface | `#F7F7F7` | 표 헤더, 보조 박스 |
| yellow | `#F4B000` | 페이지에서 가장 중요한 한 지점. **글자색 금지**, 보더·밑줄·도형 fill에만 |
| yellowSoft | `#FEF3D6` | Key Card 배경 |

세 번째 강조색을 만들지 않습니다. 긍정·부정 수치는 글자색으로만 `#05B169`·`#CF202F`를 씁니다.

## Typography

- 한글 `Noto Sans KR`, 영문 `Inter`. 스택: `"Inter", "Noto Sans KR", system-ui, sans-serif` (영문·숫자는 Inter, 한글은 Noto Sans KR로 떨어집니다).
- 무게: 본문 400, 강조 500, 헤더 700(한글)·600(영문). 800 이상은 쓰지 않습니다.
- Webfont import: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap` — `slide-authoring/references/webfonts.md` 방식(모듈 최상단, 슬라이드 id로 키)으로 주입합니다.
- **글자 크기 하한**(브랜드 가이드 PPT 기준 본문 18pt·캡션 14pt, 1920 캔버스에서 1pt = 2px):
  - 본문 **36px 이상**, 캡션·라벨·머리글·바닥글 **28px 이상**. 이보다 작은 글자는 쓰지 않습니다. 공간이 모자라면 페이지를 나눕니다.
- Type scale:
  - Hero(표지 제목): 104px / 700 / 1.2
  - 섹션 간지 제목: 88px / 700
  - 페이지 제목: 60px / 700 / 1.25
  - 페이지 부제: 32px / 400 / muted
  - 카드 제목: 40px / 700
  - 본문: 36px / 400 / 1.5
  - 캡션·라벨: 28px / 500
- 한국어 조판: 모든 페이지 루트에 `wordBreak: 'keep-all', overflowWrap: 'break-word', lineBreak: 'strict', textWrap: 'pretty'`, 제목에는 `textWrap: 'balance'`. 관형사·의존명사·수사+단위는 ` `로 뒤 어절에 묶습니다.
- 수치 비교에는 `fontVariantNumeric: 'tabular-nums'`.

## Layout

- 좌우 여백 100px. 머리글 영역: 위에서 56px에 로고(높이 40px), 오른쪽에 섹션 경로. 제목 시작 y = 150px.
- 바닥글: 아래에서 48px, 왼쪽 행사명, 오른쪽 두 자리 페이지 번호.
- 본문 영역: y 330 ~ 980 (650px). 카드 사이 간격 32px.
- 모서리: 카드·박스 8px, 표 외곽 4px, STEP 알약만 999px. 16px 이상 라운드는 쓰지 않습니다.
- 그림자 없음. 테두리 1px hairline으로 구분합니다.
- 페이지 리듬: 본문 페이지는 흰 캔버스, 표지·간지·마무리는 오른쪽 회색 띠 + 파란 세로선 + 큰 C.

## Fixed components

붙여 넣어 쓰는 컴포넌트입니다. `logo`는 `import logo from '@assets/logos/codepresso_logo_primary.png';`로 가져옵니다.

### Header (본문 페이지 머리글)

```tsx
const Header = ({ section, path }: { section: string; path: string }) => (
  <>
    <img src={logo} alt="code.presso" style={{ position: 'absolute', left: 100, top: 56, height: 40 }} />
    <div style={{ position: 'absolute', right: 100, top: 62, fontSize: 28, color: '#7C828A' }}>
      <span style={{ color: '#0052FF', fontWeight: 600 }}>{section}</span> · {path}
    </div>
  </>
);
```

### Title (페이지 제목 + 부제)

핵심어만 `<Em>`으로 파랗게 칠합니다.

```tsx
const Em = ({ children }: { children: ReactNode }) => (
  <span style={{ color: '#0052FF' }}>{children}</span>
);

const Title = ({ children, sub }: { children: ReactNode; sub?: string }) => (
  <div style={{ position: 'absolute', left: 100, right: 100, top: 150 }}>
    <h1 style={{ margin: 0, fontSize: 60, fontWeight: 700, lineHeight: 1.25, color: '#0A0B0D', textWrap: 'balance' }}>
      {children}
    </h1>
    {sub && <p style={{ margin: '20px 0 0', fontSize: 32, color: '#7C828A', lineHeight: 1.4 }}>{sub}</p>}
  </div>
);
```

### Footer

```tsx
const Footer = () => {
  const { current } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 100, right: 100, bottom: 48, display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#7C828A' }}>
      <span>제2회 제조AI 솔루션 공모전 · AXLE</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{String(current).padStart(2, '0')}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 40, fontWeight: 700, color: '#0052FF' }}>{children}</div>
);
```

### SideBand (표지·간지·마무리의 오른쪽 띠)

```tsx
const SideBand = () => (
  <div style={{ position: 'absolute', left: 1620, top: 0, width: 300, height: 1080, background: '#EEF0F3', borderLeft: '6px solid #0052FF', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: -10, top: 540, fontFamily: 'Inter, sans-serif', fontSize: 460, fontWeight: 700, lineHeight: 1, color: '#E5EDFF' }}>C</div>
  </div>
);
```

### Rule (짧은 파란 밑줄)

```tsx
const Rule = () => <div style={{ width: 88, height: 6, background: '#0052FF' }} />;
```

### StepCard (STEP 알약 라벨 카드, 2×3 격자용)

```tsx
const StepCard = ({ step, title, lines, out }: { step: string; title: string; lines: string[]; out?: string }) => (
  <div style={{ border: '1px solid #DEE1E6', borderRadius: 8, padding: '28px 32px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: 14 }}>
    <span style={{ alignSelf: 'flex-start', background: '#E5EDFF', color: '#0052FF', borderRadius: 999, padding: '4px 22px', fontSize: 28, fontWeight: 600 }}>{step}</span>
    <div style={{ fontSize: 40, fontWeight: 700, color: '#0A0B0D' }}>{title}</div>
    {lines.map((l) => <div key={l} style={{ fontSize: 28, color: '#5B616E', lineHeight: 1.45 }}>· {l}</div>)}
    {out && <div style={{ marginTop: 'auto', fontSize: 28, fontWeight: 600, color: '#0052FF' }}>→ {out}</div>}
  </div>
);
```

(`lines`는 순수 텍스트 목록이므로 `map`을 허용합니다. 카드 자체는 페이지에서 `<StepCard />`로 하나씩 씁니다.)

### FlowCard (가로 단계 흐름 카드)

```tsx
const FlowCard = ({ n, title, desc, active }: { n: string; title: string; desc: string; active?: boolean }) => (
  <div style={{ flex: 1, minHeight: 340, borderRadius: 8, padding: '32px 28px', background: active ? '#E5EDFF' : '#FFFFFF', border: active ? 'none' : '1px solid #DEE1E6', display: 'flex', flexDirection: 'column', gap: 20 }}>
    <div style={{ width: 64, height: 64, borderRadius: 999, background: '#0052FF', color: '#FFFFFF', fontSize: 32, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{n}</div>
    <div style={{ fontSize: 36, fontWeight: 700, color: '#0A0B0D', lineHeight: 1.3 }}>{title}</div>
    <div style={{ fontSize: 28, color: '#5B616E', lineHeight: 1.45 }}>{desc}</div>
  </div>
);
const Chevron = () => <div style={{ alignSelf: 'center', fontSize: 40, color: '#0052FF', fontWeight: 700 }}>›</div>;
```

### Callout (하단 강조 박스)

```tsx
const Callout = ({ children, top = 860 }: { children: ReactNode; top?: number }) => (
  <div style={{ position: 'absolute', left: 100, right: 100, top, background: '#E5EDFF', borderLeft: '6px solid #0052FF', borderRadius: 8, padding: '28px 40px', fontSize: 32, color: '#0A0B0D', lineHeight: 1.45 }}>
    {children}
  </div>
);
```

### KeyCard (페이지에서 가장 중요한 한 지점, 덱 전체에 두세 번만)

```tsx
const KeyCard = ({ children }: { children: ReactNode }) => (
  <div style={{ background: '#FEF3D6', borderLeft: '6px solid #F4B000', borderRadius: 8, padding: '28px 40px', fontSize: 36, fontWeight: 500, color: '#0A0B0D' }}>
    {children}
  </div>
);
```

## Motion

- Philosophy: **subtle**. 페이지 전환은 즉시 바꾸고(전환 효과 없음), 순서가 중요한 페이지만 `<Steps>`/`<Step>`으로 한 단계씩 공개합니다. 발표장에서 영상 재생과 겹치지 않도록 반복 애니메이션은 쓰지 않습니다.

## Aesthetic

차분한 기술 컨설팅 보고서입니다. 흰 캔버스, 잉크 블랙 제목, 코드프레소 블루는 핵심어와 번호에만 씁니다. 표지·간지는 오른쪽 회색 띠와 옅은 파란 C로 브랜드를 드러냅니다. 그라데이션, 그림자, 이모지, 아이콘 남발, 16px 이상의 둥근 모서리, 형광색 화살표는 쓰지 않습니다.

## Example usage

```tsx
const Content: Page = () => (
  <div style={{ ...page }}>
    <Header section="02" path="업무를 하는 AI · KMS 추천" />
    <Title sub="담당자는 입력하지 않고 승인만 합니다">일상의 자료가 <Em>AI 추천</Em>으로 바뀝니다</Title>
    <Footer />
  </div>
);
```
