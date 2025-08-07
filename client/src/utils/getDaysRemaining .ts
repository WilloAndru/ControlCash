//Funcion para calcular los dias restantes del plan
export const getDaysRemaining = (planExpirationDate: string | null) => {
  if (!planExpirationDate) return null;

  const now = new Date();
  const expiration = new Date(planExpirationDate);
  const diffInMs = expiration.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  return diffInDays;
};
