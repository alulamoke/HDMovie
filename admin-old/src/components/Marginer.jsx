import styled from 'styled-components';

const HorizontalMargin = styled.div`
  display: flex;
  min-width: ${({ margin }) =>
    typeof margin === 'string' ? margin : `${margin}px`};
`;

const VerticalMargin = styled.div`
  display: flex;
  min-height: ${({ margin }) =>
    typeof margin === 'string' ? margin : `${margin}px`};
`;

const Marginer = (props) => {
  const { direction } = props;
  if (direction === 'horizontal') return <HorizontalMargin {...props} />;
  return <VerticalMargin {...props} />;
};

export default Marginer;
