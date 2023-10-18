import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const DropDownButton = ({ id, options, selectedOptions = [], onClick }) => {
  const [option, setOption] = useState(selectedOptions);

  function handleChange(e) {
    const id = e.map((x) => x.value);
    onClick(id);
    setOption(e);
  }

  return (
    <div style={{ marginBottom: '3rem', fontSize: '1.5rem' }}>
      <Select
        id={id}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          width: '50',
          colors: {
            ...theme.colors,
            primary25: 'var(--color-primary-lighter)',
            primary: 'var(--color-primary)',
          },
        })}
        value={option}
        options={options}
        onChange={handleChange}
        isSearchable={true}
        isMulti={true}
      />
    </div>
  );
};

DropDownButton.prototype = {
  selectedOptions: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

export default DropDownButton;
