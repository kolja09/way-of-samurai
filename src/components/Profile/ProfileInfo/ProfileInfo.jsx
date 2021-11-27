import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import photo from './../../../assets/img/149071.png'
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const photoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit =  (formData) => {
        saveProfile(formData).then(() =>{
            setEditMode(false)
        })
    }

    return (
        <div className={s.profileContainer}>
            <div>
                <img className={s.mainPhoto} src={profile.photos.small || photo} alt='user-photo'/>
                {isOwner && <input onChange={photoSelected} type={'file'}/>}
            </div>
            {editMode ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> :
                <ProfileData getEditMode={() => {
                    setEditMode(true)
                }} isOwner={isOwner} profile={profile}/>}

            <ProfileStatus updateStatus={updateStatus} status={status}/>
        </div>
    )
}

const ProfileData = ({profile, isOwner, getEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={getEditMode}>Edit</button>
            </div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a lob</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
}

export default ProfileInfo;