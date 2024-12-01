import PropTypes from 'prop-types';

function Textarea({ id, value, onChange, label }) {
  return (
    <div className="form-floating mb-3">
      <textarea
        id={id}
        name={id}
        placeholder={label}
        className="form-control notes-input"
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Textarea;
