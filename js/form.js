const formhtml = `<div class="form-inscripcion">
            <h4>Formulario de Incripcion</h4>
            <div>
                <label>Nombre</label>
                <input type="text" id="usuario-nombre" required>
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" id="usuario-apellido" required>
            </div>
            <div>
                <label>Año de Nacimiento</label>
                <input type="number" id="usuario-nacimiento" required>
            </div>
            <div class="form-boton">
                <input type="button" value="Incribirse">
            </div>`

export function cargarForm() {
    let cp = document.getElementById("cp")
    cp.innerHTML = formhtml
}