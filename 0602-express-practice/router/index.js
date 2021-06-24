const express = require('express');
const route = express.Router();
const mysql = require('mysql');
const moment = require('moment');

// npm mysql pool數據庫配置
var pool = mysql.createPool({
	host: '127.0.0.1',
	port:3306,
	user: 'root',
	password: 'rootroot',
	database: '0602practice'
});

route.get("/getStudents", (req, res) => {
	// res.send("getStudents"+req.query)

	let sql = "select * from student where 1=1";
	let params = [];
	
	// 拼接sql　sql+=這邊要特別注意要留空白
	if(req.query.StudentNumber){
		sql+=" and StudentNumber = ?";
		params.push(req.query.StudentNumber)
	}
	
	if(req.query.StudentName){
		sql += " and StudentName like ?";
		params.push("%"+req.query.StudentName+"%");
	}
	
	if(req.query.ID){
		sql += " and ID = ?";
		params.push(req.query.ID);
	}
	console.log("getStudents:",req.query);

	pool.getConnection(function(err, connection) {
		if (err) throw err; // not connected!

		// 開啟數據連接
		connection.query(sql,params, function(error, results, fields) {
			// 關閉數據連接
			connection.release();
			console.log(results);
			// ejs模板
			res.render("student", {
				res: results,
				moment:moment,
			})
			// Handle error after the release.
			if (error) throw error;

			// Don't use the connection here, it has been returned to the pool.
		});
	});



})


// 刪除
route.get("/delete", (req, res) => {

	let sql = "delete from student where StudentNumber = ?";
	let params = [req.query.StudentNumber];
	
	pool.getConnection(function(err, connection) {
		if (err) throw err; // not connected!

		// 開啟數據連接
		connection.query(sql,params, function(error, results, fields) {
			// 關閉數據連接
			connection.release();
			console.log(results);
			// express有個坑是默認301 302才會直接跳轉 不能200
			res.redirect(301, '/getStudents');
			// Handle error after the release.
			if (error) throw error;

		});
	});



})


// 編輯
route.get("/edit", (req, res) => {
	// 接收StudentNumber 查詢當前學生信息
	// 將查詢的信息馴染到編輯頁面中
	let sql = "select * from student where ID=?";
	let params = [req.query.ID];
	
	pool.getConnection(function(err, connection) {
		if (err) throw err; // not connected!

		// 開啟數據連接
		connection.query(sql,params, function(error, results, fields) {
			// 關閉數據連接
			connection.release();
			console.log(results);
			
			res.render('edit',{
				Student:{
					ID:results[0].ID,
					StudentNumber:results[0].StudentNumber,
					StudentName:results[0].StudentName,
					BornDate:moment(results[0].BornDate).format("YYYY-MM-DD"),
					Address:results[0].Address,
					Email:results[0].Email,
					Sex:results[0].Sex,
					Message:results[0].Message,
					moment:moment,
				}
			})
			
			// Handle error after the release.
			if (error) throw error;

		});
	});



})


// 更新按鈕提交到一個新的URL之後res.redirect導回主頁
route.get("/updateStudent", (req, res) => {
	// 接收StudentNumber 查詢當前學生信息
	// 將查詢的信息馴染到編輯頁面中
	// mysql語法
	
	// update student set 
	// StudentNumber = 1234,
	// StudentName = "omgomgomg",
	// BornDate="2020-09-05",
	// Address="台灣 新北市",
	// Email="omgomg@yahoo.com",
	// Sex="男",
	// Message="Aloha"
	// where ID = 1

	let sql = "UPDATE student SET StudentNumber=?, StudentName=?, BornDate=?, Address=?, Email=?, Sex=?, Message=? WHERE ID = ?";
	let params = [];
	params.push(req.query.StudentNumber.toString());
	params.push(req.query.StudentName.toString());
	params.push(moment(req.query.BornDate).format("YYYY-MM-DD"));
	params.push(req.query.Address.toString());
	params.push(req.query.Email.toString());
	params.push(req.query.Sex.toString());
	params.push(req.query.Message.toString());
	params.push(req.query.ID);
	
	pool.getConnection(function(err, connection) {
		if (err) throw err; // not connected!

		// 開啟數據連接
		connection.query(sql,params, function(error, results, fields) {
			// 關閉數據連接
			connection.release();
			console.log(results);
			
			res.redirect(301, '/getStudents');
			
			// Handle error after the release.
			if (error) throw error;

		});
	});



})

// 修改頁面


module.exports = route;
