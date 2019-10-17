import { RouteComponentProps } from 'react-router';
import { FirebaseUser } from '../firebase/types';

export interface IUser {
    displayName: string;
    uid: string;
    email: string;
    description?: string;
}
export class User implements IUser {
    displayName: string = '';
    uid: string = '';
    email: string = '';
    description: string = '';

    constructor(firebaseUser: FirebaseUser) {
        if (firebaseUser) {
            this.displayName = firebaseUser.displayName as string;
            this.uid = firebaseUser.uid as string;
            this.email = firebaseUser.email as string;
        }
    }
    setDescription(description: string) {
        this.description = description;
    }
}
export type AuthPageTabType = 'sign-in' | 'sign-up';
export interface ISocialNetworks {
    signInWithGoogle(): void;
    className: string;
    buttonClassName: string;
}
export interface IUserFormValue {
    email: string;
    password: string;
}
export interface IUserForm {
    user: IUserFormValue;
    setEmail(email: string): void;
    setPassword(password: string): void;
    onSubmit(user: IUserFormValue): void;
}
export interface ITabPanelProps extends IUserForm {
    index: any;
    value: any;
}
export interface IAuthPage extends RouteComponentProps { }
export interface IAuthPageView extends IAuthPage {
    loading: boolean;
    error: any;
    loginWithEmail(user: IUserFormValue): Promise<FirebaseUser>;
    createUser(user: IUserFormValue): Promise<FirebaseUser>;
    loginWithGoogle(): Promise<FirebaseUser>;
    checkUser(user: FirebaseUser): Promise<undefined>;
}
