import PropTypes from 'prop-types';

function Input({ id, type, value, onChange, label, error }) {
  const className = 'form-control info-input ' + (error ? 'is-invalid' : '');

  return (
    <div className="info-input-group mb-3">
      <label className="info-input-label" htmlFor={id}>
        {label}
      </label>
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
