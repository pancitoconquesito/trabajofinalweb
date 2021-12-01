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
app.use(function (req, res, next) {
    // Dominio que tengan acceso (ej. 'http://example.com')
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Metodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
////////////////////////////////////////////////////////////////////////////////
// const formidable = require('formidable');
// const form = new formidable.IncomingForm();
// const fs = require('fs');
// const path = require('path');
/////////////////////////////////////////////////////////////////////////////
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
    client.query("select distinct 'no disponible' as \"res\" \n  from \"estudiante\", \"empresa\" , \"data_admin\"\n  where \"estudiante\".\"email\" = $1 \n  or \"empresa\".\"correo\" = $1\n  or \"data_admin\".\"email\" = $1", [email], function (err, respuesta) {
        // res.send(respuesta);
        if (respuesta.rows[0] == undefined)
            res.send({ valor: true });
        else
            res.send({ valor: false });
    });
});
app.post('/addEstudiante', jsonParser, function (req, res) {
    // console.log("body__"+req.body);
    var nombres = req.body.nombres;
    client.query("INSERT INTO \"estudiante\" (nombres, apellidos, email, contrasena, pais, ciudad, telefono, cc) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [req.body.nombres, req.body.apellidos, req.body.email, req.body.contrasena, req.body.pais, req.body.ciudad, req.body.telefono, req.body.cc], function (err, respuesta) {
        res.send({ valor: respuesta.rows[0]._id });
    });
});
app.get('/isestudiante/:_id', function (req, res) {
    var _id = req.params._id;
    client.query("select * from \"estudiante\" where \"_id\"=$1", [_id], function (err, respuesta) {
        // console.log(respuesta.rows[0]);
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
    // console.log("body__"+req.body);
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
    client.query("select \"_id\", \"titulo\", \"descripcion\", \"pais\", \"ciudad\", \"fecha_publicacion\" , \"tipo_jornada\", \"fk_empresa\" as \"fk_idEmpresa\", \"correo_contacto_reclutar\", \"telefono_contacto_laboral\", \"teletrabajo\", \"sueldo\" from \"sis_listaofertas\"\n  join \"oferta\" on \"oferta\".\"_id\" = \"sis_listaofertas\".\"_idoferta\"", function (err, respuesta) {
        res.send(respuesta.rows);
    });
});
app.get('/getinfoestudiante/:_id', function (req, res) {
    client.query("select \"_id\", \"nombres\", \"apellidos\", \"email\", \"contrasena\", \"pais\", \"ciudad\", \"telefono\", \"cc\", null as \"cursosInscritos\" from \"estudiante\" where \"_id\" = $1", [req.params._id], function (err, respuesta) {
        res.send(respuesta.rows[0]);
    });
});
app.put('/actualizardataestudiante/:_id', jsonParser, function (req, res, next) {
    var _id = req.params._id;
    var nombres = req.body.nombres;
    var apellidos = req.body.apellidos;
    var contrasena = req.body.contrasena;
    var cc = req.body.cc;
    var telefono = req.body.telefono;
    client.query("update \"estudiante\" set \"nombres\" = $2, \"apellidos\" = $3, \"contrasena\"=$4, \"cc\"=$5, \"telefono\"=$6 where \"_id\" = $1 RETURNING *", [_id, nombres, apellidos, contrasena, cc, telefono], function (err, respuesta) {
        res.setHeader('X-Foo', 'bar');
        res.setHeader('Content-Type', 'text/plain');
        res.write('Modificacion ok');
    });
});
app.get('/logearestudiante/:email/:contrasena', function (req, res) {
    client.query("select * from \"estudiante\" where \"email\"=$1 and \"contrasena\"=$2", [req.params.email, req.params.contrasena], function (err, respuesta) {
        // console.log(respuesta);
        if (respuesta.rows[0] != undefined) {
            res.send({ acceso: true, _id: respuesta.rows[0]._id });
        }
        else
            res.send({ acceso: false });
    });
});
app.get('/getOfertasEmpresa/:_id', function (req, res) {
    client.query("select * from \"oferta\" where \"fk_empresa\"=$1 ", [req.params._id], function (err, respuesta) {
        res.send(respuesta.rows);
        // if(respuesta.rows[0]!=undefined){
        //   res.send({acceso:true, _id:respuesta.rows[0]._id});
        // }else res.send({acceso:false});
    });
});
app.get('/listacursosestudiante/:_id', function (req, res) {
    client.query("select  \"id_curso\" as \"_id\", \"curso\".\"img\", \"curso\".\"titulo\", \"curso\".\"cant_modulos\" as \"cantModulos\", \"curso\".\"duracion\", \"curso\".\"tematica\", \"curso\".\"descripcion_general\" as \"descripcionGeneral\", null as \"modulos\"\n  from \"nub_estudiante_curso\"\n  join \"estudiante\" on \"estudiante\".\"_id\" =\"nub_estudiante_curso\".\"id_estudiante\"\n  join \"curso\" on \"curso\".\"_id\" = \"nub_estudiante_curso\".\"id_curso\"\n  where \"estudiante\".\"_id\"=$1 ", [req.params._id], function (err, respuesta) {
        // console.log(respuesta);
        var listaRetono = [];
        for (var _i = 0, _a = respuesta.rows; _i < _a.length; _i++) {
            var i = _a[_i];
            listaRetono.push(i);
        }
        res.send(listaRetono);
    });
});
app.delete('/eliminarcursoestudiante/:_idEstudainte/:_idcurso', function (req, res) {
    client.query("delete from \"nub_estudiante_curso\" where \"id_estudiante\"=$1 and \"id_curso\"=$2", [req.params._idEstudainte, req.params._idcurso], function (err, respuesta) {
        // res.status(200).send("Eliminacion Exitosa");
        res.send(respuesta);
    });
});
app.delete('/eliminarOfertaEmpresa/:_id', function (req, res) {
    client.query("delete from \"oferta\" where \"_id\"=$1 ", [req.params._id], function (err, respuesta) {
        // res.status(200).send("Eliminacion Exitosa");
        res.send(respuesta);
    });
});
app.get('/getinfooferta/:_idnub', function (req, res) {
    client.query("select \n\t\"empresa\".\"_id\" as \"_id_empresa\", \"empresa\".\"nombre_empresa\", \"empresa\".\"correo\", \"empresa\".\"contrasena\", \"empresa\".\"telefono\", \"empresa\".\"descripcion_empresa\", \"empresa\".\"img_empresa\",\n\t\"oferta\".\"_id\" as \"_id_oferta\", \"oferta\".\"titulo\", \"oferta\".\"descripcion\", \"oferta\".\"pais\", \"oferta\".\"ciudad\", \"oferta\".\"fecha_publicacion\", \"oferta\".\"tipo_jornada\", \"oferta\".\"fk_empresa\", \"oferta\".\"correo_contacto_reclutar\", \"oferta\".\"telefono_contacto_laboral\", \"oferta\".\"teletrabajo\", \"oferta\".\"sueldo\"\nfrom \"sis_listaofertas\"\njoin \"empresa\" on \"empresa\".\"_id\" = \"sis_listaofertas\".\"_idempresa\"\njoin \"oferta\" on \"oferta\".\"_id\" = \"sis_listaofertas\".\"_idoferta\"\nwhere \"sis_listaofertas\".\"_idnub\" = $1", [req.params._idnub], function (err, respuesta) {
        var empresa = {
            _id: respuesta.rows[0]._id_empresa,
            nombreEmpresa: respuesta.rows[0].nombre_empresa,
            correo: respuesta.rows[0].correo,
            password: respuesta.rows[0].contrasena,
            telefono: respuesta.rows[0].telefono,
            descripcionEmpresa: respuesta.rows[0].descripcion_empresa,
            imgEmpresa: respuesta.rows[0].img_empresa,
            ofertasPublicadas: [
                {
                    _id: respuesta.rows[0]._id_oferta,
                    titulo: respuesta.rows[0].titulo,
                    descripcion: respuesta.rows[0].descripcion,
                    pais: respuesta.rows[0].pais,
                    ciudad: respuesta.rows[0].ciudad,
                    fechaPublicacion: respuesta.rows[0].fecha_publicacion,
                    tipoJornada: respuesta.rows[0].tipo_jornada,
                    fk_idEmpresa: respuesta.rows[0].fk_empresa,
                    correo_contacto_reclutar: respuesta.rows[0].correo_contacto_reclutar,
                    telefono_contacto_laboral: respuesta.rows[0].telefono_contacto_laboral,
                    teletrabajo: respuesta.rows[0].teletrabajo,
                    sueldo: respuesta.rows[0].sueldo
                }
            ]
        };
        res.send(empresa);
        // res.send(respuesta);
    });
});
app.get('/getinfoempresa/:_id', function (req, res) {
    client.query("select \"_id\",  \n  \"nombre_empresa\" as \"nombreEmpresa\", \n  \"correo\",  \"contrasena\" as \"password\", \n  \"telefono\",  \"descripcion_empresa\" as \"descripcionEmpresa\",  \n  \"img_empresa\" as \"imgEmpresa\" from \"empresa\" where \"_id\"=$1", [req.params._id], function (err, respuesta) {
        res.send(respuesta.rows[0]);
    });
});
app.get('/getpaisestudiante/:_id', function (req, res) {
    client.query("select \"pais\" from \"estudiante\" where \"_id\"=$1", [req.params._id], function (err, respuesta) {
        res.send(respuesta.rows[0]);
    });
});
app.get('/getnub/:_idempresa/:_idoferta', function (req, res) {
    client.query("select \"_idnub\" from \"sis_listaofertas\"\n  join \"empresa\" on \"empresa\".\"_id\" = \"sis_listaofertas\".\"_idempresa\"\n  join \"oferta\" on \"oferta\".\"_id\" = \"sis_listaofertas\".\"_idoferta\"\n  where \"empresa\".\"_id\"=$1 and \"oferta\".\"_id\"=$2", [req.params._idempresa, req.params._idoferta], function (err, respuesta) {
        res.send(respuesta.rows[0]);
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/logearEmpresa/:email/:contrasena', function (req, res) {
    client.query("select * from \"empresa\" where \"correo\"=$1 and \"contrasena\"=$2", [req.params.email, req.params.contrasena], function (err, respuesta) {
        // console.log(respuesta);
        if (respuesta.rows[0] != undefined) {
            res.send({ acceso: true, _id: respuesta.rows[0]._id });
        }
        else
            res.send({ acceso: false });
    });
});
app.get('/getIdEstudiante/:email', function (req, res) {
    client.query("select * from \"estudiante\" where \"email\"=$1", [req.params.email], function (err, respuesta) {
        // console.log(respuesta);
        if (respuesta.rows[0] != undefined) {
            res.send({ acceso: true, _id: respuesta.rows[0]._id });
        }
        else
            res.send({ acceso: false });
    });
});
app.get('/isEmpresaDisponible/:correo', function (req, res) {
    client.query("select distinct 'no disponible' as \"res\" \n  from \"estudiante\", \"empresa\" , \"data_admin\"\n  where \"estudiante\".\"email\" = $1 \n  or \"empresa\".\"correo\" = $1\n  or \"data_admin\".\"email\" = $1", [req.params.correo], function (err, respuesta) {
        // res.send(respuesta);
        if (respuesta.rows[0] != undefined) {
            res.send({ valor: false });
        }
        else {
            res.send({ valor: true });
        }
    });
});
app.post('/addEmpresa', jsonParser, function (req, res) {
    client.query("insert into \"empresa\" (nombre_empresa, correo, contrasena, telefono, descripcion_empresa, img_empresa)\n  values ($1,$2,$3,$4,$5,$6) \n  RETURNING *", [req.body.nombreEmpresa, req.body.correo, req.body.password, req.body.telefono, req.body.descripcionEmpresa, req.body.imgEmpresa], function (err, respuesta) {
        res.send(respuesta.rows[0]);
    });
});
app.post('/addOferta', jsonParser, function (req, res) {
    client.query("insert into \"oferta\" (titulo, descripcion, pais, ciudad, fecha_publicacion, tipo_jornada, correo_contacto_reclutar, telefono_contacto_laboral, fk_empresa, teletrabajo, sueldo)\n  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) \n  RETURNING *", [req.body.titulo, req.body.descripcion, req.body.pais, req.body.ciudad, req.body.fecha, req.body.tipojornada, req.body.email, req.body.telefono, req.body.fk_empresa, req.body.teletrabajo, req.body.sueldo], function (err, respuesta) {
        res.send({ _id: respuesta.rows[0]._id });
    });
});
app.post('/addOfertaSis', jsonParser, function (req, res) {
    client.query("insert into \"sis_listaofertas\" (_idoferta, _idempresa) values ($1, $2)\n  RETURNING *", [req.body._idoferta, req.body._idempresa], function (err, respuesta) {
        res.send({ _id: respuesta });
    });
});
app.get('/loginAdmin/:email/:contrasena', function (req, res) {
    client.query("select * from data_admin\n  where \"email\"=$1 and \"clave\"=$2", [req.params.email, req.params.contrasena], function (err, respuesta) {
        if (respuesta.rows[0] != undefined) {
            res.send({ acceso: true, _id: respuesta.rows[0]._id });
        }
        else
            res.send({ acceso: false });
    });
});
//------------------------------------------------------------------------------------------------------
app.post('/addCurso', jsonParser, function (req, res) {
    client.query("insert into \"curso\" (img, titulo, cant_modulos, duracion, tematica, descripcion_general) \n  values ($1, $2, $3, $4, $5, $6)\n  RETURNING *", [req.body.img, req.body.titulo, req.body.cant_modulo, req.body.duracion, req.body.tematica, req.body.descripcion_general], function (err, respuesta) {
        res.send({ _id: respuesta.rows[0]._id });
    });
});
app.post('/addModulo', jsonParser, function (req, res) {
    client.query("insert into \"modulo\" (img, numero_modulo, titulo, descripcion, duracion, urlvideo, fk_curso)\n  values ($1, $2, $3, $4, $5, $6, $7)\n  RETURNING *", [req.body.img, req.body.numero_modulo, req.body.titulo, req.body.descripcion, req.body.duracion, req.body.urlvideo, req.body.fk_curso], function (err, respuesta) {
        res.send({ _id: respuesta.rows[0]._id });
    });
});
app.put('/actualizarCurso/:idCurso', jsonParser, function (req, res, next) {
    var _id = req.params.idCurso;
    var new_cantModulosCurso = req.body.new_cantModulosCurso;
    var new_duracionCurso = req.body.new_duracionCurso;
    client.query("update \"curso\" \n  set \"cant_modulos\" = $2, \"duracion\"=$3 where \"_id\" = $1 \n  RETURNING *", [_id, new_cantModulosCurso, new_duracionCurso], function (err, respuesta, next) {
        res.setHeader('X-Foo', 'bar');
        res.setHeader('Content-Type', 'text/plain');
        res.write('Modificacion ok');
        // next.send({valor:'ok'});
        // res.
    });
});
//--------------------------
app.get('/isEstudiantePostulacion/:_id_estudiante/:_id_oferta', function (req, res) {
    client.query("select * from postulacion\n  where \"_id_estudiante\"=$1 and \"_id_oferta\"=$2", [req.params._id_estudiante, req.params._id_oferta], function (err, respuesta) {
        if (respuesta.rows[0] != undefined) {
            res.send({ acceso: true, _id: respuesta.rows[0]._id });
        }
        else
            res.send({ acceso: false });
    });
});
app.get('/getImagenEmpresa/:_id', function (req, res) {
    client.query("select \"img_empresa\" from \"empresa\" where \"_id\"=$1", [req.params._id], function (err, respuesta) {
        res.send({ valor: respuesta.rows[0].img_empresa });
    });
});
app.get('/getEmpresa/:_id', function (req, res) {
    client.query("select * from \"empresa\" where \"_id\"=$1", [req.params._id], function (err, respuesta) {
        res.send({ valor: respuesta.rows[0] });
    });
});
app.get('/getNubEmpresaOferta/:_idOferta/:_idEmpresa', function (req, res) {
    client.query("select \"_idnub\" from \"sis_listaofertas\"\n  where \"_idoferta\"=$1 and \"_idempresa\"=$2", [req.params._idOferta, req.params._idEmpresa], function (err, respuesta) {
        res.send({ valor: respuesta.rows[0]._idnub });
    });
});
app.get('/getListaOfertasPostulacion/:_id', function (req, res) {
    client.query("select \"oferta\".\"_id\", \"oferta\".\"titulo\",  \"oferta\".\"descripcion\",  \"oferta\".\"pais\",  \"oferta\".\"ciudad\",  \"oferta\".\"fecha_publicacion\",  \"oferta\".\"tipo_jornada\",  \"oferta\".\"correo_contacto_reclutar\",  \"oferta\".\"telefono_contacto_laboral\", \n  \"oferta\".\"fk_empresa\" as \"fk_idEmpresa\",  \"oferta\".\"teletrabajo\",  \"oferta\".\"sueldo\"\n from \"oferta\" \n  join \"postulacion\" on \"postulacion\".\"_id_oferta\"=\"oferta\".\"_id\"\n  left join \"estudiante\" on \"estudiante\".\"_id\" = \"postulacion\".\"_id_estudiante\"\n  where \"estudiante\".\"_id\"=$1\n  ", [req.params._id], function (err, respuesta) {
        res.send(respuesta.rows);
    });
});
app.post('/addPostulacion', jsonParser, function (req, res) {
    client.query("insert into \"postulacion\" (_id_estudiante, _id_oferta, _id_empresa)\n  values ($1, $2, $3)\n  RETURNING *", [req.body._id_estudiante, req.body._id_oferta, req.body._id_empresa], function (err, respuesta) {
        res.send({ _id: respuesta.rows[0]._id });
    });
});
//   let variable_uno=req.body.variable_uno;
//   let variable_dos=req.body.variable_dos;
//   if(variable_uno!= undefined  || variable_dos!= undefined ){
//     console.log(`var1 : ${variable_uno}__ var2: ${variable_dos}`);
//     res.status(201).send("datos enviados");
//   }else{
//     res.status(201).send("datos incorrectos");
//   }
// });
// app.post('/upload_img',(req:any,res:any,next:any)=>{
//   const form = formidable({});
//   form.parse(req, function(err:any, fields:any, files:any) {
//     // `file` is the name of the <input> field of type `file`
//     let old_path = files.file.filepath;
//     let file_size = files.file.size;
//     let file_ext = files.file.originalFilename.split('.').pop();
//     let index = old_path.lastIndexOf('/') + 1;
//     let file_name = old_path.substr(index);
//     let new_path = __dirname+"/../../Images/src/assets/uploads/"+files.file,originalFilename;
//     //let new_path = "/uploads/"+file_name + '.' + file_ext;
//     console.log(old_path);
//     fs.readFile(old_path, function(err:any, data:any) {
//       fs.writeFile(new_path, data, function(err:any) {
//           fs.unlink(old_path, function(err:any) {
//               console.log(new_path);
//               console.log(data);
//               if (err) {
//                   res.status(500);
//                   res.json({'success': false});
//               } else {
//                   //res.status(200);
//                   //res.json({'success': true,'path':new_path});
//               }
//           });
//       });
//   });
//   res.json({fields, files });
// });
// });
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
