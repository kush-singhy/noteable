import React from "react";

function RatingSelect({ id, value, onChange, label }) {
    return (
        <div className="form-floating mb-3">
            <select id={id} className="form-select" name="rating" value={value} onChange={onChange} >
                <option value="" disabled>Rating...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default RatingSelect;