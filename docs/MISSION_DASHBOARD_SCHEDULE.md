# Mission Dashboard and Schedule

## Summary

- Makes Today the default primary application view for the Five-Day Performance System.
- Presents the current mission, purpose, 4:30–6:00 AM window, location, focus, supported goals, fasting, meditation, journal prompt, safety guidance, and full phase timeline.
- Adds durable date-scoped Start, Resume, Complete, and View Completed mission states.
- Keeps read-only sets, repetitions, RIR targets, notes, and substitutions visible without adding typed execution controls.
- Keeps the existing workout logger available from Today and through its own navigation tab.
- Adds a Monday–Friday Schedule with optional weekends and non-mutating mission previews.

## Mission records

Mission lifecycle state is stored in schema-v2 `missionRecords` using stable program, mission, and local-date identity. Records contain only the record ID, program ID, mission ID, local date, status, started/completed timestamps, program week, variation, and last-updated timestamp. Mission completion remains eligible for sync because it contains no private journal response.

## Compatibility

- Existing program selection and migration behavior is unchanged.
- The 12-week knee-safe program remains available with its existing workout logger.
- Unknown selected programs retain the existing unavailable-program recovery flow.
- Workout history, bodyweight, photos, diagrams, substitutions, settings, AI Coach, sync, and dark mode remain available.
- Private journal, reflection, mood, focus, and wellness-response stripping is unchanged.

## Scope boundary

This PR does not add individual-set execution, recorded RIR controls, meditation or activity timers, journal response persistence, progress dashboards, calculated Friday summaries, or broad AI Coach changes.

## Validation

- Static JavaScript syntax validation
- Existing foundation tests
- 47 passing Node tests covering mission data, schedule, lifecycle, persistence, compatibility, privacy, and existing foundation behavior
- Inline application-script parsing
- Chromium desktop visual smoke at 1280×720 for Today and Schedule
- Chromium Pixel-class mobile visual smoke at 412×915 for Today and Schedule
- WebKit was not available in the local Playwright installation; cross-engine validation remains a follow-up risk
