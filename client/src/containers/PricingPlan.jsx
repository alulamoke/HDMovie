import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

import styled from 'styled-components';
import Button from '../components/Button';

import Marginer from '../components/Marginer';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 5rem 0;
  padding: 0 1rem;
`;

const Heading = styled.h1`
  font-size: ${({ size }) => (size === '2x' ? '5rem' : '2rem')};
  font-weight: ${({ size }) => size === '2x' && '300'};

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: ${({ size }) => size === '2x' && '3.5rem'};
    font-weight: ${({ size }) => size === '2x' && '400'};
  }
`;

const PricingWarpper = styled.div`
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.mediaQueries.medium} {
    display: flex;
    flex-direction: column;
  }
`;

const PriceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 6rem 3rem;
  margin-right: 3rem;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:last-child {
    margin-right: 0;
  }

  ${({ selected }) => !selected} {
    color: var(--text-color);
    background-color: var(--color-primary-dark);
    box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
    transform: scale(1.03);

    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  &:hover {
    color: var(--text-color);
    background-color: var(--color-primary-dark);
    box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
    transform: scale(1.03);

    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  h1 {
    font-size: 2.5rem;
  }

  center {
    margin: 2rem auto;
    font-weight: 600;

    span {
      font-size: 2.5rem;
    }
    small {
      font-size: 1.3rem;
    }
  }

  p {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    margin: 0;
    margin-bottom: 2rem;

    &:last-child {
      margin: 0;
    }
  }
`;

const PriceInfo = styled.p`
  font-size: 1.8rem;
  max-width: 75rem;
  margin: auto;

  span {
    font-weight: 700;
  }
`;

const PricingPlan = () => {
  const [priceType, setPriceType] = useState({});

  return (
    <MainWrapper>
      <Heading>for one low month price</Heading>
      <Heading size="2x">instantly watch TV shows & Movies</Heading>
      <Marginer margin="10rem" />
      <PricingWarpper style={{ display: 'flex', alignItems: 'center' }}>
        <PriceItem
          selected={priceType.name === 'Free Trail'}
          onClick={() =>
            setPriceType({
              name: 'Free Trail',
              price: 0.0,
            })
          }
        >
          <h1>Free Trail</h1>
          <center>
            <span>$0.00</span>
          </center>
          <p>- 20 Movies & Shows</p>
          <p>- Watch on any Device</p>
          <p>- Movies & TV shows</p>
          <p>- Upgrade Plan Anytime</p>
        </PriceItem>
        <PriceItem
          selected={priceType.name === 'Starter'}
          onClick={() =>
            setPriceType({
              name: 'Starter',
              price: 10.0,
            })
          }
        >
          <h1>Starter</h1>
          <center>
            <span>$10.00</span>
            <small>/month</small>
          </center>
          <p>- 70 Movies & Shows</p>
          <p>- Watch on any Device</p>
          <p>- Movies & TV shows</p>
          <p>- Upgrade Plan Anytime</p>
        </PriceItem>
        <PriceItem
          selected={priceType.name === 'Premium'}
          onClick={() =>
            setPriceType({
              name: 'Premium',
              price: 14.0,
            })
          }
        >
          <h1>Premium</h1>
          <center>
            <span>$14.00</span>
            <small>/month</small>
          </center>
          <p>- Unlimited Movies & Shows</p>
          <p>- Watch on any Device</p>
          <p>- Movies & TV shows</p>
          <p>- Ultimate Video Package</p>
        </PriceItem>
      </PricingWarpper>
      <Marginer margin="5rem" />
      {Object.keys(priceType).length > 0 && (
        <>
          <PriceInfo>
            Your currently selected plan: <span>{priceType.name}</span>, Plan
            Amount: <span>${priceType.price}</span>, Coupon Discount Amount:{' '}
            <span>0.00 USD</span>, final Payable Amount:{' '}
            <span>${priceType.price}</span>
          </PriceInfo>
          <Marginer margin="2rem" />
          <Link to={{ pathname: '/signup', state: { plan: priceType.name } }}>
            <Button title="Next Step" Icon={AiOutlineArrowRight} left solid />
          </Link>
        </>
      )}
    </MainWrapper>
  );
};

export default PricingPlan;
