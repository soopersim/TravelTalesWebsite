const db = require('../Databases/SQLCon');

class CommentDAO {
  addComment(userID, postID, text) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO comments (userID, postID, text) VALUES (?, ?, ?)',
        [userID, postID, text],
        err => (err ? reject(err) : resolve({ success: true }))
      );
    });
  }

  getCommentsForPost(postID) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT c.*, u.email AS username 
         FROM comments c
         JOIN users u ON c.userID = u.id
         WHERE c.postID = ?
         ORDER BY c.id ASC`,
        [postID],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
  
}

module.exports = CommentDAO;