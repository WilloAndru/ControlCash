export const getDaysRemaining = (
  updatePlanDate: string | null,
  planDuration: string | null
): number | null => {
  if (!updatePlanDate || !planDuration) return null;

  const startDate = new Date(updatePlanDate);
  const durationInMonths = parseInt(planDuration, 10);

  // Calcular fecha de expiración sumando meses
  const expiration = new Date(startDate);
  expiration.setMonth(expiration.getMonth() + durationInMonths);

  const now = new Date();
  const diffInMs = expiration.getTime() - now.getTime();
  const diffInDays = Math.max(Math.ceil(diffInMs / (1000 * 60 * 60 * 24)), 0);

  return diffInDays;
};
