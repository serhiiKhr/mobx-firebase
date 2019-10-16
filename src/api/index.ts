import { database } from '../firebase'

export const messagesRef = database.ref('/messages');
export const usersRef = database.ref('/users');
