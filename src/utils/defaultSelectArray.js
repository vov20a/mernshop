export const defaultSelectArray = (products, selectedProducts) => {
  const arr = [];
  for (let i = 0; i < products.length; ++i) {
    for (let j = 0; j < selectedProducts.length; ++j) {
      if (selectedProducts[j] === products[i].id) {
        arr.push({ value: products[i].id, label: products[i].title });
      }
    }
  }
  return arr;
};
//{ value: '6489d0bb56b6e083e9583cf0', label: "Product4" }
//{ value: '6489d2a15dcf7ffe5894dc51', label: "Product5" }
