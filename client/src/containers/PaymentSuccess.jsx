import { useParams } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import Button from '../components/Button';
const PaymentSuccess = () => {
  const params = useParams();
  return (
    <div className="flex items-center justify-center">
      <p className="text-3xl">PaymentSuccess {params?.TX_Ref}</p>
      <Button title="Home" Icon={AiOutlineHome} left solid />
    </div>
  );
};

export default PaymentSuccess;
