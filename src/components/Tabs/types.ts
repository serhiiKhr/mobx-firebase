import * as React from 'react';

export type TabName = 'Sign In' | 'Sign Up';
export type TabKey = 'sign-in' | 'sign-up';
export interface ITabName {
  name: TabName;
  key: TabKey;
}

export interface ITab {
  children: React.ReactNode;
  tabName: ITabName;
}

export interface ITabs {
  children: React.ReactNode;
  activeTabKey: TabKey;
  tabNames: Array<ITabName>;
  onTabClick(tabName: string): void;
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
export interface ISocialNetworks {
  signInWithGoogle(): void;
}
