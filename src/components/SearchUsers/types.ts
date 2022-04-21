import { FilterType } from "../../store/user/usersReducer";

export interface ISearchUsers {
	onFilter: (filter: FilterType) => void,
}

export interface FormType {
	term:string,
	friend:'true' | 'false' | 'null',
}