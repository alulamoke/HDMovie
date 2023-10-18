import React from 'react';
import Select from 'react-select';

const SortBy = ({ option, setOption }) => {
  const options = [
    { value: 'views_count.desc', label: 'Popularity' },
    { value: 'title.asc', label: 'Title' },
    { value: 'vote_average.desc', label: 'Votes Average' },
    { value: 'release_date.desc', label: 'Release Date' },
    { value: 'createdAt.desc', label: 'Created' },
  ];

  function handleChange(selectedOption) {
    setOption(selectedOption);
  }

  return (
    <Select
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
      isSearchable={true}
      onChange={handleChange}
    />
  );
};

export default SortBy;
