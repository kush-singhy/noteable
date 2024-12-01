import PropTypes from 'prop-types';

function SortSelect({ status, setSortType }) {
  return (
    <div
      className={`input-group sort-select ${
        status === 'Completed' ? '' : 'hide-select'
      }`}
    >
      <label className="input-group-text sort-label" htmlFor="sort-select">
        Sort by:
      </label>
      <select
        className="form-select sort-input"
        id="sort-select"
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="date">Date Read</option>
        <option value="rating">Rating</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}

SortSelect.propTypes = {
  status: PropTypes.string.isRequired,
  setSortType: PropTypes.func.isRequired,
};

export default SortSelect;
