# Brag Plan: Living High Inspections

## What is this app?
Living High is a mobile-first property inspection app that lets property managers log incoming and outgoing tenant inspections with photos from their phone, and auto-generate fully branded PDF reports that are stored, downloadable, and auto-emailed.

## The angle
Most inspection tools feel like spreadsheets dressed as apps. Living High is the opposite — clean, fast, and built for the field. A manager walks in the front door, hits Start, photographs every room, and walks out with a PDF already on its way. The video treats this like a luxury product reveal: no bloat, no friction, just a phone and a report.

## Hook (first 2–3 seconds)
Black screen. A single white title rises:
```
PROPERTY INSPECTIONS.
REIMAGINED.
```
Then — hard cut to the navy Living High login screen.

## Key moments (the middle)

- **Login:** The navy header with the mountain tri-peak logo. Email/password fields. "Sign In" fires. Clean, confident.
- **Home dashboard:** Full dark navy. Mountain mark centred. "START INSPECTION" and "MY INSPECTIONS" — two buttons, infinite purpose.
- **New inspection form:** Property address types in. The gold OUTGOING/INCOMING toggle flips — that toggle IS the brand. "Begin Inspection →" lights up.
- **Room capture:** Rooms added one by one — "Living Room", "Kitchen", "Bathroom". Each opens a camera tap. Photos flood in.
- **Thumbnail grid:** Six photos in a 3×2 grid, arriving one by one with card sounds. Full room documented.
- **Generate PDF:** A progress bar pulses. "Generating your report…"
- **PDF reveal:** The report unfolds — branded cover, blue observation banner, photo media pages. The money shot.

## Outro / punchline
The mountain tri-peak logo holds on dark navy. Below it:
```
LIVING HIGH INSPECTIONS
Professional property management, from your pocket.
```
Music swells. Cut to black.

## User flow worth showing
1. **Login** — manager credentials → "Sign In" → portal opens
2. **Create inspection** — address + type toggle + begin
3. **Capture** — add rooms → tap to photograph → thumbnail grid fills
4. **Generate** — one tap → PDF built → emailed + downloadable

## Tone
- Preset: `cinematic`
- Creative direction: "luxury real estate product reveal — treat a rental inspection app like a blockbuster"
- Interpretation: Wide, confident scenes. Big serif/sans type. Each beat lands before moving. The PDF reveal is the climax — hold it 3+ seconds. No rush. No clutter.

## Format: landscape — 1280×720
## Duration: 65 seconds (--duration 60+ specified; 9 scenes averaging ~7s)

## Visual identity (from the project)
- Background (dark): `#0f1729` (navy — the brand's dark canvas from mockups)
- Background (card/form): `#f0f1f5` (light grey form body from S3)
- Text (on dark): `#ffffff`
- Text (on light): `#000000`
- Accent (gold toggle): `#C9861A` (OUTGOING gold from S3)
- Accent (blue): `#1F5C8B` (report banner blue from CLAUDE.md)
- Muted label: `#6b7280`
- Display font: Inter Bold / Cardo Serif (project uses both — headings use Cardo)
- Body font: Inter
- Strongest visual elements: navy+mountain logo hero (S2), gold toggle (S3), PDF blue banner

## Voiceover script

**Scene 1 — Hook (5s)**
"Property inspections. Every landlord needs them. Every manager dreads them."

**Scene 2 — Login (7s)**
"Living High changes that. One secure sign-in — and your inspection portal is ready."

**Scene 3 — Home dashboard (7s)**
"From your phone, in the field. Everything you need to start an inspection in seconds."

**Scene 4 — New inspection form (8s)**
"Log the address, choose incoming or outgoing — then tap Begin. Simple by design."

**Scene 5 — Room capture (9s)**
"Add rooms one by one. Then tap to photograph — straight from your camera. Every corner, documented."

**Scene 6 — Thumbnail grid (7s)**
"Each room fills with photos, organised and timestamped. Nothing gets missed. Nothing gets lost."

**Scene 7 — Review and generate (7s)**
"Review everything at a glance. Then hit Generate. The report builds itself."

**Scene 8 — PDF reveal (8s)**
"A fully branded PDF. Cover page, observations, every photo — auto-emailed and stored the moment it's done."

**Scene 9 — Outro (6s)**
"Living High Inspections. Professional property management, from your pocket."

---

## Share copy (draft)
Living High Inspections — from the front door to the filing cabinet, every rental documented in minutes. One tap to start, one tap to generate a branded PDF report.

## Audio direction
- Role: cinematic support — a steady, confident bed that builds under the voiceover and lifts at the PDF reveal
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean — best for cinematic)
- Music treatment: fade in at 0.3 volume under voiceover (ducked to 0.12 while VO speaks), swell to 0.35 after VO ends at ~58s, fade out at 63s
- Music cue guidance: bundled preset available. Strong cues at 8.74s, 13.11s, 17.47s, 22.93s. Target PDF reveal near 22.93s (strongest beat) if timeline permits; otherwise natural timing takes priority.
- Audio-reactive treatment: subtle; navy background warmth breathes gently with RMS on quiet scenes. Hero glow on mountain logo scene. No waveform visuals.
- SFX posture: sparse, cinematic — 2–3 well-timed cues. impactBell_heavy for PDF reveal (money shot). interface/click for button taps. card-slide for photo grid arrivals.
- Audio-coupled moments:
  - Scene 1 (hook text): subtle swoosh on REIMAGINED line
  - Scene 4 (toggle flip): interface/switch sound at the OUTGOING selection
  - Scene 5 (camera tap): interface/click per simulated tap
  - Scene 6 (photo grid): card-slide per photo arriving (first, 3rd, 6th only — not all six)
  - Scene 8 (PDF reveal): impactBell_heavy_000 on the moment the report unfolds
  - Scene 9 (logo): impactBell_heavy_003 soft resonant bell as logo settles
