export function formatMoney(value = 0) {
  let number;
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error('Please pass in a string or number to this function');
  }
  number = typeof value === 'string' ? Number(value) : value;

  return number
    .toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
    })
    .replace('$', '')
    .replace('US', '');
}
