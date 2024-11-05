import React from "react";

function Toggle({ status, setStatus, leftText, rightText }) {
    return (
        <div className="toggle">
            <div
                className={`slider ${status ? 'left' : 'right'}`}
            ></div>
            <button
                className={status ? 'active' : ''}
                onClick={() => setStatus(true)}
            >
                {leftText}
            </button>
            <button
                className={!status ? 'active' : ''}
                onClick={() => setStatus(false)}
            >
                {rightText}
            </button>
        </div>
    )
}

export default Toggle;