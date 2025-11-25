const dashboardHTML = `
<div class="dashboard">
<div class="cards">
    <div class="card">
    <h3>Usuarios</h3>
    <p id="totalUsuarios">0</p>
    </div>
    <div class="card">
    <h3>Inscripciones</h3>
    <p id="totalInscripciones">0</p>
    </div>
    <div class="card">
    <h3>Inscripciones Pendientes</h3>
    <p id="InsPendientes">0</p>
    </div>
    <div class="card">
    <h3>Inscripciones Aprobadas</h3>
    <p id="InsAprobadas">0</p>
    </div>
    <div class="card">
    <h3>Inscripciones Rechazadas</h3>
    <p id="InsRechazadas">0</p>
    </div>
    <div class="card">
    <h3>Cursos</h3>
    <p id="totalCursos">0</p>
    </div>
    <div class="card">
    <h3>Cursos Activos</h3>
    <p id="CursosActivos">0</p>
    </div>
</div>
</div>
`;

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

const url2 = "https://6922f90b09df4a492323dfa6.mockapi.io/inscripciones"
const url = "https://691f571531e684d7bfc96d5d.mockapi.io/cursos"
const url3 = "https://691f571531e684d7bfc96d5d.mockapi.io/usuarios"

export function menuDashboard() {
    if (localStorage.getItem("rol") === "admin"){
    let cp = document.getElementById("cp");
    let nav = document.getElementById("nav")
    let nav2 = document.getElementById("nav2") 
    cp.innerHTML = dashboardHTML
    nav.innerHTML = navhtml
    nav2.innerHTML = nav2html
    let btn = document.getElementById("cerrar-sesion")
    btn.addEventListener("click",() => {
        localStorage.removeItem("sesionIniciada");
        localStorage.removeItem("usuarioId")
        localStorage.removeItem("rol")})
    cargarDatosDashboard(); 
    }else {alert("Inicia Sesion")
            window.location.href = "#/login"}
}

async function cargarDatosDashboard() {
    try {
    const [resUsuarios, resInscripciones, resCursos] = await Promise.all([
        fetch(url3),
        fetch(url2),
        fetch(url)
    ]);

    const [usuarios, inscripciones, cursos] = await Promise.all([
        resUsuarios.json(),
        resInscripciones.json(),
        resCursos.json()
    ]);

    const pendientes = inscripciones.filter(i => i.estado === "pendiente").length;
    const aprobadas  = inscripciones.filter(i => i.estado === "aprobado").length;
    const rechazadas = inscripciones.filter(i => i.estado === "rechazado").length;

    const cursosActivos = cursos.filter(c => c.activo === true).length;

    document.getElementById("totalUsuarios").textContent = usuarios.length;
    document.getElementById("totalInscripciones").textContent = inscripciones.length;
    document.getElementById("totalCursos").textContent = cursos.length;
    document.getElementById("InsPendientes").textContent = pendientes;
    document.getElementById("InsAprobadas").textContent = aprobadas;
    document.getElementById("InsRechazadas").textContent = rechazadas;
    document.getElementById("CursosActivos").textContent = cursosActivos;

    } catch (error) {
    console.error("Error cargando dashboard:", error);
    }
}