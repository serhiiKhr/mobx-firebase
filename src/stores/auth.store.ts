import { types, Instance, flow, applyAction } from 'mobx-state-tree';
import * as firebase from 'firebase';
import { auth } from "../firebase";
// todo: replace
import {IUserFormValue} from "../components/Tabs/types";

// Types
import { User } from "../types/Auth";
import {UserModel} from "./profile.store";

export const AuthModel = types
  .model('AuthModel', {
    loading: types.optional(types.boolean, false),
    user: types.optional(types.frozen<User | null>(), null),
    error: types.optional(types.frozen<any>(), null)
  })
  .actions(self => ({
    isLoggedIn(): Promise<boolean> {
      let unsubscribe: firebase.Unsubscribe;
      return new Promise<boolean>((resolve, reject) => {
        unsubscribe = auth.onAuthStateChanged((user: firebase.User | null): any => {
          if (user) {
            this.setUser(user);
            resolve(true);
          }
          if (!user) reject(false);

          unsubscribe();
        }, (error) => {
          reject(error);

          unsubscribe();
        }, () => {
          console.log('completed');
        });
      });
    },
    async loginWithEmail(user: IUserFormValue): Promise<any> {
      self.loading = true;
      try {
        const response: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(user.email, user.password);
        if (response.user) {

          return this.setUser(response.user);
        }
      } catch (e) {
        this.setError(e);
        throw e;
      }
    },
    async createUser(user: IUserFormValue): Promise<any> {
      self.loading = true;
      try {
        const response: firebase.auth.UserCredential = await auth.createUserWithEmailAndPassword(user.email, user.password)
        if (response.user) {
          const s = UserModel.create();
          applyAction(s, { name: 'setUser', args: [new User(response.user.displayName as string, response.user.uid as string, response.user.email as string)]})
          return this.setUser(response.user);
        }
      } catch (e) {
        this.setError(e);
        throw e;
      }
    },
    async logout(): Promise<any> {
      try {
        await auth.signOut();
        this.clearUser();
      } catch (e) {
        this.setError(e);
      }
    },
    setUser(user: firebase.User): User {
      self.loading = false;
      self.user = new User(user.displayName as string, user.uid as string, user.email as string);
      return self.user;
    },
    clearUser(): void {
      self.user = null;
    },
    setError(error: any): void {
      self.loading = false;
      self.error = error;
    }
  }));

