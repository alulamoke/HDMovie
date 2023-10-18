import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import SearchBar from './SearchBar';

const NavBarWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 1%;
  right: 2%;

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 1rem;
  }
`;

const LinkWrapper = styled(Link)`
  color: var(--color-primary-dark);
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 1rem;
`;

const InnerNavBar = () => (
  <NavBarWrapper>
    <SearchBar />
    <LinkWrapper to="/user">
      <FaUserCircle size={40} />
    </LinkWrapper>
  </NavBarWrapper>
);

export default InnerNavBar;
