export interface userHistory {
  matchDate: Date;
  winner: string;
  loser: string;
  matchId: number;
}

export class User {
  id: string | undefined;
  firstName: string = "";
  lastName: string = "";
  nickname: string = "";
  // password: string = "";
  created: Date = new Date();
  wins: number = 0;
  loses: number = 0;
  rank: number | undefined;
  history: userHistory[] = [];

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.firstName) this.firstName = initializer.firstName;
    if (initializer.lastName) this.lastName = initializer.lastName;
    if (initializer.nickname) this.nickname = initializer.nickname;
    if (initializer.created) this.created = new Date(initializer.created);
    if (initializer.wins) this.wins = initializer.wins;
    if (initializer.loses) this.loses = initializer.loses;
    if (initializer.id) this.rank = initializer.rank;
    if (initializer.history) this.history = initializer.history;
  }

  get isNew(): boolean {
    return this.id === undefined;
  }
}
