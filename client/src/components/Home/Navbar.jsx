import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import styled from 'styled-components';

import LogoSvg from '../../svg/logo.svg';

const MainWrapperStickyBox = styled(StickyBox)`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 5px var(--shadow-color);
  z-index: 1;
`;

const InnerWrapper = styled.div`
  width: 100%;
  min-height: 6.8rem;
  max-width: 150em;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: auto;
  height: 4rem;

  img {
    width: auto;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const LogoText = styled(Link)`
  font-weight: 500;
  font-size: 2.5rem;
  color: var(--color-primary-dark);

  @media ${(props) => props.theme.mediaQueries.large} {
    font-size: 2.25rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-weight: 600;
    font-size: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    font-size: 1.75rem;
  }
`;

const ListWrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const NavItem = styled.li`
  font-weight: 600;
  font-size: 1.5rem;
  margin-right: 1.75rem;
  cursor: pointer;

  a {
    color: var(--color-primary-dark);
  }
`;

const NavBar = () => {
  return (
    <MainWrapperStickyBox>
      <InnerWrapper>
        <LogoWrapper>
          <LogoImg>
            <img src={LogoSvg} alt="Logo" />
          </LogoImg>
          <LogoText to="/">HDMovie</LogoText>
        </LogoWrapper>
        <ListWrapper>
          <NavItem>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'underline underline-offset-8' : ''
              }
              to="/"
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'underline underline-offset-8' : ''
              }
              to="/discover/Popular"
            >
              Video Library
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'underline underline-offset-8' : ''
              }
              to="/pricing-plan"
            >
              Pricing Plan
            </NavLink>
          </NavItem>
        </ListWrapper>
        <ListWrapper>
          <NavItem>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'underline underline-offset-8' : ''
              }
              to="/login"
            >
              Login
            </NavLink>
          </NavItem>
        </ListWrapper>
      </InnerWrapper>
    </MainWrapperStickyBox>
  );
};

export default NavBar;
