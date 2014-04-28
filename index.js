var request = require("request"),
	cheerio = require('cheerio');

function AulaUPT(options) {
	if(!options.usuario) {
		throw new Error('No se definio el usuario!')
		return;
	}
	if(!options.password) {
		throw new Error('No se definio el password!')
		return;
	}
	this.user = options.usuario
	this.pass = options.password
	return this;
}

var request = request.defaults({jar: true})

AulaUPT.prototype.login = function(callback) {
	request.post('http://aulavirtual.upt.edu.pe/login/index.php', {form:{username:this.user, password:this.pass}}, function (err, httpResponse, body) {
		if(err) throw err;
		var loginBase = '<meta http-equiv="refresh" content="0; url=http://aulavirtual.upt.edu.pe/" />';

		if(body.indexOf(loginBase) == -1) {
			callback(false)
		} else {
			callback(true)
		}
	})
};

AulaUPT.prototype.getCursos = function(callback) {
	request('http://aulavirtual.upt.edu.pe/', function(err, httpResponse, body) {
		sc = cheerio.load(body);
		sc('.block_course_list').filter(function() {
			var misCursos = sc(this).html()
			var sc1 = cheerio.load(misCursos)
			misCursos = sc1('ul').text();
			var cursos = {};
			i =1 ;
			sc1('a').each(function() {
				cursos[i] = {};
				cursos[i].curso = sc1(this).text();
				cursos[i].link = sc1(this).attr('href');
				cursos[i].cid = sc1(this).attr('href').split('view.php?id=')[1];
				i=i+1;
			    //console.log(sc1(this).attr('href'));
			    //console.log('Link:'+sc1(this).text())
			})
			//console.log(misCursos);
			callback(cursos)
		})
	})
}


module.exports = AulaUPT;