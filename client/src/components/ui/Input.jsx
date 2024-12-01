import PropTypes from 'prop-types';

function Input({ id, type, value, onChange, label }) {
  return (
    <div className="form-floating mb-3">
      <input
        id={id}
        type={type}
        name={id}
        className="form-control"
        placeholder={label}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
