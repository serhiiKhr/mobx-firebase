import { types } from 'mobx-state-tree';
import {User} from '../types/Auth';
import {FirebaseUser} from '../firebase/types';

// Api
import { usersRef } from '../api';

export const ProfileModel = types
  .model('ProfileModel', {
    user: types.optional(types.frozen<User | null>(), null)
  })
  .actions(self => ({
    async checkUser(user: FirebaseUser): Promise<undefined> {
      try {
        const uid: string = (user as any).uid;
        const response = await usersRef.child(uid).once('value');
        const savedUser = new User(user);
        if (!response.val()) {
          await usersRef.child(uid).set(savedUser);
          this.setProfileInfo(savedUser);
          return;
        } else {
          this.setProfileInfo(savedUser);
          return;
        }
      } catch (e) {
        throw e;
      }
    },
    setProfileInfo(user: User): void {
      self.user = user;
    },
    clearProfileInfo(): void {
      self.user = null;
    }
  }));
