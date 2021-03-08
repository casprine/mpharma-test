function sortProductPrices(a, b) {
  let timestampA = new Date(a.date).getTime();
  let timestampB = new Date(b.date).getTime();

  if (timestampA < timestampB) {
    return 1;
  }
  if (timestampA > timestampB) {
    return -1;
  }
  return 0;
}

export const productsNormalizer = (records) => {
  let prices = [];
  let products = records.map((prod) => {
    prices = prices.concat(
      prod.prices.map((price) => ({
        id: price.id,
        price: price.price,
        date: price.date,
        productId: prod.id,
      })),
    );
    return { id: Number(prod.id), name: prod.name };
  });

  prices.sort(sortProductPrices);

  const finalState = {
    products,
    prices,
  };

  return finalState;
};
