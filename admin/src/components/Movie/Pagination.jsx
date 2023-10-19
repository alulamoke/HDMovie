import { Link, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import styled from 'styled-components';

// Components
import Button from '../Button';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => {
    if (props.type === 'one') {
      return 'flex-start';
    } else if (props.type === 'both') {
      return 'space-between';
    } else {
      return 'flex-end';
    }
  }};
`;

const WrapperLink = styled(Link)`
  text-decoration: none;
`;

const Pagination = ({ page, total_pages }) => {
  const location = useLocation();
  const scrollTo = () => {
    scroller.scrollTo('scroll-to-element', {
      duration: 1500,
      smooth: 'easeInOutQuart',
      offset: -50,
    });
  };

  // If only 1 page
  if (total_pages === 1) {
    return null;
  }

  // On first page, render page 2 button
  if (page < total_pages && page === 1) {
    return (
      <Wrapper>
        <WrapperLink
          to={`${location.pathname}?page=${page + 1}`}
          onClick={scrollTo}
        >
          <Button title={`Page ${page + 1}`} Icon={AiOutlineArrowRight} solid />
        </WrapperLink>
      </Wrapper>
    );
  }

  // There is a next and a previous page, render accordingly
  else if (page < total_pages) {
    return (
      <Wrapper type="both">
        <WrapperLink
          to={`${location.pathname}?page=${page - 1}`}
          onClick={scrollTo}
        >
          <Button
            title={`Page ${page - 1}`}
            Icon={AiOutlineArrowLeft}
            left
            solid
          />
        </WrapperLink>
        <WrapperLink
          to={`${location.pathname}?page=${page + 1}`}
          onClick={scrollTo}
        >
          <Button solid title={`Page ${page + 1}`} Icon={AiOutlineArrowRight} />
        </WrapperLink>
      </Wrapper>
    );
  }

  // Otherwise on last page of results
  else {
    return (
      <Wrapper type="one">
        <WrapperLink
          to={`${location.pathname}?page=${page - 1}`}
          onClick={scrollTo}
        >
          <Button
            solid
            left
            title={`Page ${page - 1}`}
            Icon={AiOutlineArrowLeft}
          />
        </WrapperLink>
      </Wrapper>
    );
  }
};

export default Pagination;
