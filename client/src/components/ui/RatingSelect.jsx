import PropTypes from 'prop-types';

function RatingSelect({ id, value, onChange, label }) {
  return (
    <div className="info-input-group mb-3">
      <label className="info-input-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="form-select info-input"
        name="rating"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Rating...
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}

RatingSelect.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default RatingSelect;
