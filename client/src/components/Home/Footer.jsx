import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPhoneAlt } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';

import LogoSvg from '../../svg/logo.svg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(38, 50, 56);
  padding: 3rem;
  padding-top: 6rem;

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 3rem;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  max-width: 150em;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 6rem;
  margin-bottom: 3rem;

  @media ${(props) => props.theme.mediaQueries.small} {
    margin-right: 3rem;
  }
`;

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3.5rem;

  @media ${(props) => props.theme.mediaQueries.small} {
    margin-bottom: 3rem;
  }
`;

const HorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
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
  font-weight: 400;
  font-size: 2.5rem;
  color: var(--text-color);

  @media ${(props) => props.theme.mediaQueries.large} {
    font-size: 2.25rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 2rem;
  }
`;

const AboutText = styled.p`
  font-weight: 400;
  font-size: 1.5rem;
  color: var(--color-primary-lighter);
  max-width: 35rem;
`;

const LinksList = styled.ul`
  outline: none;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const LinkItem = styled.li`
  margin-bottom: 1rem;
  a {
    font-size: 1.5rem;
    color: var(--color-primary-lighter);
    font-weight: 500;
  }
`;

const HeaderText = styled.h3`
  font-size: 1.75rem;
  color: var(--text-color);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const RedIcon = styled.span`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #e20c0c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const SmallText = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-primary-lighter);
`;

const CopyRight = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-primary-lighter);
`;

const Footer = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <AboutWrapper>
          <LogoWrapper>
            <LogoImg>
              <img src={LogoSvg} alt="Logo" />
            </LogoImg>
            <LogoText to="/">HDMovie</LogoText>
          </LogoWrapper>
          <AboutText>
            HDMovie is a website that you can watch the largest collection of
            Movies and TV shows anytime anywhere!
          </AboutText>
        </AboutWrapper>
        <SectionWrapper>
          <HeaderText>Our Links</HeaderText>
          <LinksList>
            <LinkItem>
              <Link to="/">Home</Link>
            </LinkItem>
            <LinkItem>
              <Link to="/discover/popular">Video Library</Link>
            </LinkItem>
            <LinkItem>
              <Link to="/signup">Pricing Plans</Link>
            </LinkItem>
            <LinkItem>
              <Link to="/">Services</Link>
            </LinkItem>
            <LinkItem>
              <Link to="/">Blog</Link>
            </LinkItem>
          </LinksList>
        </SectionWrapper>
        <SectionWrapper>
          <HeaderText>Other Links</HeaderText>
          <LinksList>
            <LinkItem>
              <Link to="/">FAQ</Link>
            </LinkItem>
            <LinkItem>
              <Link to="/">Contact Us</Link>
            </LinkItem>
            <LinkItem>
              <Link to="/">Support</Link>
            </LinkItem>
            <LinkItem>
              <Link to="/">Privacy Policy</Link>
            </LinkItem>
            <LinkItem>
              <Link to="/">Terms & Conditions</Link>
            </LinkItem>
          </LinksList>
        </SectionWrapper>
        <SectionWrapper>
          <HeaderText>Call Now</HeaderText>
          <HorizontalWrapper>
            <RedIcon>
              <FaPhoneAlt />
            </RedIcon>
            <SmallText>+251-932055487</SmallText>
          </HorizontalWrapper>
          <HorizontalWrapper>
            <RedIcon>
              <FaPhoneAlt />
            </RedIcon>
            <SmallText>+251-914010187</SmallText>
          </HorizontalWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <HeaderText>Mail</HeaderText>
          <HorizontalWrapper>
            <RedIcon>
              <TfiEmail />
            </RedIcon>
            <SmallText>info@HDMovie.com</SmallText>
          </HorizontalWrapper>
        </SectionWrapper>
      </InnerWrapper>
      <CopyRight>Copyright © HDMovie</CopyRight>
    </Wrapper>
  );
};

export default Footer;
