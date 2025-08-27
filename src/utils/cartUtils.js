export const calculateProductTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const calculateShippingFee = (productTotal) => {
  return productTotal >= 100000 ? 0 : 3000;
};