const redis = require('redis');
const db = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1'
});

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  save() {
    return new Promise((res, rej) => {
      const userJson = JSON.stringify(this);
      db.lpush('users',
        userJson,
        (err) => {
          if (err)
            return rej(err);

          res();
        });
    });
  }

  static list() {
    return new Promise((res, rej) => {
      db.lrange('users', 0, -1, (err, data) => {
        if (err)
          return rej(err);

        res(data);
      });
    });
  }
}

module.exports = User;