export interface userHistory {
  matchDate: Date;
  player1: string;
  player2: string;
  matchId: number;
  result: string;
}

export class User {
  id: number | undefined;
  name: string = "";
  nickname: string = "";
  password: string = "";
  created: Date = new Date();
  wins: number = 0;
  loses: number = 0;
  rank: number | undefined;
  history: userHistory[] = [];

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.description) this.nickname = initializer.description;
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
