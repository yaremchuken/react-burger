import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-30">
      <h2 className="text text_type_main-large pb-10">Такой странички у нас нет...</h2>
      <h3 className="text text_type_main-default pb-10">
        Зато у нас есть отличные бургеры, давай соберём что-то вкусненькое
      </h3>
      <Button onClick={() => navigate('/')}>Давай</Button>
    </div>
  );
};
