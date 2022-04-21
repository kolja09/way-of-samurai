import React from "react";
import { WrappedFieldProps } from "redux-form";

import FormControl from "../FormControl/FormControl";

const Input: React.FC<WrappedFieldProps> = (props) => {
	const { input, meta, ...restProps } = props;
	return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export default Input