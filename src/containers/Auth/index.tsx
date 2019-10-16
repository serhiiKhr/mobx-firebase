import * as React from 'react';
import { useRootData } from '../../tools/useRootData';

// Components
import { Tabs, Tab } from '../../components/Tabs';

// Types
import { IUserForm, ISocialNetworks, IUserFormValue } from '../../components/Tabs/types';

// Constants
import { TABS } from '../../constants/Auth';

// Styles
import './styles.css';

const UserForm: React.FC<IUserForm> = ({ user, onSubmit, setEmail, setPassword }: IUserForm) => {
  const submit = ($event: React.SyntheticEvent) => {
    $event.preventDefault();
    onSubmit(user);
  };

  return (
    <form onSubmit={submit} className="user-form">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        className="input-field"
        onChange={($event: React.SyntheticEvent) => {
          setEmail(($event.target as any).value);
        }} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        className="input-field"
        onChange={($event: React.SyntheticEvent) => {
          setPassword(($event.target as any).value);
        }} />
      <button type="submit" className="submit-button">Submit</button>
    </form>
  )
};

const SignInTab: React.FC<IUserForm> = ({ user, onSubmit, setEmail, setPassword }: IUserForm) => (
  <Tab tabName={TABS[0]} key={TABS[0].key}>
    <UserForm user={user} onSubmit={onSubmit} setEmail={setEmail} setPassword={setPassword} />
  </Tab>
);

const SignUpTab: React.FC<IUserForm> = ({ user, onSubmit, setEmail, setPassword }: IUserForm) => (
  <Tab tabName={TABS[1]} key={TABS[1].key}>
    <UserForm user={user} onSubmit={onSubmit} setEmail={setEmail} setPassword={setPassword} />
  </Tab>
);

const SocialNetworksButtons: React.FC<ISocialNetworks> = ({ signInWithGoogle }: ISocialNetworks) => {
  return (
    <section className="social-networks">
      <button onClick={signInWithGoogle} className="social-networks--button goggle">Sign in with google</button>
    </section>
  )
};

export const AuthPageView: React.FC<any> = (props) => {
  const activeTabKey = ['sign-in', 'sign-up'].includes(props.match.params.type) ? props.match.params.type : 'sign-in';
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const goTo = (key: string) => {
    if (key !== activeTabKey) {
      props.history.push(`/auth/${key}`);
    }
  };
  const signIn = (user: IUserFormValue) => {
    console.log('sign in user', user);
    props.loginWithEmail(user).then(() => {
      console.log('navigate');
    });
  };
  const signUp = (user: IUserFormValue) => {
    console.log('sign up user', user);
    props.createUser(user).then(() => {
     console.log('navigate');
    })
  };
  const signInWithGoogle = () => {
    console.log('sign in with google');
  };

  return (
    <section className="auth-page">
      <Tabs activeTabKey={activeTabKey} tabNames={TABS} onTabClick={goTo}>
        {
          (() => {
            switch (activeTabKey) {
              case TABS[0].key:
                return <SignInTab user={{ email, password }} setPassword={setPassword} setEmail={setEmail} onSubmit={signIn} />;

              case TABS[1].key:
                return <SignUpTab user={{ email, password }} setPassword={setPassword} setEmail={setEmail} onSubmit={signUp} />;

              default:
                return <SignInTab user={{ email, password }} setPassword={setPassword} setEmail={setEmail} onSubmit={signIn} />;
            }
          })()
        }
      </Tabs>
      <SocialNetworksButtons signInWithGoogle={signInWithGoogle} />
    </section>
  )
};

const AuthPage: React.FC<any> = (props) => {
  const { loading, error, loginWithEmail, createUser } = useRootData(store => ({
    loading: store.auth.loading,
    error: store.auth.error,
    loginWithEmail: store.auth.loginWithEmail,
    createUser: store.auth.createUser
  }));

  return <AuthPageView loading={loading} loginWithEmail={loginWithEmail} createUser={createUser} error={error} {...props} />;
};


export default AuthPage;
