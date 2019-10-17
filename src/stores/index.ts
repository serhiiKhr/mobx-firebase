import { types, Instance } from 'mobx-state-tree';

import {MessagesModel} from "./messages.store";
import {AuthModel} from "./auth.store";
import {ProfileModel} from "./profile.store";

export interface IRootStoreModel extends Instance<typeof RootStore> {};
export type RootStoreType = typeof RootStore.Type;

export const RootStore = types.model('RootStore', {
  messages: types.optional(MessagesModel, {}),
  auth: types.optional(AuthModel, {}),
  profile: types.optional(ProfileModel, {})
});

export const getDefaultStore = () => RootStore.create({});
