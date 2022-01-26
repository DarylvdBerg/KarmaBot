const SQLite = require("better-sqlite3");

export default class KarmaDao {
  private db: any;

  public constructor() {
    this.db = new SQLite("./karma.sqlite");
  }

  create() {
    if (!this.doesDatabaseExist()) {
      console.log("executed");
      this.db
        .prepare("CREATE TABLE karma (id TEXT PRIMARY KEY, karma INTEGER;")
        .run();
      this.db.prepare("CREATE UNIQUE INDEX id_karma ON karma (id);").run();
    }
  }

  update(id: string, points: number) {
    this.db
      .prepare(`UPDATE karma SET karma = ${points} WHERE id = ${id};`)
      .run();
  }

  get(id: string) {
    const points = this.db
      .prepare(`SELECT points FROM karma WHERE id = ${id};`)
      .get();
    return points;
  }

  private doesDatabaseExist() {
    const table = this.db
      .prepare(
        "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name = 'karma';"
      )
      .get();
    return table["count(*)"] > 0;
  }
}
