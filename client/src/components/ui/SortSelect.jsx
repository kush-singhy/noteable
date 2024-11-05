import React from "react";

function SortSelect({ status, setSortType }) {
    return (
        <div className={`input-group sort-select ${status ? '' : 'hide-select'}`}>
            <label className="input-group-text sort-label" htmlFor="sort-select">Sort by:</label>
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
    )
}

export default SortSelect;