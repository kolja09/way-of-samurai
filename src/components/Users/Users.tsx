import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

import { RootState } from '../../store/store';
import { follow, getUsers, unFollow } from '../../store/user/action-creators';
import { FilterType } from '../../store/user/usersReducer';

import Paginator from "../Paginator/Paginator";
import User from "../User/User";
import SearchUsers from "../SearchUsers/SearchUsers";
import Preloader from "../Preloader/Preloader";

const Users: React.FC = () => {
	const dispatch = useDispatch();

	const totalUsersCount = useSelector((state: RootState) => state.usersPage.totalUsersCount);
	const currentPage = useSelector((state: RootState) => state.usersPage.currentPage);
	const pageSize = useSelector((state: RootState) => state.usersPage.pageSize);
	const users = useSelector((state: RootState) => state.usersPage.users);
	const filter = useSelector((state: RootState) => state.usersPage.filter);
	const followingInProgress = useSelector((state: RootState) => state.usersPage.followingInProgress);
	const isFetching = useSelector((state:RootState) => state.usersPage.isFetching)

	const onPageChange = (pageNumber: number) => {
		dispatch(getUsers(pageNumber, pageSize, filter))
	};

	const onFilter = (filter: FilterType) => {
		dispatch(getUsers(1, pageSize, filter))
	};

	const followSuccess = (userId: number) => {
		dispatch(follow(userId))
	};

	const unFollowSuccess = (userId: number) => {
		dispatch(unFollow(userId))
	};

	const history = useHistory();

	useEffect(() => {
		const parsed = queryString.parse(history.location.search.substring(1)) as { term: string, page: string, friend: string };

		let actualPage = currentPage;
		let actualFilter = filter;

		if (!!parsed.page) actualPage = Number(parsed.page);

		if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};

		if (!!parsed.term) actualFilter =
			{...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false};

		dispatch(getUsers(actualPage, pageSize, actualFilter))
	}, []);

	useEffect(() => {
		const query: { term?: string, page?: string, friend?: string } = {};

		if (!!filter.term) query.term = filter.term;

		if (filter.friend !== null) query.friend = String(filter.friend);

		if (currentPage !== 1) query.page = String(currentPage);

		history.push({
			pathname: '/developers',
			search: queryString.stringify(query)
		});

	}, [filter, currentPage]);

	return (
		<>
			{isFetching ? <Preloader/> : null}
			<div>
				<h1>Users</h1>
				<SearchUsers onFilter={onFilter}/>
				<Paginator
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={onPageChange}
					totalUsersCount={totalUsersCount}
				/>
				{
					users.map(u =>
						<User
							user={u}
							followingInProgress={followingInProgress}
							follow={followSuccess}
							unFollow={unFollowSuccess}
							key={u.id}
						/>)
				}
			</div>
		</>
	);
};


export default Users;

