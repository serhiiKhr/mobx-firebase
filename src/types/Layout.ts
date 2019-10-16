import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { History, Location } from 'history';

export interface ILayout extends RouteComponentProps {
  children: React.ReactNode
}
export interface ILayoutView extends ILayout {
  logout(): Promise<any>;
}

export interface IHeader {
  history: History;
  location: Location;
  logout(): Promise<any>;
}
