export class UserScore {
  id: number | undefined;
  wins: number = 0;
  loses: number = 0;
  userId: number = 0;

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.wins) this.wins = initializer.wins;
    if (initializer.loses) this.loses = initializer.loses;
    if (initializer.gameId) this.userId = initializer.userId;
  }
}
