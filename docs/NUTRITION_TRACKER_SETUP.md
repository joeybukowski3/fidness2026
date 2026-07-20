# Nutrition tracker and chatbot setup

The Nutrition page stores food logs, daily targets, and chat history in the app's existing synced state. It does not require a new database migration.

The nutrition chatbot calls a Supabase Edge Function named `nutrition-coach`. That function reuses the existing `GEMINI_API_KEY` and optional `GEMINI_MODEL` secrets.

## Deploy the function

From the repository while checked out to `feature/nutrition-tracker`:

```powershell
npx supabase functions deploy nutrition-coach --no-verify-jwt
```

Then confirm it is active:

```powershell
npx supabase functions list
```

## Test the branch locally

```powershell
npx serve . -l 5173
```

Open `http://localhost:5173`, refresh once after the updated service worker installs, and open the **Nutrition** tab.

Recommended tests:

1. Change the calorie and macro targets.
2. Add, edit, and delete a manual food entry.
3. Change dates and confirm each date has a separate log.
4. Accept the Gemini notice and send: `Log 2 scrambled eggs, 2 slices of toast, and a banana for breakfast.`
5. Review and edit the estimated items before pressing **Add all**.
6. Confirm the calorie and macro totals update.
7. Reload and confirm the entries remain and sync to the signed-in profile.

## Behavior and safety

- Gemini estimates are never added automatically.
- The user reviews estimated portions, calories, protein, carbohydrates, and fat before saving.
- Manual entries can use exact package-label values.
- The model does not receive the user's name, PIN, or sync key.
- Free-tier Gemini privacy limitations still apply to the nutrition text and non-identifying log context sent to the model.
- Targets are editable starting values and are not presented as medical recommendations.

## Provider changes

The browser expects the following response contract from `nutrition-coach`:

```json
{
  "reply": "I estimated the meal using standard portions.",
  "summary": "Review the bread size and cooking oil.",
  "proposedItems": [
    {
      "name": "Scrambled eggs",
      "quantity": "2 large eggs",
      "meal": "Breakfast",
      "calories": 180,
      "protein": 13,
      "carbs": 1,
      "fat": 13,
      "notes": "Includes a small amount of cooking fat",
      "confidence": "medium"
    }
  ]
}
```

A future OpenAI, Claude, or paid Gemini implementation only needs to preserve that response shape.
