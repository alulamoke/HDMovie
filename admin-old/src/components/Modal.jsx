import styled from 'styled-components';

// Components
import Button from './Button';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 99;
`;

const ModalContent = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  border-radius: 3px;
  padding: 2rem;

  max-height: 80%;
  width: ${({ size }) => {
    switch (size) {
      case 'xl':
        return '90%';
      case 'lg':
        return '70%';
      case 'md':
        return '50%';
      case 'sm':
        return '30%';
      default:
        break;
    }
  }};

  @media ${(props) => props.theme.mediaQueries.larger} {
    width: 70%;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    width: 80%;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 90%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Heading = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary-dark);

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.8rem;
  }
`;

const Modal = ({ open, size = 'sm', title, onClose, children }) => {
  return (
    <>
      {open && (
        <ModalWrapper>
          <ModalContent size={size}>
            <ModalTitle>
              <Heading>{title}</Heading>
              <Button title="Close" icon="times" left solid onClick={onClose} />
            </ModalTitle>
            {children}
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
