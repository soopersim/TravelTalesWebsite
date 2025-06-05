const db = require('../Databases/SQLCon');

class LikeDAO {
  likePost(userID, postID, type) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT OR REPLACE INTO likes (userID, postID, type) VALUES (?, ?, ?)',
        [userID, postID, type],
        err => (err ? reject(err) : resolve({ success: true }))
      );
    });
  }
}

module.exports = LikeDAO;