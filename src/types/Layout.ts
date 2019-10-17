import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { History, Location } from 'history';

// Types
import {User} from "../types/Auth";

export interface ILayout extends RouteComponentProps {
  children: React.ReactNode
}
export interface ILayoutView extends ILayout {
  user: User | null;
  logout(): Promise<undefined>;
  clearProfileInfo(): void;
}

export interface IHeader {
  history: History;
  location: Location;
  isLoggedIn: boolean;
  logout(): Promise<undefined>;
  clearProfileInfo(): void;
}
export interface IDesktopMenu {
  anchorEl: null | HTMLElement;
  menuId: string;
  isMenuOpen: boolean;
  handleMessagesClick(): void;
  handleNotificationsClick(): void;
  handleLogoutClick(): Promise<void>;
  handleProfileClick(): void;
  handleMenuClose(): void;
}
export interface IMobileMenu extends IDesktopMenu {
  pathname: string;
  handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>): void;
}