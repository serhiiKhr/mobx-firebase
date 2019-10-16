export type ProfileVIewMode = 'view' | 'edit';

export interface IProfile {
  email: string;
  displayName: string;
  description: string;
}

export interface IProfileForm {
  profile: IProfile;
  displayNameChange(displayName: string): void;
  descriptionChange(description: string): void;
  onSubmit(profile: IProfile): void;
}
export interface IProfileView {
  profile: IProfile;
}
export interface IChangeModeButtons {
  viewMode: ProfileVIewMode;
  onChange(viewMode: ProfileVIewMode): void;
}
