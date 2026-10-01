import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import logo from '@assets/logos/codepresso_logo_primary.png';
import icon from './assets/codepresso-icon.png';
import shotBid from './assets/bid-review.jpg';
import shotLlm from './assets/llm-models.jpg';
import shotConnector from './assets/claude-connector.png';

const video1 = new URL('./assets/v1_kms_recommend.mp4', import.meta.url).href;
const video2 = new URL('./assets/v2_bid_review.mp4', import.meta.url).href;
const video3 = new URL('./assets/v3_mcp.mp4', import.meta.url).href;
const video4 = new URL('./assets/v4_multi_llm.mp4', import.meta.url).href;
const video5 = new URL('./assets/v5_prompt_skill.mp4', import.meta.url).href;

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#0A0B0D', accent: '#0052FF' },
  fonts: {
    display: '"Inter", "Noto Sans KR", system-ui, sans-serif',
    body: '"Inter", "Noto Sans KR", system-ui, sans-serif',
  },
  typeScale: { hero: 104, body: 36 },
  radius: 8,
};

// Theme: codepresso-report. Colors outside the DesignSystem shape stay as plain consts.
const c = {
  body: '#5B616E',
  muted: '#7C828A',
  hairline: '#DEE1E6',
  hairlineSoft: '#EEF0F3',
  blueSoft: '#E5EDFF',
  band: '#EEF0F3',
  surface: '#F7F7F7',
  yellow: '#F4B000',
  yellowSoft: '#FEF3D6',
};

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-mfg-ai-contest';
if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
}

const page: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  lineBreak: 'strict',
  textWrap: 'pretty',
  overflow: 'hidden',
};

// ── Theme components (codepresso-report) ──────────────────────────────

const Header = ({ section, path }: { section: string; path: string }) => (
  <>
    <img src={logo} alt="code.presso" style={{ position: 'absolute', left: 100, top: 56, height: 40 }} />
    <div style={{ position: 'absolute', right: 100, top: 62, fontSize: 28, color: c.muted }}>
      <span style={{ color: 'var(--osd-accent)', fontWeight: 600 }}>{section}</span> · {path}
    </div>
  </>
);

const Em = ({ children }: { children: ReactNode }) => (
  <span style={{ color: 'var(--osd-accent)' }}>{children}</span>
);

const Title = ({ children, sub }: { children: ReactNode; sub?: string }) => (
  <div style={{ position: 'absolute', left: 100, right: 100, top: 150 }}>
    <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 60, fontWeight: 700, lineHeight: 1.25, textWrap: 'balance' }}>
      {children}
    </h1>
    {sub && <p style={{ margin: '20px 0 0', fontSize: 32, color: c.muted, lineHeight: 1.4 }}>{sub}</p>}
  </div>
);

const Footer = () => {
  const { current } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 100, right: 100, bottom: 48, display: 'flex', justifyContent: 'space-between', fontSize: 28, color: c.muted }}>
      <span>제2회 제조AI 솔루션 공모전 · AXLE</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{String(current).padStart(2, '0')}</span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--osd-accent)' }}>{children}</div>
);

const SideBand = () => (
  <div style={{ position: 'absolute', left: 1620, top: 0, width: 300, height: 1080, background: c.band, borderLeft: '6px solid var(--osd-accent)', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: -10, top: 540, fontFamily: 'Inter, sans-serif', fontSize: 460, fontWeight: 700, lineHeight: 1, color: c.blueSoft }}>C</div>
  </div>
);

const Rule = () => <div style={{ width: 88, height: 6, background: 'var(--osd-accent)' }} />;

const Pill = ({ children }: { children: ReactNode }) => (
  <span style={{ alignSelf: 'flex-start', background: c.blueSoft, color: 'var(--osd-accent)', borderRadius: 999, padding: '4px 20px', fontSize: 28, fontWeight: 600, whiteSpace: 'nowrap' }}>{children}</span>
);

const Callout = ({ children, top = 860 }: { children: ReactNode; top?: number }) => (
  <div style={{ position: 'absolute', left: 100, right: 100, top, background: c.blueSoft, borderLeft: '6px solid var(--osd-accent)', borderRadius: 'var(--osd-radius)', padding: '26px 40px', fontSize: 32, lineHeight: 1.45 }}>
    {children}
  </div>
);

const InfoCard = ({ label, title, desc, tone = 'plain' }: { label: string; title: string; desc: ReactNode; tone?: 'plain' | 'soft' }) => (
  <div style={{ border: `1px solid ${tone === 'soft' ? c.blueSoft : c.hairline}`, background: tone === 'soft' ? c.blueSoft : '#FFFFFF', borderRadius: 'var(--osd-radius)', padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
    <Pill>{label}</Pill>
    <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.25 }}>{title}</div>
    <div style={{ fontSize: 28, color: c.body, lineHeight: 1.45 }}>{desc}</div>
  </div>
);

const StrengthCard = ({ x, n, title, desc, out }: { x: number; n: string; title: ReactNode; desc: string; out: string }) => (
  <div style={{ position: 'absolute', left: x, top: 408, width: 314, height: 424, boxSizing: 'border-box', border: `1px solid ${c.hairline}`, background: '#FFFFFF', borderRadius: 'var(--osd-radius)', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 72, fontWeight: 700, lineHeight: 1.1, color: 'var(--osd-accent)' }}>{n}</div>
    <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.25 }}>{title}</div>
    <div style={{ fontSize: 28, color: c.body, lineHeight: 1.45 }}>{desc}</div>
    <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${c.hairlineSoft}`, fontSize: 28, fontWeight: 600, lineHeight: 1.35, color: 'var(--osd-accent)' }}>{out}</div>
  </div>
);

const StatBox = ({ label, value, note }: { label: string; value: string; note?: string }) => (
  <div style={{ background: c.blueSoft, borderRadius: 'var(--osd-radius)', padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 6 }}>
    <span style={{ fontSize: 28, fontWeight: 500, color: c.body }}>{label}</span>
    <span style={{ fontFamily: 'Inter, "Noto Sans KR", sans-serif', fontSize: 112, fontWeight: 700, lineHeight: 1.05, color: 'var(--osd-accent)', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    {note && <span style={{ fontSize: 28, color: c.body }}>{note}</span>}
  </div>
);

const KeyCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ background: c.yellowSoft, borderLeft: `6px solid ${c.yellow}`, borderRadius: 'var(--osd-radius)', padding: '26px 36px', fontSize: 32, fontWeight: 500, lineHeight: 1.45, ...style }}>
    {children}
  </div>
);

const Shot = ({ src, caption, width, height }: { src: string; caption: string; width: number; height: number }) => (
  <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <img src={src} alt={caption} style={{ width, height, objectFit: 'cover', objectPosition: 'top', borderRadius: 'var(--osd-radius)', border: `1px solid ${c.hairline}` }} />
    <figcaption style={{ fontSize: 28, color: c.body, textAlign: 'center', lineHeight: 1.4 }}>{caption}</figcaption>
  </figure>
);

// One beat of what the video shows, told in order. `last` drops the connector line.
const StoryStep = ({ n, hot, last, children }: { n: string; hot?: boolean; last?: boolean; children: ReactNode }) => (
  <div style={{ position: 'relative', display: 'flex', gap: 22, paddingBottom: last ? 0 : 26 }}>
    {!last && <div style={{ position: 'absolute', left: 21, top: 48, bottom: 0, width: 3, background: c.blueSoft }} />}
    <span style={{ position: 'relative', width: 46, height: 46, flexShrink: 0, borderRadius: 999, background: hot ? 'var(--osd-accent)' : c.blueSoft, color: hot ? '#FFFFFF' : 'var(--osd-accent)', fontFamily: 'Inter, sans-serif', fontSize: 26, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{n}</span>
    <span style={{ fontSize: 32, lineHeight: 1.4, fontWeight: hot ? 700 : 400, color: hot ? 'var(--osd-accent)' : 'var(--osd-text)' }}>{children}</span>
  </div>
);

const playerInk = '#0A0B0D';

// A player, not a slide: dark frame, title bar, and a cover with the Codepresso icon
// until the presenter clicks play. Inactive pages (thumbnails, overview) always show the cover.
const VideoBox = ({ src, no, label }: { src: string; no: string; label: string }) => {
  const active = useIsActivePage();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || active) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  }, [active]);
  const start = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: playerInk }}>
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', borderBottom: '1px solid #262A31' }}>
        <img src={icon} alt="" style={{ height: 34 }} />
        <span style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF' }}>영상 {no}</span>
        <span style={{ fontSize: 28, color: '#A8ACB3' }}>{label}</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 600, letterSpacing: '0.12em', color: '#7C828A' }}>DEMO</span>
      </div>
      <div style={{ position: 'relative', flex: 1 }}>
        <video ref={ref} src={src} muted playsInline preload="auto" controls={active && playing} onEnded={() => setPlaying(false)} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: playerInk }} />
        {!playing && (
          <button type="button" onClick={start} aria-label={`영상 ${no} 재생`} style={{ position: 'absolute', inset: 0, border: 'none', padding: 0, cursor: 'pointer', background: playerInk, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, fontFamily: 'var(--osd-font-body)' }}>
            <img src={icon} alt="" style={{ height: 230 }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{ width: 96, height: 96, borderRadius: 999, background: 'var(--osd-accent)', display: 'grid', placeItems: 'center' }}>
                <svg width="40" height="44" viewBox="0 0 40 44"><path d="M4 2 L38 22 L4 42 Z" fill="#FFFFFF" /></svg>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: '#FFFFFF' }}>영상 {no}</span>
                <span style={{ fontSize: 28, color: '#A8ACB3' }}>{label}</span>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

const VideoLayout = ({ section, path, title, no, label, src, note = '실제 운영 화면이며, 고객 정보는 가렸습니다.', children }: { section: string; path: string; title: ReactNode; no: string; label: string; src: string; note?: string; children: ReactNode }) => (
  <div style={page}>
    <Header section={section} path={path} />
    <Title>{title}</Title>
    <div style={{ position: 'absolute', left: 100, top: 256, width: 1120, height: 682, borderRadius: 'var(--osd-radius)', overflow: 'hidden' }}>
      <VideoBox src={src} no={no} label={label} />
    </div>
    <div style={{ position: 'absolute', left: 100, top: 948, width: 1120, textAlign: 'right', fontSize: 28, color: c.muted }}>※ {note}</div>
    <div style={{ position: 'absolute', left: 1276, right: 100, top: 256, display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 28, fontWeight: 600, color: c.muted, marginBottom: 24 }}>영상 속 이야기</span>
      {children}
    </div>
    <Footer />
  </div>
);

const Divider = ({ no, title, sub }: { no: string; title: string; sub: string }) => (
  <div style={page}>
    <img src={logo} alt="code.presso" style={{ position: 'absolute', left: 100, top: 100, height: 52 }} />
    <div style={{ position: 'absolute', left: 100, top: 380, width: 1400 }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 64, fontWeight: 700, color: 'var(--osd-accent)' }}>{no}</div>
      <h1 style={{ margin: '12px 0 0', fontSize: 88, fontWeight: 700, lineHeight: 1.2 }}>{title}</h1>
      <p style={{ margin: '28px 0 40px', fontSize: 36, color: c.body }}>{sub}</p>
      <Rule />
    </div>
    <SideBand />
  </div>
);

const TocRow = ({ no, title, sub }: { no: string; title: string; sub: string }) => (
  <div style={{ border: `1px solid ${c.hairline}`, borderRadius: 'var(--osd-radius)', height: 138, display: 'flex', alignItems: 'center', padding: '0 56px', gap: 72 }}>
    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 56, fontWeight: 700, color: 'var(--osd-accent)', width: 80 }}>{no}</span>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 40, fontWeight: 700 }}>{title}</span>
      <span style={{ fontSize: 28, color: c.body }}>{sub}</span>
    </div>
  </div>
);


// ── Diagram primitives: boxes are HTML, wires are one full-canvas SVG ──

type Tone = 'plain' | 'surface' | 'blue' | 'solid' | 'gate' | 'ghost';

const toneStyle: Record<Tone, CSSProperties> = {
  plain: { background: '#FFFFFF', border: `1px solid ${c.hairline}` },
  surface: { background: c.surface, border: `1px solid ${c.hairline}` },
  blue: { background: c.blueSoft, border: '3px solid var(--osd-accent)' },
  solid: { background: 'var(--osd-accent)', border: '3px solid var(--osd-accent)', color: '#FFFFFF' },
  gate: { background: c.yellowSoft, border: `4px solid ${c.yellow}` },
  ghost: { background: c.blueSoft, border: '3px dashed var(--osd-accent)' },
};

const Box = ({ x, y, w, h, tone = 'plain', align = 'center', pad = '20px 24px', gap = 8, children }: { x: number; y: number; w: number; h: number; tone?: Tone; align?: 'center' | 'left'; pad?: string; gap?: number; children: ReactNode }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, boxSizing: 'border-box', borderRadius: 'var(--osd-radius)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, gap, padding: pad, ...toneStyle[tone] }}>
    {children}
  </div>
);

const BT = ({ children, size = 36, color }: { children: ReactNode; size?: number; color?: string }) => (
  <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.25, color }}>{children}</div>
);

const BS = ({ children, color = c.body }: { children: ReactNode; color?: string }) => (
  <div style={{ fontSize: 28, lineHeight: 1.4, color }}>{children}</div>
);

const Chip = ({ children, ai }: { children: ReactNode; ai?: boolean }) => (
  <span style={{ borderRadius: 999, padding: '2px 18px', fontSize: 28, fontWeight: 600, whiteSpace: 'nowrap', background: ai ? 'var(--osd-accent)' : c.hairlineSoft, color: ai ? '#FFFFFF' : c.body }}>{children}</span>
);

const Wires = ({ children }: { children: ReactNode }) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
    <defs>
      <marker id="axArrBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0052FF" />
      </marker>
      <marker id="axArrGray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#9AA1AA" />
      </marker>
    </defs>
    {children}
  </svg>
);

const Wire = ({ d, gray, dash, head = true }: { d: string; gray?: boolean; dash?: boolean; head?: boolean }) => (
  <path d={d} fill="none" stroke={gray ? '#9AA1AA' : '#0052FF'} strokeWidth={3} strokeDasharray={dash ? '10 8' : undefined} markerEnd={head ? `url(#${gray ? 'axArrGray' : 'axArrBlue'})` : undefined} />
);

