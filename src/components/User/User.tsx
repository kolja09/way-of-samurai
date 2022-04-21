import React, { FC } from 'react';
import { NavLink } from "react-router-dom";

import s from './User.module.css';
import userPhoto from '../../assets/img/149071.png';

import { IUser } from './types';

const User: FC<IUser> = ({ user, follow, followingInProgress, unFollow }) => {
	return (
		<div>
			<div className={s.userInfo}>
				<div className={s.followed}>

					<NavLink to={'profile/' + user.id}>
						<img className={s.photo} alt='user'
						     src={user.photos.small != null ? user.photos.small : userPhoto}/>
					</NavLink>
					<div className={s.button}>
						{
							user.followed ?
								<button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
									unFollow(user.id)
								}}>Unfollow</button> :
								<button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
									follow(user.id)
								}}>Follow</button>
						}
					</div>
				</div>
				<div className={s.info}>
					<div className={s.nameStatus}>
						<div className={s.name}>{user.name}</div>
						<div className={s.status}>{user.status}</div>
					</div>
					<div className={s.location}>
						<div className={s.country}>{'u.location.country'},</div>
						<div>{'u.location.city'}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;

