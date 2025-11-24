const tablahtml =`<div class="table-container">
    <button id="btn-crear">Crear Usuario</button>

    <h2 class="table-title">Listado de Usuarios</h2>

    <table id="tablaUsuarios" class="display nowrap">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
</div>` 



const nav2html = 
`<div class="nav2-usuario">
            <ul>
                <li><a href="#/menuAdmin">Inscripciones</a></li>
                <li><a href="#/crearCurso">Crear Curso</a></li>
                <li><a href="#/usuarios">Usuarios</a></li>
            </ul>
        </div>`

const navhtml = `<nav class="login-nav">
        <div>
            <a href="#/academiaweb">AcademiaWeb</a>
        </div>
        <div class = "nav-sesion">
            <a href="#/login" id="cerrar-sesion">Cerrar Sesión</a>
        </div>
</nav>`

const urlUsuarios = "https://691f571531e684d7bfc96d5d.mockapi.io/usuarios";


export function usuarios(){
    let cp = document.getElementById("cp");
    let nav = document.getElementById("nav")
    let nav2 = document.getElementById("nav2") 
    cp.innerHTML = tablahtml
    nav.innerHTML = navhtml
    nav2.innerHTML = nav2html
    let btn = document.getElementById("cerrar-sesion")
    btn.addEventListener("click",() => {
        localStorage.removeItem("sesionIniciada");
        localStorage.removeItem("usuarioId")
        localStorage.removeItem("rol")})
    let btn2 = document.getElementById("btn-crear")

    cargarUsuarios()
}



async function cargarUsuarios() {
    let res = await fetch(urlUsuarios);
    let usuarios = await res.json();
    usuarios.forEach(element => {
        element.action = `
            <button class="btn-editar" data-id="${element.id}">Editar</button>
            `
    });

    new DataTable("#tablaUsuarios", {
        responsive:true,
        data : usuarios,
        columns: [
            { data: 'id' },    
            { data: 'name' },
            { data: 'email' },
            { data: 'action', "orderable":false }
            
        ],
        drawCallback: function() {
        enlazarBoton();  
        },
        deferRender: true,
        retrieve: true,
        processing: false,
        language: {
            sProcessing:     "Procesando...",
            sLengthMenu:     "Mostrar _MENU_ registros",
            sZeroRecords:    "No se encontraron resultados",
            sEmptyTable:     "Ningún dato disponible en esta tabla",
            sInfo:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty:      "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix:    "",
            sSearch:         "Buscar:",
            sUrl:            "",
            sInfoThousands:  ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst:    "Primero",
                sLast:     "Último",
                sNext:     "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }
                            
        }
    })
}


function enlazarBoton() {
    let btn = document.querySelectorAll(".btn-editar")
    btn.forEach(b => {
        b.addEventListener("click",() => {})
    })
}
