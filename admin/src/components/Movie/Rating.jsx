import styled from 'styled-components';
import Stars from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const StarsWrapper = styled(Stars)`
  line-height: 1;
`;

const OutlineHeartIcons = styled(AiOutlineStar)`
  color: inherit;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-right: 10px;

  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-right: 5px;
  }
`;

const FullHeartIcons = styled(AiFillStar)`
  color: inherit;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-right: 10px;

  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-right: 5px;
  }
`;

const Rating = ({ number }) => {
  return (
    <StarsWrapper
      emptySymbol={<OutlineHeartIcons size={20} />}
      fullSymbol={<FullHeartIcons size={20} />}
      initialRating={number}
      readonly
    />
  );
};

export default Rating;
