var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');

var redis = require('redis');
var mysql = require('mysql');


// Variáveis de ambiente do DOCKER

// console.log(process.env);

	// APPROACH 2: Using host entries created by Docker in /etc/hosts (RECOMMENDED)
	// var client = redis.createClient('6379', 'redis');

var mysql_host = 'mysql';
var mysql_password = '123';

	// var redis_host = process.env.REDIS_PORT_6379_TCP_ADDR;
	// var redis_port = process.env.REDIS_PORT_6379_TCP_PORT;

// Configura conexão MariaDB
var connection = mysql.createConnection({
	host     : mysql_host,
	user     : 'apitreinamento',
	password : mysql_password,
	database : 'books'
});


console.log(mysql_host,mysql_password); 
		// console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

// MÉTODO 1: Usar variáveis de ambiente criadas pelo Docker
// var client = redis.createClient(
//      process.env.REDIS_PORT_6379_TCP_PORT,
//      process.env.REDIS_PORT_6379_TCP_ADDR
// );

// MÉTODO 2: Usar as entradas no host criadas pelo Docker em /etc/hosts (RECOMENDADO)


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
app.get('/load',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Database Loaded";

	line1 = "CREATE TABLE book ( id MEDIUMINT NOT NULL AUTO_INCREMENT, BookName VARCHAR(100), AuthorName VARCHAR(100), Price VARCHAR(10), PRIMARY KEY (id));";
	
	line2 = "INSERT INTO book VALUES (1,'My first autoscalling app','YourName' ,'69');";

	connection.query(line1,function(err, rows, fields){
		if(!!err){
			data["Books"] = err;
		}else{
			data["error"] = 0;
			data["Books"] = "Table create with success!";
		}
	});
	
	connection.query(line2,function(err, rows, fields){
		if(!!err){
			data["Books"] = err;
		}else{
			data["error"] = 0;
			data["Books"] = "Insert done with success!";

		}
		res.json(data);
		console.log(data);
	});

		
	// res.json(data);
	// console.log(data);
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


// GET /book
app.get('/book',function(req,res){
	var data = {
		"error":1,
		"Books":"",
		"Total":""
	};
	
	connection.query("SELECT * from book",function(err, rows, fields){
		
		if (err) console.log(err);

		console.log(rows, fields);

		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			data["Total"] = rows.length;

			res.json(data);

		}else{
			data["Books"] = 'Nenhum livro encontrado';
			res.json(data);
		}
	});
	// connection.end(); Encerrar a conexão com Mysql - não usar
	
});

// ===================================


// POST /book
app.post('/book',function(req,res){

	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;

	var data = {
		"error":1,
		"Books":""
	};

	if(!!Bookname && !!Authorname && !!Price){
		connection.query("INSERT INTO book (Bookname,Authorname,Price) VALUES(?,?,?)",[Bookname,Authorname,Price],function(err, rows, fields){
			if(!!err){
				console.log(err)
				data["Books"] = "Erro adicionando livro";
			}else{
				data["error"] = 0;
				data["Books"] = "Livro adicionado com sucesso!";
			}
			res.json(data);
			
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados : (bookname, authorname, price)";
		res.json(data);
	}
});

// ===================================

// PUT /book
app.put('/book',function(req,res){
	var Id = req.body.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id && !!Bookname && !!Authorname && !!Price){
		connection.query("UPDATE book SET BookName=?, AuthorName=?, Price=? WHERE id=?",[Bookname,Authorname,Price,Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Erro atualizando dados";
			}else{
				data["error"] = 0;
				data["Books"] = "Livro atualizado com sucesso";
			}
			res.json(data);
			console.log(data);
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados:  (id, bookname, authorname, price )";
		res.json(data);
		console.log(data);
	}
});

// ===================================

// DELETE /book
app.delete('/book',function(req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id){
		connection.query("DELETE FROM book WHERE id=?",[Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["Books"] = "Livro deletado com sucesso!";
			}
			res.json(data);
			console.log(data);
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados: ( id )  ";
		res.json(data);
		console.log(data);
	}
});

app.listen(8080,function(){
	console.log("Conectado e escutando na porta 8080");
});
