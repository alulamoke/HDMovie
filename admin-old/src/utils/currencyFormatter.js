export const currencyFormatter = (amount) => {
  let convertedAmount;
  const currency = JSON.parse(localStorage.getItem('currency'))
    ? JSON.parse(localStorage.getItem('currency'))
    : 'ETB';

  if (currency === 'ETB') {
    convertedAmount = amount;
  }
  if (currency === 'USD') {
    convertedAmount = amount * 0.018;
  }
  if (currency === 'EUR') {
    convertedAmount = amount * 0.014;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'ETB',
  }).format(convertedAmount);
};
