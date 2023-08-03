import { useEffect, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { defaultSelectArray } from '../utils/defaultSelectArray';
import { optionToProduct } from '../utils/optionToProductIds';

// type Option = { value: string; label: string };
// type SelectProps = {
//     selected: Option | null;
//     options: Option[];
//     placeholder?: string;
//     mode?: 'rows' | 'cells';
//     status?: 'default' | 'invalid';
//     onChange?: (selected: Option['value']) => void;
//     onClose?: () => void;
// };
// type ProductInfo={
//   value:String;
//   title:string;
// }

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

const SelectProducts = ({ products, selectedProducts, onChangeValue, onCloseCount }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [defaultSelect, setDefaultSelect] = useState(
    defaultSelectArray(products, selectedProducts),
  );

  const options = products.map((product) => {
    return { value: product.id, label: product.title };
  });

  useEffect(() => {
    const productInfo = optionToProduct(selectedOption);
    onChangeValue(productInfo);
  }, [selectedOption]);

  const handleChange = (option) => {
    // console.log(option);
    setSelectedOption({ option });
    onCloseCount(false);
  };

  return (
    <Select
      isOptionSelected={selectedOption}
      isMulti
      defaultValue={defaultSelect}
      onChange={handleChange}
      options={options}
    />
  );
};

export default SelectProducts;
