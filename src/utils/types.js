import PropTypes from 'prop-types';

export const IngredientType = PropTypes.shape({
  uniqueId: PropTypes.string,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']),
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,
});

export const UserType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string,
});
