# Performance Program Foundation

## Summary

- Registers `performance-5day-v1` as the explicit system default without relying on program array order.
- Keeps `joey-12wk-knee-safe` available as an alternate program.
- Adds stable program, mission, phase, activity, and exercise IDs with an ongoing odd-week A/even-week B rotation.
- Adds schema-v2 date-keyed mission, activity, set, and metric record containers.
- Preserves established program state, history, bodyweight, photos, diagrams, settings, substitutions, and AI Coach overrides.
- Keeps private journal, reflection, mood, focus, and equivalent emotional-response data out of whole-state sync.

## Migration behavior

Fresh users and unused installations receive `performance-5day-v1`. A program is treated as established when schema-v2 explicit-selection metadata, a program start date, saved workout state, or AI Coach overrides are present. Established program IDs, including unknown IDs with one of those established-plan signals, remain unchanged.

Explicit selections recorded through schema-v2 selection metadata are preserved. Pre-v2 program selections without a start date, workout state, coach override, or explicit-selection metadata cannot be distinguished from the old automatic default and are treated as unused installations.

Migration creates a one-time local backup before changing an eligible pre-v2 installation. Migration is idempotent and does not delete unrelated user data.

## Unknown program recovery

An unknown selected program ID resolves to an explicit unavailable state. It is not rendered as the performance program and the stored ID is not changed. The existing Program view offers explicit recovery choices for `performance-5day-v1` and `joey-12wk-knee-safe`; a replacement is saved only after the user chooses it.

## Sync privacy

The current name-and-PIN whole-state sync excludes journal and reflection responses, mood values, before/after focus values, emotional-state fields, private-response fields, and equivalent nested private wellness content. Completion status and timestamps, meditation duration, journal-completed flags, and mission-completed flags remain syncable.

## Scope boundary

This foundation PR does not include the mission-first dashboard, typed activity execution UI, timers, or progress-summary redesign. Those remain in the later reviewable PRs.

## Validation

- `npm run validate`
- 28 Node tests covering program data, migration, sync privacy, and inline-script parsing
- Static JavaScript syntax checks
- `git diff --check`
