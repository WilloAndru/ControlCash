const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});


export function generateDataTable(savings: number, priceProperty: number ) {    
    let data: any[] = [];
    let investedAmount = 0;
    const months = Math.ceil(priceProperty / savings);

  for (let i = 1; i <= months; i++) {
    investedAmount += savings;

    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + i);

    data.push({
      id: i,
      month: date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      investedAmount: formatter.format(investedAmount),
      percentage: `${((investedAmount * 100) / priceProperty).toFixed(1)} %`,
    });
  }

    return data;
}