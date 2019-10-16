import { types, Instance, flow } from 'mobx-state-tree';
import * as firebase from 'firebase';
import { database } from '../firebase';

interface IUser {
  displayName: string;
  uid: string;
  email: string;
  description?: string;
}
class User implements IUser {
  constructor(
    public displayName: string = '',
    public uid: string = '',
    public email: string = '',
    public description: string = ''
  ) {}
  setDescription(description: string) {
    this.description = description;
  }
}

export const UserModel = types
  .model('UserModel', {
    user: types.optional(types.frozen<any>(), null)
  })
  .actions(self => ({
    setUser(user: any): void {
      console.log('user', user);
      self.user = user;
    }
  }));
