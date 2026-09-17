# Weight Loss + Strength architecture (inspected before implementation)

| Concern | Existing owner |
| --- | --- |
| Program definitions | js/program-data.js: buildProgramData, PROGRAMS, PROGRAM_TEMPLATES; js/performance-program.js: PROGRAM, getMission, toLegacyWorkout |
| Active/default selection | js/state-schema.js: migrateState, markProgramSelected; index.html: getActiveProgramId, changeProgram, setDefaultProgram, startProgram |
| Workout rendering | index.html: getProgramWeekData, getWorkoutsForDay, renderDay, openExerciseDetail; mission-dashboard.js: buildMissionModel, renderToday, renderSchedule |
| Logging/history | index.html: getKey, getExState, setExState, logSetEntry, logWorkoutHistory, renderHistory; history.html reads saved history; mission-records.js keys records by program/mission/date |
| Cardio | index.html: isCardioExercise, renderDay, setCardioField; existing speed/incline/distance/time fields save only to state.data, not history |
| Guides | js/program-data.js: PROGRAM_GUIDES; index.html: renderProgram, renderDayOverview |

State schema is v2. Existing history is a list of exercise/weight/reps/timestamp entries, sometimes sets/effort, with no mandatory program ID. Workout state uses week/program/day/index keys, with unscoped pre-program legacy keys as fallback. Mission records already include program ID and stable activity IDs. Old definitions and existing records must remain untouched. New cardio history can use the existing compatible fields with optional identity metadata. Restrict legacy unscoped fallback to the legacy program to prevent leakage into new workouts.
