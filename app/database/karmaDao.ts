const SQLite = require("better-sqlite3");

export default class KarmaDao {
  private db: any;
  private static instance: KarmaDao;

  private constructor() {
    this.db = new SQLite("./karma.sqlite");
  }

  public static getInstance() {
    if(!KarmaDao.instance) {
      KarmaDao.instance = new KarmaDao();
    }

    return KarmaDao.instance;
  }

  create() {
    this.db
      .prepare("CREATE TABLE IF NOT EXISTS karma (id TEXT PRIMARY KEY, points INTEGER);")
      .run();
    this.db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS id_karma ON karma (id);").run();
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
}
