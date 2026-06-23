# AI Workout Coach setup

The app UI calls a Supabase Edge Function named `workout-coach`. The function is the only component that receives the Gemini API key.

## 1. Create a Gemini API key

Create a key in Google AI Studio. During testing, the function defaults to `gemini-3.1-flash-lite`, which currently has free-tier access. Do not put the key in `index.html`, `coach.js`, GitHub, or the browser.

## 2. Add the Supabase secret

From the project directory with the Supabase CLI authenticated:

```bash
supabase secrets set GEMINI_API_KEY="YOUR_KEY"
supabase secrets set GEMINI_MODEL="gemini-3.1-flash-lite"
```

`GEMINI_MODEL` is optional. It exists so the model can be upgraded without modifying the app.

## 3. Apply the usage-table migration

```bash
supabase db push
```

The `coach_usage` table is private and is used only by the Edge Function to enforce a per-profile daily request limit.

## 4. Deploy the Edge Function

```bash
supabase functions deploy workout-coach --no-verify-jwt
```

The function verifies that the request's sync profile exists in `sync_data`; the Gemini key remains server-side.

## 5. Test

1. Load the branch deployment twice or use the app's refresh/update button once. The service worker loads `js/coach.js` into the existing single-file app.
2. Sign in to the app's existing sync profile.
3. Open the **Coach** tab.
4. Accept the free-tier privacy notice.
5. Send a message such as `Adjust today's workout to 45 minutes.`
6. Review the proposed workout before pressing **Apply**.
7. Use **Undo** to restore the previous daily workout.

## Privacy note

Google's unpaid Gemini services may use submitted prompts and model responses to improve products, and human reviewers may process them. The app excludes the user's name, PIN and sync key from Gemini context, but workout history, goals and broad physical constraints are still personal information. Move to a paid API project before treating the feature as private production use.

## Changing providers later

The browser communicates only with the `workout-coach` endpoint and expects this response shape:

```json
{
  "reply": "Coach response",
  "proposal": {
    "day": "Tuesday",
    "title": "45-minute chest and biceps session",
    "reason": "Reduced accessory volume while preserving priorities.",
    "exercises": []
  }
}
```

To switch to OpenAI, Claude, or another provider, replace only the model call inside `supabase/functions/workout-coach/index.ts` and keep this response contract.
