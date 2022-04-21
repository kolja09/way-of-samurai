import { connect } from "react-redux";

import { RootState } from "../../store/store";
import { actions } from "../../store/profile/action-creators";

import MyPosts from "./MyPosts";

import { MapPropsType } from "./types";

const mapStateToProps = (state: RootState): MapPropsType => {
	return {
		posts: state.profilePage.posts
	}
}

const MyPostsContainer = connect(mapStateToProps, {...actions})(MyPosts)

export default MyPostsContainer;
