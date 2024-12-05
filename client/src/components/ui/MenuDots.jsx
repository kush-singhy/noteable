import dotsIcon from '../../assets/dots.svg';
import PropTypes from 'prop-types';

function MenuDots({ handleEdit, handleDelete }) {
  return (
    <div>
      <div data-bs-toggle="dropdown">
        <img src={dotsIcon} />
      </div>
      <ul className="profile-dropdown dropdown-menu">
        <li>
          <button onClick={handleEdit} className="logout-btn dropdown-item">
            Edit Details
          </button>
        </li>
        <li>
          <button
            className="logout-btn dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            Delete Book
          </button>
        </li>
      </ul>

      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Hold your horses!
              </h1>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this entry?
            </div>
            <div className="modal-footer">
              <button
                onClick={handleDelete}
                className="modal-btn delete-btn"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
              <button
                type="button"
                className="modal-btn cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
MenuDots.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MenuDots;
