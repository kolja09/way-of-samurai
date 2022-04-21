import { RouteComponentProps } from "react-router-dom";
import { mapStateToProps } from "./ProfileСontainer";

type MapPropsType = ReturnType<typeof mapStateToProps>

interface MapDispatchToPropsType {
	getUserProfile: (userId: number) => void,
	getStatus: (userId: number) => void,
	updateStatus: (status: string) => void,
	savePhoto: (file: File) => void,
	saveProfile: (profile: ProfileType) => Promise<any>,
}

interface PathParamsType {
	userId: string,
}

export type IProfileContainer = MapPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>

export interface IProfile {
	profile:ProfileType | null,
	status:string,
	updateStatus:(status:string) => void,
	savePhoto: (file:File) => void,
	saveProfile:(profile:ProfileType) => Promise<any>,
	isOwner:boolean,
}

