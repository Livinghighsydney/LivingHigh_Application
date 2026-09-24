# Hyperframes Composition Brief: Living High Inspections

## Objective
Create a 65-second cinematic launch video for the Living High property inspection app, showing the full manager workflow from login to PDF generation. Internal stakeholder audience. Voiceover enabled (--voice flag).

## Output
- Composition directory: `brag-output-2026-09-19-165148/composition/`
- Rendered video: `brag-output-2026-09-19-165148/brag.mp4`
- Format: landscape — 1280×720
- Duration: 65 seconds (9 scenes, user explicitly requested 60+)

## Source Material
- Project root: `D:\lh_app\`
- Primary files read: `frontend/src/app/page.tsx`, `frontend/src/app/login/login-form.tsx`, `frontend/src/app/globals.css`, `mockup/S1.png`, `mockup/S2.png`, `mockup/S3.png`, `CLAUDE.md`
- Product name: Living High Inspections
- Tagline / strongest claim: "From first tap to signed PDF report — all from your phone."
- Key UI or visual moment to recreate: The gold OUTGOING/INCOMING inspection-type toggle (S3.png) and the full-navy home dashboard (S2.png)
- Copy that must appear verbatim:
  - "LIVING HIGH INSPECTIONS"
  - "START INSPECTION"
  - "MY INSPECTIONS"
  - "PROPERTY INSPECTIONS"
  - "Begin Inspection →"
  - "Generate Report"
  - "Professional property management, from your pocket."
- No real names anywhere — no manager names, tenant names, owner names, or email addresses

## Creative Direction
- Tone preset: `cinematic`
- Creative direction: "luxury real estate product reveal — treat a rental inspection app like a blockbuster"
- Interpretation: Wide, confident, deliberate scenes. Big type reveals. Each beat settles before the next begins. The PDF unfolding is the climax — hold it generously. Restraint is the visual law.
- Angle: Most property inspection tools feel like Excel with a mobile skin. Living High is the opposite — clean, dark, and built for the field. The video treats it like a premium product: no noise, no clutter.
- Hook: Black screen, two text lines rise — "PROPERTY INSPECTIONS." then "REIMAGINED." Hard cut to login.
- Outro / punchline: Mountain tri-peak logo draws itself in SVG strokes. "LIVING HIGH INSPECTIONS" holds on navy. Fade to black.
- Avoid:
  - Generic SaaS language ("streamline", "workflow optimization")
  - Abstract filler visuals
  - Any real personal information (names, emails)
  - Overly busy transitions

## Visual Identity
- Background dark: `#0f1729` (navy — Living High brand from mockups)
- Background light (form body): `#f0f1f5` (light grey)
- Text on dark: `#ffffff`
- Text on light: `#000000`
- Muted label: `#6b7280`
- Accent gold (toggle): `#C9861A`
- Accent blue (report banner): `#1F5C8B`
- Display font: `Inter` (bold/black weight) with `Cardo` serif for greeting lines — use system fonts as fallback
- Body font: `Inter`
- Visual references: `assets/brand/S1.png`, `assets/brand/S2.png`, `assets/brand/S3.png`, `assets/brand/logo-white.png`

## Storyboard (summary — full storyboard in brag-plan.md)

1. **Cinematic Hook** — 5s — Black canvas, two white text lines rise sequentially: "PROPERTY INSPECTIONS." then "REIMAGINED." Hard cut.
2. **Login Screen** — 7s — Recreation of S1: navy header with mountain logo + wordmark. White card. Email field types. Password dots. "Sign In" button click simulated.
3. **Home Dashboard** — 7s — Recreation of S2: full navy. Mountain logo centred. "Hello, Manager." "PROPERTY INSPECTIONS" small caps. Two action buttons rise from bottom.
4. **New Inspection Form** — 8s — Recreation of S3: navy header. Address field types. OUTGOING toggle flips gold. Begin Inspection button activates and is tapped.
5. **Room Capture** — 9s — Three room cards appear one by one. Camera tap simulated. Photos arrive in room card.
6. **Photo Thumbnail Grid** — 7s — 3×2 thumbnail grid fills photo by photo (6 total). "6 photos" count badge appears.
7. **Review and Generate** — 7s — Review screen: 3 rooms with checkmarks listed. "Generate Report" button tapped. "Generating…" state activates.
8. **PDF Reveal** — 8s — White A4 PDF slides up from black. Scales to fill screen. Cover page, blue observation banner, photo grid visible. "Downloaded ✓" and "Email sent ✓" badges arrive.
9. **Brand Outro** — 6s — Full navy. Mountain tri-peak logo SVG path draws in. "LIVING HIGH INSPECTIONS" wordmark rises. Tagline line. Fade to black.

