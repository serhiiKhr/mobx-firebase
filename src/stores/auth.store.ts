import { types } from 'mobx-state-tree';
import * as firebase from 'firebase';
import { auth, googleAuthProvider } from "../firebase";

// Types
import { IUserFormValue } from "../types/Auth";
import { FirebaseUser, FirebaseUserCredential } from "../firebase/types";

export const AuthModel = types
    .model('AuthModel', {
      loading: types.optional(types.boolean, false),
      error: types.optional(types.frozen<any>(), null)
    })
    .actions(self => ({
      isLoggedIn(): Promise<FirebaseUser> {
        let unsubscribe: firebase.Unsubscribe;
        return new Promise<FirebaseUser>((resolve, reject) => {
          unsubscribe = auth.onAuthStateChanged((user: FirebaseUser): void => {
            if (!user) reject(null);
            if (user) resolve(user);
            unsubscribe();
          }, (error): void => {
            reject(error);
            unsubscribe();
          }, (): void => {
            console.log('completed');
          });
        });
      },
      async loginWithEmail(user: IUserFormValue): Promise<FirebaseUser> {
        self.loading = true;
        try {
          const response: FirebaseUserCredential = await auth.signInWithEmailAndPassword(user.email, user.password);
          return response.user;
        } catch (e) {
          throw e;
        }
      },
      async createUser(user: IUserFormValue): Promise<FirebaseUser> {
        self.loading = true;
        try {
          const response: FirebaseUserCredential = await auth.createUserWithEmailAndPassword(user.email, user.password)
          return response.user;
        } catch (e) {
          throw e;
        }
      },
      async loginWithGoogle(): Promise<FirebaseUser> {
        self.loading = true;
        try {
          const response: FirebaseUserCredential = await auth.signInWithPopup(googleAuthProvider);
          return response.user;
        } catch (e) {
          throw e;
        }
      },
      async logout(): Promise<undefined> {
        try {
          await auth.signOut();
          return;
        } catch (e) {
          throw e;
        }
      }
    }));

