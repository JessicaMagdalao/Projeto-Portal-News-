const mysql = require('mysql');
const connMYSQL = function(){
    console.log('Conexão com o banco de dados estabelecida!');
    return mysql.createConnection({
        host :'localhost',
        user : 'root',
        password : '',
        database : 'portalNews',
        port: 3307
    })
}
module.exports = function(){
    return connMYSQL;
}