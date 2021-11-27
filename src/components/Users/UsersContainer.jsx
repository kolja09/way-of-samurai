import React from "react";
import {connect} from "react-redux";
import {
    follow, getUsers, pageChange,
    unFollow
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
       this.props.getUsers(currentPage, pageSize)
    }

    onPageChange = (pageNumber) => {
        const {pageSize} = this.props
       this.props.pageChange(pageNumber, pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> :
                    <Users users={this.props.users}
                           totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           onPageChange={this.onPageChange}
                           currentPage={this.props.currentPage}
                           unFollow={this.props.unFollow}
                           follow={this.props.follow}
                           followingInProgress={this.props.followingInProgress}
                    />
                }
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps, {
    getUsers,
    pageChange,
    follow,
    unFollow,
})(UsersContainer)
