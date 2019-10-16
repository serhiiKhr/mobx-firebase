import * as React from 'react';
import { useRootData } from '../../tools/useRootData';

// Types
import { IDashboard } from '../../types/Home';

// Styles
import './styles.css';

const Dashboard: React.FC<IDashboard> = ({ messagesReceived, messagesSent, profileCreated }: IDashboard) => {
  return (
    <div className="dashboard">
      <div className="dashboard--section">
        <strong className="dashboard--section__label">Messages</strong>
        <div className="dashboard--item">
          <div className="dashboard--item__label">Messages Received</div>
          <div className="dashboard--item__value">{messagesReceived}</div>
        </div>
        <div className="dashboard--item">
          <div className="dashboard--item__label">Messages Sent</div>
          <div className="dashboard--item__value">{messagesSent}</div>
        </div>
      </div>
      <div className="dashboard--section">
        <strong className="dashboard--section__label">Profile</strong>
        <div className="dashboard--item">
          <div className="dashboard--item__label">Profile created</div>
          <div className="dashboard--item__value">{profileCreated}</div>
        </div>
      </div>
    </div>
  );
};

export const HomePageView: React.FC<any> = (props: any) => {

  return (
    <section className="home-page">
      <Dashboard messagesReceived={1488} messagesSent={420} profileCreated={'1st March 2019'} />
    </section>
  )
};

const HomePage: React.FC<any> = (props) => {
  // const { loading } = useRootData(store => ({
  //   loading: store.posts.loading
  // }));
  return <HomePageView {...props} />
};

export default HomePage;
