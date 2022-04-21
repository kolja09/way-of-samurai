import React from 'react';
import { Field, WrappedFieldProps } from "redux-form";

import { ValidatorType } from "../../util/validation/validation";

import s from './FormControl.module.css';
import { FormControlPropsType } from './types';

const FormControl: React.FC<FormControlPropsType> = ({meta: { touched, error }, children}) => {
	const hasError = touched && error;
	return (
		<div className={s.formControl + ' ' + (hasError ? s.error : '')}>
			{children}
			{
				hasError && <span>{error}</span>
			}
		</div>
	);
};

export function createField<FormKeysType extends string>(
	placeholder: string | undefined,
	name: FormKeysType,
	validators: Array<ValidatorType>,
	component: React.FC<WrappedFieldProps>,
	props = {},
	text = '') {
	return (
		<div>
		 <Field
			 placeholder={placeholder}
			 name={name}
			 validate={validators}
			 component={component}
			 {...props}/>{text}
	  </div>
	)
}

export default FormControl