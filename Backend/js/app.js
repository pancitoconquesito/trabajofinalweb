"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// client.query(`select * from "estudiante" where email = 'juan@gmail.com'`
//let email=req.params.email;
//client.query(`select * from "estudiante" where email = $1`,[email], (err:any, respuesta:any)=>{
//  client.query(`select 'hola' as "columna" from "estudiante" where email = $1`,[email], (err:any, respuesta:any)=>{
// console.log(respuesta.rows[0].columna);
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors');
app.use(cors());
var Client = require('pg').Client;
var client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'doggoschool',
    password: 'Zelda',
    port: 5432
});
client.connect();
// app.get('/testpg',(req:any, res:any)=>{
//   client.query(`select * from "estudiante" where _id=1`, (err:any, respuesta:any)=>{
//     console.log(respuesta.rows);
//     res.send(JSON.stringify(respuesta.rows));
//   });
// });
app.get('/isemaildisponible/:email', function (req, res) {
    var email = req.params.email;
    client.query("select distinct 'no disponible' as \"res\" from \"estudiante\", \"empresa\" where \"estudiante\".\"email\" = $1 or \"empresa\".\"correo\" = $1", [email], function (err, respuesta) {
        if (respuesta.rows[0] == undefined)
            res.send({ valor: true });
        else
            res.send({ valor: false });
    });
});
app.post('/addEstudiante', jsonParser, function (req, res) {
    console.log("body__" + req.body);
    var nombres = req.body.nombres;
    client.query("INSERT INTO \"estudiante\" (nombres, apellidos, email, contrasena, pais, ciudad, telefono, cc) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [req.body.nombres, req.body.apellidos, req.body.email, req.body.contrasena, req.body.pais, req.body.ciudad, req.body.telefono, req.body.cc], function (err, respuesta) {
        res.send({ valor: respuesta.rows[0]._id });
    });
});
app.get('/isestudiante/:_id', function (req, res) {
    var _id = req.params._id;
    client.query("select * from \"estudiante\" where \"_id\"=$1", [_id], function (err, respuesta) {
        console.log(respuesta.rows[0]);
        //true si no es undefined
        if (respuesta == undefined || respuesta.rows == undefined || respuesta.rows[0] == undefined) {
            //no existe estudianet con ese id
            res.send({ valor: false });
        }
        else
            res.send({ valor: true });
    });
});
app.get('/iscursoXestudiante/:id_estudiante/:id_curso', function (req, res) {
    var id_estudiante = req.params.id_estudiante;
    var id_curso = req.params.id_curso;
    client.query("select * from \"nub_estudiante_curso\" where \"id_estudiante\"=$1 and \"id_curso\"=$2", [id_estudiante, id_curso], function (err, respuesta) {
        // console.log(respuesta.rows[0]);
        if (respuesta.rows[0] == undefined)
            res.send({ valor: false });
        else
            res.send({ valor: true });
    });
});
app.get('/getallcursos', function (req, res) {
    var cursosRetono = [];
    client.query("select * from \"curso\"", function (err, respuesta) {
        res.send(respuesta.rows);
    });
});
app.get('/getmoduloscurso/:idCurso', function (req, res) {
    var idCurso = req.params.idCurso;
    client.query("select * from \"modulo\" where \"fk_curso\"=$1", [idCurso], function (err, respuesta) {
        res.send(respuesta.rows);
    });
});
app.get('/getcurso/:idCurso', function (req, res) {
    var idCurso = req.params.idCurso;
    client.query("select * from \"curso\" where \"_id\"=$1", [idCurso], function (err, respuesta) {
        res.send(respuesta.rows[0]);
    });
});
app.post('/addcursoxestudiante', jsonParser, function (req, res) {
    console.log("body__" + req.body);
    client.query("INSERT INTO \"nub_estudiante_curso\" (id_estudiante, id_curso) values($1, $2) RETURNING *", [req.body.idEstudiante, req.body.idCurso], function (err, respuesta) {
        res.send({ valor: respuesta.rows });
    });
});
app.get('/getsislistaofertas', function (req, res) {
    client.query("select * from \"sis_listaofertas\"", function (err, respuesta) {
        res.send(respuesta.rows);
    });
});
app.get('/getlistadvoferta', function (req, res) {
    client.query("select \"sis_listaofertas\".\"_idnub\" as \"_id_nubOfertaEmpresa\", \"oferta\".\"titulo\", \"empresa\".\"nombre_empresa\" as \"nombreEmpresa\", \"oferta\".\"pais\", \"oferta\".\"ciudad\", \"oferta\".\"fecha_publicacion\" as \"fechaPublicacion\", \"empresa\".\"img_empresa\" as \"imgEmpresa\" from \"sis_listaofertas\" join \"empresa\" on \"empresa\".\"_id\" = \"sis_listaofertas\".\"_idempresa\" join \"oferta\" on \"oferta\".\"_id\" = \"sis_listaofertas\".\"_idoferta\"", function (err, respuesta) {
        res.send(respuesta.rows);
    });
});
app.get('/getinfoestudiante/:_id', function (req, res) {
    client.query("select \"_id\", \"nombres\", \"email\", \"contrasena\", \"pais\", \"ciudad\", \"telefono\", \"cc\", null as \"cursosInscritos\" from \"estudiante\" where \"_id\" = $1", [req.params._id], function (err, respuesta) {
        res.send(respuesta.rows[0]);
    });
});
// app.get('/getdvoferta/:a/:b',(req:any, res:any)=>{
//   //a
//   //b
//   client.query(`select * from "sis_listaofertas"`,[a,b],(err:any, respuesta:any)=>{
//     res.send(respuesta.rows);
//   });
// });
// app.get('/testpg',(req:any, res:any)=>{
//   let lista=new Array();
//   client.query(`select * from "estudiante"`, (err:any, respuesta:any)=>{
//     for(let row of respuesta.rows){
//       lista.push(row);
//     }
//     console.log(lista);
//     res.send(JSON.stringify(lista));
//   });
// });
// app.get('/testpg',(req:any, res:any)=>{
//   // client.query(`select * from "estudiante"`, (err:any, respuesta:any)=>{
//     // console.log(respuesta.rows[0].nombres);//`select nombres from "estudiante"
//     // console.log(respuesta.rows[0].nombres);//select nombres from "estudiante" where email='juan@gmail.com
//     console.log('hola mundo');
//     // res.send(respuesta);
//   // });
// });
// const mysql=require("mysql");
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   port : 3306,
//   database : 'doggoschool'
// });
// connection.connect(function(err:any) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });
// app.get('/test', (req:any, res:any) => {
//   res.send('Hello World!');
// });
// app.get('/testtabla',(req:any, res:any)=>{
//   connection.query('SELECT * FROM `test` ',  function (error:any, results:any, fields:any) {
//     res.send(JSON.stringify(results));
//     // error will be an Error if one occurred during the query
//     // results will contain the results of the query
//     // fields will contain information about the returned results fields (if any)
//   });
// });
// app.post('/testpost',jsonParser, (req:any, res:any) => {
//   let variable_uno=req.body.variable_uno;
//   let variable_dos=req.body.variable_dos;
//   if(variable_uno!= undefined  || variable_dos!= undefined ){
//     console.log(`var1 : ${variable_uno}__ var2: ${variable_dos}`);
//     res.status(201).send("datos enviados");
//   }else{
//     res.status(201).send("datos incorrectos");
//   }
// });
// app.put('/testput/:id',jsonParser, (req:any, res:any)=>{
//   let id=req.params.id;
// });
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
