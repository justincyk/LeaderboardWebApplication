export class Player {
  id: string | undefined;
  firstName: string = "";
  lastName: string = "";
  nickname: string = "";

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.firstName) this.firstName = initializer.firstName;
    if (initializer.lastName) this.lastName = initializer.lastName;
    if (initializer.nickname) this.nickname = initializer.nickname;
  }
}
