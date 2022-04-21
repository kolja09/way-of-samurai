import React, { FC } from "react";

import { ContactsPropsType } from "./types";

const Contact:FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
	return (
		<div>
			<b>{contactTitle}</b>: {contactValue}
		</div>
	)
}

export default Contact
