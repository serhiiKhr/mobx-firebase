import * as React from 'react';
import {RouteComponentProps} from "react-router";

export interface IAppRouterView {
    uid: string | null;
}
export interface IProtectedRoute {
    component: React.FC<any>;
    uid: string | null;
    path: string;
    exact?: boolean;
}