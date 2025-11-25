const url2 = "https://6922f90b09df4a492323dfa6.mockapi.io/inscripciones"
const url = "https://691f571531e684d7bfc96d5d.mockapi.io/cursos"
const url3 = "https://691f571531e684d7bfc96d5d.mockapi.io/usuarios"

const menuUsuariohtml = `<div id="lista-cursos"></div>`
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


export async function menuAdmin() {
    if (localStorage.getItem("rol") === "admin"){
        let cp = document.getElementById("cp");
    let nav = document.getElementById("nav")
    let nav2 = document.getElementById("nav2") 
    cp.innerHTML = menuUsuariohtml
    nav.innerHTML = navhtml
    nav2.innerHTML = nav2html
    let btn = document.getElementById("cerrar-sesion")
    btn.addEventListener("click",() => {
        localStorage.removeItem("sesionIniciada");
        localStorage.removeItem("usuarioId")
        localStorage.removeItem("rol")})
        
    cargarCursosAdmin()
    }
        else {alert("Inicia Sesion")
            window.location.href = "#/login"}
    
}

async function cargarCursosAdmin() {
    let lista = document.getElementById("lista-cursos");
    lista.innerHTML = "<p>Cargando inscripciones...</p>";

    let resIns = await fetch(url2);
    let inscripciones = await resIns.json();

    let pendientes = inscripciones.filter(ins => ins.estado === "pendiente");

    if (pendientes.length === 0) {
        lista.innerHTML = "<h1>No hay inscripciones pendientes.</h1>";
        return;
    }

    let resCursos = await fetch(url);
    let cursos = await resCursos.json();

    let resUsers = await fetch(url3);
    let usuarios = await resUsers.json();

    lista.innerHTML = ""; 

    pendientes.forEach(ins => {
        let curso = cursos.find(c => c.id === ins.idCurso);
        let user = usuarios.find(u => u.id === ins.idUsuario);

        if (!curso || !user) return;

        let div = document.createElement("div");
        div.className = "curso";

        div.innerHTML = `
            <p>Curso: ${curso.nombre}</p>
            <p>Usuario: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <p>Estado: ${ins.estado}</p>
            <div class="btn-estado">
            <button class="btn-aprobar" data-id="${ins.id}">Aprobar</button>
            <button class="btn-rechazar" data-id="${ins.id}">Rechazar</button>
            </div>
        `;

        lista.appendChild(div);
    });


    document.querySelectorAll(".btn-aprobar").forEach(btn => {
        btn.addEventListener("click", async () => {
            let idIns = btn.dataset.id;
            await actualizarEstadoInscripcion(idIns, "aprobado");
            cargarCursosAdmin(); 
        });
    });


    document.querySelectorAll(".btn-rechazar").forEach(btn => {
        btn.addEventListener("click", async () => {
            let idIns = btn.dataset.id;
            await actualizarEstadoInscripcion(idIns, "rechazado");
            cargarCursosAdmin(); 
        });
    });
}

async function actualizarEstadoInscripcion(idInscripcion, nuevoEstado) {
    await fetch(`${url2}/${idInscripcion}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
    });
}