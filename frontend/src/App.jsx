import { useState, useRef, useEffect } from "react";
import {
  Upload, Cpu, Database, AlertTriangle, BarChart3, Leaf, History,
  CheckCircle2, Camera, CameraOff, SwitchCamera, Scan, Sprout,
  Globe, Recycle, TreePine, Home, FlaskConical, BookOpen, Settings,
  Info, ChevronRight, Trash2, Wind, Droplets, Package, Zap, ArrowRight,
  BarChart2, Target, Award, TrendingUp, Map, Brain, ShieldCheck,
} from "lucide-react";

/* ─── Styles ──────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --soil:      #1C2B1A;
    --bark:      #263824;
    --moss:      #2E4D2B;
    --fern:      #3A6635;
    --leaf:      #4E8A46;
    --sprout:    #6FAF63;
    --dew:       #9ED494;
    --mist:      #C8ECC2;
    --parchment: #F2EEE5;
    --cream:     #F9F6F0;
    --sand:      #E6DAC6;
    --clay:      #C2A47E;
    --amber:     #B8793A;
    --rust:      #8C4515;
    --sky:       #6BA8C2;
    --river:     #3E8FA8;
    --stone:     #7A9178;
    --ash:       #5D7060;
    --t-dark:    #162316;
    --t-mid:     #2E4E2E;
    --t-soft:    #587258;
    --t-muted:   #8AA888;
    --border:    rgba(46,77,43,0.13);
    --border-s:  rgba(46,77,43,0.26);
    --shadow:    0 4px 24px rgba(28,43,26,0.10);
    --shadow-lg: 0 8px 40px rgba(28,43,26,0.15);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--t-dark);
    min-height: 100vh;
    font-size: 15px;
    line-height: 1.7;
  }

  h1,h2,h3,h4 { font-family: 'Fraunces', Georgia, serif; line-height: 1.2; color: var(--soil); }

  /* grain overlay */
  body::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:9999;
    opacity:0.025;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:180px;
  }

  /* ── Top navbar ── */
  .topbar {
    background: var(--soil);
    border-bottom: 1px solid rgba(110,175,99,0.14);
    position: sticky; top: 0; z-index: 200;
  }
  .topbar-in {
    max-width: 1340px; margin: 0 auto;
    padding: 0 2rem; height: 68px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .logo-wrap { display:flex; align-items:center; gap:12px; cursor:pointer; }
  .logo-mark {
    width:42px; height:42px; background:linear-gradient(135deg, var(--fern), var(--leaf));
    border-radius:12px; display:flex; align-items:center; justify-content:center;
    box-shadow: 0 2px 10px rgba(78,138,70,0.35);
  }
  .logo-eye { font-size:10px; color:var(--stone); letter-spacing:.12em; text-transform:uppercase; }
  .logo-nm  { font-family:'Fraunces',serif; font-size:17px; color:var(--mist); letter-spacing:-.01em; line-height:1.1; }

  /* ── Main tab bar ── */
  .main-tabs {
    display: flex; align-items: center; gap: 2px;
  }
  .main-tab {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 16px; border-radius: 9px;
    border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    transition: all .2s; background: transparent; color: var(--stone);
    letter-spacing: .01em;
  }
  .main-tab:hover { color: var(--dew); background: rgba(255,255,255,.06); }
  .main-tab.active { color: var(--dew); background: rgba(110,175,99,.15); }
  .main-tab .dot { width:6px;height:6px;border-radius:50%;background:var(--sprout);display:none; }
  .main-tab.active .dot { display:block; }

  /* ── SDG bar ── */
  .sdg { background: var(--moss); padding:9px 2rem; text-align:center; }
  .sdg p { font-size:12px; color:var(--dew); letter-spacing:.05em; opacity:.85; }

  /* ── Page container ── */
  .page { display:none; }
  .page.active { display:block; }

  /* ══ HOME PAGE ══ */
  .hero {
    background: var(--soil); position:relative; overflow:hidden;
    padding: 6rem 2rem 5rem;
  }
  .hero::before {
    content:''; position:absolute; inset:0;
    background:
      radial-gradient(ellipse 60% 80% at 85% 50%, rgba(58,102,53,.28) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 5% 90%, rgba(78,138,70,.16) 0%, transparent 65%),
      radial-gradient(ellipse 30% 40% at 40% 10%, rgba(46,77,43,.20) 0%, transparent 60%);
  }
  .hero-ring { position:absolute; border-radius:50%; border:1px solid rgba(110,175,99,.08); }
  .hero-in {
    max-width:1340px; margin:0 auto; position:relative; z-index:1;
    display:grid; grid-template-columns:1.1fr .9fr; gap:4rem; align-items:center;
  }
  .badge {
    display:inline-flex; align-items:center; gap:7px;
    background: rgba(110,175,99,.12); border:1px solid rgba(110,175,99,.24);
    border-radius:100px; padding:5px 14px 5px 9px;
    font-size:11.5px; color:var(--dew); letter-spacing:.04em; margin-bottom:1.4rem;
  }
  .badge-dot { width:6px;height:6px;border-radius:50%;background:var(--sprout); }
  .hero-title { font-size:clamp(2.2rem,3.8vw,3.2rem); color:#fff; line-height:1.12; margin-bottom:1.1rem; font-weight:600; }
  .hero-title em { font-style:italic; color:var(--sprout); }
  .hero-desc { color:var(--stone); font-size:15px; line-height:1.85; max-width:490px; margin-bottom:2rem; }
  .cta-row { display:flex; gap:10px; flex-wrap:wrap; }
  .btn-p {
    background: linear-gradient(135deg, var(--fern), var(--leaf));
    color:#fff; border:none; border-radius:11px; padding:12px 24px;
    font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:600;
    cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:7px;
    box-shadow: 0 4px 14px rgba(78,138,70,.4);
    transition: transform .15s, box-shadow .2s;
  }
  .btn-p:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(78,138,70,.5); }
  .btn-o {
    background:transparent; color:var(--mist); border:1px solid rgba(200,236,194,.22);
    border-radius:11px; padding:12px 24px;
    font-family:'DM Sans',sans-serif; font-size:13.5px; cursor:pointer;
    text-decoration:none; display:inline-flex; align-items:center; gap:7px;
    transition:all .2s;
  }
  .btn-o:hover { background:rgba(200,236,194,.07); border-color:rgba(200,236,194,.38); }

  /* Hero stat cards */
  .hero-stats { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .hstat {
    background: rgba(255,255,255,.04); border:1px solid rgba(110,175,99,.13);
    border-radius:16px; padding:1.2rem 1.3rem; backdrop-filter:blur(4px);
    transition: background .2s;
  }
  .hstat:hover { background: rgba(110,175,99,.08); }
  .hstat-icon { width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:.8rem; }
  .hstat h3 { font-family:'Fraunces',serif; font-size:15px; color:var(--mist); margin-bottom:.3rem; }
  .hstat p  { font-size:12.5px; color:var(--stone); line-height:1.5; }

  /* ── Section wrappers ── */
  .wrap { max-width:1340px; margin:0 auto; padding:4.5rem 2rem; }
  .wrap-alt { background:var(--parchment); }
  .wrap-dark { background:var(--soil); }
  .divider { height:1px; background:linear-gradient(90deg,transparent,var(--border-s),transparent); }
  .eyebrow { font-size:11px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; margin-bottom:.55rem; }
  .sec-title { font-size:clamp(1.55rem,2.8vw,2.1rem); margin-bottom:2.25rem; }
  .sec-title-light { color:var(--cream); }
  .sec-lead { font-size:15px; color:var(--t-soft); line-height:1.8; max-width:680px; margin-bottom:2.5rem; }

  /* ── Inner tab bar (classification sub-tabs) ── */
  .sub-tabs {
    display:flex; gap:6px; margin-bottom:2rem;
    background:var(--parchment); border:1px solid var(--border);
    border-radius:13px; padding:5px; width:fit-content;
  }
  .sub-tab {
    display:flex; align-items:center; gap:7px; padding:9px 20px;
    border-radius:9px; border:none; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    transition:all .2s; background:transparent; color:var(--t-soft);
  }
  .sub-tab.on { background:var(--moss); color:var(--dew); box-shadow:0 2px 10px rgba(46,77,43,.25); }
  .sub-tab:not(.on):hover { background:var(--sand); color:var(--t-dark); }

  /* ── Cards ── */
  .card {
    background:#fff; border:1px solid var(--border); border-radius:20px;
    padding:1.9rem; position:relative; overflow:hidden;
    box-shadow: var(--shadow);
  }
  .card::before {
    content:''; position:absolute; top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--leaf),var(--dew),var(--sprout));
    border-radius:20px 20px 0 0;
  }
  .card-icon { width:48px;height:48px;border-radius:13px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;background:var(--mist); }
  .card-title { font-family:'Fraunces',serif; font-size:1.25rem; margin-bottom:.5rem; }
  .card-desc  { font-size:13.5px; color:var(--t-soft); line-height:1.65; margin-bottom:1.25rem; }

  .g2 { display:grid; grid-template-columns:1fr .85fr; gap:1.4rem; }
  .gcol { display:flex; flex-direction:column; gap:1.25rem; }

  /* ── Camera ── */
  .cam-view {
    background:var(--bark); border-radius:14px; overflow:hidden;
    position:relative; min-height:235px;
    display:flex; align-items:center; justify-content:center; margin:1.1rem 0;
  }
  .cam-ph { text-align:center; padding:2rem; color:var(--stone); }
  .live-badge {
    position:absolute;top:11px;left:11px;
    background:rgba(20,38,20,.72); border:1px solid rgba(110,175,99,.38);
    border-radius:100px; padding:3px 11px;
    display:flex; align-items:center; gap:6px;
    font-size:11px; color:var(--dew); letter-spacing:.04em;
  }
  .live-dot { width:7px;height:7px;border-radius:50%;background:var(--sprout);animation:pulse 1.4s ease-in-out infinite; }
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

  /* ── Buttons ── */
  .btn-g {
    background: linear-gradient(135deg,var(--fern),var(--leaf));
    color:#fff; border:none; border-radius:11px; padding:10px 20px;
    font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:600;
    cursor:pointer; display:inline-flex; align-items:center; gap:7px;
    box-shadow: 0 3px 12px rgba(78,138,70,.35);
    transition:transform .15s, box-shadow .2s;
  }
  .btn-g:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 5px 18px rgba(78,138,70,.45); }
  .btn-g:disabled { opacity:.45; cursor:not-allowed; }
  .btn-gh {
    background:var(--parchment); color:var(--t-mid); border:1px solid var(--border-s);
    border-radius:11px; padding:10px 17px;
    font-family:'DM Sans',sans-serif; font-size:13px;
    cursor:pointer; display:inline-flex; align-items:center; gap:6px; transition:background .2s;
  }
  .btn-gh:hover { background:var(--sand); }
  .ctrl-row { display:flex; flex-wrap:wrap; gap:9px; align-items:center; margin-top:.9rem; }

  /* ── Results ── */
  .res-box {
    background:linear-gradient(135deg,#eef7e9,#e0f3d6);
    border:1px solid rgba(78,138,70,.28); border-radius:14px; padding:1.2rem; margin-top:1.1rem;
  }
  .res-cls  { font-family:'Fraunces',serif; font-size:1.15rem; color:var(--moss); margin-bottom:4px; }
  .res-conf { font-size:13px; color:var(--t-soft); }

  .err-box {
    background:#fff8f2; border:1px solid rgba(184,115,51,.28);
    border-radius:13px; padding:.9rem 1.1rem; margin-top:.9rem;
    color:var(--rust); font-size:13.5px;
  }

  /* ── Disposal suggestion panel ── */
  .disposal-panel {
    background: linear-gradient(135deg,#eef9e8,#e5f5dc);
    border: 1px solid rgba(78,138,70,.3); border-radius:16px;
    padding:1.4rem; margin-top:1.2rem;
    animation: fadeIn .35s ease;
  }
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .disposal-head {
    display:flex;align-items:center;gap:9px;margin-bottom:1rem;
    border-bottom:1px solid rgba(78,138,70,.18);padding-bottom:.85rem;
  }
  .disposal-head h4 { font-family:'Fraunces',serif;font-size:1rem;color:var(--moss); }
  .disposal-tag {
    display:inline-flex;align-items:center;gap:5px;
    background:var(--leaf);color:#fff;border-radius:8px;
    padding:3px 11px;font-size:11.5px;font-weight:600;margin-bottom:.9rem;letter-spacing:.02em;
  }
  .disposal-steps { display:flex;flex-direction:column;gap:8px; }
  .dstep {
    display:flex;align-items:flex-start;gap:10px;
    background:#fff;border-radius:11px;padding:10px 13px;
    border:1px solid rgba(78,138,70,.14);font-size:13px;color:var(--t-mid);
  }
  .dstep-num {
    width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,var(--fern),var(--leaf));
    color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;
    flex-shrink:0;margin-top:1px;
  }
  .disposal-tip {
    background:rgba(78,138,70,.07);border-radius:10px;padding:10px 13px;
    font-size:12.5px;color:var(--t-soft);margin-top:.85rem;
    display:flex;gap:8px;align-items:flex-start;
  }

  /* ── History ── */
  .history {
    background:var(--parchment);border:1px solid var(--border);
    border-radius:20px;padding:1.9rem;margin-top:1.5rem;
  }
  .history-head { display:flex;align-items:center;gap:9px;margin-bottom:1.1rem; }
  .history-title { font-family:'Fraunces',serif;font-size:1.15rem; }
  .hgrid { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
  .hcard-item {
    background:#fff;border:1px solid var(--border);border-radius:14px;
    padding:1rem 1.1rem;box-shadow:0 2px 12px rgba(28,43,26,.06);
  }
  .hcard-top { display:flex;align-items:center;justify-content:space-between;margin-bottom:.8rem; }
  .hl { font-size:10.5px;color:var(--t-muted);text-transform:uppercase;letter-spacing:.08em; }
  .hv { font-size:13.5px;color:var(--t-dark); }
  .hcls { font-family:'Fraunces',serif;font-size:.98rem;color:var(--moss); }
  .empty {
    background:#fff;border:1px dashed var(--border-s);border-radius:13px;
    padding:1.5rem;text-align:center;color:var(--t-muted);font-size:13px;
  }

  /* ── Setup list ── */
  .setup-list { display:flex;flex-direction:column;gap:9px;margin-top:1.1rem; }
  .setup-item {
    background:var(--parchment);border:1px solid var(--border);border-radius:11px;
    padding:12px 15px;font-size:13px;color:var(--t-mid);
    display:flex;align-items:center;gap:9px;
  }
  .setup-dot { width:7px;height:7px;border-radius:50%;background:var(--leaf);flex-shrink:0; }

  /* ── Dataset cards ── */
  .dgrid { display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem; }
  .dcard {
    background:#fff;border:1px solid var(--border);border-radius:16px;
    padding:1.35rem 1.4rem;position:relative;overflow:hidden;
    box-shadow:var(--shadow);transition:transform .2s,box-shadow .2s;
  }
  .dcard:hover { transform:translateY(-3px);box-shadow:var(--shadow-lg); }
  .dcard::after { content:'';position:absolute;bottom:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,var(--dew),var(--sky)); }
  .dname { font-family:'Fraunces',serif;font-size:1.05rem;color:var(--soil);margin-bottom:6px; }
  .dinfo { font-size:13px;color:var(--t-soft);line-height:1.55; }
  .dtag {
    display:inline-block;margin-top:10px;background:var(--mist);color:var(--moss);
    font-size:11px;font-weight:600;border-radius:6px;padding:3px 9px;letter-spacing:.04em;
  }

  /* ── Model chips ── */
  .chip-wrap { display:flex;flex-wrap:wrap;gap:9px; }
  .chip {
    background:#fff;border:1px solid var(--border-s);border-radius:10px;
    padding:9px 16px;font-size:13px;color:var(--t-mid);
    transition:background .15s,border-color .15s,transform .15s;cursor:default;
  }
  .chip:hover { background:var(--mist);border-color:var(--leaf);transform:translateY(-1px); }

  /* ── Stats grid (Analytics) ── */
  .stats-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1rem;margin-bottom:2rem; }
  .stat-card {
    background:#fff;border:1px solid var(--border);border-radius:16px;
    padding:1.35rem;box-shadow:var(--shadow);
  }
  .stat-num { font-family:'Fraunces',serif;font-size:2rem;font-weight:600;color:var(--moss);line-height:1; }
  .stat-unit { font-size:12px;color:var(--t-soft);margin-top:4px; }
  .stat-icon { width:38px;height:38px;border-radius:10px;background:var(--mist);display:flex;align-items:center;justify-content:center;margin-bottom:.9rem; }

  /* ── Accuracy bars ── */
  .acc-row { display:flex;flex-direction:column;gap:10px;margin-top:1.2rem; }
  .acc-item {}
  .acc-head { display:flex;justify-content:space-between;align-items:center;margin-bottom:5px; }
  .acc-lbl { font-size:13px;color:var(--t-mid); }
  .acc-pct { font-size:13px;font-weight:600;color:var(--moss); }
  .acc-bar { height:8px;background:var(--sand);border-radius:4px;overflow:hidden; }
  .acc-fill { height:100%;border-radius:4px;background:linear-gradient(90deg,var(--fern),var(--sprout));transition:width .8s cubic-bezier(.4,0,.2,1); }

  /* ── Class guide (impact) ── */
  .class-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem; }
  .class-card {
    background:#fff;border:1px solid var(--border);border-radius:16px;
    padding:1.35rem;box-shadow:var(--shadow);transition:transform .2s;
  }
  .class-card:hover { transform:translateY(-2px); }
  .class-icon { width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:.85rem; }

  /* ── Challenges ── */
  .cgrid { display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px; }
  .ccard {
    background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
    border-radius:14px;padding:1.1rem;display:flex;align-items:flex-start;gap:9px;
  }
  .cicon { width:30px;height:30px;background:rgba(255,255,255,.06);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px; }
  .ctxt { font-size:13px;color:var(--stone);line-height:1.5; }

  /* ── Tips ── */
  .tip {
    display:flex;gap:9px;align-items:flex-start;font-size:13px;color:var(--t-soft);
    padding:9px 0;border-bottom:1px solid var(--border);
  }
  .tip:last-child { border-bottom:none; }

  /* ── Footer ── */
  .footer { background:var(--soil);padding:2.5rem 2rem;text-align:center; }

  /* ── Spinner ── */
  .spin {
    width:16px;height:16px;border:2px solid rgba(78,138,70,.22);
    border-top-color:var(--leaf);border-radius:50%;
    animation:spin .65s linear infinite;flex-shrink:0;
  }
  @keyframes spin{to{transform:rotate(360deg)}}

  /* ── Misc ── */
  input[type=file] { font-family:'DM Sans',sans-serif;font-size:13px;color:var(--t-soft);margin-top:.85rem;display:block; }
  .preview-lbl { font-size:11px;color:var(--t-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:7px; }
  .thumb { border:1px solid var(--border-s);border-radius:12px;overflow:hidden;width:220px;margin-top:.8rem; }
  .cam-thumb { border:1px solid var(--border);border-radius:9px;overflow:hidden;width:110px;margin-bottom:.9rem; }
  .loading-row { display:flex;align-items:center;gap:9px;padding:.9rem 0;color:var(--t-soft);font-size:13.5px; }

  /* ── info box ── */
  .info-box {
    background:rgba(107,168,194,.09);border:1px solid rgba(107,168,194,.25);
    border-radius:13px;padding:1rem 1.15rem;font-size:13px;color:var(--river);
    display:flex;gap:9px;align-items:flex-start;
  }

  @media(max-width:920px){
    .hero-in,.g2{ grid-template-columns:1fr; }
    .hero-stats{ grid-template-columns:1fr 1fr; }
    .main-tabs .main-tab span.lbl { display:none; }
  }
  @media(max-width:640px){
    .hero-stats,.hgrid{ grid-template-columns:1fr; }
  }
`;

/* ─── Disposal data ──────────────────────────────────────────────────── */
const DISPOSAL_GUIDE = {
  cardboard: {
    color: "#B8793A",
    bg:    "#FEF3E7",
    icon:  "📦",
    label: "Cardboard / Paper",
    steps: [
      "Flatten and remove any tape or staples from the cardboard.",
      "Keep it dry — wet cardboard cannot be recycled efficiently.",
      "Place in the blue/yellow paper recycling bin.",
      "Large quantities can be taken to a cardboard collection point.",
    ],
    tip: "Cardboard can be recycled 5–7 times. Composting is a great second option for uncoated cardboard.",
  },
  glass: {
    color: "#3E8FA8",
    bg:    "#E8F5FA",
    icon:  "🫙",
    label: "Glass",
    steps: [
      "Rinse the glass item to remove food or liquid residue.",
      "Remove metal lids (recycle them separately).",
      "Place in the glass-only recycling bin — do not mix with other recyclables.",
      "Broken glass: wrap in newspaper, label 'BROKEN GLASS', place in landfill bin for safety.",
    ],
    tip: "Glass is infinitely recyclable without loss of quality. Never place ceramics, pyrex or light bulbs in glass bins.",
  },
  metal: {
    color: "#5D7070",
    bg:    "#F0F4F4",
    icon:  "🥫",
    label: "Metal / Cans",
    steps: [
      "Rinse cans and tins to remove food residue.",
      "Crush cans lightly to save space (optional).",
      "Place aluminium and steel cans in the recycling bin.",
      "Scrap metal (pipes, appliances) should go to a metal recycling facility.",
    ],
    tip: "Recycling one aluminium can saves enough energy to power a TV for 3 hours.",
  },
  paper: {
    color: "#6FAF63",
    bg:    "#F0F8EE",
    icon:  "📄",
    label: "Paper",
    steps: [
      "Separate clean paper from paper with food stains (the latter goes to compost/landfill).",
      "Shred sensitive documents before recycling.",
      "Bundle newspapers and magazines together.",
      "Place in the paper recycling bin or take to a paper bank.",
    ],
    tip: "One tonne of recycled paper saves 17 trees and 26,500 litres of water.",
  },
  plastic: {
    color: "#4E8A46",
    bg:    "#EEF7EC",
    icon:  "🧴",
    label: "Plastic",
    steps: [
      "Check the resin code (1–7) on the bottom of the item.",
      "Rinse containers to remove residue; labels can stay on.",
      "Codes 1 (PET) and 2 (HDPE) are widely accepted — place in recycling bin.",
      "Codes 3, 6, 7 are often not accepted; check your local council guidelines.",
      "Flexible plastics/bags: return to supermarket collection points.",
    ],
    tip: "Plastic recycling rates drop when items are contaminated with food. Rinse first, always.",
  },
  trash: {
    color: "#8C4515",
    bg:    "#FFF4EE",
    icon:  "🗑️",
    label: "General Waste / Trash",
    steps: [
      "First, double-check if any component can be separated for recycling.",
      "If truly mixed or contaminated waste, bag securely in a black bag.",
      "Place in the general (black) waste bin for landfill collection.",
      "For hazardous household waste (batteries, paint, chemicals) — take to a designated HHW facility.",
    ],
    tip: "Reducing waste at source is always better than disposal. Consider reusing or repairing before discarding.",
  },
};

function DisposalPanel({ predictedClass }) {
  const key = (predictedClass || "").toLowerCase().trim();
  const guide = DISPOSAL_GUIDE[key];
  if (!guide) return null;

  return (
    <div className="disposal-panel">
      <div className="disposal-head">
        <Recycle size={18} color="var(--fern)" />
        <h4>Disposal recommendation</h4>
      </div>
      <div className="disposal-tag">
        <span>{guide.icon}</span>
        {guide.label}
      </div>
      <div className="disposal-steps">
        {guide.steps.map((s, i) => (
          <div key={i} className="dstep">
            <div className="dstep-num">{i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="disposal-tip">
        <Leaf size={14} color="var(--leaf)" style={{ flexShrink: 0, marginTop: 2 }} />
        <span>{guide.tip}</span>
      </div>
    </div>
  );
}

function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [activePage,    setActivePage]    = useState("home");
  const [activeSubTab,  setActiveSubTab]  = useState("upload");

  const [selectedFile, setSelectedFile]  = useState(null);
  const [previewUrl,   setPreviewUrl]    = useState("");
  const [result,       setResult]        = useState("");
  const [confidence,   setConfidence]    = useState("");
  const [error,        setError]         = useState("");
  const [loading,      setLoading]       = useState(false);
  const [historyItems, setHistoryItems]  = useState([]);

  const [cameraActive,  setCameraActive]  = useState(false);
  const [cameraError,   setCameraError]   = useState("");
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraResult,  setCameraResult]  = useState(null);
  const [facingMode,    setFacingMode]    = useState("environment");
  const [capturedThumb, setCapturedThumb] = useState("");
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const models = ["AlexNet","VGG16","ResNet50","MobileNet","Inception-ResNet","DenseNet","YOLO","Mask R-CNN","EfficientDet","CenterNet"];
  const datasets = [
    { name:"TrashNet",    info:"2,527 images · 6 classes · clean background", tag:"6 classes" },
    { name:"TACO",        info:"1,500 annotated images · real-world litter scenes", tag:"28 categories" },
    { name:"TrashICRA19", info:"5,700 underwater marine trash images for AUV use", tag:"Marine" },
    { name:"UAVVaste",    info:"772 aerial waste images for UAV applications", tag:"Aerial" },
    { name:"NWNU-TRASH",  info:"18,911 images with realistic, cluttered backgrounds", tag:"18.9K imgs" },
    { name:"WaDaBa",      info:"4,504 images · recyclable material detection focus", tag:"Recyclable" },
  ];
  const challenges = ["Lighting changes","Insufficient labelled data","Small object size & distance","Cluttered backgrounds","Occlusion & overlap","Domain shift","Class imbalance"];

  const ACCURACY_DATA = [
    { label:"ResNet-50",          pct:97.8 },
    { label:"MobileNetV2",        pct:95.4 },
    { label:"EfficientNet-B3",    pct:96.1 },
    { label:"VGG16",              pct:92.7 },
    { label:"DenseNet-121",       pct:94.5 },
    { label:"YOLOv8 (Detection)", pct:91.3 },
  ];

  const CLASSES = [
    { key:"cardboard", label:"Cardboard", icon:<Package size={18} color="#B8793A"/>, bg:"#FEF3E7", desc:"Corrugated boxes, packaging material" },
    { key:"glass",     label:"Glass",     icon:<Droplets size={18} color="#3E8FA8"/>, bg:"#E8F5FA", desc:"Bottles, jars, containers" },
    { key:"metal",     label:"Metal",     icon:<Zap size={18} color="#5D7070"/>,     bg:"#F0F4F4", desc:"Cans, tins, foil, scrap" },
    { key:"paper",     label:"Paper",     icon:<BookOpen size={18} color="#6FAF63"/>, bg:"#F0F8EE", desc:"Newspapers, magazines, office paper" },
    { key:"plastic",   label:"Plastic",   icon:<Wind size={18} color="#4E8A46"/>,    bg:"#EEF7EC", desc:"Bottles, bags, packaging" },
    { key:"trash",     label:"Trash",     icon:<Trash2 size={18} color="#8C4515"/>,  bg:"#FFF4EE", desc:"General / mixed / contaminated waste" },
  ];

  /* ── Upload logic ── */
  function handleFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setSelectedFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResult(""); setConfidence(""); setError("");
  }

  async function handlePredict() {
    if (!selectedFile) { setError("Please upload an image first."); return; }
    setLoading(true); setError(""); setResult(""); setConfidence("");
    const fd = new FormData(); fd.append("file", selectedFile);
    try {
      const r = await fetch("http://127.0.0.1:5000/predict", { method:"POST", body:fd });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "Prediction failed."); }
      else {
        const cls  = d.predicted_class || "No prediction returned";
        const conf = d.confidence != null ? (d.confidence * 100).toFixed(2) + "%" : "";
        setResult(cls); setConfidence(conf);
        addHistory({ fileName:selectedFile.name, predictedClass:cls, confidence:conf, thumb:previewUrl });
      }
    } catch { setError("Could not connect to backend."); }
    finally { setLoading(false); }
  }

  function addHistory(item) {
    setHistoryItems(p => [{ ...item, time:new Date().toLocaleString() }, ...p].slice(0, 6));
  }

  /* ── Camera logic ── */
  async function startCamera() {
    setCameraError("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video:{ facingMode, width:{ideal:1280}, height:{ideal:720} } });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
      setCameraActive(true);
    } catch { setCameraError("Camera access denied. Allow camera permissions and try again."); }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setCameraActive(false); setCameraResult(null); setCapturedThumb("");
  }

  function switchCamera() { stopCamera(); setFacingMode(p => p === "environment" ? "user" : "environment"); }

  useEffect(() => { if (!cameraActive) return; startCamera(); }, [facingMode]);
  useEffect(() => { if (activeSubTab !== "camera") stopCamera(); }, [activeSubTab]);

  async function captureAndClassify() {
    if (!videoRef.current || !canvasRef.current) return;
    setCameraLoading(true); setCameraError(""); setCameraResult(null);
    const v = videoRef.current, c = canvasRef.current;
    c.width = v.videoWidth||640; c.height = v.videoHeight||480;
    c.getContext("2d").drawImage(v, 0, 0);
    const thumb = c.toDataURL("image/jpeg", .5);
    const b64   = c.toDataURL("image/jpeg", .85).split(",")[1];
    setCapturedThumb(thumb);
    try {
      const bytes=atob(b64), ab=new ArrayBuffer(bytes.length), ia=new Uint8Array(ab);
      for (let i=0;i<bytes.length;i++) ia[i]=bytes.charCodeAt(i);
      const fd=new FormData(); fd.append("file", new Blob([ab],{type:"image/jpeg"}), "capture.jpg");
      const r=await fetch("http://127.0.0.1:5000/predict",{method:"POST",body:fd});
      const d=await r.json();
      if (!r.ok) { setCameraError(d.error||"Prediction failed."); }
      else {
        const cls  = d.predicted_class||"No prediction returned";
        const conf = d.confidence!=null?(d.confidence*100).toFixed(2)+"%":"";
        setCameraResult({predictedClass:cls,confidence:conf});
        addHistory({fileName:"Camera capture",predictedClass:cls,confidence:conf,thumb});
      }
    } catch { setCameraError("Could not connect to backend."); }
    finally { setCameraLoading(false); }
  }

  /* ── Nav items ── */
  const NAV = [
    { id:"home",           label:"Home",           icon:<Home size={14}/> },
    { id:"classification", label:"Classification",  icon:<Scan size={14}/> },
    { id:"analytics",      label:"Analytics",       icon:<BarChart2 size={14}/> },
    { id:"dataset",        label:"Dataset",         icon:<Database size={14}/> },
    { id:"waste-guide",    label:"Waste Guide",     icon:<Recycle size={14}/> },
    { id:"setup",          label:"Project Setup",   icon:<Settings size={14}/> },
  ];

  /* ═══ RENDER ═══════════════════════════════════════════════════════ */
  return (
    <>
      <GlobalStyles />

      {/* Top navbar */}
      <header className="topbar">
        <div className="topbar-in">
          <div className="logo-wrap" onClick={() => setActivePage("home")}>
            <div className="logo-mark"><Leaf size={20} color="#C8ECC2"/></div>
            <div>
              <div className="logo-eye">Research · SDG 12 &amp; 15</div>
              <div className="logo-nm">WasteVision AI</div>
            </div>
          </div>

          <nav className="main-tabs">
            {NAV.map(n => (
              <button
                key={n.id}
                className={`main-tab ${activePage === n.id ? "active" : ""}`}
                onClick={() => setActivePage(n.id)}
              >
                <div className="dot" />
                {n.icon}
                <span className="lbl">{n.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* SDG strip */}
      <div className="sdg">
        <p>Supporting UN Sustainable Development Goal 12 · Responsible Consumption &amp; Production · and Goal 15 · Life on Land</p>
      </div>

      {/* ══════════════ HOME ══════════════ */}
      <div className={`page ${activePage === "home" ? "active" : ""}`}>
        <section className="hero">
          <div className="hero-ring" style={{width:680,height:680,right:-220,top:-200}}/>
          <div className="hero-ring" style={{width:360,height:360,right:80,top:30}}/>
          <div className="hero-ring" style={{width:160,height:160,right:280,top:160}}/>
          <div className="hero-in">
            <div>
              <div className="badge">
                <div className="badge-dot"/>
                <span>Based on "A Survey on Waste Detection &amp; Classification Using Deep Learning"</span>
              </div>
              <h1 className="hero-title">
                AI‑Powered <em>Waste</em><br/>Management System
              </h1>
              <p className="hero-desc">
                A research-backed platform that harnesses deep learning to classify waste imagery in real time — enabling smarter recycling decisions, reducing landfill pressure, and accelerating the circular economy.
              </p>
              <div className="cta-row">
                <button className="btn-p" onClick={() => setActivePage("classification")}>
                  <Scan size={14}/>Try classification
                </button>
                <button className="btn-o" onClick={() => setActivePage("dataset")}>
                  <Database size={14}/>Explore datasets
                </button>
              </div>
            </div>

            <div className="hero-stats">
              {[
                {icon:<Cpu size={17} color="#9ED494"/>, bg:"rgba(46,77,43,.5)", title:"10+ DL Models", desc:"Classification & detection architectures surveyed."},
                {icon:<Database size={17} color="#6BA8C2"/>, bg:"rgba(62,143,168,.3)", title:"6 Benchmark Datasets", desc:"TrashNet, TACO, marine, aerial & more."},
                {icon:<BarChart3 size={17} color="#E8B86D"/>, bg:"rgba(184,121,58,.3)", title:"Live Demo", desc:"Upload image or use your camera for predictions."},
                {icon:<ShieldCheck size={17} color="#9ED494"/>, bg:"rgba(78,138,70,.3)", title:"Disposal Guide", desc:"Actionable advice for every predicted class."},
              ].map(c => (
                <div key={c.title} className="hstat">
                  <div className="hstat-icon" style={{background:c.bg}}>{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider"/>

        {/* How it works */}
        <section className="wrap wrap-alt">
          <p className="eyebrow" style={{color:"var(--river)"}}>How it works</p>
          <h2 className="sec-title">From image to action in seconds</h2>
          <p className="sec-lead">The pipeline captures waste imagery, runs it through a trained deep learning model, returns the predicted category, and instantly surfaces disposal recommendations.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:"1rem"}}>
            {[
              {n:"01",icon:<Upload size={18} color="var(--fern)"/>,title:"Capture",desc:"Upload an image or use the live camera feed."},
              {n:"02",icon:<Brain size={18} color="var(--river)"/>,title:"Classify",desc:"MobileNet model analyses the waste type with high accuracy."},
              {n:"03",icon:<Target size={18} color="var(--amber)"/>,title:"Identify",desc:"Predicted class (cardboard, glass, metal, paper, plastic, trash)."},
              {n:"04",icon:<Recycle size={18} color="var(--leaf)"/>,title:"Dispose",desc:"Step-by-step disposal and recycling recommendation."},
            ].map(s => (
              <div key={s.n} className="card" style={{paddingTop:"1.6rem"}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"var(--t-muted)",marginBottom:".6rem"}}>{s.n}</div>
                <div className="card-icon">{s.icon}</div>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider"/>

        {/* Challenges */}
        <section className="wrap wrap-dark" style={{padding:"4.5rem 2rem",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 65% at 90% 50%,rgba(58,102,53,.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1,maxWidth:1340,margin:"0 auto"}}>
            <p className="eyebrow" style={{color:"var(--dew)"}}>Research challenges</p>
            <h2 className="sec-title sec-title-light" style={{marginBottom:"2rem"}}>Limitations in real-world waste AI</h2>
            <div className="cgrid">
              {challenges.map(ch=>(
                <div key={ch} className="ccard">
                  <div className="cicon"><AlertTriangle size={13} color="#F09595"/></div>
                  <p className="ctxt">{ch}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════ CLASSIFICATION ══════════════ */}
      <div className={`page ${activePage === "classification" ? "active" : ""}`}>
        <section className="wrap">
          <p className="eyebrow" style={{color:"var(--fern)"}}>Real-time prediction</p>
          <h2 className="sec-title">Classify waste</h2>
          <p className="sec-lead">Upload a photo or use your live camera to identify and get disposal recommendations for any waste item.</p>

          <div className="sub-tabs">
            <button className={`sub-tab ${activeSubTab==="upload"?"on":""}`} onClick={()=>setActiveSubTab("upload")}><Upload size={14}/>Upload image</button>
            <button className={`sub-tab ${activeSubTab==="camera"?"on":""}`} onClick={()=>setActiveSubTab("camera")}><Camera size={14}/>Use camera</button>
          </div>

          {/* UPLOAD TAB */}
          {activeSubTab==="upload" && (
            <div className="g2">
              <div className="card">
                <div className="card-icon"><Upload size={21} color="var(--fern)"/></div>
                <h3 className="card-title">Image uploader</h3>
                <p className="card-desc">Upload a waste image to classify it into one of the six TrashNet categories and get instant disposal guidance.</p>
                <input type="file" accept="image/*" onChange={handleFileChange}/>
                {previewUrl&&(
                  <div style={{marginTop:"1rem"}}>
                    <p className="preview-lbl">Preview</p>
                    <div className="thumb"><img src={previewUrl} alt="preview" style={{width:"100%",display:"block"}}/></div>
                  </div>
                )}
                <div className="ctrl-row">
                  <button className="btn-g" onClick={handlePredict} disabled={loading}>
                    {loading?<><div className="spin"/>Predicting…</>:<><Scan size={14}/>Predict class</>}
                  </button>
                </div>
                {result&&(
                  <>
                    <div className="res-box">
                      <p className="res-cls">Predicted class: {result}</p>
                      {confidence&&<p className="res-conf">Confidence: {confidence}</p>}
                    </div>
                    <DisposalPanel predictedClass={result}/>
                  </>
                )}
                {error&&<div className="err-box">{error}</div>}
              </div>

              <div className="gcol">
                <div className="card">
                  <div className="card-icon"><CheckCircle2 size={21} color="var(--fern)"/></div>
                  <h3 className="card-title">Tips for best results</h3>
                  {["Place waste on a plain neutral background","Ensure even lighting — avoid harsh shadows","Crop tightly so waste fills the frame","Use a high-resolution image where possible","Separate mixed waste before photographing"].map(t=>(
                    <div key={t} className="tip"><CheckCircle2 size={14} color="var(--leaf)" style={{flexShrink:0,marginTop:3}}/>{t}</div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-icon"><Info size={21} color="var(--river)"/></div>
                  <h3 className="card-title">Supported categories</h3>
                  <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:8}}>
                    {["Cardboard","Glass","Metal","Paper","Plastic","Trash"].map(c=>(
                      <span key={c} style={{background:"var(--mist)",color:"var(--moss)",borderRadius:7,padding:"4px 12px",fontSize:12.5,fontWeight:500}}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CAMERA TAB */}
          {activeSubTab==="camera" && (
            <div className="g2">
              <div className="card">
                <div className="card-icon"><Camera size={21} color="var(--fern)"/></div>
                <h3 className="card-title">Live camera</h3>
                <p className="card-desc">Point your camera at a waste item, then click Classify to send the frame to the model.</p>
                <div className="cam-view">
                  {!cameraActive&&<div className="cam-ph"><CameraOff size={34} color="var(--stone)" style={{margin:"0 auto 9px"}}/><p style={{fontSize:13}}>Camera not started</p></div>}
                  <video ref={videoRef} autoPlay playsInline muted
                    style={{width:"100%",maxHeight:290,objectFit:"cover",display:cameraActive?"block":"none",borderRadius:14}}/>
                  {cameraActive&&<div className="live-badge"><div className="live-dot"/>Live</div>}
                </div>
                <canvas ref={canvasRef} style={{display:"none"}}/>
                <div className="ctrl-row">
                  {!cameraActive
                    ? <button className="btn-g" onClick={startCamera}><Camera size={14}/>Start camera</button>
                    : <>
                        <button className="btn-g" onClick={captureAndClassify} disabled={cameraLoading}>
                          {cameraLoading?<><div className="spin"/>Classifying…</>:<><Scan size={14}/>Classify waste</>}
                        </button>
                        <button className="btn-gh" onClick={switchCamera}><SwitchCamera size={13}/>Switch</button>
                        <button className="btn-gh" onClick={stopCamera}>Stop</button>
                      </>}
                </div>
                {cameraError&&<div className="err-box">{cameraError}</div>}
              </div>

              <div className="gcol">
                <div className="card">
                  <div className="card-icon"><Recycle size={21} color="var(--fern)"/></div>
                  <h3 className="card-title">Classification result</h3>
                  {!cameraResult&&!cameraLoading&&<p style={{fontSize:13,color:"var(--t-muted)",marginTop:8}}>Start the camera and click "Classify waste" to see results here.</p>}
                  {cameraLoading&&<div className="loading-row"><div className="spin"/>Analysing frame…</div>}
                  {cameraResult&&!cameraLoading&&(
                    <>
                      {capturedThumb&&<div className="cam-thumb"><img src={capturedThumb} alt="frame" style={{width:"100%",display:"block"}}/></div>}
                      <div className="res-box">
                        <p className="res-cls">Predicted class: {cameraResult.predictedClass}</p>
                        {cameraResult.confidence&&<p className="res-conf">Confidence: {cameraResult.confidence}</p>}
                      </div>
                      <DisposalPanel predictedClass={cameraResult.predictedClass}/>
                    </>
                  )}
                </div>
                <div className="card">
                  <h3 className="card-title" style={{fontSize:"1rem",marginBottom:".8rem"}}>Camera tips</h3>
                  {["Place waste on a plain, neutral background","Ensure even lighting — avoid harsh shadows","Hold item close so it fills the frame","Use rear camera for sharper quality"].map(t=>(
                    <div key={t} className="tip"><CheckCircle2 size={14} color="var(--leaf)" style={{flexShrink:0,marginTop:3}}/>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History */}
          <div className="history">
            <div className="history-head">
              <History size={17} color="var(--river)"/>
              <h3 className="history-title">Prediction history</h3>
            </div>
            {historyItems.length===0
              ? <div className="empty">No predictions yet — upload an image or use the live camera to get started.</div>
              : <div className="hgrid">
                  {historyItems.map((item,i)=>(
                    <div key={i} className="hcard-item">
                      <div className="hcard-top">
                        <div style={{display:"flex",alignItems:"center",gap:9}}>
                          {item.thumb&&<img src={item.thumb} alt="thumb" style={{width:42,height:42,borderRadius:9,objectFit:"cover",border:"1px solid var(--border)"}}/>}
                          <div><p className="hl">File</p><p className="hv" style={{fontSize:12.5}}>{item.fileName}</p></div>
                        </div>
                        <CheckCircle2 size={15} color="var(--leaf)"/>
                      </div>
                      <p className="hl">Predicted class</p>
                      <p className="hcls">{item.predictedClass}</p>
                      <div style={{display:"flex",gap:18,marginTop:9}}>
                        <div><p className="hl">Confidence</p><p className="hv">{item.confidence||"N/A"}</p></div>
                        <div><p className="hl">Time</p><p className="hv" style={{fontSize:12}}>{item.time}</p></div>
                      </div>
                    </div>
                  ))}
                </div>}
          </div>
        </section>
      </div>

      {/* ══════════════ ANALYTICS ══════════════ */}
      <div className={`page ${activePage === "analytics" ? "active" : ""}`}>
        <section className="wrap">
          <p className="eyebrow" style={{color:"var(--river)"}}>Model performance</p>
          <h2 className="sec-title">Analytics &amp; model benchmarks</h2>
          <p className="sec-lead">A comparative overview of deep learning architectures evaluated on standard waste classification benchmarks.</p>

          <div className="stats-grid">
            {[
              {icon:<Award size={18} color="var(--fern)"/>, num:"97.8%", unit:"Best accuracy (ResNet-50 on TrashNet)"},
              {icon:<TrendingUp size={18} color="var(--river)"/>, num:"10+", unit:"Architectures benchmarked"},
              {icon:<Target size={18} color="var(--amber)"/>, num:"6", unit:"Waste classes classified"},
              {icon:<Map size={18} color="var(--leaf)"/>, num:"18.9K", unit:"Largest dataset (NWNU-TRASH)"},
            ].map(s=>(
              <div key={s.unit} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-unit">{s.unit}</div>
              </div>
            ))}
          </div>

          <div className="g2" style={{gap:"1.4rem"}}>
            <div className="card">
              <div className="card-icon"><BarChart2 size={21} color="var(--fern)"/></div>
              <h3 className="card-title">Model accuracy comparison</h3>
              <p className="card-desc" style={{marginBottom:".5rem"}}>Top-1 accuracy on TrashNet benchmark dataset.</p>
              <div className="acc-row">
                {ACCURACY_DATA.map(a=>(
                  <div key={a.label} className="acc-item">
                    <div className="acc-head">
                      <span className="acc-lbl">{a.label}</span>
                      <span className="acc-pct">{a.pct}%</span>
                    </div>
                    <div className="acc-bar">
                      <div className="acc-fill" style={{width:`${a.pct}%`}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gcol">
              <div className="card">
                <div className="card-icon"><Cpu size={21} color="var(--river)"/></div>
                <h3 className="card-title">Surveyed architectures</h3>
                <p className="card-desc" style={{marginBottom:".85rem"}}>All models evaluated across the survey.</p>
                <div className="chip-wrap">
                  {models.map(m=><div key={m} className="chip">{m}</div>)}
                </div>
              </div>
              <div className="card">
                <div className="card-icon"><Info size={21} color="var(--amber)"/></div>
                <h3 className="card-title">Key findings</h3>
                <div className="setup-list">
                  {[
                    "ResNet-50 achieves the highest accuracy at 97.8%",
                    "Transfer learning significantly boosts all models",
                    "Real-world datasets show 8–15% lower accuracy vs lab",
                    "YOLOv8 offers the best speed-accuracy tradeoff for edge deployment",
                  ].map(t=>(
                    <div key={t} className="setup-item"><div className="setup-dot"/>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════ DATASET ══════════════ */}
      <div className={`page ${activePage === "dataset" ? "active" : ""}`}>
        <section className="wrap">
          <p className="eyebrow" style={{color:"var(--amber)"}}>Benchmark datasets</p>
          <h2 className="sec-title">Datasets used in this project</h2>
          <p className="sec-lead">This system is trained and evaluated on publicly available waste image datasets covering diverse environments — from household recycling bins to marine waste and aerial UAV imagery.</p>
          <div className="dgrid">
            {datasets.map(d=>(
              <div key={d.name} className="dcard">
                <h3 className="dname">{d.name}</h3>
                <p className="dinfo">{d.info}</p>
                <span className="dtag">{d.tag}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="divider"/>

        <section className="wrap wrap-alt">
          <p className="eyebrow" style={{color:"var(--fern)"}}>Primary dataset</p>
          <h2 className="sec-title">TrashNet — the core training set</h2>
          <div className="g2">
            <div className="card">
              <p className="card-desc" style={{marginBottom:0}}>
                TrashNet contains 2,527 images across 6 categories captured on white backgrounds, making it the most widely used benchmark for waste classification research. All images are 512×384 px and were manually sorted into class folders.
              </p>
              <div className="setup-list" style={{marginTop:"1.2rem"}}>
                {["501 glass images","594 paper images","482 cardboard images","410 plastic images","218 metal images","137 trash images"].map(t=>(
                  <div key={t} className="setup-item"><div className="setup-dot"/>{t}</div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="info-box">
                <Info size={15} color="var(--river)" style={{flexShrink:0,marginTop:2}}/>
                <span>TrashNet's clean background images are ideal for initial model training. For production deployments, augment with real-world datasets like TACO to improve generalisation.</span>
              </div>
              <div style={{marginTop:"1.25rem"}}>
                <h3 className="card-title" style={{fontSize:"1rem",marginBottom:".75rem"}}>Dataset limitations</h3>
                <div className="cgrid" style={{gridTemplateColumns:"1fr"}}>
                  {["Controlled backgrounds don't reflect real-world clutter","Class imbalance (trash class severely underrepresented)","Limited to 6 categories","No geographic diversity in collection"].map(ch=>(
                    <div key={ch} className="ccard" style={{background:"var(--parchment)",border:"1px solid var(--border)"}}>
                      <div className="cicon" style={{background:"var(--sand)"}}><AlertTriangle size={12} color="var(--amber)"/></div>
                      <p className="ctxt" style={{color:"var(--t-mid)"}}>{ch}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════ WASTE GUIDE ══════════════ */}
      <div className={`page ${activePage === "waste-guide" ? "active" : ""}`}>
        <section className="wrap">
          <p className="eyebrow" style={{color:"var(--leaf)"}}>Disposal reference</p>
          <h2 className="sec-title">Waste disposal guide</h2>
          <p className="sec-lead">A comprehensive reference for all six waste categories the AI can recognise — including disposal steps, recycling tips, and environmental impact facts.</p>

          <div className="class-grid">
            {CLASSES.map(c=>(
              <div key={c.key} className="class-card">
                <div className="class-icon" style={{background:DISPOSAL_GUIDE[c.key].bg}}>{c.icon}</div>
                <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"1rem",marginBottom:".3rem"}}>{c.label}</h3>
                <p style={{fontSize:12.5,color:"var(--t-soft)",marginBottom:"1rem",lineHeight:1.5}}>{c.desc}</p>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {DISPOSAL_GUIDE[c.key].steps.slice(0,2).map((s,i)=>(
                    <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:12.5,color:"var(--t-mid)"}}>
                      <ChevronRight size={12} color="var(--leaf)" style={{flexShrink:0,marginTop:3}}/>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:".9rem",padding:"8px 11px",background:DISPOSAL_GUIDE[c.key].bg,borderRadius:9,fontSize:12,color:"var(--t-soft)"}}>
                  <Leaf size={11} color={DISPOSAL_GUIDE[c.key].color} style={{display:"inline",marginRight:5,verticalAlign:"middle"}}/>
                  {DISPOSAL_GUIDE[c.key].tip}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider"/>

        <section className="wrap wrap-alt">
          <p className="eyebrow" style={{color:"var(--river)"}}>Environmental impact</p>
          <h2 className="sec-title">Why correct disposal matters</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1rem"}}>
            {[
              {icon:<TreePine size={18} color="var(--fern)"/>,title:"Saves trees",desc:"1 tonne of recycled paper saves 17 trees and 26,500 litres of water."},
              {icon:<Zap size={18} color="var(--amber)"/>,title:"Saves energy",desc:"Recycling aluminium uses 95% less energy than producing it from raw bauxite."},
              {icon:<Globe size={18} color="var(--river)"/>,title:"Reduces emissions",desc:"Proper waste management could cut global GHG emissions by up to 20%."},
              {icon:<Droplets size={18} color="var(--sky)"/>,title:"Protects water",desc:"Landfill leachate is a major source of groundwater contamination globally."},
            ].map(f=>(
              <div key={f.title} className="card">
                <div className="card-icon">{f.icon}</div>
                <h3 className="card-title" style={{fontSize:"1rem"}}>{f.title}</h3>
                <p className="card-desc" style={{marginBottom:0}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ══════════════ PROJECT SETUP ══════════════ */}
      <div className={`page ${activePage === "setup" ? "active" : ""}`}>
        <section className="wrap">
          <p className="eyebrow" style={{color:"var(--fern)"}}>Technical reference</p>
          <h2 className="sec-title">Project setup</h2>
          <p className="sec-lead">Everything you need to run WasteVision AI locally — from environment configuration to model weights and API endpoints.</p>

          <div className="g2">
            <div className="gcol">
              <div className="card">
                <div className="card-icon"><FlaskConical size={21} color="var(--river)"/></div>
                <h3 className="card-title">Tech stack</h3>
                <div className="setup-list">
                  {["Frontend: React + Vite","Backend: Python · Flask","Model: MobileNetV2 fine-tuned","Dataset: TrashNet (6 classes)","Serving: Flask REST API on port 5000","Deployment: Local / Docker-ready"].map(t=>(
                    <div key={t} className="setup-item"><div className="setup-dot"/>{t}</div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-icon"><Settings size={21} color="var(--stone)"/></div>
                <h3 className="card-title">Environment setup</h3>
                <div className="setup-list">
                  {["Python 3.9+ required","pip install flask tensorflow pillow","Node 18+ for the React frontend","npm install && npm run dev","Flask: python app.py (default port 5000)","CORS enabled on Flask for localhost:5173"].map(t=>(
                    <div key={t} className="setup-item"><div className="setup-dot"/>{t}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="gcol">
              <div className="card">
                <div className="card-icon"><Cpu size={21} color="var(--fern)"/></div>
                <h3 className="card-title">Model details</h3>
                <div className="setup-list">
                  {["Architecture: MobileNetV2","Input size: 224 × 224 px","Output: 6-class softmax","Training: Transfer learning from ImageNet","Optimiser: Adam (lr=0.0001)","Training accuracy: ~95% on TrashNet"].map(t=>(
                    <div key={t} className="setup-item"><div className="setup-dot"/>{t}</div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-icon"><ArrowRight size={21} color="var(--amber)"/></div>
                <h3 className="card-title">API endpoints</h3>
                <div className="setup-list">
                  {["POST /predict — accepts multipart/form-data image","Returns: predicted_class, confidence (0–1)","GET /health — returns {status: ok}","Timeout: 30s default","Max file size: 10MB","Accepted: JPEG, PNG, WEBP"].map(t=>(
                    <div key={t} className="setup-item"><div className="setup-dot"/>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{marginTop:"1.5rem"}}>
            <div className="info-box">
              <Info size={15} color="var(--river)" style={{flexShrink:0,marginTop:2}}/>
              <span>The frontend communicates with <strong>http://127.0.0.1:5000/predict</strong> via POST requests. Ensure Flask is running before attempting any classification. For production deployments, configure HTTPS and set appropriate CORS origins.</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:8}}>
          <Globe size={13} color="var(--stone)"/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"var(--stone)",letterSpacing:".06em"}}>WasteVision AI · Built for sustainable development · SDG 12 &amp; 15</span>
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:"var(--ash)"}}>A research-based project on deep learning for waste detection and classification</p>
      </footer>
    </>
  );
}
