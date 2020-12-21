var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');

var redis = require('redis');


// Variáveis de ambiente do DOCKER

// console.log(process.env);

	// APPROACH 2: Using host entries created by Docker in /etc/hosts (RECOMMENDED)
	// var client = redis.createClient('6379', 'redis');

	// var redis_host = process.env.REDIS_PORT_6379_TCP_ADDR;
	// var redis_port = process.env.REDIS_PORT_6379_TCP_PORT;



// 32770
var client = redis.createClient('6379', 'redis');


// Parsear o conteudo
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  	extended: true
}));


// Configuração da requisição, cabeçalhos, etc. CORS
app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	// Métodos que queremos permitir
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});




// GET
app.get('/',function(req,res){
	var data = {
		"Data":"",
		"Hostname": process.env.HOSTNAME
	};
	data["Data"] = "Welcome to Jon's API";
	res.json(data);
	console.log(data);
});



// REDIS
app.get('/redis',function(req,res){

	client.incr('counter', function(err, counter) {
    	if(err) return next(err);
    	var data = {
			"Data":""
		};
		data["Data"] = 'This page has been viewed ' + counter + ' times!';
    	res.json(data);
    	console.log(data);
 	});
});


// GET 
app.get('/html',function(req,res){
	
	var data = {
		"Data":""
	};
	
	data["Data"] = "API de Serviços do Jon";
	data["Ver"] = "0.2";

	var body = '<html>'
				+'	<head>'
				+'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
				+'	</head>'

				+'	<body>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	</body>'
				+'	</html>';

	res.writeHead(200,{"Content-Type" : "text/html"});
	res.write(body);
	res.end();
});


// ===================================


app.listen(8080,function(){
	console.log("Conectado e escutando na porta 8080");
});
