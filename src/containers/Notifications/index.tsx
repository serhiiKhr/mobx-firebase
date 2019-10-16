import * as React from 'react';
import { useRootData } from '../../tools/useRootData';

// Types
import { INotification, INotificationItem } from '../../types/Notifications';

// Styles
import './styles.css';

const tmp_notifications: Array<INotification> = [
  { id: '1', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', created: '1st May 2019', label: 'New Message', type: 'message' },
  { id: '2', text: 'Your profile was updated', created: '2nd May 2019', label: 'Profile Updated', type: 'profile' },
  { id: '3', text: 'Your auth info changed', created: '3rd May 2019', label: 'Password was changed', type: 'auth' },
];

const NotificationItem: React.FC<INotificationItem> = ({ notification, onClick }) => {
  return (
    <div className="notification-item" onClick={($event: React.SyntheticEvent) => { onClick(notification) }}>
      <div className="notification-item--head">
        <strong>{notification.label}</strong>
      </div>
      <div className="notification-item--body">
        <div className="notification-item--body__text">
          {notification.text}
        </div>
        <div className="notification-item--body__info">
          {notification.created}
        </div>
      </div>
    </div>
  )
};

export const NotificationsPageView: React.FC<any> = (props) => {

  const onClick = (notification: INotification) => {
    console.log('notification', notification)
  };

  return (
    <section className="notification-page">
      {
        tmp_notifications.map((notification) => <NotificationItem key={notification.id} notification={notification} onClick={onClick} />)
      }
    </section>
  )
};

const NotificationsPage: React.FC<any> = () => {
  // const { loading } = useRootData(store => ({
  //   loading: store.posts.loading
  // }));

  return <NotificationsPageView />
};


export default NotificationsPage;
