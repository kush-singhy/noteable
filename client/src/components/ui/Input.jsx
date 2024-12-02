import PropTypes from 'prop-types';

function Input({ id, type, value, onChange, label, error }) {
  const className = 'form-control info-input ' + (error ? 'is-invalid' : '');

  return (
    <div className="form-floating mb-3">
      <input
        id={id}
        type={type}
        name={id}
        className={className}
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
  error: PropTypes.string,
};

export default Input;
