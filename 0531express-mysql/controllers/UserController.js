// var dbconfig = require('../util/dbconfig.js');
// 模擬發送驗證碼

function rand(min,max){
	return Math.floor(Math.random()*(max-min)) + min
}

validatePhoneCode = [];
// 檢測這個號碼是不是有發過驗證碼
let sendcodeP =(phone)=>{
	for (var item of validatePhoneCode){
		if(phone == item.phone){
			return true;
		}
	}
	return false
}

let findCodeAndPhone = (phone,code)=>{
	for (var item of validatePhoneCode){
		if(phone==item.phone && code==item.code){
			return '登入成功'
		}else{
			return '登入失敗'
		}
	}
	
}

sendcode = (req,res)=>{
	let phone = req.query.phone;
	let code = rand(1000,9999);
	if(sendcodeP(phone)){
		res.send({
			'code':400,
			'msg':'已發過驗證碼，請再稍等一下',
		})
	}
	// 把phone code丟到validatePhoneCode容器裡
	validatePhoneCode.push({
		'phone':phone,
		'code':code
	})
	console.log(validatePhoneCode)
	res.send({
		'code':200,
		'msg':'發送成功',
		'您的驗證碼':code,
	})
	// console.log(code)
}

// 驗證碼登錄檢查
codePhoneLogin = (req,res)=>{
	let {phone,code} = req.query;
	// 該手機釋法有發過驗證碼
	if(sendcodeP(phone)){
		// 驗證碼和手機是否匹配
		let status = findCodeAndPhone(phone,code);
		// 登入成功後進行的操作
		if(status == '登入成功'){
			res.send({
				'code':200,
				'msg':'登入成功',
			})
		}else if(status == '登入失敗'){
			res.send({
				'code':200,
				'msg':'登入失敗',
			})
		}
		else{
			res.send({
				'code':400,
				'msg':'這個號碼沒有驗證過'
			})
		}
	}
	
}

module.exports={
	sendcode,
	codePhoneLogin
}