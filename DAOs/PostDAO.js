const db = require('../Databases/SQLCon');

class PostDAO {
  createPost(title, content, country, date, userID) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO posts (title, content, country, dateOfVisit, userID) VALUES (?, ?, ?, ?, ?)',
        [title, content, country, date, userID],
        function (err) {
          if (err) reject(err);
          else resolve({ success: true, postID: this.lastID });
        }
      );
    });
  }

  getAllPublicPosts(currentUserID, filters = {}, page = 1, limit = 5) {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT 
          p.*, 
          u.email AS username, 
          p.userID, 
          ? AS currentUserID,
          (SELECT COUNT(*) FROM likes WHERE postID = p.id AND type = 'like') AS likeCount,
          (SELECT COUNT(*) FROM likes WHERE postID = p.id AND type = 'dislike') AS dislikeCount,
          (SELECT COUNT(*) FROM comments WHERE postID = p.id) AS commentCount
        FROM posts p
        JOIN users u ON p.userID = u.id
      `;
  
      const conditions = [];
      const values = [currentUserID];
  
      if (filters.country) {
        conditions.push("p.country LIKE ?");
        values.push(`%${filters.country}%`);
      }
  
      if (filters.username) {
        conditions.push("u.email LIKE ?");
        values.push(`%${filters.username}%`);
      }
  
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
  
      if (filters.sort === 'likes') {
        query += " ORDER BY likeCount DESC";
      } else if (filters.sort === 'comments') {
        query += " ORDER BY commentCount DESC";
      } else {
        query += " ORDER BY p.id DESC";
      }
  
      const offset = (page - 1) * limit;
      query += " LIMIT ? OFFSET ?";
      values.push(limit, offset);
  
      db.all(query, values, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }  
  
  getByUser(userID) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
           p.*, 
           u.email AS username, 
           (SELECT COUNT(*) FROM likes WHERE postID = p.id AND type = 'like') AS likeCount,
           (SELECT COUNT(*) FROM likes WHERE postID = p.id AND type = 'dislike') AS dislikeCount,
           (SELECT COUNT(*) FROM comments WHERE postID = p.id) AS commentCount
         FROM posts p
         JOIN users u ON p.userID = u.id
         WHERE p.userID = ?
         ORDER BY p.id DESC`,
        [userID],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
    
    
  update(postID, userID, newData) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE posts SET title = ?, content = ?, country = ?, dateOfVisit = ?
         WHERE id = ? AND userID = ?`,
        [newData.title, newData.content, newData.country, newData.dateOfVisit, postID, userID],
        function (err) {
          if (err) reject(err);
          else resolve({ success: this.changes > 0 });
        }
      );
    });
  }

  delete(postID, userID) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM posts WHERE id = ? AND userID = ?`,
        [postID, userID],
        function (err) {
          if (err) reject(err);
          else resolve({ success: this.changes > 0 });
        }
      );
    });
  }
}

module.exports = PostDAO;
