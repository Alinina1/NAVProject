const http = require('http');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

//app.use('/public', express.static('public'));
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname +'/public/'));//тут подключается папка типа где стили статическая
//покажи папку
//тут только апка вроде длжна быть дальшейший пусть в другом месте
//стой явозможно поняла

app.get('/', function (req, res){
  res.render('shblon');//вызыввется shblon
})



app.listen(3000);

//а можещь вернуть чтобы работало с моим портом

/*const server = http.createServer(function(req, res){
    console.log('URL страницы ' + req.url);
    if (req.url === '/' || req.url === '/index'){
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      fs.createReadStream(__dirname + '/index.html').pipe(res);
    }
    else if (req.url === '/about'){
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      fs.createReadStream(__dirname + '/about.html').pipe(res);
    }
    else{
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
      fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
    
});

server.listen(3000, '192.168.1.126');
console.log("Мы отслеживаем порт 3000");

*/