import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({
                   totalUsersCount,
                   pageSize,
                   unFollow,
                   onPageChange,
                   follow,
                   currentPage,
                   users,
                   followingInProgress,
               }) => {
    return (
        <div>
            <h1>Users</h1>
            <Paginator pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange}
                       totalUsersCount={totalUsersCount}/>
            {
                users.map(u => <User user={u} followingInProgress={followingInProgress} follow={follow}
                                     unFollow={unFollow} key={u.id}/>)
            }
        </div>
    );
};

export default Users;

