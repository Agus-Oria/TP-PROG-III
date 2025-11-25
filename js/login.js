
const url = "https://691f571531e684d7bfc96d5d.mockapi.io/usuarios"

async function crear(nombre, correo, password, role="usuario") {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            correo: correo,
            password: password,
            role: role
        })
    })
}

const htmlLogin = `<div>
        <div id="login">
            <div class="caja-login">
                <div>
                    <input type="email" id="email" name="email" placeholder="Email" >
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="Contraseña">
                </div>
                <div>
                    <button type="button" id="iniciar-sesion" class="boton">Iniciar Sesión</button>
                </div>
            </div>
        </div>
    </div>`

const navhtml =`    <nav class="login-nav">
        <div>
            <a href="#/academiaweb">AcademiaWeb</a>
        </div>
        <div class = "registrarse">
            <a href="#/registrarse" id = "registrar">Registrarse</a>
        </div>
    </nav>`

export function setLogin(){
    if (localStorage.getItem("sesionIniciada") !== "true") {
    let cp = document.getElementById("cp");
    let nav = document.getElementById("nav")
    let nav2 = document.getElementById("nav2")
    nav2.innerHTML = ""
    cp.innerHTML = htmlLogin
    nav.innerHTML = navhtml
    let btn = document.getElementById("iniciar-sesion")
    btn.addEventListener("click",iniciarSesion)
    }
    else {
        if (localStorage.getItem("rol") === "admin"){
            window.location.href = "#/academiaweb"}
        else {window.location.href = "#/menuUsuario"}
    }
}

async function iniciarSesion(){
    let inputEmail = document.getElementById("email")
    let inputPassword = document.getElementById("password")
    let res = await fetch(url)
    let data = await res.json()
    let encontrado = false
    data.forEach(usuario => {
                
                if (usuario.email=== inputEmail.value && usuario.password === inputPassword.value) {
                    localStorage.setItem("sesionIniciada", "true");
                    localStorage.setItem("usuarioId", usuario.id);
                    localStorage.setItem("rol", usuario.role);
                    encontrado = true
                    if (usuario.role === "admin"){
                        window.location.href = "#/academiaweb"
                    }else {
                        window.location.href = "#/menuUsuario"
                    }
                    
                    
                }
                
            });
            if (encontrado === false){
                alert("Email o Contraseña incorrecta")
            }
            
        }
