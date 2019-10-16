export interface IUser {
  displayName: string;
  uid: string;
  email: string;
  description?: string;
}
export class User implements IUser {
  constructor(
    public displayName: string = '',
    public uid: string = '',
    public email: string = '',
    public description: string = ''
  ) {}
  setDescription(description: string) {
    this.description = description;
  }
}
