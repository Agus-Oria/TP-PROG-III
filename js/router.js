
import { formCurso } from "./crearCurso.js";
import { menuDashboard } from "./dashboard.js";
import { setLogin } from "./login.js";
import { menuAdmin } from "./menuAdmin.js";
import { menuUsuario } from "./menuUsuario.js";
import { menuMisCursos } from "./misCursos.js";
import {menuRegistrar} from "./registrarse.js"
import { listaUsuarios } from "./usuarios.js";





export function Router(){
    let hash = location.hash;

    if (hash === '#/miscursos'){
        menuMisCursos();
        
    }else if(hash==='#/registrarse'){
        menuRegistrar();
        
    }else if(( hash==='#/menuUsuario')){
        menuUsuario();
    }else if(hash==='#/crearCurso'){
        formCurso()
    }else if(hash==='#/menuAdmin'){
        menuAdmin()
    } else if(hash==='#/usuarios'){
        listaUsuarios()
    }else if(hash==='#/academiaweb'){
        menuDashboard()
    } else {
        setLogin();
    }
    console.log (hash);
}