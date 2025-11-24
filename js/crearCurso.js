const url = "https://691f571531e684d7bfc96d5d.mockapi.io/cursos"

const formhtml = `<div class="form-curso">
            <h4>Crear Curso</h4>
            <div>
                <label>Nombre:</label>
                <input type="text" id="nombre" required>
            </div>
            <div>
                <label>descripcion:</label>
                <input type="text" id="descripcion" required>
            </div>
            <div>
                <label>Duracion:</label>
                <input type="text" id="duracion" required>
            </div>
            <div>
                <label>Cupos:</label>
                <input type="text" id="cupos" required>
            </div>
            <div class="form-boton">
                <button type="button" id="form-boton">Crear</button>
            </div>`

const nav2html = 
`<div class="nav2-usuario">
            <ul>
                <li><a href="#/menuAdmin">Inscripciones</a></li>
                <li><a href="#/crearCurso">Crear Curso</a></li>
                <li><a href="#/menuAdmin">Usuarios</a></li>
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


export function formCurso() {
    let cp = document.getElementById("cp");
    let nav = document.getElementById("nav")
    let nav2 = document.getElementById("nav2") 
    cp.innerHTML = formhtml
    nav.innerHTML = navhtml
    nav2.innerHTML = nav2html
    let btn = document.getElementById("cerrar-sesion")
    btn.addEventListener("click",() => {
        localStorage.removeItem("sesionIniciada");
        localStorage.removeItem("usuarioId")
        localStorage.removeItem("rol")})
    let btn2 = document.getElementById("form-boton")
    btn2.addEventListener("click",crearCurso)
}   

async function crearCurso() {
    let nombre = document.getElementById("nombre").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();
    let duracion = document.getElementById("duracion").value.trim();
    let cupos = document.getElementById("cupos").value.trim();

    if (!nombre || !descripcion || !duracion || !cupos) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let nuevoCurso = {
        nombre: nombre,
        descripcion: descripcion,
        duracion: duracion,
        cupos: cupos,
        activo: true
    };

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCurso)
    });

    alert("Curso creado exitosamente!");

    window.location.href = "#/menuAdmin";
}