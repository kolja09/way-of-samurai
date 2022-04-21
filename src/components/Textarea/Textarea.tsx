import React from "react";
import { WrappedFieldProps } from "redux-form";

import FormControl from "../FormControl/FormControl";

const Textarea: React.FC<WrappedFieldProps> = (props) => {
	const { input, meta, ...restProps } = props;

	return (
		<FormControl {...props}>
			<textarea {...input} {...restProps}/>
		</FormControl>
	)
};

export default Textarea
