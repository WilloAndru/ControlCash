export const acquisitionTime = ( type: number, savings: number, priceProperty: number ) => {
  const months = Math.ceil(priceProperty / savings);

  // Cuando se quiere obtener los años y meses
  if (type === 1) {
    const years = Math.floor(months / 12);
    const restMonths = months % 12;
    return `${years} years and ${restMonths} months`;
  } 
  // Cuando se quiere obtener solo los meses
  else if (type === 2) {
    return `${months} months`;
  } 
  // Cuando se quiere obtener la fecha de adquisición
  else if (type === 3) {
    const today = new Date();
    today.setMonth(today.getMonth() + months);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };

    return today.toLocaleDateString("en-US", options);
  }
};
