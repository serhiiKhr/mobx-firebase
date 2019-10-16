import { types, Instance, flow } from 'mobx-state-tree';
import * as firebase from 'firebase';
import { database } from '../firebase';

export interface IMessageModel extends Instance<typeof MessageModel> {
  text: string;
  id: string;
  created: string;
  authorName: string;
  authorId: string;
};
export type MessageModelType = typeof MessageModel.Type;

export const MessageModel = types
  .model('MessageModel', {
    text: types.string,
    id: types.string,
    created: types.string,
    authorName: types.string,
    authorId: types.string
  });

export interface IMessagesModel extends Instance<typeof MessagesModel> {};
type MessagesModelType = typeof MessagesModel.Type;

export const MessagesModel = types
  .model('MessagesModel', {
    totalSent: types.optional(types.number, 0),
    totalReceived: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    list: types.optional(types.array(types.frozen<MessageModelType>()), [])
  })
  .actions(self => ({
    loadAll: flow(function* loadAll(): IterableIterator<Promise<firebase.database.DataSnapshot>> {
      self.loading = true;
      try {
        const response: undefined = yield database.ref('/messages').once('value');
        const value: any = (response! as firebase.database.DataSnapshot).val();
        console.log('value', value);
      } catch (e) {
        console.log('e', e);
      }
    }),
    sendMessage: flow(function* sendMessage(message: IMessageModel): IterableIterator<firebase.database.ThenableReference> {
      console.log(message);
      try {
        const response: undefined = yield database.ref('/messages').push(message);
      } catch (e) {
        console.log('e', e);
      }
    }),
    onMessageAdded(message: MessageModelType, userId: string) {
      self.list.push(message);
      if (message.authorId === userId) {
        self.totalSent++;
      } else {
        self.totalReceived++;
      }
    },
    subscribe(userId: string) {
      database.ref('/messages').on('child_added', (snapshot: firebase.database.DataSnapshot) => {
        const value: any = snapshot.val();
        if (value) {
          console.log(snapshot.key);
          this.onMessageAdded(value, userId);
        }
      })
    }
  }));

// text: string;
// id: string;
// created: string;
// authorName: string;
// authorId: string;
