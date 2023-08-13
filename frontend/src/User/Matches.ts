export class Matches {
  id: number | undefined;
  winner: string = "";
  loser: string = "";
  matchDate: string | undefined;

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.winner) this.winner = initializer.winner;
    if (initializer.loser) this.loser = initializer.loser;
    if (initializer.matchDate) this.matchDate = initializer.matchDate;
  }
}
