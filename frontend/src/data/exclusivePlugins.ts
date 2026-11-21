export interface ExclusivePluginFeature {
  label: string;
  title: string;
  description: string;
}

export interface ExclusivePluginFaq {
  question: string;
  answer: string;
}

export interface ExclusivePluginSpec {
  label: string;
  value: string;
}

export interface ExclusivePlugin {
  id: '360' | 'slap' | 'pitch';
  slug: '360' | 'slap' | 'pitch';
  aliases: string[];
  name: string;
  brandName: string;
  tagline: string;
  subtitle: string;
  homeSummary: string;
  homeSecondary: string;
  pageLead: string;
  formats: string;
  version: string;
  platform: string;
  img: string;
  imgWidth: number;
  imgHeight: number;
  ogImg: string;
  bucket: string;
  storageFile: string;
  windowsStorageFile?: string;
  downloadLabel: string;
  seoTitle: string;
  seoDescription: string;
  accentFrom: string;
  accentTo: string;
  highlights: ExclusivePluginFeature[];
  specs: ExclusivePluginSpec[];
  installSteps: string[];
  faqs: ExclusivePluginFaq[];
}

export const EXCLUSIVE_PLUGINS: ExclusivePlugin[] = [
  {
    id: 'slap',
    slug: 'slap',
    aliases: ['slap', 'slap01', 'devee-slap'],
    name: 'Slap01',
    brandName: 'deVee Slap01',
    tagline: 'Three layers. One bass.',
    subtitle: 'Monophonic Bass Instrument · 1,000 Authored Presets',
    homeSummary:
      'A dedicated monophonic low-end synth built from three calibrated layers — clean mono SUB, Slap FM / Saw / Pulse BODY with Formant Colour, and transient CLICK / TOP.',
    homeSecondary:
      'Includes 1,000 factory presets (144 × 808) across Slap House, Psytrance, Bass House, UKG, DnB & Techno, with live 3D/2D shaded displays.',
    pageLead:
      'Slap01 is a purpose-built monophonic bass instrument by deVee Exclusive. Every patch combines an independent mono SUB, a rich Slap FM / Saw / Pulse BODY with resonant filter and stereo high-pass width, and a crisp CLICK / TOP transient layer — calibrated out of the box across 1,000 factory presets.',
    formats: 'VST3 · AU · Standalone',
    version: 'v1.0.0',
    platform: 'macOS 12+ (Apple Silicon & Intel) & Windows 10/11 (64-bit)',
    img: '/plugins/slap01_plugin.jpg',
    imgWidth: 1600,
    imgHeight: 1087,
    ogImg: '/plugins/slap01_og.jpg',
    bucket: 'devee-plugins',
    storageFile: 'Slap01-1.0.0-macOS.zip',
    windowsStorageFile: 'Slap01-1.0.0-Windows.zip',
    downloadLabel: 'Download Slap01',
    seoTitle: 'deVee Slap01 — Monophonic Bass Synth Plugin (1,000 Presets, VST3 / AU)',
    seoDescription:
      'Download deVee Slap01 for macOS & Windows — a 3-layer monophonic bass instrument (VST3, AU & Standalone) with 1,000 factory presets including 144 808s, Slap FM, and 3D displays.',
    accentFrom: 'from-orange-500',
    accentTo: 'to-amber-600',
    highlights: [
      {
        label: '01 · SUB',
        title: 'Always-Mono Sub Engine + 808 Punch',
        description:
          'An independent mono sub oscillator with controllable harmonics, start phase, crossover split, and dedicated 808 pitch punch and extended decay scaling.',
      },
      {
        label: '02 · BODY',
        title: 'Slap FM, Saw & Pulse + Formant Colour',
        description:
          'Sculpt punchy mids with Slap FM depth, Reese detuning, drive, filtered stereo width (stereo high-passed after distortion), Formant/Vowel COLOUR controls, and note-retriggered Motion LFO.',
      },
      {
        label: '03 · CLICK / TOP',
        title: 'Transient Attack & Harmonic Texture',
        description:
          'Blend short transient clicks and sustained high-passed texture on top of the low end so your bass cuts through club systems and phone speakers alike.',
      },
      {
        label: '1,000 PRESETS',
        title: 'Calibrated Bank + 3D/2D Live Displays',
        description:
          'Browse 1,000 embedded presets across Slap House, Psytrance, Trance, Bass House, UKG, DnB, Dubstep, Techno & 144 808s — with resizable 60%–125% UI and live 3D/2D waveform and envelope surfaces.',
      },
    ],
    specs: [
      { label: 'Plugin Type', value: 'Monophonic Bass Synthesizer (Instrument)' },
      { label: 'Formats', value: 'VST3 · AU · Standalone App' },
      { label: 'Platform', value: 'macOS 12+ (Apple Silicon & Intel) & Windows 10/11 (64-bit)' },
      { label: 'Factory Bank', value: '1,000 embedded presets (144 × 808) — no external sample pack needed' },
      { label: 'Version', value: '1.0.0 (Free with deVee account sign-in)' },
    ],
    installSteps: [
      'Sign in with Google, choose macOS or Windows in the download window, and unzip the archive.',
      'macOS: Run Slap01-1.0.0.pkg to install VST3, AU, and Standalone automatically. Windows: Copy Slap 01.vst3 into C:\\Program Files\\Common Files\\VST3\\.',
      'Approve the unsigned freeware prompt if shown (macOS: Privacy & Security → Open Anyway; Windows SmartScreen: More info → Run anyway), then reopen your DAW and load Slap 01 as an instrument.',
    ],
    faqs: [
      {
        question: 'Which DAWs and operating systems work with deVee Slap01?',
        answer:
          'Slap01 supports both macOS 12+ (Universal Apple Silicon & Intel: VST3, AU & Standalone) and Windows 10/11 64-bit (VST3 & Standalone) — compatible with Logic Pro, Cubase, Ableton Live, FL Studio, Studio One, and Reaper.',
      },
      {
        question: 'Do I need to download a separate sample library for the 1,000 presets?',
        answer:
          'No. Slap01 is a pure synthesis engine and all 1,000 factory presets (including 144 808 patches) are embedded inside the plugin binary.',
      },
      {
        question: 'Why does macOS show a security warning when opening the installer?',
        answer:
          'Slap01 is distributed free by deVee Exclusive with local ad-hoc signing rather than Apple notarization. Open System Settings → Privacy & Security and click "Open Anyway" for the installer — never disable Gatekeeper globally.',
      },
      {
        question: 'Is Slap01 free to download?',
        answer:
          'Yes — Slap01 is available free to registered deVee Music members. Simply sign in with Google on this page to generate your direct download link.',
      },
    ],
  },
  {
    id: '360',
    slug: '360',
    aliases: ['360', 'devee-360', '360-plugin'],
    name: '360°',
    brandName: 'deVee 360°',
    tagline: 'Phase, per note.',
    subtitle: 'Per-Note Kick & Bass Phase Aligner + Zero-Latency Analyzer',
    homeSummary:
      'A fixed delay in milliseconds is a different phase angle at every note — so it is wrong the moment your bassline moves. 360 works in degrees and re-picks the alignment on every kick hit, for whatever note the bass is playing.',
    homeSecondary:
      'Includes 360 Analyzer, a zero-latency consistency meter for the summed kick + bass bus.',
    pageLead:
      'Fixed millisecond phase aligners break the moment your bassline changes note. deVee 360° sits on your bass channel with the kick on its sidechain, detects the playing bass note on every kick hit, evaluates 96 phase alignments across two cycles of that note, and locks in the phase angle that delivers the cleanest, hardest-hitting low end.',
    formats: 'VST3 · AU',
    version: 'v1.0',
    platform: 'macOS (Apple Silicon & Intel)',
    img: '/plugins/360_plugin.webp',
    imgWidth: 1600,
    imgHeight: 1024,
    ogImg: '/plugins/360_og.jpg',
    bucket: 'devee-plugins',
    storageFile: '360 v1.0.zip',
    downloadLabel: 'Download 360',
    seoTitle: 'deVee 360° — Per-Note Kick & Bass Phase Aligner Plugin (VST3 / AU)',
    seoDescription:
      'Download deVee 360°, the per-note kick & bass phase alignment plugin (VST3 & AU) that aligns phase in degrees on every kick hit, bundled with the zero-latency 360 Analyzer.',
    accentFrom: 'from-orange-600',
    accentTo: 'to-red-600',
    highlights: [
      {
        label: 'PER-NOTE ENGINE',
        title: '96 Phase Alignments Evaluated Every Hit',
        description:
          'Instead of locking one static millisecond shift, 360° tracks the active bass pitch on each kick transient and converts your target angle into the exact sample shift for that note.',
      },
      {
        label: 'POLAR DISPLAY',
        title: 'Instant Visual Phase Feedback (+dB & Degrees)',
        description:
          'See live angular alignment, detected bass note and frequency, real-time low-end gain/cancellation readout, and per-hit grip metrics right in the polar display.',
      },
      {
        label: '360 ANALYZER',
        title: 'Zero-Latency Kick + Bass Bus Meter',
        description:
          'Included as a separate dedicated plugin for your summed kick + bass bus — adds zero latency and never alters your audio while measuring low-end consistency hit to hit.',
      },
      {
        label: 'MIX-READY ROUTING',
        title: 'Designed for Real Sidechain Workflows',
        description:
          'Place 360° on your bass track before sidechain ducking (feeding your kick to its sidechain) and put 360 Analyzer on the Kick+Bass group before your clipper.',
      },
    ],
    specs: [
      { label: 'Plugin Type', value: 'Dynamic Per-Note Phase Aligner + Bus Analyzer' },
      { label: 'Included Plugins', value: '360 (125 ms lookahead corrector) + 360 Analyzer (0 ms meter)' },
      { label: 'Formats', value: 'VST3 · AU' },
      { label: 'Platform', value: 'macOS (Apple Silicon & Intel)' },
      { label: 'Version', value: '1.0 (Free with deVee account sign-in)' },
    ],
    installSteps: [
      'Sign in with Google and download 360 v1.0.zip, then unzip the archive.',
      'Copy 360.vst3 & 360 Analyzer.vst3 into /Library/Audio/Plug-Ins/VST3/ (and the .component bundles into /Library/Audio/Plug-Ins/Components/ for Logic Pro).',
      'Restart your DAW, place 360 on your bass channel with your kick routed to its sidechain input, and optionally place 360 Analyzer on your Kick+Bass bus.',
    ],
    faqs: [
      {
        question: 'How is deVee 360° different from standard phase alignment plugins?',
        answer:
          'Standard aligners apply a single fixed millisecond delay, which corresponds to a different phase angle on every note. 360° detects the bass pitch on every kick hit and aligns phase in degrees per note.',
      },
      {
        question: 'Why are 360 and 360 Analyzer two separate plugins?',
        answer:
          '360 uses a 125 ms lookahead buffer to analyze and align each hit cleanly, while 360 Analyzer runs at strictly zero latency on your summed Kick+Bass bus so it measures consistency without introducing delay or changing audio.',
      },
      {
        question: 'Where should I insert 360° in my mix chain?',
        answer:
          'Put 360° on the bass channel before sidechain ducking, with the kick channel routed into 360°’s sidechain input. Put 360 Analyzer on your combined Kick+Bass bus before any clipper or limiter.',
      },
      {
        question: 'Is deVee 360° free to download?',
        answer:
          'Yes — sign in with Google on this page to unlock your instant signed download link.',
      },
    ],
  },
  {
    id: 'pitch',
    slug: 'pitch',
    aliases: ['pitch', 'pitcher', 'devee-pitch', 'pitch01'],
    name: 'Pitcher',
    brandName: 'deVee Pitcher',
    tagline: '3D pitch shifter & beat-repeat riser.',
    subtitle: 'Zero-Centred Pitch Bending · Loop Freeze Riser · Sub Protection',
    homeSummary:
      'Zero-centred pitch bending with a beat-synced Loop Freeze riser (1/2 to 1/64), Clean / Tape / Grain pitch engines, sub-bass crossover protection, formant shaping, and live 3D wave terrain.',
    homeSecondary:
      'Dial in smooth drops, vocal rises, and hypnotic build-ups with inertia, curve, stereo width, and spring/step modes.',
    pageLead:
      'Pitcher (deVee Pitch) combines expressive zero-centred pitch bending with a tempo-locked Loop Freeze beat-repeat riser. Switch between Clean, Tape, and Grain engines, keep your low end rock-solid below the Sub Split crossover, shape tone with Formant and Width, and watch every move on a live 3D wave terrain.',
    formats: 'VST3 · AU · Standalone',
    version: 'v1.0.0',
    platform: 'macOS 12+ (Apple Silicon & Intel) & Windows 10/11 (64-bit)',
    img: '/plugins/pitcher_plugin.jpg',
    imgWidth: 1600,
    imgHeight: 954,
    ogImg: '/plugins/pitcher_og.jpg',
    bucket: 'devee-plugins',
    storageFile: 'Pitcher-1.0.0-macOS.zip',
    windowsStorageFile: 'Pitcher-1.0.0-Windows.zip',
    downloadLabel: 'Download Pitcher',
    seoTitle: 'deVee Pitcher — 3D Pitch Shifter & Beat-Repeat Loop Riser Plugin (VST3 / AU)',
    seoDescription:
      'Download deVee Pitcher (deVee Pitch) for macOS & Windows — a 3D pitch shifter and beat-synced Loop Freeze riser plugin (VST3, AU & Standalone) with Clean/Tape/Grain engines and Sub Split.',
    accentFrom: 'from-orange-500',
    accentTo: 'to-red-600',
    highlights: [
      {
        label: '01 · LOOP / RISER',
        title: 'Beat-Synced Loop Freeze (1/2 → 1/64)',
        description:
          'Lock any incoming audio to host BPM divisions from 1/2 down to 1/64 and sweep the central pitch dial upward or downward for instant build-ups, drops, and stutter transitions.',
      },
      {
        label: '02 · MOTION / GLIDE',
        title: 'Inertia, Curve, Spring & Step Modes',
        description:
          'Fine-tune pitch response from snappy 5 ms jumps to syrupy 800 ms glides, bend the acceleration curve, snap back automatically with SPRING, or quantize to semitones with STEP.',
      },
      {
        label: '03 · ENGINE / SPLIT',
        title: 'Clean, Tape & Grain + Sub-Bass Crossover',
        description:
          'Choose between three distinct pitch engines and protect your mono foundation with an adjustable 20–250 Hz SUB SPLIT crossover so your sub stays untouched while tops soar.',
      },
      {
        label: '04 · TONE / OUTPUT',
        title: 'Formant, Stereo Width & 3D Wave Terrain',
        description:
          'Shift vocal character independently (±12 st Formant), expand stereo width up to 200%, blend parallel wet/dry Mix, and monitor audio live on the central 3D harmonic terrain.',
      },
    ],
    specs: [
      { label: 'Plugin Type', value: '3D Pitch Shifter & Beat-Repeat Loop Riser (FX)' },
      { label: 'Pitch Engines', value: 'CLEAN · TAPE · GRAIN' },
      { label: 'Loop Divisions', value: 'Host-synced 1/2 · 1/4 · 1/8 · 1/16 · 1/32 · 1/64' },
      { label: 'Formats', value: 'VST3 · AU · Standalone App' },
      { label: 'Platform', value: 'macOS 12+ (Apple Silicon & Intel) & Windows 10/11 (64-bit)' },
      { label: 'Version', value: '1.0.0 (Free with deVee account sign-in)' },
    ],
    installSteps: [
      'Sign in with Google, select macOS or Windows in the download window, and unzip the folder.',
      'macOS: Copy Pitcher.vst3 to /Library/Audio/Plug-Ins/VST3/ and Pitcher.component to /Library/Audio/Plug-Ins/Components/. Windows: Copy Pitcher.vst3 to C:\\Program Files\\Common Files\\VST3\\.',
      'Approve the unsigned freeware prompt if shown (macOS: Privacy & Security → Open Anyway; Windows SmartScreen: More info → Run anyway), then reopen your DAW.',
    ],
    faqs: [
      {
        question: 'What is the Sub Split knob for in deVee Pitcher?',
        answer:
          'Sub Split sets a crossover frequency (20–250 Hz) below which the signal stays clean and unshifted — letting you create dramatic pitch risers and loop freezes on full drums or mix buses without wrecking your sub bass.',
      },
      {
        question: 'How does Loop Freeze work?',
        answer:
          'Engaging Loop Freeze captures a beat-synced slice locked to your DAW tempo (1/2 through 1/64). Combine it with the central pitch wheel and RISE/DROP triggers to build instant risers.',
      },
      {
        question: 'Which DAWs and operating systems are supported?',
        answer:
          'Pitcher supports both macOS 12+ (Universal Apple Silicon & Intel: VST3, AU & Standalone) and Windows 10/11 64-bit (VST3 & Standalone) — compatible with Logic Pro, Cubase, Ableton Live, FL Studio, Studio One, and Reaper.',
      },
      {
        question: 'Is deVee Pitcher free to download?',
        answer:
          'Yes — sign in with Google on this page to unlock your direct download link.',
      },
    ],
  },
];

export function findExclusivePluginBySlug(slug: string): ExclusivePlugin | undefined {
  const normalized = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
  return EXCLUSIVE_PLUGINS.find(
    (p) => p.slug === normalized || p.aliases.includes(normalized)
  );
}
