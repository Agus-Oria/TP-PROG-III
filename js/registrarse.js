import { listaUsuarios } from "./usuarios.js";

const url = "https://691f571531e684d7bfc96d5d.mockapi.io/usuarios"

const registrarhtml = `<div>
        <div id="login">
            <div class="caja-login">
                <div>
                    <input type="text" id="name" name="name" placeholder="Nombre" required>
                </div>
                <div>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="Contraseña">
                </div>
                <div>
                    <input type="password" id="repetirPassword" name="password" placeholder="Repetir Contraseña">
                </div>
                <div>
                    <button type="button" id="registrar" class="boton">Registrarse</button>
                </div>
            </div>
        </div>
    </div>`

const navhtml = `    <nav class="login-nav">
        <div>
            <a href="#academiaweb">AcademiaWeb</a>
        </div>
        <div class = "registrarse">
            <a href="#login">Iniciar Sesión</a>
        </div>
    </nav>`

export function menuRegistrar() {
    let cp = document.getElementById("cp");
    let nav = document.getElementById("nav")
    let nav2 = document.getElementById("nav2")
    nav2.innerHTML = ""
    cp.innerHTML = registrarhtml
    nav.innerHTML = navhtml
    let btn = document.getElementById("registrar")
    btn.addEventListener("click",registrar)
}

export async function registrar() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let repetir = document.getElementById("repetirPassword").value;

    if (!name || !email || !password || !repetir) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (password !== repetir) {
        alert("Las contraseñas no coinciden");
        return;
    }

    let res = await fetch(url);
        let usuarios = await res.json();

        let yaExiste = usuarios.some(u => u.email === email);

        if (yaExiste) {
            alert("Este email ya está registrado");
            return;
        }

    let nuevoUsuario = {
        name: name,
        email: email,
        password: password,
        role: "usuario"
    };

    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(nuevoUsuario)
        });

        if (!res.ok) {
            alert("Error al registrar usuario");
            return;
        }

        alert("Usuario creado con éxito");
        if (localStorage.getItem("rol") === "admin"){
            listaUsuarios()}
        else {window.location.href = "#/login"}

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo registrar");
    }
}