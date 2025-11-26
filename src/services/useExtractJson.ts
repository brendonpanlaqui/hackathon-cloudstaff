export const extractJson = (answer: string) => {
  // remove code fences
  let cleaned = answer.replace(/```json|```/g, "").trim();

  // keep only from first { to last }
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");

  cleaned = cleaned.substring(first, last + 1);

  return JSON.parse(cleaned);
};
