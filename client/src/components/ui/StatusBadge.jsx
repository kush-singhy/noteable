import React from "react";

function StatusBadge(props) {
	const { status } = props;

	return status ?
		<span className="badge rounded-pill read-badge">Read</span> :
		<span className="badge rounded-pill to-read-badge">To Read</span>

}

export default StatusBadge;