// Text that sits on top of a wire; the white fill cuts the line behind it.
const WireLabel = ({ x, y, w, children, color = 'var(--osd-accent)' }: { x: number; y: number; w: number; children: ReactNode; color?: string }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, textAlign: 'center', fontSize: 28, fontWeight: 500, lineHeight: 1.3, color, background: '#FFFFFF' }}>{children}</div>
);

const Tag = ({ x, y, w, children, color = 'var(--osd-accent)' }: { x: number; y: number; w: number; children: ReactNode; color?: string }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, textAlign: 'center', fontSize: 28, fontWeight: 600, lineHeight: 1.3, color }}>{children}</div>
);

// ── 00 Cover / TOC ─────────────────────────────────────────────────────

const Cover: Page = () => (
  <div style={page}>
    <img src={logo} alt="code.presso" style={{ position: 'absolute', left: 100, top: 100, height: 52 }} />
    <div style={{ position: 'absolute', left: 100, top: 290, width: 1440 }}>
      <Eyebrow>제2회 제조AI 솔루션 공모전 · 2차 대면평가</Eyebrow>
      <h1 style={{ margin: '28px 0 0', fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
        일하면서 쌓인 지식이
        <br />
        바로 실행으로 이어지게 하는 <Em>AXLE</Em>
      </h1>
      <p style={{ margin: '36px 0 0', fontSize: 36, color: c.body, lineHeight: 1.5 }}>
        메일과 문서에서 AI가 업무 기록을 추천하고, 사람은 승인만 합니다
      </p>
    </div>
    <div style={{ position: 'absolute', left: 100, top: 790 }}>
      <Rule />
      <div style={{ marginTop: 32, fontSize: 32, fontWeight: 500 }}>
        (주)코드프레소<span style={{ color: c.muted, fontWeight: 400 }}>{'  ·  '}스타트업 트랙 · ⑱ 비즈니스/자동화 AI</span>
      </div>
      <div style={{ marginTop: 12, fontSize: 28, color: c.muted, fontVariantNumeric: 'tabular-nums' }}>2026. 10. 02</div>
    </div>
    <SideBand />
  </div>
);

const Toc: Page = () => (
  <div style={page}>
    <Header section="목차" path="INDEX" />
    <h1 style={{ position: 'absolute', left: 100, top: 150, margin: 0, fontSize: 60, fontWeight: 700 }}>목차</h1>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 300, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TocRow no="01" title="제조현장의 문제" sub="세 가지 문제 · 시스템 밖의 빈칸 · 전체 구조와 데이터 흐름" />
      <TocRow no="02" title="업무를 하는 AI" sub="KMS 추천 · 입찰공고 조건 검토 · MCP 연결과 지식 쌓기" />
      <TocRow no="03" title="AI를 운영하는 구조" sub="멀티 LLM 평가 · Prompt·Skill 관리자 분리" />
      <TocRow no="04" title="현장 적용성과 사업화" sub="운영 실적 · 도입 절차 · 효과 · 공급 방식" />
    </div>
    <Footer />
  </div>
);

// ── 01 Problem ─────────────────────────────────────────────────────────

const Divider01: Page = () => <Divider no="01" title="제조현장의 문제" sub="정보는 있는데, 기록이 되지 않습니다" />;

const Problem: Page = () => (
  <div style={page}>
    <Header section="01" path="제조현장의 문제" />
    <Title sub="정보가 생기는 곳과 기록되는 곳이 서로 다릅니다">
      세 가지 문제는 <Em>한 가지 원인</Em>에서 나옵니다
    </Title>
    <Tag x={100} y={436} w={270} color={c.muted}>정보가 생기는 곳</Tag>
    <Tag x={100} y={766} w={270} color={c.muted}>기록되는 곳</Tag>

    <Tag x={400} y={340} w={446} color="var(--osd-text)">거래처 정보가 담당자 머릿속에만 있음</Tag>
    <Tag x={887} y={340} w={446} color="var(--osd-text)">영업이 약속한 납기를 생산이 모름</Tag>
    <Tag x={1374} y={340} w={446} color="var(--osd-text)">증빙 자료를 매번 새로 모음</Tag>

    <Box x={400} y={400} w={446} h={110}><BT>메일 · 통화 · 수첩</BT></Box>
    <Box x={887} y={400} w={446} h={110}><BT>통화 · 메일 협의</BT></Box>
    <Box x={1374} y={400} w={446} h={110}><BT>계약서 · 산출물</BT></Box>

    <Box x={400} y={730} w={446} h={110} tone="surface"><BT size={32} color={c.muted}>ERP엔 금액·일자만</BT></Box>
    <Box x={887} y={730} w={446} h={110} tone="surface"><BT size={32} color={c.muted}>발주서엔 결과만</BT></Box>
    <Box x={1374} y={730} w={446} h={110} tone="surface"><BT size={32} color={c.muted}>파일은 있으나 연결 없음</BT></Box>

    <Wires>
      <Wire d="M623 510 V588" gray dash head={false} />
      <Wire d="M1110 510 V588" gray dash head={false} />
      <Wire d="M1597 510 V588" gray dash head={false} />
      <Wire d="M623 662 V726" gray dash />
      <Wire d="M1110 662 V726" gray dash />
      <Wire d="M1597 662 V726" gray dash />
    </Wires>
    <div style={{ position: 'absolute', left: 400, top: 590, width: 1420, height: 70, boxSizing: 'border-box', background: c.yellowSoft, borderLeft: `6px solid ${c.yellow}`, borderRadius: 'var(--osd-radius)', display: 'grid', placeItems: 'center', fontSize: 32, fontWeight: 500 }}>
      지금은 이 차이를 사람이 일일이 손으로 입력해서 메우고 있습니다
    </div>

    <Callout top={876}>AXLE은 정보가 생기는 자리에서 바로 <b>기록 후보</b>를 만듭니다.</Callout>
    <Footer />
  </div>
);

const ValueChain: Page = () => (
  <div style={page}>
    <Header section="01" path="제조현장의 문제" />
    <Title sub="설계·생산·물류·회계에는 시스템이 있지만, 그 앞뒤의 업무는 기록되지 않습니다">
      수주 전과 납품 후 업무는 <Em>아직 시스템에</Em> 담기지 않습니다
    </Title>

    <Tag x={458} y={330} w={1004} color={c.muted}>기존 시스템이 다루는 구간</Tag>
    <Wires>
      <path d="M458 386 V372 H1462 V386" fill="none" stroke="#9AA1AA" strokeWidth={2} />
      <Wire d="M100 668 H1812" gray />
      <line x1={444} y1={656} x2={444} y2={680} stroke="#0A0B0D" strokeWidth={3} />
      <line x1={1476} y1={656} x2={1476} y2={680} stroke="#0A0B0D" strokeWidth={3} />
    </Wires>

    <Box x={100} y={396} w={330} h={220} tone="ghost" gap={12}>
      <Chip ai>AXLE이 맡는 칸</Chip>
      <BT size={40} color="var(--osd-accent)">수주 이전</BT>
      <BS color="var(--osd-text)">견적 · 단가 협의<br />납기 약속</BS>
    </Box>
    <Box x={458} y={396} w={230} h={220} tone="surface"><BT>설계</BT><BS>PLM</BS><BS color={c.muted}>시스템 있음</BS></Box>
    <Box x={716} y={396} w={230} h={220} tone="surface"><BT>생산</BT><BS>MES</BS><BS color={c.muted}>시스템 있음</BS></Box>
    <Box x={974} y={396} w={230} h={220} tone="surface"><BT>물류</BT><BS>WMS</BS><BS color={c.muted}>시스템 있음</BS></Box>
    <Box x={1232} y={396} w={230} h={220} tone="surface"><BT>회계</BT><BS>ERP</BS><BS color={c.muted}>시스템 있음</BS></Box>
    <Box x={1490} y={396} w={330} h={220} tone="ghost" gap={12}>
      <Chip ai>AXLE이 맡는 칸</Chip>
      <BT size={40} color="var(--osd-accent)">납품 이후</BT>
      <BS color="var(--osd-text)">정산 · 클레임<br />실적 증빙</BS>
    </Box>

    <Tag x={344} y={690} w={200} color="var(--osd-text)">수주</Tag>
    <Tag x={1376} y={690} w={200} color="var(--osd-text)">납품</Tag>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 752, textAlign: 'center', fontSize: 32, color: c.muted }}>
      양 끝의 업무는 지금 개인 메일함 · 담당자 PC · 수첩에만 남습니다
    </div>

    <Callout top={850}>AXLE은 MES와 ERP를 대체하지 않습니다. <b>시스템이 못 챙기는 앞뒤 업무</b>를 채워 줍니다.</Callout>
    <Footer />
  </div>
);