- Restraint rule: music must never overpower the voiceover. SFX must feel earned, not decorative.

---

## Storyboard

### Scene 1 — Cinematic hook — 5s
Black screen. A single line of white text rises in centre:
```
PROPERTY INSPECTIONS.
```
0.5s hold. Second line rises below:
```
REIMAGINED.
```
Hold 1.5s. Hard cut.
Sequential/interaction: yes — two text lines arrive sequentially (0.8s apart)
Audio intent: silence builds tension, then a subtle deep whoosh on "REIMAGINED"
Audio-coupled idea: impact/impactSoft_medium_001 at "REIMAGINED" entrance (0.2s before text settles)
Music: cinematic bed, very low (0.10) during this scene — tension before the reveal
Transition mood: hard cut → Scene 2

### Scene 2 — Login screen — 7s
Full mockup recreation of S1.png: navy header (#0f1729) with mountain tri-peak logo + "Living High" wordmark. White card below. "Sign In" heading. EMAIL field. PASSWORD field with dots. Navy "Sign In" button. No real email shown — field reads "manager@livinghigh.com.au" (masked).
At 3s: a simulated cursor clicks "Sign In". Button brightens briefly.
Sequential/interaction: yes — email field types in first 2s, then cursor clicks Sign In
Audio intent: professional, arriving — "this is a real portal"
Audio-coupled idea: keyboard key sounds during email typing (3 keypress WAVs, randomised); interface/click_001 on Sign In click
Music: bed holds at 0.12 under VO
Transition mood: dramatic wipe (scale-up) → Scene 3

### Scene 3 — Home dashboard — 7s
Full recreation of S2.png: full navy canvas. Mountain tri-peak (white SVG, large, centred). "Living High" wordmark. Below: greeting line "Hello, Manager" (no real name). "PROPERTY INSPECTIONS" small caps. Then at 4s: two buttons rise from bottom — "START INSPECTION" (white pill) and "MY INSPECTIONS" (dark outline pill).
Sequential/interaction: yes — logo and greeting rise in first, buttons rise in at 4s
Audio intent: confident, welcoming — the portal is alive
Audio-coupled idea: interface/drop_001 as buttons slide into position (4.0s mark)
Music: bed at 0.12
Transition mood: crossfade → Scene 4

### Scene 4 — New inspection form — 8s
Recreation of S3.png: dark navy header "New Inspection". Light grey body. 
- PROPERTY ADDRESS label → input fills with "14 Riverside Ave" (typed animation, 3 characters per second)
- ROOM / UNIT → "Unit 3"
- INSPECTION TYPE toggle: starts on INCOMING → flips to OUTGOING (gold highlight animates)
- TENANT NAME → placeholder visible but blank (respecting no-names rule)
- "Begin Inspection →" button at bottom goes from grey/disabled to dark/active
Sequential/interaction: yes — fields fill one by one in sequence; toggle flips at 5s; button activates at 6.5s; cursor taps it at 7.5s
Audio intent: methodical, purposeful — manager filling in details
Audio-coupled idea: keyboard sounds during address typing; interface/switch_001 at OUTGOING toggle flip; interface/click on Begin Inspection tap
Music: bed at 0.12
Transition mood: slide right → Scene 5

### Scene 5 — Room capture — 9s
Recreation of the capture screen. Dark navy header. Below: a list of rooms building up:
- "Living Room" card appears (1s)
- "Kitchen" card appears (2.5s)  
- "Bedroom" card appears (4s)
Each card shows a room name + "Add Photos" button. At 5s: cursor taps "Add Photos" on Living Room. A simulated camera view rectangle flashes briefly (2 frames), then — a thumbnail appears in the card. At 7s: a second photo appears. At 8s: a third.
Sequential/interaction: yes — room cards arrive one by one; then photos arrive one by one within a room
Audio intent: active, in-the-field — this is the work being done
Audio-coupled idea: card-slide or interface/drop per room card arrival; interface/click on "Add Photos" tap; interface/drop per photo thumbnail landing
Music: bed at 0.12
Transition mood: crossfade → Scene 6

### Scene 6 — Photo thumbnail grid — 7s
Close-up of a completed room card: a 3×2 grid of photo thumbnails. The 6 photos arrive one by one (every 0.8s). Each thumbnail is a placeholder rectangle with a subtle grey fill and a small camera icon — no real photo content needed. Each arrival has a subtle card-place sound. After all 6 are visible: the room card shows "6 photos" count badge.
Sequential/interaction: yes — 6 thumbnails arrive at beat-grid timing (0.56s between each, aligning to vol-12 beat grid)
Audio intent: satisfying, complete — everything documented
Audio-coupled idea: casino/card-place-1 to card-place-4 cycling for each thumbnail; chips-collide on the "6 photos" badge appearing
Music: bed at 0.12
Transition mood: crossfade → Scene 7

### Scene 7 — Review and generate — 7s
Recreation of a review screen. Navy header "Review". White card body. Three room rows listed:
- "Living Room · 6 photos ✓"
- "Kitchen · 4 photos ✓"  
- "Bedroom · 5 photos ✓"
Each row has a subtle checkmark. Below: a large pill button "Generate Report". At 5s: cursor taps it. Button text changes to "Generating…" with a pulsing dot.
Sequential/interaction: yes — 3 room rows arrive sequentially; cursor taps Generate at 5s
Audio intent: anticipation building — the payoff is coming
Audio-coupled idea: interface/drop per room row; interface/click_001 on Generate tap; subtle impact sound as "Generating…" state activates
Music: bed begins to lift slightly (0.18) as VO voice drops — anticipation
Transition mood: dramatic wipe (slow, left-to-right reveal) → Scene 8

### Scene 8 — PDF reveal — 8s
The money shot. Black background. A white A4 document slides in from bottom, casting a subtle shadow. It reveals:
- Blue banner at top: "LIVING HIGH PTY LTD"
- Below: cover page text (faint, no real names)
- Blue "Detailed Observations" banner section below
- Photo grid section at bottom (thumbnails visible)
The document unfolds over 2s. At 3s: it scales to fill 80% of the screen. Hold 3s.
At 6s: two badges appear below the PDF — "Downloaded ✓" and "Email sent ✓" — arriving with bell sounds.
Sequential/interaction: yes — document slides in; scales up; two confirmation badges arrive
Audio intent: triumphant — this is what all the work was for
Audio-coupled idea: impactBell_heavy_000 at the moment PDF is fully revealed (~2.5s); impactBell_heavy_003 as "Downloaded ✓" badge arrives; chips-collide as "Email sent ✓" arrives
Music: bed lifts to 0.30 after VO ends, a cinematic swell
Transition mood: soft crossfade → Scene 9

### Scene 9 — Brand outro — 6s
Full dark navy (#0f1729) canvas. The mountain tri-peak logo renders stroke by stroke (SVG path animation, 1.5s). Below: "LIVING HIGH INSPECTIONS" in white uppercase, letter-spaced. Below that, smaller: "Professional property management, from your pocket." Hold 3s. Fade to black.
Sequential/interaction: yes — logo draws in, then wordmark rises, then tagline rises
Audio intent: settled, proud — this is the brand
Audio-coupled idea: impactBell_heavy_003 as logo finishes drawing (1.5s mark); nothing else — let the music hold
Music: bed holds at 0.30, fades to 0 at 63s
Transition mood: fade to black

---

**Music mood for this video:** cinematic bed — steady, clean, building to a quiet swell at the PDF reveal
**Audio summary:** A quiet, confident music bed (vol-12) ducked under the voiceover throughout, lifting at the PDF reveal scene and fading gracefully into the brand outro. SFX are sparse and earned — three key moments: the toggle flip, the PDF bell, and the logo resolution.
