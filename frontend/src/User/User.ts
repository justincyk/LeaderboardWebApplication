export class User {
  id: number | undefined;
  name: string = "";
  nickname: string = "";
  password: string = "";
  created: Date = new Date();
  wins: number = 0;
  loses: number = 0;
  rank: number | undefined;

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.description) this.nickname = initializer.description;
    if (initializer.created) this.created = new Date(initializer.created);
    if (initializer.wins) this.wins = initializer.wins;
    if (initializer.loses) this.loses = initializer.loses;
    if (initializer.id) this.rank = initializer.rank;
  }

  get isNew(): boolean {
    return this.id === undefined;
  }
}
