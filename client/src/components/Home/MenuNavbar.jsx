import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { slide as Menu } from 'react-burger-menu';
import { MdLogin } from 'react-icons/md';

import Button from '../Button';
import Marginer from '../Marginer';
import LogoSvg from '../../svg/logo.svg';

const WrapperStickyBox = styled(StickyBox)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 0 5px var(--shadow-color);
  padding: 1.5rem 2rem;
  z-index: 1;
`;

const Hamburguer = styled.div`
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: space-around;
  width: 25px;
  line-height: 1;
  height: auto;
  background-color: transparent;
  cursor: pointer;
`;

const Bar = styled.span`
  transition: all 0.3s;
  border-radius: 10px;
  margin: 2px 0;
  height: 4px;
  width: 100%;
  display: inline-block;
  background-color: var(--color-primary);
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

const NavItem = styled(Link)`
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

var styles = {
  bmBurgerButton: {
    display: 'none',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    marginRight: '1rem',
  },
  bmCross: {
    background: '#fafafa',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: 0,
    left: 0,
  },
  bmMenu: {
    background: '#263238',
    overflowY: 'auto',
    padding: '2.5em 1.5em',
  },
  bmItemList: {
    color: '#fafafa',
    padding: '0.8rem',
  },
  bmItem: {
    outline: 'none',
  },
  bmOverlay: {
    top: 0,
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const MenuNavbar = () => {
  const [isOpened, setisOpened] = useState(false);

  const isMenuOpen = ({ isOpened }) => {
    setisOpened(isOpened);
  };

  return (
    <React.Fragment>
      <WrapperStickyBox>
        <LogoWrapper>
          <LogoImg>
            <img src={LogoSvg} alt="Logo" />
          </LogoImg>
          <LogoText to="/">HDMovie</LogoText>
        </LogoWrapper>
        <Hamburguer onClick={() => setisOpened(true)}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburguer>
      </WrapperStickyBox>
      <Menu isOpen={isOpened} onStateChange={isMenuOpen} styles={styles}>
        <Marginer margin="5rem" />
        <NavItem to="/" onClick={setisOpened ? () => setisOpened(false) : null}>
          Home
        </NavItem>
        <NavItem
          to="/discover/Popular"
          onClick={setisOpened ? () => setisOpened(false) : null}
        >
          Video Library
        </NavItem>
        <NavItem
          to="/pricing-plan"
          onClick={setisOpened ? () => setisOpened(false) : null}
        >
          Pricing Plan
        </NavItem>
        <Marginer margin="3rem" />
        <Link
          to="/login"
          onClick={setisOpened ? () => setisOpened(false) : null}
        >
          <Button
            title="Login"
            color="#e20c0c"
            Icon={MdLogin}
            left
            solid
            style={{ width: '100%', justifyContent: 'center' }}
          />
        </Link>
      </Menu>
    </React.Fragment>
  );
};

export default MenuNavbar;
