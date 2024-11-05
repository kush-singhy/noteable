import React from "react";

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
    )
}

export default Textarea;