// Función para validar el inicio de sesión
function validarLogin() {
    const user = document.getElementById("user").value; // Obtiene el valor del campo de usuario    
    const pass = document.getElementById("pass").value; // Obtiene el valor del campo de contraseña

    // Verifica si el usuario y la contraseña son correctas
    if (user === "admin" && pass === "1234") {
        window.location.href = "menu.html"; // Redirige al archivo a menu.html
    } else {
        alert("Credenciales incorrectas"); // Muestra un mensaje de alerta
    }
}
// Función para depositar dinero

function depositar() {
    const monto = parseInt(document.getElementById("monto").value);

    // Recuperar saldo actual desde localStorage (si no existe, parte en 0)
    let saldo = parseInt(localStorage.getItem("saldo")) || 0;
    saldo += monto;
    localStorage.setItem("saldo", saldo);

    // Guardar historial en localStorage
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(`Depósito: $${monto}`);
    localStorage.setItem("historial", JSON.stringify(historial));

    alert("Depósito realizado");
    window.location.href = "menu.html"; // volver al menú
}

//aqui estoy usando funciones para el envio de dinero

function enviar() {
    const contacto = document.getElementById("contacto").value;
    const monto = parseInt(document.getElementById("montoEnvio").value);

    let saldo = parseInt(localStorage.getItem("saldo")) || 0;
    let historial = JSON.parse(localStorage.getItem("historial")) || [];

    if (monto <= saldo) { // si el monto es menor o igual al saldo
        saldo -= monto;
        localStorage.setItem("saldo", saldo);

        historial.push(`Transferencia a ${contacto}: $${monto}`); // se agrega el monto a la transferencia
        localStorage.setItem("historial", JSON.stringify(historial));

        alert("Transferencia realizada"); //lanzamos un alert
        window.location.href = "menu.html";
    } else {
        alert("Saldo insuficiente"); //lanzamos un alert en caso d que el saldo sea insuficiente
    }
}

// aqui estoy usando funciones para el historial
function mostrarHistorial() {
    const lista = document.getElementById("listaHistorial");
    lista.innerHTML = "";

    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.forEach(mov => {
        lista.innerHTML += `<tr><td>${mov}</td></tr>`; //aquí estoy usando table de bootstrap para mostrar el historial
    });
}
window.onload = function () {
    //si nos posicionamos en menu.html
    if (document.getElementById("saldo")) {
        let saldo = parseInt(localStorage.getItem("saldo")) || 0;
        document.getElementById("saldo").innerText = `$${saldo}`;
    }

    // y aca si es que nos posicionamos en transactions.html
    if (document.getElementById("listaHistorial")) {
        mostrarHistorial();
    }
};
// aca estoy usando funciones para sugerencias en el envio de dinero

$(document).ready(function () {
    const contactos = ["Juan", "María", "Pedro", "Ana"]; //sugerencias como contactos
    $("#contacto").on("input", function () {
        let valor = $(this).val().toLowerCase();
        let sugerencias = contactos.filter(c => c.toLowerCase().includes(valor));
        $("#sugerencias").html(sugerencias.join("<br>"));
    });
});