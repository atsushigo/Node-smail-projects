const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")

const {authPage,authCourse} = require("./middleware.js")

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.get("/home", (req, res) => {
	res.json("HOME PAGE")
})

app.get("/course/grades",authPage(["teacher","admin"]), (req, res) => {
	res.json({
		grades: 96,
	})
})

//有這個課程的權限的話會跑 res.json(`你有權限去${courseNumber}`);
//沒有這權限的話 中間件 return res.status(401).json("你沒有此頁的權限")
app.get("/course/:number",authCourse, (req, res) => {
		const courseNumber = req.params.number;
		res.json(`你有權限去${courseNumber}`);
	})

app.listen(3001, () => {
	console.log("running at 3001")
})

// 傳的json資料格式
// {
// 	"name":"sam",
// 	"courses":[220,213,187,287],
// 	"role":"admin"
// }