var dbconfig = require('../util/dbconfig.js');
// 獲取分類
getCategory = (req, res) => {
	var sql = "select * from Students";
	var sqlArr = [];
	var callback = (err, data) => {
		if (err) {
			console.log('連接出錯了')
		} else {
			res.send({
				'list': data
			})
		}
	}
	dbconfig.sqlConnect(sql, sqlArr, callback)
}

getPostCate = (req,res) => {
	let{id} = req.query;
	var sql = `select * from post where cate_id=?`;
	var sqlArr = [id];
	var callback = (err,data)=>{
		if (err) {
			res.send('連接出錯了')
		} else{
			res.send({
				'list':data
			})
		}
		
	}
	dbconfig.sqlConnect(sql, sqlArr, callback)
}

module.exports = {
	getCategory,
	getPostCate
}
