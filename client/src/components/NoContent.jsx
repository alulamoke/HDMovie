import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-weight: 300;
  font-size: 3.5rem;
`;

const SubTitle = styled.h2`
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.8rem;
`;

const NoContent = ({ title, subtitle }) => {
  return (
    <>
      <Helmet>
        <title>
          {title} {subtitle}
        </title>
      </Helmet>
      <TitleWrapper>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </TitleWrapper>
    </>
  );
};

export default NoContent;
