const url2 = "https://6922f90b09df4a492323dfa6.mockapi.io/inscripciones"
const url = "https://691f571531e684d7bfc96d5d.mockapi.io/cursos"


const menuUsuariohtml = `<div id="lista-cursos"></div>`
const nav2html = 
`<div class="nav2-usuario">
            <ul>
                <li><a href="#/menuUsuario">Cursos</a></li>
                <li><a href="#/misCursos">Mis Cursos</a></li>
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

export async function menuMisCursos() {
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
    cargarMisCursos()
}

async function cargarMisCursos() {
    let userId = localStorage.getItem("usuarioId");

    let resIns = await fetch(url2);
    let inscripciones = await resIns.json();

    let misInscripciones = inscripciones.filter(ins => ins.idUsuario === userId);

    if (misInscripciones.length === 0) {
        document.getElementById("lista-cursos").innerHTML = 
            "<h1>No estás inscripto en ningún curso.</h1>";
        return;
    }

    let resCursos = await fetch(url);
    let cursos = await resCursos.json();

    let lista = document.getElementById("lista-cursos");
    lista.innerHTML = ""; 

    misInscripciones.forEach(ins => {
        let curso = cursos.find(c => c.id === ins.idCurso);

        if (curso) {
            let div = document.createElement("div");
            div.className = "curso";

            div.innerHTML = `
                <p class="curso-nombre">Nombre: ${curso.nombre}</p>
                <p class="curso-descripcion">Descripcion: ${curso.descripcion}</p>
                <p class="curso-duracion">Duracion: ${curso.duracion}</p>
                <p class="curso-cupos">Cupos: ${curso.cupos}</p>
                <p class="curso-estado">Estado: ${ins.estado}</p>
            `;

            lista.appendChild(div);
        }
    });
}