const StrTag = ({ x, children }: { x: number; children: ReactNode }) => <Tag x={x} y={332} w={296}>{children}</Tag>;

const Structure: Page = () => (
  <div style={page}>
    <Header section="01" path="전체 구조" />
    <Title sub="사람이 승인한 것만 정식 기록이 되고, 그 기록은 다음 추천의 참고 자료로 다시 쓰입니다">
      자료가 모여 기록이 되고, 그 기록이 <Em>다시 지식이 되는</Em> 흐름입니다
    </Title>

    <StrTag x={456}>강점 1</StrTag>
    <StrTag x={812}>강점 1</StrTag>
    <StrTag x={1168}>강점 3</StrTag>
    <StrTag x={1524}>강점 3</StrTag>

    <Box x={100} y={380} w={296} h={160}><BT size={44}>자료</BT><BS>메일·문서·회의록</BS></Box>
    <Box x={456} y={380} w={296} h={160}><BT size={44}>KMS</BT><BS>지식 그래프</BS></Box>
    <Box x={812} y={380} w={296} h={160} tone="blue"><BT size={44} color="var(--osd-accent)">AI 추천</BT><BS>후보·근거·신뢰도</BS></Box>
    <Box x={1168} y={380} w={296} h={160} tone="gate"><BT size={44}>사람의 승인</BT><BS>웹·AI 챗봇</BS></Box>
    <Box x={1524} y={380} w={296} h={160} tone="solid"><BT size={44} color="#FFFFFF">정식 기록</BT><BS color="#FFFFFF">CRM·PMS·TMS</BS></Box>

    <Box x={100} y={630} w={296} h={146} tone="surface"><BT>공공 조달 공고</BT><BS>나라장터 등 3종</BS></Box>
    <Box x={456} y={630} w={652} h={146} tone="blue" pad="12px 24px" gap={6}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex' }}><Pill>강점 2</Pill></div>
        <BT color="var(--osd-accent)">AI 조건 검토</BT>
      </div>
      <BS color="var(--osd-text)">첨부 원문을 읽고 판정 초안과 근거를 붙임</BS>
    </Box>

    <Wires>
      <Wire d="M396 460 H452" />
      <Wire d="M752 460 H808" />
      <Wire d="M1108 460 H1164" />
      <Wire d="M1464 460 H1520" />
      <Wire d="M1672 540 V598 H604 V546" dash />
      <Wire d="M396 703 H452" />
      <Wire d="M1108 703 H1316 V546" />
    </Wires>
    <WireLabel x={640} y={580} w={620}>승인된 기록은 다시 지식으로 쌓입니다</WireLabel>

    <div style={{ position: 'absolute', left: 100, right: 100, top: 800, height: 172, boxSizing: 'border-box', borderRadius: 'var(--osd-radius)', background: c.surface, borderTop: `6px solid ${c.hairline}`, padding: '18px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span style={{ fontSize: 28, fontWeight: 600, color: c.body }}>AI 운영 기능 · 위의 모든 AI 판단 아래에 깔립니다</span>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1, background: '#FFFFFF', border: `1px solid ${c.hairline}`, borderRadius: 'var(--osd-radius)', padding: '18px 32px', fontSize: 32 }}>
          <b style={{ color: 'var(--osd-accent)' }}>강점 4</b> · 여러 LLM을 비교해 교체
        </div>
        <div style={{ flex: 1, background: '#FFFFFF', border: `1px solid ${c.hairline}`, borderRadius: 'var(--osd-radius)', padding: '18px 32px', fontSize: 32 }}>
          <b style={{ color: 'var(--osd-accent)' }}>강점 5</b> · 판단 기준을 실무자가 수정
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// Source: AXLE 운영 매뉴얼 · "AXLE의 데이터 흐름" (collect → enrich → kms_pages → recommend → approve → shadow sync)
const FlowNode = ({ x, chip, ai, title, lines, tone = 'plain', titleColor, lineColor }: { x: number; chip: string; ai?: boolean; title: ReactNode; lines: ReactNode; tone?: Tone; titleColor?: string; lineColor?: string }) => (
  <Box x={x} y={400} w={240} h={240} tone={tone} pad="20px 14px" gap={10}>
    <Chip ai={ai}>{chip}</Chip>
    <BT color={titleColor}>{title}</BT>
    <BS color={lineColor}>{lines}</BS>
  </Box>
);

const DataFlow: Page = () => (
  <div style={page}>
    <Header section="01" path="데이터 흐름" />
    <Title sub="수집과 AI 분석을 나눠서 AI 비용을 아끼고, 기록에 반영되는 것은 사람이 승인한 순간뿐입니다">
      비용 안 드는 작업은 수시로, <Em>AI 작업은 하루 한 번</Em>만 돌립니다
    </Title>
    <div style={{ position: 'absolute', right: 100, top: 250, display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: c.muted }}>
      <span style={{ width: 56, height: 28, borderRadius: 999, background: 'var(--osd-accent)' }} /> AI를 쓰는 단계
    </div>

    <FlowNode x={100} chip="매시간" title="수집" lines={<>메일·채팅·문서<br />AI 미사용</>} />
    <FlowNode x={396} chip="매일 03:00" ai title="AI 분석" lines={<>사람·회사·회의<br />관계로 정리</>} />
    <FlowNode x={692} chip="매일 06:30" title="저장" lines={<>운영 DB로<br />하루 한 번 이동</>} />
    <FlowNode x={988} chip="매일 10:00" ai title="AI 추천" lines={<>근거·신뢰도가<br />붙은 후보</>} tone="blue" titleColor="var(--osd-accent)" />
    <FlowNode x={1284} chip="승인 즉시" title="사람 승인" lines={<>승인한 것만<br />반영</>} tone="gate" />
    <FlowNode x={1580} chip="단일 기록" title={<>AXLE<br />정식 기록</>} lines="CRM·PMS·TMS" tone="solid" titleColor="#FFFFFF" lineColor="#FFFFFF" />

    <div style={{ position: 'absolute', left: 100, top: 680, width: 1420, height: 294, boxSizing: 'border-box', border: `2px dashed ${c.hairline}`, borderRadius: 'var(--osd-radius)' }} />
    <div style={{ position: 'absolute', left: 124, top: 690, fontSize: 28, fontWeight: 600, color: c.muted }}>정형 데이터 직결 · 분류 없이 바로 정식 기록으로</div>
    <Box x={130} y={736} w={660} h={102} align="left" pad="10px 28px" gap={2}>
      <BT size={32}>공공 조달 API 3종</BT>
      <BS>나라장터 · K-Startup · 기업마당 · 매일 새벽</BS>
    </Box>
    <Box x={880} y={736} w={320} h={102} tone="blue"><BT size={32} color="var(--osd-accent)">입찰·사업공고</BT></Box>
    <Box x={130} y={858} w={660} h={102} align="left" pad="10px 28px" gap={2}>
      <BT size={32}>홈페이지 문의 폼</BT>
      <BS>Web-to-Lead</BS>
    </Box>
    <Box x={880} y={858} w={320} h={102} tone="blue"><BT size={32} color="var(--osd-accent)">리드</BT></Box>

    <Wires>
      <Wire d="M340 520 H392" />
      <Wire d="M636 520 H688" />
      <Wire d="M932 520 H984" />
      <Wire d="M1228 520 H1280" />
      <Wire d="M1524 520 H1576" />
      <Wire d="M1700 400 V362 H516 V396" dash />
      <Wire d="M790 787 H876" />
      <Wire d="M790 909 H876" />
      <Wire d="M1200 787 H1700 V644" />
      <Wire d="M1200 909 H1700 V787" head={false} />
    </Wires>
    <WireLabel x={808} y={342} w={600}>승인된 기록은 다시 지식 그래프에 쌓입니다</WireLabel>
    <WireLabel x={1330} y={742} w={280}>정식 기록은 하나</WireLabel>
    <Footer />
  </div>
);

const Strengths: Page = () => (
  <div style={page}>
    <Header section="01" path="AI 적용 강점 다섯 가지" />
    <Title sub="앞의 셋은 업무를 하는 AI, 뒤의 둘은 그 AI를 고객사가 운영하는 구조입니다">
      AI가 실제로 일하는 <Em>다섯 가지</Em>
    </Title>
    <div style={{ position: 'absolute', left: 100, top: 336, width: 998, fontSize: 32, fontWeight: 700, color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', paddingBottom: 8 }}>업무를 하는 AI</div>
    <div style={{ position: 'absolute', left: 1164, top: 336, width: 656, fontSize: 32, fontWeight: 700, color: 'var(--osd-text)', borderBottom: '4px solid var(--osd-text)', paddingBottom: 8 }}>AI를 운영하는 구조</div>

    <StrengthCard x={100} n="1" title="KMS와 AI 추천" desc="메일·문서에서 업무 기록 후보를 추천" out="직접 입력 대신 승인만" />
    <StrengthCard x={442} n="2" title={<>입찰공고<br />조건 검토</>} desc="첨부 원문을 AI가 읽고 판정 초안 작성" out="공고 탐색 인건비 절감" />
    <StrengthCard x={784} n="3" title="MCP 연결과 지식 쌓기" desc="AI 챗봇에서 승인하고 기록을 다시 쌓음" out="사람도 AI도 같은 승인 절차" />
    <StrengthCard x={1164} n="4" title="멀티 LLM 평가" desc="운영 프롬프트로 모델을 나란히 비교" out="특정 AI 모델에 묶이지 않음" />
    <StrengthCard x={1506} n="5" title="Prompt·Skill 관리" desc="판단 기준을 코드 밖 관리자 화면으로" out="개발 없이 기준 변경" />

    <KeyCard style={{ position: 'absolute', left: 100, right: 100, top: 866 }}>
      공통 원칙 · AI는 초안만 만들고, <b>최종 결정은 사람이</b> 합니다
    </KeyCard>
    <Footer />
  </div>
);

// ── 02 AI that does the work ───────────────────────────────────────────

const Divider02: Page = () => <Divider no="02" title="업무를 하는 AI" sub="KMS 추천 · 입찰공고 조건 검토 · MCP 연결과 지식 쌓기" />;

const KmsRecommend: Page = () => (
  <div style={page}>
    <Header section="02" path="강점 1 · KMS와 AI 추천" />
    <Title sub="담당자는 입력하지 않습니다. 근거를 보고 승인만 합니다">
      AI가 추천한 내용은 <Em>세 번 걸러진 뒤</Em>에야 기록됩니다
    </Title>

    <Box x={100} y={380} w={200} h={340} tone="surface"><BT>자료</BT><BS>메일<br />회의록<br />문서</BS></Box>

    <Box x={340} y={380} w={270} h={340} gap={10}>
      <Pill>검증 1</Pill>
      <BT>출처 확인</BT>
      <div style={{ fontFamily: 'Inter, "Noto Sans KR", sans-serif', fontSize: 64, fontWeight: 700, lineHeight: 1.1, color: 'var(--osd-accent)', fontVariantNumeric: 'tabular-nums' }}>616개</div>
      <BS>3,639개 중 차단<br />9/6 점검</BS>
    </Box>
    <Box x={650} y={380} w={270} h={340} gap={10}>
      <Pill>검증 2</Pill>
      <BT>중복 확인</BT>
      <BS color="var(--osd-text)">같은 회사인지<br />먼저 판별</BS>
      <BS>사업자번호<br />도메인·이메일</BS>
    </Box>

    <Box x={960} y={380} w={340} h={340} tone="blue" gap={6}>
      <BS color="var(--osd-text)">승인 대기 추천</BS>
      <div style={{ fontFamily: 'Inter, "Noto Sans KR", sans-serif', fontSize: 96, fontWeight: 700, lineHeight: 1.1, color: 'var(--osd-accent)', fontVariantNumeric: 'tabular-nums' }}>186건</div>
      <BS>1인 계정 · 12일<br />(9/18~9/30)</BS>
    </Box>

    <Box x={1340} y={380} w={270} h={340} tone="gate" gap={10}>
      <Pill>검증 3</Pill>
      <BT>사람 승인</BT>
      <BS color="var(--osd-text)">사람이 승인해야<br />정식 기록에 반영</BS>
    </Box>
    <Box x={1650} y={380} w={170} h={340} tone="solid"><BT color="#FFFFFF">정식<br />기록</BT></Box>

    <Wires>
      <Wire d="M300 550 H336" />
      <Wire d="M610 550 H646" />
      <Wire d="M920 550 H956" />
      <Wire d="M1300 550 H1336" />
      <Wire d="M1610 550 H1646" />
    </Wires>

    <Callout top={790}>AI가 정식 기록을 직접 만들거나 고치는 경로는 없습니다. <b>담당자는 근거를 보고 승인만</b> 합니다.</Callout>
    <Footer />
  </div>
);

const KmsRecommendVideo: Page = () => (
  <VideoLayout section="02" path="강점 1 · KMS와 AI 추천" title={<>리드 한 건을 <Em>승인</Em>하면 생기는 일</>} no="1" label="리드 승인과 ICP 적합도" src={video1}>
    <StoryStep n="1">메일·회의록에서 AI가 찾은 리드 후보 가운데 한 건을 고릅니다</StoryStep>
    <StoryStep n="2">담당자는 신뢰도, 판단 이유, 출처를 보고 승인합니다</StoryStep>
    <StoryStep n="3">승인하면 고객사와 담당자가 자동으로 함께 생성됩니다</StoryStep>
    <StoryStep n="4">신규 고객사이므로 ICP 적합도 채점이 이어서 실행됩니다</StoryStep>
    <StoryStep n="5" hot last>리드 화면에 ICP 점수와 등급, 채점 근거가 남습니다</StoryStep>
  </VideoLayout>
);

const BidStep = ({ n, hot, children }: { n: string; hot?: boolean; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '16px 24px', borderRadius: 'var(--osd-radius)', background: hot ? c.blueSoft : '#FFFFFF', border: hot ? '3px solid var(--osd-accent)' : `1px solid ${c.hairline}` }}>
    <span style={{ width: 56, height: 56, flexShrink: 0, borderRadius: 999, background: 'var(--osd-accent)', color: '#FFFFFF', fontSize: 28, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{n}</span>
    <span style={{ fontSize: 32, fontWeight: hot ? 700 : 500, color: hot ? 'var(--osd-accent)' : 'var(--osd-text)' }}>{children}</span>
  </div>
);

const BidReview: Page = () => (
  <div style={page}>
    <Header section="02" path="강점 2 · 입찰공고 조건 검토" />
    <Title sub="공고를 찾고 골라내는 반복 작업은 AI가 먼저 해 둡니다">
      <Em>첨부파일</Em>까지 AI가 읽고, 우리 회사에 맞는지 먼저 판단합니다
    </Title>
    <div style={{ position: 'absolute', left: 100, top: 330 }}>
      <Shot src={shotBid} width={1000} height={560} caption="화면 1. 입찰공고 조건 검토 결과. 판정과 근거가 항목별로 남습니다" />
    </div>
    <div style={{ position: 'absolute', left: 1160, right: 100, top: 330, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <BidStep n="1">3개 공공 소스를 매일 새벽 수집</BidStep>
      <BidStep n="2" hot>첨부 PDF·HWP를 AI가 읽고 판정</BidStep>
      <BidStep n="3">근거 붙은 초안을 사람이 확정</BidStep>
      <div style={{ marginTop: 20, background: c.blueSoft, borderRadius: 'var(--osd-radius)', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 28 }}>
        <span style={{ fontFamily: 'Inter, "Noto Sans KR", sans-serif', fontSize: 96, fontWeight: 700, lineHeight: 1, color: 'var(--osd-accent)', fontVariantNumeric: 'tabular-nums' }}>5건</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 32, fontWeight: 700 }}>검토 완료</span>
          <span style={{ fontSize: 28, color: c.body }}>유망 4 · 확인필요 1 · 9/30</span>
        </div>
      </div>
      <div style={{ fontSize: 28, color: c.muted, lineHeight: 1.45 }}>공고문에 없는 내용은 지어내지 않고 '확인필요'로 표시합니다</div>
    </div>
    <Footer />
  </div>
);

const BidReviewVideo: Page = () => (
  <VideoLayout section="02" path="강점 2 · 입찰공고 조건 검토" title={<>근거를 보고 <Em>확인할 것만</Em> 확인합니다</>} no="2" label="입찰공고 조건 검토" src={video2}>
    <StoryStep n="1">새벽에 쌓인 공고 가운데 5건 이상을 조건 검토합니다</StoryStep>
    <StoryStep n="2">AI가 공고마다 첨부 원문을 읽고 유망·확인필요·부적합을 판정합니다</StoryStep>
    <StoryStep n="3" hot>판정 항목마다 원문의 어느 부분을 보고 판단했는지 근거가 붙습니다</StoryStep>
    <StoryStep n="4">공고문에 없는 내용은 지어내지 않고 '확인필요'로 남깁니다</StoryStep>
    <StoryStep n="5" hot last>담당자는 '확인필요'로 표시된 부분만 확인하고 확정합니다</StoryStep>
  </VideoLayout>
);

const ConnectRoute = ({ label, title, desc, children }: { label: string; title: string; desc: ReactNode; children?: ReactNode }) => (
  <div style={{ height: 176, boxSizing: 'border-box', background: c.surface, borderRadius: 'var(--osd-radius)', padding: '18px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Pill>{label}</Pill>
      <span style={{ fontSize: 32, fontWeight: 700 }}>{title}</span>
      <span style={{ fontSize: 28, color: c.body, lineHeight: 1.35 }}>{desc}</span>
    </div>
    {children}
  </div>
);

const Mcp: Page = () => (
  <div style={page}>
    <Header section="02" path="강점 3 · MCP 연결과 지식 쌓기" />
    <Title sub="Claude 같은 AI 챗봇에 말로 물어보고 승인할 수 있고, 승인된 기록은 다시 지식으로 쌓입니다">
      사람이 쓰든 AI가 쓰든 <Em>승인 절차는 똑같습니다</Em>
    </Title>

    <Box x={100} y={372} w={300} h={136}><BT>사람</BT><BS>웹 화면</BS></Box>
    <Box x={100} y={552} w={300} h={136}><BT>에이전트</BT><BS>Claude 같은 AI 챗봇</BS></Box>
    <Box x={470} y={420} w={320} h={220} tone="blue">
      <BT color="var(--osd-accent)">도구 단</BT>
      <BS color="var(--osd-text)">MCP</BS>
      <BS>사람·에이전트 공용</BS>
    </Box>
    <Box x={860} y={440} w={290} h={180}><BT>① 쓰기 요청</BT><BS>바로 저장하지 않고<br />저장할 내용부터 보여 줌</BS></Box>
    <Box x={1220} y={440} w={310} h={180} tone="gate"><BT>② 사람 승인</BT><BS color="var(--osd-text)">commit_write</BS><BS>권한 재확인</BS></Box>
    <Box x={1600} y={440} w={220} h={180} tone="solid"><BT color="#FFFFFF">정식<br />기록</BT></Box>

    <Wires>
      <Wire d="M400 440 L466 490" />
      <Wire d="M400 620 L466 570" />
      <Wire d="M790 530 H856" />
      <Wire d="M1150 530 H1216" />
      <Wire d="M1530 530 H1596" />
      <Wire d="M1710 620 V740 H630 V644" dash />
    </Wires>
    <WireLabel x={690} y={720} w={960}>③ 승인된 기록은 다시 KMS에 쌓여 다음 검색과 추천에 쓰입니다</WireLabel>

    <div style={{ position: 'absolute', left: 100, right: 100, top: 790, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <ConnectRoute label="PC · MCP 연결" title="Claude Code·Claude 데스크톱" desc="개인 토큰 하나로 업무 도구·KMS 연결" />
      <ConnectRoute label="모바일 · 커넥터 연결" title="휴대폰 Claude 앱" desc="claude.ai 커넥터로 한 번 추가">
        <div style={{ width: 300, height: 104, flexShrink: 0, overflow: 'hidden', borderRadius: 'var(--osd-radius)', border: `1px solid ${c.hairline}`, background: '#FFFFFF' }}>
          <img src={shotConnector} alt="claude.ai 사용자 지정 커넥터 등록 화면" style={{ display: 'block', width: 300, height: 104 }} />
        </div>
      </ConnectRoute>
    </div>
    <Footer />
  </div>
);

const McpVideo: Page = () => (
  <VideoLayout section="02" path="강점 3 · MCP 연결과 지식 쌓기" title={<>Claude Code로 <Em>오늘 할 일</Em> 조회</>} no="3" label="MCP 연결과 지식 쌓기" src={video3} note="조회 장면은 실제 응답(9/30)이고, 상태 변경 확정 화면은 예시입니다.">
    <StoryStep n="1">개인 토큰 하나로 Claude에 AXLE을 연결합니다</StoryStep>
    <StoryStep n="2">"오늘 할 일 정리해줘"라고 말하면 AXLE의 할 일을 불러옵니다</StoryStep>
    <StoryStep n="3">미완료 13건 중 오늘 처리할 7건을 프로젝트별로 정리합니다</StoryStep>
    <StoryStep n="4">"마감 지난 것도 알려줘"라고 이어 물으면 지연 3건을 다시 찾습니다</StoryStep>
    <StoryStep n="5" hot last>상태 변경은 요약부터 보여 주고, 사람이 승인해야 확정합니다</StoryStep>
  </VideoLayout>
);

// ── 03 The structure that runs the AI ──────────────────────────────────

const Divider03: Page = () => <Divider no="03" title="AI를 운영하는 구조" sub="고객사가 AI를 고르고, 고쳐서 운영합니다" />;

// Bar length is proportional to input price; $2.00 = 340px.
const PriceBar = ({ name, price, usd, current }: { name: string; price: string; usd: number; current?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '10px 0', borderBottom: `1px solid ${c.hairlineSoft}` }}>
    <span style={{ width: 230, flexShrink: 0, fontSize: 30, fontWeight: current ? 700 : 500, color: current ? 'var(--osd-accent)' : 'var(--osd-text)' }}>{name}</span>
    <div style={{ width: 340, flexShrink: 0 }}>
      <div style={{ width: Math.max(6, (usd / 2) * 340), height: 32, borderRadius: 4, background: current ? 'var(--osd-accent)' : '#C9CED6' }} />
    </div>
    <span style={{ marginLeft: 'auto', fontSize: 28, fontWeight: current ? 700 : 400, color: current ? 'var(--osd-accent)' : c.body, fontVariantNumeric: 'tabular-nums' }}>{price}</span>
  </div>
);

const MultiLlm: Page = () => (
  <div style={page}>
    <Header section="03" path="강점 4 · 멀티 LLM 평가" />
    <Title sub="품질과 비용을 보고 고객사가 모델을 직접 바꿀 수 있고, 별도 개발은 필요 없습니다">
      AI 모델은 <Em>실제 쓰는 프롬프트로 직접 비교</Em>해서 고릅니다
    </Title>
    <div style={{ position: 'absolute', left: 100, top: 330 }}>
      <Shot src={shotLlm} width={900} height={470} caption="화면 2. LLM 모델 관리. 바꾸기 전에 현재 모델과 나란히 비교합니다" />
    </div>
    <div style={{ position: 'absolute', left: 1060, right: 100, top: 330, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Pill>후보 모델 4종 · 입력 단가 (100만 토큰)</Pill>
      <div>
        <PriceBar name="Claude Sonnet" price="$2.00" usd={2} />
        <PriceBar name="GPT-5.6 Luna" price="$0.20" usd={0.2} />
        <PriceBar name="Solar Pro 3" price="$0.15" usd={0.15} />
        <PriceBar name="Solar Pro 4" price="$0.03" usd={0.03} current />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 6 }}>
        <span style={{ fontFamily: 'Inter, "Noto Sans KR", sans-serif', fontSize: 64, fontWeight: 700, lineHeight: 1.1, color: 'var(--osd-accent)' }}>1/67</span>
        <span style={{ fontSize: 28, color: c.body }}>현재 운영 모델의 단가 (Sonnet 대비)</span>
      </div>
      <KeyCard style={{ fontSize: 28, padding: '20px 28px' }}>
        JSON 형식 준수 <b>2/18</b> → 프롬프트 한 줄 보강 후 <b>16/16</b>. 바꾸기 전에 미리 이런 차이를 확인할 수 있습니다
      </KeyCard>
    </div>
    <Footer />
  </div>
);


const vsCell: CSSProperties = { borderBottom: `1px solid ${c.hairline}`, padding: '18px 24px', display: 'flex', alignItems: 'center' };

const VsHead = ({ name, tag, current }: { name: string; tag: string; current?: boolean }) => (
  <div style={{ ...vsCell, flexDirection: 'column', alignItems: 'flex-start', gap: 4, background: current ? c.blueSoft : undefined }}>
    <span style={{ fontSize: 36, fontWeight: 700, color: current ? 'var(--osd-accent)' : 'var(--osd-text)' }}>{name}</span>
    <span style={{ fontSize: 28, color: c.body }}>{tag}</span>
  </div>
);

const VsLabel = ({ children }: { children: ReactNode }) => (
  <div style={{ ...vsCell, fontSize: 32, fontWeight: 500, color: c.body }}>{children}</div>
);

const VsValue = ({ children, current }: { children: ReactNode; current?: boolean }) => (
  <div style={{ ...vsCell, height: 104, boxSizing: 'border-box', fontFamily: 'Inter, "Noto Sans KR", sans-serif', fontSize: 56, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: current ? 'var(--osd-accent)' : 'var(--osd-text)', background: current ? c.blueSoft : undefined }}>{children}</div>
);

const MultiLlmResult: Page = () => (
  <div style={page}>
    <Header section="03" path="강점 4 · 멀티 LLM 평가" />
    <Title sub="운영 프롬프트 샘플 3종을 두 모델로 나란히 실행한 결과입니다 (2026. 9. 30.)">
      비용은 <Em>160분의 1</Em>인데, 자동 검사는 똑같이 모두 통과했습니다
    </Title>
    <div style={{ position: 'absolute', left: 100, top: 340, width: 600, height: 420, boxSizing: 'border-box', background: c.yellowSoft, borderLeft: `6px solid ${c.yellow}`, borderRadius: 'var(--osd-radius)', padding: '0 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
      <span style={{ fontSize: 32, fontWeight: 500 }}>같은 검사를 통과하는 데 든 비용</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 136, fontWeight: 700, lineHeight: 1.1, color: 'var(--osd-accent)', fontVariantNumeric: 'tabular-nums' }}>1/160</span>
      <span style={{ fontSize: 28, color: c.body }}>Solar Pro 4 ÷ Claude Sonnet</span>
    </div>

    <div style={{ position: 'absolute', left: 760, top: 340, width: 1060, display: 'grid', gridTemplateColumns: '300px 1fr 1fr', gridAutoRows: 'auto', borderTop: `1px solid ${c.hairline}` }}>
      <span />
      <VsHead name="Solar Pro 4" tag="현재 운영" current />
      <VsHead name="Claude Sonnet" tag="후보" />
      <VsLabel>자동 검사</VsLabel>
      <VsValue current>3/3</VsValue>
      <VsValue>3/3</VsValue>
      <VsLabel>합계 시간</VsLabel>
      <VsValue current>26.7초</VsValue>
      <VsValue>30.1초</VsValue>
      <VsLabel>합계 비용</VsLabel>
      <VsValue current>$0.0003</VsValue>
      <VsValue>$0.0411</VsValue>
    </div>

    <div style={{ position: 'absolute', left: 100, right: 100, top: 820, fontSize: 28, color: c.muted, lineHeight: 1.5 }}>
      샘플: 회의록 → 고객·리드·과업 분류 · 리드 ICP 채점 · 에이전트 도구 호출
      <br />
      자동 검사: JSON 형식 · 필수 키 · 도구 선택
    </div>
    <Footer />
  </div>
);

const MultiLlmVideo: Page = () => (
  <VideoLayout section="03" path="강점 4 · 멀티 LLM 평가" title={<>모델을 <Em>비교하고 교체</Em>하기</>} no="4" label="멀티 LLM 평가" src={video4}>
    <StoryStep n="1">관리자 화면에서 기능마다 쓸 모델을 고릅니다</StoryStep>
    <StoryStep n="2">후보 모델과 단가를 먼저 확인합니다</StoryStep>
    <StoryStep n="3" hot>같은 운영 프롬프트로 현재 모델과 후보를 나란히 돌립니다</StoryStep>
    <StoryStep n="4">시간·토큰·비용이 자동으로 비교됩니다</StoryStep>
    <StoryStep n="5" last>다섯 기준으로 사람이 채점하고, 저장하면 바로 바뀝니다</StoryStep>
  </VideoLayout>
);

const CriteriaChip = ({ children }: { children: ReactNode }) => (
  <span style={{ border: `1px solid ${c.hairline}`, borderRadius: 'var(--osd-radius)', padding: '10px 22px', fontSize: 30, fontWeight: 500, whiteSpace: 'nowrap' }}>{children}</span>
);

const PromptAdmin: Page = () => (
  <div style={page}>
    <Header section="03" path="강점 5 · Prompt·Skill 관리" />
    <Title sub="AI 지침을 코드 안에 두지 않고, 관리자 화면에서 바로 고치게 만들었습니다">
      AI가 판단하는 기준을 <Em>담당자가 직접</Em> 고칠 수 있습니다
    </Title>
    <div style={{ position: 'absolute', left: 100, top: 360, width: 300, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 32, fontWeight: 700, color: c.muted }}>일반적인 방식</span>
      <span style={{ fontSize: 28, color: c.muted }}>개발자에게 요청하면 며칠</span>
    </div>
    <div style={{ position: 'absolute', left: 100, top: 530, width: 300, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--osd-accent)' }}>AXLE</span>
      <span style={{ fontSize: 28, color: c.body }}>담당자가 직접, 바로</span>
    </div>

    <Box x={420} y={356} w={220} h={90} tone="surface"><BT size={30} color={c.body}>담당자 요청</BT></Box>
    <Box x={700} y={356} w={220} h={90} tone="surface"><BT size={30} color={c.body}>개발자 수정</BT></Box>
    <Box x={980} y={356} w={220} h={90} tone="surface"><BT size={30} color={c.body}>테스트</BT></Box>
    <Box x={1260} y={356} w={220} h={90} tone="surface"><BT size={30} color={c.body}>재배포</BT></Box>
    <Box x={1540} y={356} w={220} h={90} tone="surface"><BT size={30} color={c.body}>적용</BT></Box>

    <Box x={420} y={526} w={360} h={90} tone="blue"><BT size={30} color="var(--osd-accent)">담당자가 문장 수정</BT></Box>
    <Box x={840} y={526} w={200} h={90} tone="blue"><BT size={30} color="var(--osd-accent)">저장</BT></Box>
    <Box x={1100} y={526} w={400} h={90} tone="solid"><BT size={30} color="#FFFFFF">바로 다음부터 적용</BT></Box>

    <Wires>
      <Wire d="M640 401 H696" gray />
      <Wire d="M920 401 H976" gray />
      <Wire d="M1200 401 H1256" gray />
      <Wire d="M1480 401 H1536" gray />
      <Wire d="M780 571 H836" />
      <Wire d="M1040 571 H1096" />
    </Wires>

    <div style={{ position: 'absolute', left: 100, top: 690, width: 1040, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Pill>담당자가 고치는 판단 기준 5종</Pill>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        <CriteriaChip>어시스턴트 기본 규칙</CriteriaChip>
        <CriteriaChip>기업정보·AI/AX 동향 조사</CriteriaChip>
        <CriteriaChip>ICP 적합도 채점</CriteriaChip>
        <CriteriaChip>입찰공고 검토</CriteriaChip>
        <CriteriaChip>사업공고 검토</CriteriaChip>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 1200, right: 100, top: 690, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Pill>견적서 디자인 Skill</Pill>
      <div style={{ fontSize: 32, lineHeight: 1.45 }}>자연어 지침으로 템플릿을 만들고, 직전 템플릿으로 되돌립니다</div>
    </div>
    <Footer />
  </div>
);

const PromptAdminVideo: Page = () => (
  <VideoLayout section="03" path="강점 5 · Prompt·Skill 관리" title={<>판단 기준을 <Em>고쳐서 반영</Em>하기</>} no="5" label="Prompt·Skill 관리" src={video5}>
    <StoryStep n="1">AI 판단 기준을 코드 대신 일반 문장으로 관리합니다</StoryStep>
    <StoryStep n="2">담당자가 ICP 채점 기준 문장을 고칩니다</StoryStep>
    <StoryStep n="3" hot>저장하면 다음 채점부터 바로 반영됩니다</StoryStep>
    <StoryStep n="4">견적서 디자인도 자연어 지침으로 바꿉니다</StoryStep>
    <StoryStep n="5" last>미리 보고, 마음에 들지 않으면 이전 템플릿으로 되돌립니다</StoryStep>
  </VideoLayout>
);

// ── 04 Field fit & business ────────────────────────────────────────────

const Divider04: Page = () => <Divider no="04" title="현장 적용성과 사업화" sub="만든 회사가 매일 쓰고, 제조기업이 검증합니다" />;

const FactChip = ({ children }: { children: ReactNode }) => (
  <span style={{ background: c.surface, borderRadius: 999, padding: '6px 24px', fontSize: 28, fontWeight: 500, whiteSpace: 'nowrap' }}>{children}</span>
);

const Milestone = ({ date, children }: { date: string; children: ReactNode }) => (
  <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
    <span style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--osd-accent)' }} />
    <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--osd-accent)', fontVariantNumeric: 'tabular-nums' }}>{date}</span>
    <span style={{ fontSize: 28, color: c.body, lineHeight: 1.4 }}>{children}</span>
  </div>
);

const FieldFit: Page = () => (
  <div style={page}>
    <Header section="04" path="현장 적용성" />
    <Title sub="자체 운영 수치는 2026년 10월 1일 기준이며, AI 추천은 최근 30일을 집계했습니다">
      만든 회사가 <Em>매일 쓰고</Em>, 제조기업이 검증합니다
    </Title>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 330, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      <StatBox label="사용 임직원" value="23명" note="영업·운영·제품·R&D" />
      <StatBox label="1인당 하루 AI 추천" value="약 20건" note="최근 30일 13,484건" />
      <StatBox label="자동 수집·관리 공고" value="116건" note="입찰 51 · 사업 65 · 소스 3개" />
    </div>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 620, height: 340, boxSizing: 'border-box', border: `1px solid ${c.hairline}`, borderTop: '6px solid var(--osd-accent)', borderRadius: 'var(--osd-radius)', padding: '24px 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 40, fontWeight: 700, marginRight: 12 }}>검증 고객사</span>
        <FactChip>대구 북구 · 임직원 53명</FactChip>
        <FactChip>차량용 컨트롤러 완성차 OEM 납품</FactChip>
        <FactChip>설비연동 키오스크 200곳 이상</FactChip>
      </div>
      <div style={{ position: 'relative', display: 'flex', marginTop: 8 }}>
        <div style={{ position: 'absolute', left: '16%', right: '16%', top: 13, height: 3, background: c.hairline }} />
        <Milestone date="7/28">셋업 · 기존 문서 도구에서<br />CRM으로 이관</Milestone>
        <Milestone date="8/18">실무자 사용 시작</Milestone>
        <Milestone date="현재">실무자 7명이 직접 입력하며<br />CRM 사용 중</Milestone>
      </div>
    </div>
    <Footer />
  </div>
);

const StepDot = ({ n, title, desc }: { n: string; title: string; desc: ReactNode }) => (
  <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
    <span style={{ width: 96, height: 96, borderRadius: 999, background: 'var(--osd-accent)', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 44, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{n}</span>
    <span style={{ marginTop: 6, fontSize: 36, fontWeight: 700 }}>{title}</span>
    <span style={{ fontSize: 28, color: c.body, lineHeight: 1.45 }}>{desc}</span>
  </div>
);

const Onboarding: Page = () => (
  <div style={page}>
    <Header section="04" path="도입 절차" />
    <Title sub="ERP와 MES는 그대로 두고, 비어 있는 칸만 맡습니다">
      처음에 <Em>네 가지</Em>만 설정하면 끝입니다
    </Title>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 350, display: 'flex' }}>
      <div style={{ position: 'absolute', left: '12.5%', right: '12.5%', top: 46, height: 4, background: c.blueSoft }} />
      <StepDot n="1" title="회사 계정 로그인" desc={<>허용 도메인 계정만<br />별도 비밀번호 없음</>} />
      <StepDot n="2" title="자료 연동 동의" desc={<>동의한 사람의<br />메일·문서만 수집</>} />
      <StepDot n="3" title="업무 시스템 연결" desc={<>AI 챗봇에서<br />조회·저장</>} />
      <StepDot n="4" title="지식 조회 연결" desc={<>본인 지식과 팀 지식을<br />함께 검색</>} />
    </div>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 700, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <InfoCard label="회사 단위 설치" title="회사마다 따로 설치" desc="DB·인증·환경변수를 회사마다 따로 둡니다" />
      <InfoCard label="기존 시스템" title="교체하지 않습니다" desc="ERP·MES를 그대로 쓰므로 기존 시스템을 바꿀 필요가 없습니다" />
    </div>
    <Footer />
  </div>
);

const ShiftRow = ({ before, after }: { before: string; after: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', height: 90 }}>
    <div style={{ width: 780, height: '100%', boxSizing: 'border-box', background: c.surface, borderRadius: 'var(--osd-radius)', padding: '0 32px', display: 'flex', alignItems: 'center', fontSize: 32, color: c.muted }}>{before}</div>
    <div style={{ width: 120, textAlign: 'center', fontSize: 44, fontWeight: 700, color: 'var(--osd-accent)' }}>→</div>
    <div style={{ flex: 1, height: '100%', boxSizing: 'border-box', background: c.blueSoft, borderRadius: 'var(--osd-radius)', padding: '0 32px', display: 'flex', alignItems: 'center', fontSize: 32, fontWeight: 500 }}>{after}</div>
  </div>
);

const Effect: Page = () => (
  <div style={page}>
    <Header section="04" path="도입하면 달라지는 점" />
    <Title sub="일이 없어지는 게 아니라, 일하는 방식이 편해집니다">
      직접 입력하던 일이 <Em>확인만 하는 일</Em>로 바뀝니다
    </Title>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 330, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 0, fontSize: 28, fontWeight: 600 }}>
        <span style={{ width: 780, color: c.muted }}>지금 하는 일</span>
        <span style={{ width: 120 }} />
        <span style={{ color: 'var(--osd-accent)' }}>AXLE에서</span>
      </div>
      <ShiftRow before="메일을 읽고 다른 화면에 다시 입력" after="추천을 확인하고 승인 또는 반려" />
      <ShiftRow before="조달 공고를 검색하고 조건을 직접 거름" after="검토 초안이 붙은 목록에서 관심 건만 판단" />
      <ShiftRow before="보고용 현황 자료를 따로 작성" after="기록에서 바로 집계된 현황 화면 확인" />
      <ShiftRow before="인수인계 때 말로 설명" after="후임자가 거래처 화면에서 직접 확인" />
    </div>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 830, height: 124, boxSizing: 'border-box', background: c.yellowSoft, borderLeft: `6px solid ${c.yellow}`, borderRadius: 'var(--osd-radius)', padding: '0 40px', display: 'flex', alignItems: 'center', gap: 24, fontSize: 36, fontWeight: 500 }}>
      담당자가 새로 배우는 동작은
      <span style={{ background: 'var(--osd-accent)', color: '#FFFFFF', borderRadius: 'var(--osd-radius)', padding: '10px 36px', fontSize: 32, fontWeight: 700 }}>승인</span>
      <span style={{ background: '#FFFFFF', color: 'var(--osd-text)', border: `2px solid ${c.hairline}`, borderRadius: 'var(--osd-radius)', padding: '8px 36px', fontSize: 32, fontWeight: 700 }}>반려</span>
      두 가지뿐입니다
    </div>
    <Footer />
  </div>
);

const PathStep = ({ n, title, desc, active }: { n: string; title: string; desc: string; active?: boolean }) => (
  <div style={{ flex: 1, height: 128, boxSizing: 'border-box', borderRadius: 'var(--osd-radius)', background: active ? c.blueSoft : '#FFFFFF', border: active ? '3px solid var(--osd-accent)' : `1px solid ${c.hairline}`, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
    <span style={{ width: 56, height: 56, flexShrink: 0, borderRadius: 999, background: 'var(--osd-accent)', color: '#FFFFFF', fontSize: 28, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{n}</span>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 36, fontWeight: 700 }}>{title}</span>
      <span style={{ fontSize: 28, color: c.body }}>{desc}</span>
    </div>
  </div>
);

const Business: Page = () => (
  <div style={page}>
    <Header section="04" path="사업화" />
    <Title sub="저희는 프로그램만 공급하고, 고객사 업무 데이터는 저희가 가져가지 않습니다">
      고객 데이터는 <Em>고객사 서버</Em>에 남습니다
    </Title>
    <Box x={100} y={400} w={420} h={260} tone="surface" gap={12}>
      <BT size={40}>코드프레소</BT>
      <BS color="var(--osd-text)">AXLE 프로그램<br />공급 · 업데이트</BS>
    </Box>
    <Wires>
      <Wire d="M520 530 H756" />
    </Wires>
    <Tag x={520} y={478} w={236}>설치·업데이트</Tag>

    <div style={{ position: 'absolute', left: 760, top: 336, width: 1060, height: 388, boxSizing: 'border-box', border: '3px solid var(--osd-accent)', borderRadius: 'var(--osd-radius)' }} />
    <div style={{ position: 'absolute', left: 792, top: 352, fontSize: 32, fontWeight: 700, color: 'var(--osd-accent)' }}>고객사가 운영하는 서버</div>
    <Box x={792} y={420} w={380} h={270} tone="plain" gap={10}>
      <BT>AXLE 설치본</BT>
      <BS>코드프레소 프로그램</BS>
    </Box>
    <Box x={1204} y={420} w={284} h={125} tone="blue"><BT size={32} color="var(--osd-accent)">업무 데이터</BT></Box>
    <Box x={1508} y={420} w={284} h={125} tone="blue"><BT size={32} color="var(--osd-accent)">지식 그래프</BT></Box>
    <Box x={1204} y={565} w={284} h={125} tone="blue"><BT size={32} color="var(--osd-accent)">인증</BT></Box>
    <Box x={1508} y={565} w={284} h={125} tone="blue"><BT size={32} color="var(--osd-accent)">감사 로그</BT></Box>

    <div style={{ position: 'absolute', left: 100, top: 770, fontSize: 28, fontWeight: 600, color: c.muted }}>넓혀 가는 순서</div>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 816, display: 'flex', alignItems: 'center', gap: 20 }}>
      <PathStep n="1" title="자체 운영" desc="임직원 23명 상시 사용" />
      <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--osd-accent)' }}>→</span>
      <PathStep n="2" title="제조기업 검증" desc="자동차 부품 제조기업에 배포" />
      <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--osd-accent)' }}>→</span>
      <PathStep n="3" title="넓혀 가기" desc="다품종 소량 수주 B2B 제조" active />
    </div>
    <Footer />
  </div>
);

const ClosingCard = ({ word, title, desc }: { word: string; title: string; desc: ReactNode }) => (
  <div style={{ border: `1px solid ${c.hairline}`, borderTop: '6px solid var(--osd-accent)', borderRadius: 'var(--osd-radius)', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <span style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, color: 'var(--osd-accent)' }}>{word}</span>
    <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>{title}</span>
    <span style={{ fontSize: 28, color: c.body, lineHeight: 1.45 }}>{desc}</span>
  </div>
);

const Closing: Page = () => (
  <div style={page}>
    <Header section="04" path="정리" />
    <Title sub="그래서 제조기업에는 이것이 남습니다">
      담당자가 바뀌어도 <Em>업무 내용</Em>이 그대로 이어집니다
    </Title>
    <div style={{ position: 'absolute', left: 100, right: 100, top: 330, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      <ClosingCard word="거래처" title="금액의 이유까지 기록" desc={<>금액뿐 아니라<br />왜 그 금액이었는지까지 남습니다</>} />
      <ClosingCard word="납기" title="영업과 생산이 같은 내용을 봄" desc={<>누가 어떤 근거로 약속했는지<br />나중에도 추적할 수 있습니다</>} />
      <ClosingCard word="입찰" title="참여 이력이 그대로 증빙" desc={<>이번 참여 기록이<br />다음 입찰의 실적 근거가 됩니다</>} />
    </div>
    <KeyCard style={{ position: 'absolute', left: 100, right: 100, top: 730, fontSize: 44, padding: '40px 48px' }}>
      입력하지 않아도 자동으로 쌓이고, <b>담당자가 승인한 것만</b> 회사 기록으로 남습니다.
    </KeyCard>
    <Footer />
  </div>
);

const Thanks: Page = () => (
  <div style={page}>
    <img src={logo} alt="code.presso" style={{ position: 'absolute', left: 100, top: 100, height: 52 }} />
    <div style={{ position: 'absolute', left: 100, top: 380 }}>
      <h1 style={{ margin: 0, fontSize: 120, fontWeight: 700 }}>감사합니다</h1>
      <div style={{ marginTop: 28, fontSize: 40, color: c.muted }}>질의응답</div>
      <div style={{ marginTop: 48 }}><Rule /></div>
      <div style={{ marginTop: 32, fontSize: 32, fontWeight: 500 }}>(주)코드프레소 · codepresso.kr</div>
      <div style={{ marginTop: 12, fontSize: 28, color: c.muted }}>신세라 · sera.shin@codepresso.kr</div>
    </div>
    <SideBand />
  </div>
);

export const meta: SlideMeta = {
  title: 'AXLE · 제2회 제조AI 솔루션 공모전 2차 대면평가',
  createdAt: '2026-09-30T10:25:01.926Z',
  theme: 'codepresso-report',
};

export default [
  Cover,
  Toc,
  Divider01,
  Problem,
  ValueChain,
  Structure,
  DataFlow,
  Strengths,
  Divider02,
  KmsRecommend,
  KmsRecommendVideo,
  BidReview,
  BidReviewVideo,
  Mcp,
  McpVideo,
  Divider03,
  MultiLlm,
  MultiLlmResult,
  MultiLlmVideo,
  PromptAdmin,
  PromptAdminVideo,
  Divider04,
  FieldFit,
  Onboarding,
  Effect,
  Business,
  Closing,
  Thanks,
] satisfies Page[];

export const notes: (string | undefined)[] = [
  // 1 Cover · 0:30
  `[30초 · 누적 0:30]
안녕하십니까. 코드프레소 신세라입니다.
AXLE은 수레바퀴의 축이라는 뜻입니다. 쌓아 둔 지식과 실제 업무를 하나로 이어 주는 축이 되겠다는 뜻으로 지었습니다.
한 문장으로 말씀드리면, 담당자가 이미 주고받은 메일과 문서를 AI가 읽고 기록할 내용을 먼저 정리해 둡니다. 담당자는 확인하고 승인만 누르면 됩니다.`,
  // 2 TOC · 0:15
  `[15초 · 누적 0:45]
오늘은 네 가지 순서로 말씀드리겠습니다. 제조현장의 문제, 업무를 하는 AI, 그 AI를 운영하는 구조, 마지막으로 현장 적용성과 사업화입니다.`,
  // 3 Divider 01
  undefined,
  // 4 Problem · 1:00
  `[1분 · 누적 1:45]
먼저 제조현장 이야기부터 하겠습니다. 중소 제조기업을 만나 보면 같은 문제가 계속 나옵니다. 크게 세 가지입니다.
첫째, 거래처와 어떤 조건으로 협의했는지는 담당자 메일함과 수첩에만 있습니다. ERP에는 금액과 날짜만 남습니다. 그래서 담당자가 바뀌면 그 이유도 같이 사라집니다.
둘째, 영업이 전화로 약속한 납기를 생산은 발주서를 받고 나서야 처음 압니다.
셋째, 입찰이나 지원사업에 낼 실적 증빙은 매번 처음부터 다시 모읍니다.
세 문제는 원인이 하나인데요, 정보가 생기는 곳과 기록되는 곳이 서로 다릅니다. 지금은 그 차이를 사람이 일일이 손으로 입력해서 메우고 있습니다.`,
  // 5 Value chain · 0:50
  `[50초 · 누적 2:35]
제조 가치사슬로 놓고 보면 더 분명합니다. 설계에는 PLM, 생산에는 MES, 물류에는 WMS, 회계에는 ERP가 있습니다. 가운데는 시스템이 꽤 잘 갖춰져 있습니다.
그런데 양쪽 끝이 비어 있습니다. 견적, 단가 협의, 납기 약속 같은 수주 전 업무, 그리고 정산, 클레임, 실적 증빙 같은 납품 후 업무입니다. 이 업무들은 지금 개인 메일함과 담당자 PC, 수첩에만 남습니다.
AXLE은 MES나 ERP를 바꾸자는 제안이 아닙니다. 기존 시스템이 못 챙기는 이 앞뒤 업무를 채워 드립니다.`,
  // 6 Structure · 1:20
  `[1분 20초 · 누적 3:55]
그러면 AXLE이 이 빈칸을 어떻게 채우는지, 전체 구조부터 보여 드리겠습니다. 왼쪽에서 오른쪽으로 보시면 됩니다.
메일, 문서, 회의록 같은 자료가 들어오면 KMS가 지식 그래프로 정리합니다. AI는 이 지식 그래프를 보고 기록해 둘 만한 내용을 후보로 추천합니다.
담당자가 웹 화면이나 Claude 같은 AI 챗봇에서 승인하면, 그때 비로소 CRM, PMS, TMS에 정식 기록으로 남습니다.
아래 줄은 공공 조달 공고입니다. 공고는 AI가 첨부 원문을 읽고 조건을 검토한 뒤, 똑같이 사람의 승인을 거쳐서 기록됩니다. 이게 두 번째 강점입니다.
이 기록은 아래 점선처럼 다시 지식으로 돌아가서 다음 추천의 참고 자료가 됩니다. 쓰면 쓸수록 참고할 기록이 늘어납니다.
맨 아래는 AI 운영 기능입니다. 어떤 AI 모델을 쓸지, AI가 어떤 기준으로 판단할지를 고객사가 직접 정하실 수 있습니다. 이 부분은 뒤에서 자세히 말씀드리겠습니다.`,
  // 7 Data flow · 1:05
  `[1분 5초 · 누적 5:00]
이 흐름이 하루 동안 실제로 어떻게 돌아가는지 보겠습니다. 원칙은 간단합니다. 비용이 안 드는 작업은 자주, AI가 필요한 작업은 하루 한 번만 합니다.
메일, 채팅, 문서, 회의록을 모으는 일은 AI를 쓰지 않으니까 매시간 돌립니다.
AI 분석은 새벽 3시에 한꺼번에 묶어서 지식 그래프로 만들고, 6시 30분에 운영 DB로 옮깁니다. 그리고 오전 10시에 AI가 추천 후보를 만듭니다. 파란색으로 표시한 두 단계만 AI를 쓰기 때문에 AI 비용을 아낄 수 있습니다.
기록에 반영되는 건 사람이 승인하는 순간 한 번뿐입니다.
아래쪽 공공 조달 공고와 홈페이지 문의는 이미 형식이 정해진 데이터라서, 분류 없이 바로 입찰공고와 리드로 들어갑니다. 들어오는 길은 달라도 최종 기록은 한 곳에 모입니다.`,
  // 8 Strengths · 0:40
  `[40초 · 누적 5:40]
오늘 평가에서 가장 중요하게 보실 부분이 AI 적용일 텐데요, AXLE에서 AI가 실제로 일하는 곳은 다섯 가지입니다.
앞의 세 가지, KMS 추천, 입찰공고 조건 검토, MCP 연결은 AI가 직접 업무를 하는 부분입니다.
뒤의 두 가지, 멀티 LLM 평가와 Prompt·Skill 관리는 고객사가 그 AI를 직접 유지하고 운영하게 해 주는 부분입니다.
다섯 가지 모두 원칙은 같습니다. AI는 초안만 만들고, 최종 결정은 사람이 합니다.`,
  // 9 Divider 02
  undefined,
  // 10 KMS · 1:10
  `[1분 10초 · 누적 6:50]
첫 번째는 KMS와 AI 추천입니다.
AI가 지식 그래프를 읽고 고객사, 리드, 과업 같은 기록 후보를 만듭니다. 후보마다 판단 근거와 신뢰도가 함께 붙습니다.
그런데 AI는 틀릴 수 있습니다. 그래서 기록되기 전에 세 번 확인하도록 만들었습니다.
첫째, 원문에서 확인되지 않는 출처는 걸러냅니다. 9월 점검 때 3,639개 가운데 616개를 이렇게 걸러냈습니다.
둘째, 같은 회사가 메일로도, 회의록으로도 들어올 수 있으니까 사업자번호, 도메인, 이메일로 이미 있는 회사인지 먼저 확인합니다.
셋째, 사람이 승인하지 않으면 기록은 바뀌지 않습니다.
지금 제 계정 하나에만 12일 동안 186건의 후보가 쌓여 있습니다. 전부 제가 직접 입력하지 않은 것들입니다.`,
  // 11 KMS video · 1:00
  `[1분 · 누적 7:50]
실제 화면으로 보여 드리겠습니다. [영상 화면을 눌러 재생]
추천 목록에 AI가 메일과 회의록에서 찾은 리드 후보가 떠 있습니다. 이 가운데 한 건을 골라 보겠습니다.
카드를 보시면 신뢰도와 판단 이유, 그리고 어느 메일에서 나왔는지 출처가 같이 보입니다. 담당자는 이걸 보고 판단합니다.
승인을 누르면 AI가 회사와 담당자 정보를 미리 채워 둔 입력 화면이 열립니다. 확인하고 만들면 리드와 함께 고객사와 담당자도 자동으로 생깁니다. 회사 정보나 연락처를 따로 입력할 필요가 없습니다.
새로운 고객사이기 때문에 ICP 적합도 채점도 바로 이어집니다. 리드 화면에 점수와 등급, 그리고 왜 그 점수인지 근거가 남습니다.
승인 한 번으로 여기까지 이어집니다.`,
  // 12 Bid review · 1:10
  `[1분 10초 · 누적 9:00]
두 번째는 입찰공고 조건 검토입니다.
나라장터, K-Startup, 기업마당 공고를 매일 새벽 자동으로 모아서 키워드, 참가 지역, 업종으로 한 번 거릅니다.
담당자가 조건 검토를 누르면 AI가 공고에 붙은 첨부파일, 그러니까 PDF나 HWP를 직접 내려받아 읽습니다.
보는 순서는 참가 자격부터입니다. 지역과 업종이 맞는지, 사업 성격이 우리와 맞는지, 평가 기준으로 봤을 때 해볼 만한지를 차례로 봅니다.
공고문에 없는 내용은 지어내지 않고 확인필요로 표시합니다. 판정은 어디까지나 초안이고, 담당자가 고쳐서 저장한 것만 남습니다.
오늘 기준으로 5건을 검토했고, 유망이 4건, 확인필요가 1건이었습니다.`,
  // 13 Bid video · 1:00
  `[1분 · 누적 10:00]
[영상 화면을 눌러 재생] 새벽에 들어온 공고 가운데 5건 이상을 조건 검토한 결과입니다. 목록에 공고마다 유망, 확인필요, 부적합 판정이 붙어 있습니다.
한 건을 열어 보겠습니다. 판정 항목마다 근거가 붙어 있는데요, 참가 자격, 지역과 업종, 사업 성격, 평가 방식 순서로 원문의 어느 부분을 보고 그렇게 판단했는지가 남아 있습니다.
공고문에서 찾지 못한 내용은 이렇게 확인필요로 표시됩니다.
그래서 담당자는 공고를 처음부터 끝까지 읽지 않아도 됩니다. 근거를 훑어보고, 확인필요로 표시된 부분만 원문에서 확인한 다음 판정을 확정하면 됩니다.`,
  // 14 MCP · 1:15
  `[1분 15초 · 누적 11:15]
세 번째는 MCP 연결과 지식 쌓기입니다.
MCP는 AI와 업무 시스템을 연결하는 표준 방식입니다. AXLE의 업무 기능을 MCP로 열어 두었기 때문에, Claude 같은 AI 챗봇에서 말로 물어보고 승인까지 할 수 있습니다.
여기서 중요한 건 저장인데요, AI가 저장을 요청해도 바로 저장하지 않습니다. 무엇을 저장할지 먼저 보여 주고, 사람이 승인해야 확정됩니다. 이때 권한이 있는지, 빠진 항목은 없는지 한 번 더 확인합니다.
사람이 화면에서 쓰든 AI가 챗봇으로 쓰든 승인 절차는 똑같습니다. 승인된 기록은 다시 KMS에 쌓여서 다음 검색과 추천에 쓰입니다.
연결 방법은 두 가지입니다. PC에서는 Claude Code나 Claude 데스크톱에 개인 토큰 하나로 연결합니다. 휴대폰에서는 claude.ai에 커넥터를 한 번만 추가하면, 이동 중에도 Claude 앱에서 똑같이 쓸 수 있습니다.`,
  // 15 MCP video · 1:00
  `[1분 · 누적 12:15]
[영상 화면을 눌러 재생] Claude에 AXLE을 연결해 두었습니다.
오늘 내 할 일 정리해 달라고 말하면 AXLE에서 제 할 일을 불러옵니다. 미완료 13건 가운데 오늘 처리할 7건, 그러니까 마감이 지난 3건과 오늘 마감인 4건을 프로젝트별로 정리해 줍니다.
이어서 마감 지난 것도 알려 달라고 하면, 다시 찾아서 지연된 3건을 며칠 지났는지와 함께 보여 줍니다. 여기까지는 9월 30일 실제 화면이고, 고객명만 가렸습니다.
상태를 바꿔 달라고 하면 바로 바꾸지 않고, 바꿀 내용부터 보여 줍니다. 사람이 승인해야 확정됩니다. 이 부분은 실제 데이터를 건드리지 않으려고 예시로 보여 드립니다.
마지막으로 같은 할 일이 웹 화면에도 그대로 보입니다. 사람과 AI가 같은 데이터를 보고, 같은 절차로 일합니다.`,
  // 16 Divider 03
  undefined,
  // 17 Multi LLM · 1:05
  `[1분 5초 · 누적 13:20]
여기서부터는 AI를 운영하는 구조입니다. 네 번째, 멀티 LLM 평가입니다.
AXLE은 특정 AI 모델에 묶여 있지 않습니다. 후보 모델 네 가지를, 실제로 쓰고 있는 프롬프트 다섯 가지로 나란히 돌려서 비교합니다. 응답 시간, 토큰, 비용은 자동으로 나오고, 형식을 지켰는지, 분류가 맞았는지는 사람이 채점합니다.
지금 쓰는 모델은 Upstage Solar Pro 4입니다. 입력 단가가 100만 토큰당 0.03달러로, Claude Sonnet의 67분의 1 정도입니다. 같은 조건으로 비교해 봤기 때문에 자신 있게 고를 수 있었습니다.
처음에는 JSON 형식을 18건 중에 2건만 지켰는데, 프롬프트를 한 줄 보강하니까 16건 모두 지켰습니다. 이런 차이를 바꾸기 전에 미리 확인할 수 있습니다.`,
  // 18 Multi LLM result · 0:45
  `[45초 · 누적 14:05]
9월 30일에 실제로 돌려 본 결과입니다. 회의록 분류, ICP 채점, 에이전트 도구 호출, 이렇게 실제로 쓰는 프롬프트 세 가지를 두 모델에 똑같이 넣었습니다.
자동 검사는 두 모델 모두 세 건을 다 통과했습니다. 그런데 비용은 Solar Pro 4가 약 0.0003달러, Sonnet이 0.041달러로, 160분의 1 정도입니다. 속도는 비슷했습니다.
그래서 지금은 Solar Pro 4로 운영하고 있고, 품질 기준이 바뀌면 같은 방법으로 다시 비교해서 바꾸면 됩니다.`,
  // 19 Multi LLM video · 0:35
  `[35초 · 누적 14:40]
[영상 화면을 눌러 재생] 관리자 화면입니다. 기능별로 어떤 모델을 쓸지 여기서 고릅니다.
같은 샘플을 넣고 지금 모델과 후보 모델을 나란히 돌려 보겠습니다. 시간, 토큰, 비용이 바로 비교되고, 결과는 사람이 보고 채점합니다.
마음에 드는 모델로 바꾸고 저장하면 끝입니다. 개발자를 부르거나 다시 배포할 필요 없이 바로 바뀝니다.`,
  // 20 Prompt admin · 0:50
  `[50초 · 누적 15:30]
다섯 번째는 Prompt와 Skill 관리입니다.
AI가 무엇을 기준으로 판단하는지는 프롬프트에 적혀 있습니다. 보통은 이게 코드 안에 있거든요. 그래서 기준 하나를 바꾸려 해도 개발자에게 요청하고, 고치고, 테스트하고, 배포하느라 며칠이 걸립니다.
AXLE은 판단 기준 다섯 가지를 관리자 화면으로 꺼내 두었습니다. ICP 채점 기준이나 입찰공고 검토 기준을 담당자가 문장으로 고치고 저장하면, 바로 다음 판단부터 적용됩니다.
견적서 디자인도 말로 지시해서 바꾸고, 마음에 안 들면 이전 템플릿으로 되돌릴 수 있습니다.`,
  // 21 Prompt video · 0:35
  `[35초 · 누적 16:05]
[영상 화면을 눌러 재생] ICP 채점 기준 화면입니다. 기준 문장 하나를 고쳐 보겠습니다. 저장하면 다음 채점부터 바로 반영됩니다.
이번에는 견적서입니다. 디자인을 말로 바꿔 달라고 하고, PDF로 결과를 확인합니다. 마음에 안 들면 이렇게 이전으로 되돌리면 됩니다.`,
  // 22 Divider 04
  undefined,
  // 23 Field fit · 0:50
  `[50초 · 누적 16:55]
이제 현장 적용성입니다. AXLE은 만든 저희가 먼저 쓰고 있습니다. 코드프레소 임직원 23명이 영업, 운영, 제품, R&D 업무에 매일 쓰고 있습니다. 최근 30일 동안 AI가 메일과 회의록, 문서에서 기록 후보 13,484건을 자동으로 추천했습니다. 한 사람에게 하루 평균 20건 정도가 올라오는 셈입니다. 입찰공고와 사업공고 116건도 사람 손을 거치지 않고 세 곳에서 자동으로 들어와 관리되고 있습니다.
제조기업 검증은 대구에 있는 차량 전장부품 제조기업에서 하고 있습니다. 임직원 53명 규모의 회사로, 완성차 OEM에 차량용 컨트롤러를 납품합니다.
7월 말에 셋업하고 8월 18일부터 실제로 쓰기 시작했습니다. 현재 실무자 7명이 CRM에 직접 입력하며 쓰고 있습니다.`,
  // 24 Onboarding · 0:35
  `[35초 · 누적 17:30]
도입 부담도 크지 않습니다. 처음에 네 가지만 설정하면 끝입니다. 회사 계정으로 로그인하고, 자료 연동에 동의하고, 업무 시스템과 지식 조회를 연결하면 됩니다.
설치는 회사마다 따로 하고, 데이터베이스와 인증도 회사별로 나뉩니다. ERP와 MES는 그대로 쓰시면 되기 때문에 기존 시스템을 바꾸실 필요가 없습니다.`,
  // 25 Effect · 0:45
  `[45초 · 누적 18:15]
도입하면 무엇이 달라지는지 정리해 보겠습니다.
메일을 읽고 다른 화면에 다시 입력하던 일은, 추천을 보고 승인하거나 반려하는 일로 바뀝니다. 공고를 찾고 조건을 하나하나 거르던 일은, 검토 초안이 붙은 목록에서 관심 있는 것만 판단하는 일로 바뀝니다. 담당자가 바뀌어도 말로 인수인계할 필요 없이, 후임자가 거래처 화면에서 바로 확인합니다.
담당자가 새로 배울 건 두 가지, 승인과 반려뿐입니다.`,
  // 26 Business · 0:45
  `[45초 · 누적 19:00]
사업화입니다. 제조기업에게 도면, 단가, 거래처 협의 이력은 회사의 핵심 자산입니다. 외부로 나가면 안 되는 정보입니다.
그래서 저희는 프로그램만 공급하고, 업무 데이터는 고객사 서버에 그대로 둡니다. 업무 데이터, 지식 그래프, 인증, 감사 로그가 모두 고객사 안에 있습니다.
사업은 이 순서로 넓혀 가겠습니다. 저희가 먼저 쓰고, 자동차 부품 제조기업에서 검증하고, 그다음 다품종 소량 수주 구조를 가진 B2B 제조기업으로 넓혀 갈 계획입니다.`,
  // 27 Closing · 0:30
  `[30초 · 누적 19:30]
정리하겠습니다. AXLE을 쓰면 담당자가 바뀌어도 업무 내용이 그대로 이어집니다. 거래처와 왜 그 금액으로 했는지, 누가 어떤 근거로 납기를 약속했는지, 지난 입찰에서 무엇을 했는지가 남습니다.
직접 입력하지 않아도 쌓이고, 담당자가 승인한 것만 회사 기록으로 남습니다. 감사합니다.`,
  // 28 Thanks
  `[누적 19:35]
질문 주시면 답변드리겠습니다.`,
];
