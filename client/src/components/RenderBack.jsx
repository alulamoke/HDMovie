import { useNavigate } from 'react-router-dom';

// Render back button
const RenderBack = () => {
  return (
    <div onClick={navigate}>
      <Button title="Back" solid left Icon={AiOutlineArrowLeft} />
    </div>
  );
};

export default RenderBack;
