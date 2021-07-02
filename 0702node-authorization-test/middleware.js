//回調函數帶參數之後中間件
const authPage = (permission) => {
	return (req,res,next) => {
		userRole = req.body.role
		if(permission.includes(userRole)){
			next()
		}else{
			return res.status(401).json("你沒有此頁的權限")
		}
	}
}

const authCourse = (req,res,next) => {
	const courseNumber = parseInt(req.params.number)
	if(req.body.courses.includes(courseNumber)){
		next()
	}else{
		return res.status(401).json("你沒有此頁的權限")
	}
}

module.exports = {
	authCourse,authPage
}