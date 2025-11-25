
const url2 = "https://6922f90b09df4a492323dfa6.mockapi.io/inscripciones"
const url = "https://691f571531e684d7bfc96d5d.mockapi.io/cursos"

const menuUsuariohtml = `<div id="lista-cursos"></div>`
const nav2html = 
`<div class="nav2-usuario">
            <ul>
                <li><a href="#/menuUsuario">Cursos</a></li>
                <li><a href="#/miscursos">Mis Cursos</a></li>
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






export async function menuUsuario() {
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
        localStorage.removeItem("rol");})
    cargarCursos()
}

async function cargarCursos() {
    let res = await fetch(url)
    let data = await res.json()
    data.forEach(curso => {
        if (curso.activo === true){
        let name = curso.nombre
        let descripcion = curso.descripcion
        let duracion = curso.duracion
        let cupos = curso.cupos
        let idCurso = curso.id
        let div = document.createElement("div")
        div.innerHTML =`
            <p class="curso-nombre">Nombre: ${name}</p>
            <p class="curso-descripcion">Descripcion: ${descripcion}</p>
            <p class="curso-duracion">Duracion: ${duracion}</p>
            <p class="curso-cupos">Cupos: ${cupos}</p>
            <div>
            <button class="curso-boton" data-idcurso = "${idCurso}">Inscribirse</button>
            </div>
        `
        div.className = "curso"
        let lista = document.getElementById("lista-cursos")
        lista.appendChild(div)}
        

    });
    let btn = document.querySelectorAll(".curso-boton")
    btn.forEach(b => {
    b.addEventListener("click", async () => {
        let respuesta = confirm("¿Querés inscribirte a este curso?");

        if (!respuesta) return;


        let idCurso = b.dataset.idcurso;
        let idUsuario = localStorage.getItem("usuarioId");

        if (!idUsuario) {
            alert("Debe iniciar sesión para inscribirse");
            return;
        }

        let resIns= await fetch(url2);      
        let inscripciones = await resIns.json();

        let existe = inscripciones.some(i =>
            i.idUsuario == idUsuario && i.idCurso == idCurso
        );

        if (existe) {
            alert("Ya estás inscripto en este curso");
            return;
        }

        let inscripcion = {
            idUsuario: idUsuario,
            idCurso: idCurso,
            estado: "pendiente"
        };

        try {
            let res = await fetch(url2, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inscripcion)
            });

            if (!res.ok) {
                alert("Error al registrar la inscripción");
                return;
            }

            alert("Inscripción registrada correctamente");

        } catch (err) {
            console.error("Error:", err);
            alert("No se pudo inscribir");
        }
    });
});
}