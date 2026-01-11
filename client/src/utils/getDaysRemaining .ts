export const getDaysRemaining = (
  update_plan_date: string | null,
  planDuration: string | null
): number | null => {
  if (!update_plan_date || !planDuration) return null;

  const startDate = new Date(update_plan_date);
  const durationInMonths = parseInt(planDuration, 10);

  // Calcular fecha de expiración sumando meses
  const expiration = new Date(startDate);
  expiration.setMonth(expiration.getMonth() + durationInMonths);

  const now = new Date();
  const diffInMs = expiration.getTime() - now.getTime();
  const diffInDays = Math.max(Math.ceil(diffInMs / (1000 * 60 * 60 * 24)), 0);

  return diffInDays;
};
