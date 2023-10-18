import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import styled from 'styled-components';

// Redux
import { useSelector } from 'react-redux';

// Components
import Logo from '../components/Logo';
import MenuItem from '../components/MenuItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  margin-top: 4rem;
  color: var(--color-primary-dark);
  border-right: 1px solid var(--border-color);
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const Sidebar = () => {
  const { staticCategories, genres } = useSelector((state) => state.config);

  return (
    <StickyBox>
      <Wrapper>
        <Logo />
        <Heading>Discover</Heading>
        {renderStatic()}
        <Heading>Genres</Heading>
        {renderGenres()}
      </Wrapper>
    </StickyBox>
  );

  function renderStatic() {
    return staticCategories.map((category, i) => (
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'flex items-center py-4 px-8 text-xl font-bold opacity-100 border border-gray-700 rounded-[3rem] mb-3 last:mb-0'
            : 'flex items-center py-4 px-8 text-xl font-bold opacity-60 hover:border hover:border-gray-700 rounded-[3rem] mb-3 last:mb-0'
        }
        key={i}
        to={`/discover/${category}`}
      >
        <MenuItem title={category} />
      </NavLink>
    ));
  }

  function renderGenres() {
    return genres.map((genre) => (
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'w-full flex items-center py-4 px-8 text-xl font-bold opacity-100 border border-gray-700 rounded-[3rem] mb-3 last:mb-0'
            : 'flex items-center py-4 px-8 text-xl font-bold opacity-60 hover:border hover:border-gray-700 rounded-[3rem] mb-3 last:mb-0'
        }
        key={genre._id}
        to={`/genre/${genre.name}`}
      >
        <MenuItem title={genre.name} />
      </NavLink>
    ));
  }
};

export default Sidebar;
