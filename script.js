const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const btnIniciar = document.getElementById("btnIniciar");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReiniciar = document.getElementById("btnReiniciar");

const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");
const puntajeElemento = document.getElementById("puntaje");
const nivelElemento = document.getElementById("nivel");
const resultadoFinal = document.getElementById("resultadoFinal");

let indicePregunta = 0;
let puntaje = 0;
let preguntasJuego = [];

btnIniciar.addEventListener("click", iniciarJuego);
btnSiguiente.addEventListener("click", siguientePregunta);
btnReiniciar.addEventListener("click", iniciarJuego);

function iniciarJuego() {

    preguntasJuego = [...preguntas];

    mezclar(preguntasJuego);

    indicePregunta = 0;
    puntaje = 0;

    inicio.classList.add("oculto");
    final.classList.add("oculto");
    juego.classList.remove("oculto");

    actualizarMarcador();

    mostrarPregunta();
}

function mostrarPregunta() {

    opcionesElemento.innerHTML = "";

    btnSiguiente.style.display = "none";

    const actual = preguntasJuego[indicePregunta];

    preguntaElemento.textContent = actual.pregunta;

    actual.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.textContent = opcion;

        boton.onclick = () => responder(indice);

        opcionesElemento.appendChild(boton);

    });

}

function responder(indiceSeleccionado) {

    const actual = preguntasJuego[indicePregunta];

    const botones = opcionesElemento.querySelectorAll("button");

    botones.forEach((boton, indice) => {

        boton.disabled = true;

        if (indice === actual.correcta) {
            boton.classList.add("correcta");
        }

        if (indice === indiceSeleccionado && indice !== actual.correcta) {
            boton.classList.add("incorrecta");
        }

    });

    if (indiceSeleccionado === actual.correcta) {
        puntaje += 10;
    }

    actualizarMarcador();

    btnSiguiente.style.display = "inline-block";

}

function siguientePregunta() {

    indicePregunta++;

    if (indicePregunta >= preguntasJuego.length) {
        terminarJuego();
    } else {
        mostrarPregunta();
    }

}

function actualizarMarcador() {

    puntajeElemento.textContent = "Puntaje: " + puntaje;

    nivelElemento.textContent =
        "Pregunta " + (indicePregunta + 1) + " de " + preguntasJuego.length;

}

function terminarJuego() {

    juego.classList.add("oculto");

    final.classList.remove("oculto");

    resultadoFinal.innerHTML =
        "<h3>Obtuviste <strong>" +
        puntaje +
        "</strong> puntos de <strong>" +
        (preguntasJuego.length * 10) +
        "</strong></h3>";

}

function mezclar(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}