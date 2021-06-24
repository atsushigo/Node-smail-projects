const mysql = require('mysql')
module.exports = {
	config: {
		host: '127.0.0.1',
		port: 3306,
		user: 'root',
		password: 'rootroot',
		database: 'testdb',
	},
	sqlConnect:function(sql, sqlArr, callback) {
		var pool = mysql.createPool(this.config)
		pool.getConnection((err, conn) => {
			console.log('已經進入連線pool')
			if (err) {
				console.log("連接失敗");
				return;
			} else {
				console.log("連接成功");
				conn.query(sql, sqlArr, callback);
				conn.release();
			}
		})
	}
}
