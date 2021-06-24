var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("test", {
		"stuff": "手機",
		"money": 100 * 8,
		"idol":[
			{"name":"甲先生","age":24},
			{"name":"乙先生","age":13},
			{"name":"丙先生","age":99},
		]
	});
});

app.listen(3000);