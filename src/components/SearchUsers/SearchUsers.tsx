import React from "react";
import { Formik, Field, Form } from "formik";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { FilterType } from "../../store/user/usersReducer";

import { FormType, ISearchUsers } from "./types";

const SearchUsers: React.FC<ISearchUsers> = ({ onFilter }) => {

	const filter = useSelector((state: RootState) => state.usersPage.filter);

	const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
		}
		onFilter(filter)
		setSubmitting(false)
	};

	const userSearchForm = () => {
		const errors = {};
		return errors;
	};

	return (
		<Formik
			enableReinitialize
			initialValues={{term: filter.term, friend: String(filter.friend) as 'true' | 'false' | 'null'}}
			validate={userSearchForm}
			onSubmit={submit}
		>
			{({isSubmitting}) => (
				<Form>
					<Field type="text" name="term"/>
					<Field name='friend' as='select'>
						<option value='null'>All</option>
						<option value='true'>Only followed</option>
						<option value='false'>Only unfollowed</option>
					</Field>
					<button type="submit" disabled={isSubmitting}>
						Find of users
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default SearchUsers
