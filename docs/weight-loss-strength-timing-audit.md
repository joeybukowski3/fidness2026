# Weight Loss + Strength timing audit

Model: lower/top reps at 3/4 seconds per rep, 15/30 seconds logging/setup between sets/exercises, 10/15 seconds switching sides. Both sides count. Timed holds use full durations on each side. Full rest is counted between sets, separately from setup/logging. No supersets or overlapping rest/logging. Add five minutes per session for extra ramp-up, equipment adjustment and modest delays. Greater gym congestion can extend sessions.

Monday uses the full 18-minute conditioning budget. Thursday's 5/35/5 cardio is a continuous machine block. Tuesday warm-up includes bike plus actual execution of all four movement drills. Wednesday/Friday include five minutes cardio and three minutes programmed mobility/warm-up sets; additional ramp-up uses the reserve.

| Day | Before (min) | After (min) | Limit |
| --- | --- | --- | --- |
| Monday | 53.1–65.7 | 46.9–57.1 | 60 |
| Tuesday | 78.8–101.1 | 68.5–87.1 | 90 |
| Wednesday | 68.8–87.4 | 68.8–87.4 | 90 |
| Thursday | 94.2–111.9 | 76.5–86.8 | 90 |
| Friday | 71.8–92.7 | 63.5–80.8 | 90 |

Thursday includes five minutes easy finish; walking/stretching can fill remaining time until 6:00, making the attended session 90 minutes.

## Components (lower–upper minutes)

| Version/day | Warm-up | Strength | Core | Mobility | Cardio | Finish | Rest | Setup/logging/side changes | Reserve |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| before Monday | 5.0–5.0 | 10.4–18.4 | 0.0–0.0 | 0.0–0.0 | 18.0–18.0 | 0.0–0.0 | 10.0–10.0 | 4.8–9.2 | 5.0–5.0 |
| before Tuesday | 8.1–9.1 | 9.4–18.8 | 6.9–10.2 | 0.0–0.0 | 20.0–20.0 | 0.0–0.0 | 20.0–20.0 | 9.3–18.0 | 5.0–5.0 |
| before Wednesday | 8.0–8.0 | 10.6–20.9 | 1.5–3.0 | 0.0–0.0 | 18.0–18.0 | 0.0–0.0 | 19.0–19.0 | 6.8–13.5 | 5.0–5.0 |
| before Thursday | 0.0–0.0 | 0.0–0.0 | 10.3–14.4 | 11.2–16.5 | 45.0–45.0 | 5.0–5.0 | 7.5–7.5 | 10.2–18.5 | 5.0–5.0 |
| before Friday | 8.0–8.0 | 14.5–27.7 | 0.0–0.0 | 0.0–0.0 | 15.0–15.0 | 0.0–0.0 | 21.5–21.5 | 7.8–15.5 | 5.0–5.0 |
| after Monday | 5.0–5.0 | 8.1–14.6 | 0.0–0.0 | 0.0–0.0 | 18.0–18.0 | 0.0–0.0 | 7.0–7.0 | 3.8–7.5 | 5.0–5.0 |
| after Tuesday | 8.1–9.1 | 7.6–15.1 | 5.1–7.8 | 0.0–0.0 | 20.0–20.0 | 0.0–0.0 | 15.0–15.0 | 7.8–15.0 | 5.0–5.0 |
| after Wednesday | 8.0–8.0 | 10.6–20.9 | 1.5–3.0 | 0.0–0.0 | 18.0–18.0 | 0.0–0.0 | 19.0–19.0 | 6.8–13.5 | 5.0–5.0 |
| after Thursday | 0.0–0.0 | 0.0–0.0 | 6.9–9.6 | 5.6–8.2 | 45.0–45.0 | 5.0–5.0 | 3.0–3.0 | 6.1–11.0 | 5.0–5.0 |
| after Friday | 8.0–8.0 | 11.8–22.5 | 0.0–0.0 | 0.0–0.0 | 15.0–15.0 | 0.0–0.0 | 17.2–17.2 | 6.5–13.0 | 5.0–5.0 |

Thursday's cardio column includes its five-minute warm-up and cooldown.

## Revisions

- Monday: shoulder press, reverse pec deck, lateral raise 3→2 sets each; arms unchanged.
- Tuesday: leg press, hip abduction, calf raise, Pallof press, dead bug 3→2 sets each; remaining work unchanged.
- Wednesday: unchanged; upper estimate already includes five minutes reserve.
- Thursday: all six mobility exercises retained at one round/side; all four core exercises 3→2 sets. Hold durations/reps unchanged.
- Friday: preferred reduced structure exactly; remove pec deck, shoulder press/lateral raise/pressdown 3→2 sets; remaining exercises unchanged.

All rest and cardio durations unchanged. Activity durationMinutes now use conservative work/rest/setup estimates and refresh after deload reductions. Phase warm-up windows: Tuesday 12 minutes, Wednesday/Friday 10 minutes; Thursday mobility 14 minutes. No changes to schema, retained activity/exercise IDs, progression, knee rules, cardio logging, old programs, or historical rows.

## Weekly working sets

Normal weeks 1–5; unilateral sets count once per complete pair of sides. Direct/primary-mover accounting excludes indirect arm stimulus from presses/pulls. RDL contributes to hamstrings and glutes; leg press is counted under quads only. Warm-up/mobility excluded.

| Group | Normal | Week 6 deload |
| --- | --- | --- |
| Chest | 9 | 6 |
| Back | 12 | 8 |
| Shoulders: press / lateral / rear | 4 / 7 / 4 | 2 / 4 / 2 |
| Biceps | 15 | 9 |
| Triceps | 4 | 2 |
| Hamstrings | 8 | 5 |
| Glutes / hip abductors | 10 | 6 |
| Quads | 2 | 1 |
| Calves | 2 | 1 |
| Core | 18 | 10 |

## Validation

npm run validate: 59 tests pass and syntax checks pass. git diff --check passes. No separate build/lint script exists. Cached Playwright browser verification passes: app load, all weekdays, visible targets, selector/default/reload, cardio persistence, historical readability/preservation, mobile (390px) and desktop (1280px) without horizontal overflow, no page or console errors. External sync mocked and web fonts omitted. No commit/push.

Reproduce estimates: `node docs/audit-weight-loss-timing.cjs`. Frozen pre-audit definitions: weight-loss-timing-before.json.
