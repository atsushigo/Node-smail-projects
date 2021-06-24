# Node

Express 後端渲染ejs模板示例，此做法是後端渲染，而不是ajax axios傳資料到後端的前後分離
cd 進資料夾
npm install express ejs mysql momet
node app     (入口點)

練習思路:
1.安裝基本環境
2.設定 app.js、從router那引入mysql 
3.設定mysql pool 並用pool.getConnection語句連接資料表取資料

var pool = mysql.createPool({
	connectionLimit:10;
	host:'127.0.0.1';
	use:'root';
	password:'rootroot';
	database:'0602practice';
})

4.先去抓特定一筆資料 會運用到

let sql = "select * from student where StudentNumber=?"
let params = [1]  抓資料庫StudentNumber=1這一筆資料
connection.query(sql,params,(err,results)=>{
	connection.release();  連線結束
	console.log(results); 成功的話node命令行會打印出results結果
})

5.後台拿到資料後傳到前台模板

res.render('',{
	res:results
})

6.用moment處理傳到前台模板date格式 讓ejs模板調用moment
res.render('',{
	res:results,
	moment:moment
})

7.sql語句拼接
// 拼接sql　sql+=這邊要特別注意要留空白
	if(req.query.StudentNumber){
		sql+=" and StudentNumber = ?";
		params.push(req.query.StudentNumber)
	}
	
	if(req.query.StudentName){
		sql += " and StudentName like ?";
		params.push("%"+req.query.StudentName+"%");
	}
	
8.vue href事件跳轉攜帶參數

<button @click="search(username)">搜索</button>
methods:{
			  search(username){
				  window.location.href = '/getStudents?StudentName='+username
			  }
		  }
		  
9.增加刪除功能 從/delete網址req.query.StudentNumber抓參數 
之後必須要把網址導回查詢頁面看結果 不然要用vue axios發資料到'/delete?StudentNumber='+StudentNumber  之後then重新加載頁面

<a :href="'/delete?StudentNumber='+<%= res[i].StudentNumber %>">刪除</a>

或

 delete(id){
				 	axios
				 	      .get('/delete?StudentNumber='+StudentNumber)
				 	      .then(response => alert("刪除成功") )
				 	      .catch(function (error) { 
				 			  alert('刪除失敗');
				 	      });
				 }
	
				 
10.edit頁面的東西提交到<form action="/updateStudent">  這個ＵＲＬ並且攜帶隱藏的唯一值id
<input type="hidden" name="ID" value="<%= Student.ID%>">

11．要特別注意傳到資料庫的資料型態 不然INT　DATE之類的不符合系統會崩潰
let sql = "UPDATE student SET StudentNumber=?, StudentName=?, BornDate=?, Address=?, Email=?, Sex=?, Message=? WHERE ID = ?";
	let params = [];
	params.push(req.query.StudentNumber.toString());
	params.push(moment(req.query.BornDate).format("YYYY-MM-DD"));

moment是用來處理node把date資料傳給前台時一開始會顯示datetime 很長 要把它轉成YYYY-MM–DD

![IMG_0236](https://github.com/sam921611/Node/blob/master/0602-express-practice/public/img/IMG_1482.GIF?raw=true)
	
![image](https://github.com/sam921611/Node/blob/master/0602-express-practice/public/img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A71-1.png?raw=true)	

螢幕快照 2-1 前台
![image](https://github.com/sam921611/Node/blob/master/0602-express-practice/public/img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202-1%20%E5%89%8D%E5%8F%B0.png?raw=true)	

螢幕快照 2-2 ejs
![image](https://github.com/sam921611/Node/blob/master/0602-express-practice/public/img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202-2%E5%BE%8C%E5%8F%B0.png?raw=true)
		
	
![image](https://github.com/sam921611/Node/blob/master/0602-express-practice/public/img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202-2%E5%BE%8C%E5%8F%B0.png?raw=true)	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
