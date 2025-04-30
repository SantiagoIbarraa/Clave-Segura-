// Generador de contraseñas seguro y mejorado
// Comentarios explicando cada corrección y mejora

function crearClave() {
    const largo = parseInt(document.getElementById("tam").value);
    const incluirMayus = document.getElementById("mayus").checked;
    const incluirNum = document.getElementById("num").checked;
    const incluirSimbolos = document.getElementById("simbolos").checked;
    let base = "abcdefghijklmnopqrstuvwxyz";
    if (incluirMayus) base += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incluirNum) base += "0123456789";
    if (incluirSimbolos) base += "!@#$%^&*()_+";

    // Validación: si no hay caracteres seleccionados, mostrar error
    if (base.length === 0) {
        mostrarMensaje("Selecciona al menos una opción de caracteres", true);
        return;
    }

    let resultado = "";
    for (let i = 0; i < largo; i++) {
        resultado += base.charAt(Math.floor(Math.random() * base.length));
    }
    document.getElementById("claveGenerada").value = resultado;
    mostrarMensaje("¡Clave generada!");
}

// Mejorado: feedback visual moderno al copiar
function copiarClave() {
    const campo = document.getElementById("claveGenerada");
    if (!campo.value) {
        mostrarMensaje("No hay clave para copiar", true);
        return;
    }
    // Usar API moderna si está disponible
    if (navigator.clipboard) {
        navigator.clipboard.writeText(campo.value)
            .then(() => mostrarMensaje("¡Clave copiada al portapapeles!"))
            .catch(() => mostrarMensaje("Error al copiar", true));
    } else {
        campo.select();
        document.execCommand("copy");
        mostrarMensaje("¡Clave copiada al portapapeles!");
    }
}

// Mejorado: mensaje visual en vez de alert
function mostrarMensaje(msg, esError = false) {
    let mensaje = document.getElementById("mensaje");
    if (!mensaje) {
        mensaje = document.createElement("div");
        mensaje.id = "mensaje";
        mensaje.style.position = "fixed";
        mensaje.style.bottom = "30px";
        mensaje.style.left = "50%";
        mensaje.style.transform = "translateX(-50%)";
        mensaje.style.padding = "12px 24px";
        mensaje.style.borderRadius = "8px";
        mensaje.style.background = esError ? "#ff4d4d" : "#497de9";
        mensaje.style.color = "#fff";
        mensaje.style.fontWeight = "bold";
        mensaje.style.zIndex = "9999";
        document.body.appendChild(mensaje);
    }
    mensaje.textContent = msg;
    mensaje.style.background = esError ? "#ff4d4d" : "#497de9";
    mensaje.style.display = "block";
    setTimeout(() => {
        mensaje.style.display = "none";
    }, 1800);
}

document.getElementById("generar").addEventListener("click", crearClave);
document.getElementById("copiar").addEventListener("click", copiarClave);
document.getElementById("tam").addEventListener("input", (e) => {
    document.getElementById("tamValor").textContent = e.target.value;
});

// Mejora: generar una clave al cargar la página
window.addEventListener("DOMContentLoaded", crearClave);
