export const optionToProduct = (selectedOption) => {
  if (selectedOption?.option) {
    const arr = [];
    for (let i = 0; i < selectedOption?.option.length; ++i) {
      arr.push({ value: selectedOption.option[i].value, title: selectedOption.option[i].label });
    }
    return arr;
  }
};
