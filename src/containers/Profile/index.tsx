import * as React from 'react';
import { useRootData } from '../../tools/useRootData';

// Types
import { IProfileForm, IProfileView, ProfileVIewMode, IProfile, IChangeModeButtons } from '../../types/Profile';

// Styles
import './styles.css';

const ProfileForm: React.FC<IProfileForm> = ({ profile, onSubmit, descriptionChange, displayNameChange }: IProfileForm) => {
  return (
    <form className="profile-form" onSubmit={($event: React.SyntheticEvent) => { $event.preventDefault(); onSubmit(profile); }}>
      <div className="profile-form--row">
        <label htmlFor="displayName" className="profile-form--row__label">Display Name</label>
        <input id="displayName" type="text" value={profile.displayName} placeholder="Display Name" onChange={($event: React.SyntheticEvent) => { displayNameChange(($event.target as any).value) }} className="profile-view--row__value" />
      </div>
      <div className="profile-form--row">
        <label htmlFor="description" className="profile-form--row__label">Description</label>
        <textarea id="description" value={profile.description} onChange={($event: React.SyntheticEvent) => { descriptionChange(($event.target as any).value) }} className="profile-view--row__value" />
      </div>
      <div className="profile-form--row">
        <button type="submit" className="profile-view--row__value">Save</button>
      </div>
    </form>
  )
};

const ProfileView: React.FC<IProfileView> = ({ profile }: IProfileView) => {
  return (
    <div className="profile-view">
      <div className="profile-view--row">
        <div className="profile-view--row__label">
          <strong>Display Name</strong>
        </div>
        <div className="profile-view--row__value">
          { profile.displayName }
        </div>
      </div>
      <div className="profile-view--row">
        <div className="profile-view--row__label">
          <strong>Email</strong>
        </div>
        <div className="profile-view--row__value">
          { profile.email }
        </div>
      </div>
      <div className="profile-view--row">
        <div className="profile-view--row__label">
          <strong>Description</strong>
        </div>
        <div className="profile-view--row__value">
          { profile.description }
        </div>
      </div>
    </div>
  )
};

const ChangeModeButtons: React.FC<IChangeModeButtons> = ({ viewMode, onChange }: IChangeModeButtons) => (
  <div className="change-mode">
    {
      viewMode === 'view' ? <button className="change-mode--button" onClick={() => { onChange('edit') }}>edit</button> : <button className="change-mode--button" onClick={() => { onChange('view') }}>x</button>
    }
  </div>
);

export const ProfilePageView: React.FC<any> = (props) => {
  const [viewMode, setViewMode] = React.useState<ProfileVIewMode>('view');
  const [email] = React.useState<string>(props.profile.email);
  const [description, setDescription] = React.useState<string>(props.profile.description);
  const [displayName, setDisplayName] = React.useState<string>(props.profile.displayName);

  const updateProfile = (profile: IProfile) => {
    console.log('profile', profile);
  };

  return (
    <section className="profile-page">
      <ChangeModeButtons viewMode={viewMode} onChange={setViewMode} />
      {
        (() => {
          switch (viewMode) {
            case "edit":
              return (
                <ProfileForm
                  profile={{
                    email,
                    displayName,
                    description
                  }}
                  displayNameChange={setDisplayName}
                  descriptionChange={setDescription}
                  onSubmit={updateProfile} />
              );
            case "view":
              return <ProfileView profile={props.profile} />;
            default:
              return 'view';
          }
        })()
      }
    </section>
  )
};

const ProfilePage: React.FC<any> = () => {
  // const { loading } = useRootData(store => ({
  //   loading: store.posts.loading
  // }));

  return <ProfilePageView profile={{ displayName: 'Vasya Pupkin', email: 'vasya@gmail.com', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' }} />
};


export default ProfilePage;