## Audio

- Audio role: cinematic support — steady confident bed, ducked under voiceover, swelling at PDF reveal
- Audio arc: quiet tension (hook) → confident bed (core scenes, all ducked under VO) → lift to cinematic swell (PDF reveal, ~55s) → graceful fade (outro, 65s)
- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: start at 0.10 (hook tension), hold at 0.12 ducked under VO (scenes 2–7), lift to 0.30 at scene 8 (~55s) after VO ends, fade to 0 at 65s
- Music cue guidance: bundled preset at `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`. Strong cues: 8.74s, 13.11s, 17.47s, 22.93s (in the 0–25s window). Target PDF document reveal near a strong cue if feasible within the 65s layout; readability takes priority.
- Audio-reactive treatment: subtle; navy background warmth breathes with music RMS on quiet scenes; mountain logo glow pulses softly on stronger musical moments in outro
- Audio-coupled moments:
  - Scene 1 (5s): impact/impactSoft_medium_001 at "REIMAGINED" entrance (~3.5s mark)
  - Scene 2 (12s): keyboard/keypress-001 through 003 cycling during email type (~7.5–9s); interface/click_001 at Sign In tap (~11s)
  - Scene 3 (19s): interface/drop_001 as action buttons slide in (~23s mark)
  - Scene 4 (27s): keyboard sounds during address type; interface/switch_001 at OUTGOING toggle flip (~32s); interface/click_001 on Begin tap (~34.5s)
  - Scene 5 (36s): interface/drop_002 per room card arrival; interface/click_001 on camera tap; interface/drop_001 per photo landing
  - Scene 6 (45s): casino/card-place-1, card-place-2, card-place-3 cycling per thumbnail; casino/chips-collide-1 on "6 photos" badge
  - Scene 7 (52s): interface/drop_001 per room row; interface/click_001 on Generate tap
  - Scene 8 (59s): impact/impactBell_heavy_000 at PDF full reveal (~59.5s); impact/impactBell_heavy_003 at "Downloaded ✓" badge (~62s)
  - Scene 9 (63s): impact/impactBell_heavy_003 as logo drawing completes (~64.5s)
- SFX selection guidance: sparse and earned. Never more than one SFX every ~0.8s. Prefer lower-volume warm sounds (drop, bell) over sharp clicks. SFX fires at the start of the animation it accompanies, 0.0–0.1s before first visible frame.
- SFX analysis guidance: `~/.claude/skills/brag/assets/sfx/sfx-analysis.md`
- Exact SFX choice: Hyperframes may adjust filenames, timestamps, density, and volume based on implemented animation.
- Audio files: all already copied to `brag-output-2026-09-19-165148/composition/assets/`

## Voiceover (--voice enabled)
Voiceover narration is enabled. Wire the generated WAV into the composition on its own audio track (track-index 3). Music ducks to 0.12 for the full voiceover duration (scenes 1–9 VO), then returns to 0.30 after VO ends. Generate voiceover via:
```bash
npx hyperframes tts "Property inspections. Every landlord needs them. Every manager dreads them. Living High changes that. One secure sign-in — and your inspection portal is ready. From your phone, in the field. Everything you need to start an inspection in seconds. Log the address, choose incoming or outgoing — then tap Begin. Simple by design. Add rooms one by one. Then tap to photograph — straight from your camera. Every corner, documented. Each room fills with photos, organised and timestamped. Nothing gets missed. Nothing gets lost. Review everything at a glance. Then hit Generate. The report builds itself. A fully branded PDF. Cover page, observations, every photo — auto-emailed and stored the moment it is done. Living High Inspections. Professional property management, from your pocket." \
  --voice af_heart \
  --output brag-output-2026-09-19-165148/composition/assets/voiceover.wav
```
Scene durations should flex to match the generated audio WAV duration. Check WAV length after generation and proportionally adjust scene `data-duration` values. The VO should run ~57s; that leaves 5–8s for hook (pre-VO silence) and outro tail.

## Hyperframes Instructions
Load `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. /brag is its own workflow — do not enter the hyperframes entry-point intent interview.

Requirements:
- Show actual UI from the project (use S1.png, S2.png, S3.png from assets/brand/ for key screens)
- Keep all text readable — minimum 0.8s settled hold for short labels, 0.3s/word for full sentences
- Duration: 65 seconds total
- Include voiceover and music layer
- At least one visual element subtly reacts to music RMS (background glow preferred)
- PDF reveal scene is the climax — hold it generously, let the bell SFX ring
- Run `hyperframes check` before rendering
- Render with `--quality high`
