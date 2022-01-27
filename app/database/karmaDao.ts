const SQLite = require("better-sqlite3");

export default class KarmaDao {
  private db: any;

  public constructor() {
    this.db = new SQLite("./karma.sqlite");
  }

  create() {
    this.db
      .prepare("CREATE TABLE IF NOT EXISTS karma (id TEXT PRIMARY KEY, points INTEGER);")
      .run();
    this.db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS id_karma ON karma (id);").run();
  }

  update(id: string, points: number) {
    this.createUserIfNotExist(id);
    const stmt = this.db
      .prepare(`UPDATE karma SET points = ? WHERE id = ?;`)
    stmt.run(points, id);
  }

  get(id: string) {
    this.createUserIfNotExist(id);
    const points = this.db
      .prepare(`SELECT points FROM karma WHERE id = ${id};`)
      .get();
    return points;
  }

  private createUserIfNotExist(id: string) {
    const doesExists = this.db.prepare(`SELECT COUNT(*) FROM karma WHERE id = ${id};`).get();
    if(doesExists <= 0){
      this.db.prepare(`INSERT INTO karma (id, points) VALUES (${id}, 0);`).run();
    }
  }
}
