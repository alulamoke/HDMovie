import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { slide as Menu } from 'react-burger-menu';

import MenuItem from '../components/MenuItem';
import SearchBar from '../components//Movie/SearchBar';

const WrapperStickyBox = styled(StickyBox)`
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: var(--color-primary-lighter);
  box-shadow: 0 2px 40px var(--shadow-color);
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

const LinkWrap = styled(Link)`
  text-decoration: none;
  display: block;
  outline: none;
  margin-bottom: 0.5rem;
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
    overflowY: 'scroll',
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

const MenuMobile = ({ staticCategories, selected }) => {
  const [isOpened, setisOpened] = useState(false);

  const isMenuOpen = ({ isOpened }) => {
    setisOpened(isOpened);
  };

  return (
    <React.Fragment>
      <WrapperStickyBox>
        <Hamburguer onClick={() => setisOpened(true)}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburguer>
        <SearchBar />
      </WrapperStickyBox>
      <Menu isOpen={isOpened} onStateChange={isMenuOpen} styles={styles}>
        <Heading>Discover</Heading>
        {renderStatic(staticCategories, selected, setisOpened)}
      </Menu>
    </React.Fragment>
  );
};

function renderStatic(categories, selected, setisOpened) {
  return categories.map((category, i) => (
    <LinkWrap
      to={`${process.env.PUBLIC_URL}/${category}`}
      key={i}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={category}
        selected={category === selected ? true : false}
      />
    </LinkWrap>
  ));
}

const mapStateToProps = ({ config }) => {
  return {
    staticCategories: config.staticCategories,
    selected: config.selected,
  };
};

export default connect(mapStateToProps)(MenuMobile);
