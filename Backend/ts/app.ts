import { send } from "process";
import { Curso } from "./curso.model";
// client.query(`select * from "estudiante" where email = 'juan@gmail.com'`

//let email=req.params.email;
//client.query(`select * from "estudiante" where email = $1`,[email], (err:any, respuesta:any)=>{

//  client.query(`select 'hola' as "columna" from "estudiante" where email = $1`,[email], (err:any, respuesta:any)=>{
  // console.log(respuesta.rows[0].columna);


const express = require('express');
const app = express();
const port = 3000;
app.use((req:any, res:any, next:any) => {

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
const bodyParser = require('body-parser');
var  jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require('cors');
app.use(cors());

const {Client}=require('pg');
const client = new Client({
  user     : 'postgres',
  host     : 'localhost',
  database : 'doggoschool',
  password : 'Zelda',
  port : 5432
});
client.connect();
// app.get('/testpg',(req:any, res:any)=>{
//   client.query(`select * from "estudiante" where _id=1`, (err:any, respuesta:any)=>{

//     console.log(respuesta.rows);
//     res.send(JSON.stringify(respuesta.rows));
//   });
// });
app.get('/isemaildisponible/:email',(req:any, res:any)=>{
  let email=req.params.email;
  client.query(`select distinct 'no disponible' as "res" 
  from "estudiante", "empresa" , "admin"
  where "estudiante"."email" = $1 
  or "empresa"."correo" = $1
  or "data_admin"."email" = $1`,[email], (err:any, respuesta:any)=>{
    if(respuesta.rows[0]==undefined) res.send({valor:true});
    else res.send({valor:false});
  });
});
app.post('/addEstudiante',jsonParser,(req:any, res:any)=>{
  // console.log("body__"+req.body);
  let nombres=req.body.nombres;
  client.query(`INSERT INTO "estudiante" (nombres, apellidos, email, contrasena, pais, ciudad, telefono, cc) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,[req.body.nombres, req.body.apellidos, req.body.email, req.body.contrasena, req.body.pais, req.body.ciudad, req.body.telefono, req.body.cc] ,(err:any, respuesta:any)=>{
    res.send({valor:respuesta.rows[0]._id});
  });
});


app.get('/isestudiante/:_id',(req:any, res:any)=>{
  let _id=req.params._id;
  client.query(`select * from "estudiante" where "_id"=$1`,[_id], (err:any, respuesta:any)=>{
    // console.log(respuesta.rows[0]);
    //true si no es undefined
    if(respuesta == undefined || respuesta.rows== undefined || respuesta.rows[0] == undefined){
      //no existe estudianet con ese id
      res.send({valor:false});
    }else res.send({valor:true});
  });
});

app.get('/iscursoXestudiante/:id_estudiante/:id_curso',(req:any, res:any)=>{
  let id_estudiante=req.params.id_estudiante;
  let id_curso=req.params.id_curso;
  client.query(`select * from "nub_estudiante_curso" where "id_estudiante"=$1 and "id_curso"=$2`,[id_estudiante, id_curso], (err:any, respuesta:any)=>{
    // console.log(respuesta.rows[0]);
    if(respuesta.rows[0]== undefined) res.send({valor:false});
    else res.send({valor:true});
  });
});

app.get('/getallcursos',(req:any, res:any)=>{
  let cursosRetono:Array<Curso>=[];
  client.query(`select * from "curso"`, (err:any, respuesta:any)=>{
    res.send(respuesta.rows);
  });
});

app.get('/getmoduloscurso/:idCurso',(req:any, res:any)=>{
  let idCurso=req.params.idCurso;
  client.query(`select * from "modulo" where "fk_curso"=$1`, [idCurso],(err:any, respuesta:any)=>{
    res.send(respuesta.rows);
  });
});

app.get('/getcurso/:idCurso',(req:any, res:any)=>{
  let idCurso=req.params.idCurso;
  client.query(`select * from "curso" where "_id"=$1`, [idCurso],(err:any, respuesta:any)=>{
    res.send(respuesta.rows[0]);
  });
});

app.post('/addcursoxestudiante',jsonParser,(req:any, res:any)=>{
  // console.log("body__"+req.body);
  client.query(`INSERT INTO "nub_estudiante_curso" (id_estudiante, id_curso) values($1, $2) RETURNING *`,[req.body.idEstudiante, req.body.idCurso] ,(err:any, respuesta:any)=>{
    res.send({valor:respuesta.rows});
  });
});


app.get('/getsislistaofertas',(req:any, res:any)=>{
  client.query(`select * from "sis_listaofertas"`,(err:any, respuesta:any)=>{
    res.send(respuesta.rows);
  });
});

app.get('/getlistadvoferta',(req:any, res:any)=>{
  client.query(`select "_id", "titulo", "descripcion", "pais", "ciudad", "fecha_publicacion" as "fechaPublicacion", "tipo_jornada" as "tipoJornada", "fk_empresa" as "fk_idEmpresa", "correo_contacto_reclutar", "telefono_contacto_laboral", "teletrabajo", "sueldo" from "sis_listaofertas"
  join "oferta" on "oferta"."_id" = "sis_listaofertas"."_idoferta"`,(err:any, respuesta:any)=>{
    res.send(respuesta.rows);
  });
});


app.get('/getinfoestudiante/:_id',(req:any, res:any)=>{
  client.query(`select "_id", "nombres", "apellidos", "email", "contrasena", "pais", "ciudad", "telefono", "cc", null as "cursosInscritos" from "estudiante" where "_id" = $1`,[req.params._id],(err:any, respuesta:any)=>{
    res.send(respuesta.rows[0]);
  });
});

app.put('/actualizardataestudiante/:_id',jsonParser, (req:any, res:any, next:any)=>{
  let _id=req.params._id;
  let nombres=req.body.nombres;
  let apellidos=req.body.apellidos;
  let contrasena=req.body.contrasena;
  let cc=req.body.cc;
  let telefono=req.body.telefono;
  
  client.query(`update "estudiante" set "nombres" = $2, "apellidos" = $3, "contrasena"=$4, "cc"=$5, "telefono"=$6 where "_id" = $1 RETURNING *`,[_id, nombres, apellidos, contrasena, cc, telefono],(err:any, respuesta:any)=>{
    res.setHeader('X-Foo', 'bar');
    res.setHeader('Content-Type', 'text/plain');
    res.write('Modificacion ok');
  });
});

app.get('/logearestudiante/:email/:contrasena',(req:any, res:any)=>{
  client.query(`select * from "estudiante" where "email"=$1 and "contrasena"=$2`,[req.params.email, req.params.contrasena],(err:any, respuesta:any)=>{
    // console.log(respuesta);
    if(respuesta.rows[0]!=undefined){
      res.send({acceso:true, _id:respuesta.rows[0]._id});
    }else res.send({acceso:false});
  });
});

app.get('/listacursosestudiante/:_id',(req:any, res:any)=>{
  client.query(`select  "id_curso" as "id", "curso"."img", "curso"."titulo", "curso"."cant_modulos" as "cantModulos", "curso"."duracion", "curso"."tematica", "curso"."descripcion_general" as "descripcionGeneral", null as "modulos"
  from "nub_estudiante_curso"
  join "estudiante" on "estudiante"."_id" ="nub_estudiante_curso"."id_estudiante"
  join "curso" on "curso"."_id" = "nub_estudiante_curso"."id_curso"
  where "estudiante"."_id"=$1 `,[req.params._id],(err:any, respuesta:any)=>{
    // console.log(respuesta);
    let listaRetono:Array<any>=[];
    for(let i of respuesta.rows){
      listaRetono.push(i);
    }
    res.send(listaRetono);
  });
});

app.delete('/eliminarcursoestudiante/:_idEstudainte/:_idcurso',(req:any, res:any)=>{
  client.query(`delete from "nub_estudiante_curso" where "id_estudiante"=$1 and "id_curso"=$2`,[req.params._idEstudainte, req.params._idcurso],(err:any, respuesta:any)=>{
    // res.status(200).send("Eliminacion Exitosa");
    res.send(respuesta);
  });
});

app.get('/getinfooferta/:_idnub',(req:any, res:any)=>{
  client.query(`select 
	"empresa"."_id" as "_id_empresa", "empresa"."nombre_empresa", "empresa"."correo", "empresa"."contrasena", "empresa"."telefono", "empresa"."descripcion_empresa", "empresa"."img_empresa",
	"oferta"."_id" as "_id_oferta", "oferta"."titulo", "oferta"."descripcion", "oferta"."pais", "oferta"."ciudad", "oferta"."fecha_publicacion", "oferta"."tipo_jornada", "oferta"."fk_empresa", "oferta"."correo_contacto_reclutar", "oferta"."telefono_contacto_laboral", "oferta"."teletrabajo", "oferta"."sueldo"
from "sis_listaofertas"
join "empresa" on "empresa"."_id" = "sis_listaofertas"."_idempresa"
join "oferta" on "oferta"."_id" = "sis_listaofertas"."_idoferta"
where "sis_listaofertas"."_idnub" = $1`,[req.params._idnub],(err:any, respuesta:any)=>{
    let empresa={
      _id: respuesta.rows[0]._id_empresa,
      nombreEmpresa: respuesta.rows[0].nombre_empresa,
      correo: respuesta.rows[0].correo,
      password: respuesta.rows[0].contrasena,
      telefono: respuesta.rows[0].telefono,
      descripcionEmpresa: respuesta.rows[0].descripcion_empresa,
      imgEmpresa:respuesta.rows[0].img_empresa,
      ofertasPublicadas:[
        {
          _id:respuesta.rows[0]._id_oferta,
          titulo: respuesta.rows[0].titulo,
          descripcion: respuesta.rows[0].descripcion,
          pais: respuesta.rows[0].pais,
          ciudad: respuesta.rows[0].ciudad,
          fechaPublicacion: respuesta.rows[0].fecha_publicacion,
          tipoJornada: respuesta.rows[0].tipo_jornada,
          fk_idEmpresa:respuesta.rows[0].fk_empresa,
          correo_contacto_reclutar: respuesta.rows[0].correo_contacto_reclutar,
          telefono_contacto_laboral: respuesta.rows[0].telefono_contacto_laboral,
          teletrabajo: respuesta.rows[0].teletrabajo,
          sueldo:respuesta.rows[0].sueldo
        }
      ]
    }
    res.send(empresa);
    // res.send(respuesta);
  });
});


app.get('/getinfoempresa/:_id',(req:any, res:any)=>{
  client.query(`select "_id",  
  "nombre_empresa" as "nombreEmpresa", 
  "correo",  "contrasena" as "password", 
  "telefono",  "descripcion_empresa" as "descripcionEmpresa",  
  "img_empresa" as "imgEmpresa" from "empresa" where "_id"=$1`,[req.params._id],(err:any, respuesta:any)=>{
    res.send(respuesta.rows[0]);
  });
});


app.get('/getpaisestudiante/:_id',(req:any, res:any)=>{
  client.query(`select "pais" from "estudiante" where "_id"=$1`,[req.params._id],(err:any, respuesta:any)=>{
    res.send(respuesta.rows[0]);
  });
});

app.get('/getnub/:_idempresa/:_idoferta',(req:any, res:any)=>{
  client.query(`select "_idnub" from "sis_listaofertas"
  join "empresa" on "empresa"."_id" = "sis_listaofertas"."_idempresa"
  join "oferta" on "oferta"."_id" = "sis_listaofertas"."_idoferta"
  where "empresa"."_id"=$1 and "oferta"."_id"=$2`,[req.params._idempresa, req.params._idoferta],(err:any, respuesta:any)=>{
    res.send(respuesta.rows[0]);
  });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/logearEmpresa/:email/:contrasena',(req:any, res:any)=>{
  client.query(`select * from "empresa" where "correo"=$1 and "contrasena"=$2`,[req.params.email, req.params.contrasena],(err:any, respuesta:any)=>{
    // console.log(respuesta);
    if(respuesta.rows[0]!=undefined){
      res.send({acceso:true, _id:respuesta.rows[0]._id});
    }else res.send({acceso:false});
  });
});

app.get('/isEmpresaDisponible/:correo',(req:any, res:any)=>{
  client.query(`select distinct 'no disponible' as "res" 
  from "estudiante", "empresa" , "admin"
  where "estudiante"."email" = $1 
  or "empresa"."correo" = $1
  or "data_admin"."email" = $1`,[req.params.correo],(err:any, respuesta:any)=>{
    // res.send(respuesta.rows[0]);
    if(respuesta.rows[0]!=undefined){
      res.send({valor:false});
    }else{
      res.send({valor:true})
    }
  });
});

app.post('/addEmpresa',jsonParser,(req:any, res:any)=>{
  client.query(`insert into "empresa" (nombre_empresa, correo, contrasena, telefono, descripcion_empresa, img_empresa)
  values ($1,$2,$3,$4,$5,$6) 
  RETURNING *`,
  [req.body.nombreEmpresa, req.body.correo, req.body.password, req.body.telefono, req.body.descripcionEmpresa, req.body.imgEmpresa] ,(err:any, respuesta:any)=>{
    res.send(respuesta.rows[0]);
  });
});

app.post('/addOferta',jsonParser,(req:any, res:any)=>{
  client.query(`insert into "oferta" (titulo, descripcion, pais, ciudad, fecha_publicacion, tipo_jornada, correo_contacto_reclutar, telefono_contacto_laboral, fk_empresa, teletrabajo, sueldo)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
  RETURNING *`,
  [req.body.titulo, req.body.descripcion, req.body.pais, req.body.ciudad, req.body.fecha, req.body.tipojornada, req.body.email, req.body.telefono, req.body.fk_empresa, req.body.teletrabajo, req.body.sueldo] ,(err:any, respuesta:any)=>{
    res.send({_id:respuesta.rows[0]._id});
  });
});

 

app.post('/addOfertaSis',jsonParser,(req:any, res:any)=>{
  client.query(`insert into "sis_listaofertas" (_idoferta, _idempresa) values ($1, $2)
  RETURNING *`,
  [req.body._idoferta, req.body._idempresa] ,(err:any, respuesta:any)=>{
    res.send({_id:respuesta});
  });
});


app.get('/loginAdmin/:email/:contrasena',(req:any, res:any)=>{
  client.query(`select * from data_admin
  where "email"=$1 and "clave"=$2`,[req.params.email, req.params.contrasena],(err:any, respuesta:any)=>{
    if(respuesta.rows[0]!=undefined){
      res.send({acceso:true, _id:respuesta.rows[0]._id});
    }else res.send({acceso:false});
  });
});

//------------------------------------------------------------------------------------------------------

app.post('/addCurso',jsonParser,(req:any, res:any)=>{
  client.query(`insert into "curso" (img, titulo, cant_modulos, duracion, tematica, descripcion_general) 
  values ($1, $2, $3, $4, $5, $6)
  RETURNING *`,
  [req.body.img, req.body.titulo, req.body.cant_modulo, req.body.duracion, req.body.tematica, req.body.descripcion_general] ,(err:any, respuesta:any)=>{
    res.send({_id:respuesta.rows[0]._id});
  });
});

app.post('/addModulo',jsonParser,(req:any, res:any)=>{
  client.query(`insert into "modulo" (img, numero_modulo, titulo, descripcion, duracion, urlvideo, fk_curso)
  values ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`,
  [req.body.img, req.body.numero_modulo, req.body.titulo, req.body.descripcion, req.body.duracion, req.body.urlvideo, req.body.fk_curso] ,(err:any, respuesta:any)=>{
    res.send({_id:respuesta.rows[0]._id});
  });
});

app.put('/actualizarCurso/:idCurso',jsonParser, (req:any, res:any, next:any)=>{
  let _id=req.params.idCurso;
  let new_cantModulosCurso=req.body.new_cantModulosCurso;
  let new_duracionCurso=req.body.new_duracionCurso;
  
  client.query(`update "curso" 
  set "cant_modulos" = $2, "duracion"=$3 where "_id" = $1 
  RETURNING *`,
  [_id, new_cantModulosCurso, new_duracionCurso],(err:any, respuesta:any, next:any)=>{
    res.setHeader('X-Foo', 'bar');
    res.setHeader('Content-Type', 'text/plain');
    res.write('Modificacion ok');
    // next.send({valor:'ok'});
    // res.
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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});