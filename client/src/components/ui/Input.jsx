import React from "react";

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
    )
}

export default Input;