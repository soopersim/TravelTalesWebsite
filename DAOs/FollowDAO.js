const db = require('../Databases/SQLCon');

class FollowDAO {
  follow(followerID, followedID) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR IGNORE INTO follows (followerID, followedID) VALUES (?, ?)`,
        [followerID, followedID],
        function (err) {
          if (err) reject(err);
          else resolve({ success: true });
        }
      );
    });
  }

  unfollow(followerID, followedID) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM follows WHERE followerID = ? AND followedID = ?`,
        [followerID, followedID],
        function (err) {
          if (err) reject(err);
          else resolve({ success: true });
        }
      );
    });
  }

  getFollowingPosts(followerID) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT p.* FROM posts p
         JOIN follows f ON f.followedID = p.userID
         WHERE f.followerID = ?
         ORDER BY p.dateOfVisit DESC`,
        [followerID],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  getFollowers(userID) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT u.username FROM users u
         JOIN follows f ON f.followerID = u.id
         WHERE f.followedID = ?`,
        [userID],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  getFollowing(userID) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT u.username FROM users u
         JOIN follows f ON f.followedID = u.id
         WHERE f.followerID = ?`,
        [userID],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}

module.exports = FollowDAO;
