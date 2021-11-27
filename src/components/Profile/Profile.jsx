import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostContainer";


const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    return (
        <div>
            <ProfileInfo saveProfile={saveProfile} savePhoto={savePhoto} isOwner={isOwner} updateStatus={updateStatus} status={status}  profile={profile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;