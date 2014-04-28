# AulaUPT-API -- Esay to use API

[![NPM](https://nodei.co/npm/aulaupt-api.png)](https://nodei.co/npm/aulaupt-api/)

##Uso

```javascript
var AulaUPT = require('aulaupt-api');

var aula = new AulaUPT({
	usuario: '2013000257',
	password: '467593649',
})

aula.login(function(login) {
	if(login) {
		aula.getCursos(function(cursos) {
			console.log(cursos)
		})
	} else {
		console.log('Login fallido')
	}
})
```
