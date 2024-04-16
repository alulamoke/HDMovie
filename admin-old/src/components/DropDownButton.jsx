import { useState } from 'react';
import Select from 'react-select';

import { cn } from '../lib';

const DropDownButton = ({
  id,
  options,
  selectedOptions = [],
  onClick,
  className,
}) => {
  const [option, setOption] = useState(selectedOptions);

  function handleChange(e) {
    const id = e.map((x) => x.value);
    onClick(id);
    setOption(e);
  }

  return (
    <Select
      id={id}
      value={option}
      options={options}
      onChange={handleChange}
      isSearchable={true}
      isMulti={true}
      className={cn(
        'my-react-select-container text-left text-2xl font-medium',
        className
      )}
      classNamePrefix="my-react-select"
    />
  );
};

export default DropDownButton;
