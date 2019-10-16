import * as React from 'react';
import { useRootData } from '../../tools/useRootData';

// Types
import { IMessage, IMessageItem, IMessageArea, IInputMessageArea } from '../../types/Messages';

// Styles
import './styles.css';

const tmp_messages: Array<IMessage> = [
  { id: '1', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', created: '1st April 2019', authorName: 'Ivan', authorId: '1' },
  { id: '2', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', created: '2nd April 2019', authorName: 'Petr', authorId: '2' },
  { id: '3', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', created: '3rd April 2019', authorName: 'Vasiliy', authorId: '3' },
];

const MessageItem: React.FC<IMessageItem> = ({ message, userId }: IMessageItem) => {
  return (
    <div className={`messages-area--item ${userId === message.authorId ? 'output': ''}`}>
      <div className="messages-area--item__author">
        <strong>{userId === message.authorId ? 'You' : message.authorName}</strong>
      </div>
      <div className="messages-area--item__text">
        {message.text}
      </div>
      <div className={`messages-area--item__info ${userId === message.authorId ? 'output': ''}`}>
        <span>{message.created}</span>
        {
          !(userId === message.authorId) && <span>1</span>
        }
      </div>
    </div>
  )
};

const MessagesArea: React.FC<IMessageArea> = ({ messages, userId }: IMessageArea) => {
  return (
    <section className="messages-area">
      {
        messages.map((msg) => <MessageItem key={msg.id} message={msg} userId={userId} />)
      }
    </section>
  )
};

const InputMessageArea: React.FC<IInputMessageArea> = ({ value, onChange, onSubmit }: IInputMessageArea) => {
  return (
    <form className="message-input" onSubmit={($event: React.SyntheticEvent) => {
      $event.preventDefault();
      if (!!value) onSubmit(value);
    }}>
      <textarea className="message-input--textarea" value={value} onChange={($event: React.SyntheticEvent) => { onChange(($event.target as any).value) }} />
      <button className="message-input--button" type="submit" disabled={!value}>s</button>
    </form>

  )
};


export const MessagePageView: React.FC<any> = (props: any) => {
  console.log('MessagePageView');
  const userId: string = '3';
  const [newMessage, setNewMessage] = React.useState<string>('');

  const sendMessage = (message: string) => {
    console.log('message', message)
    props.sendMessage(message).then((response: any) => {
      console.log('response', response);
    });
  };

  return (
    <section className="messages-page">
      <MessagesArea messages={tmp_messages} userId={userId} />
      <InputMessageArea value={newMessage} onChange={setNewMessage} onSubmit={sendMessage} />
    </section>
  )
};

const MessagePage: React.FC<any> = (props) => {
  const { list, loadAll, sendMessage } = useRootData(store => ({
    list: store.messages.list.toJS(),
    loadAll: store.messages.loadAll,
    sendMessage: store.messages.sendMessage
  }));

  return <MessagePageView list={list} sendMessage={sendMessage} loadAll={loadAll} {...props} />
};

export default MessagePage;
