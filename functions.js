// Variables globales para el turno actual y contador de victorias
let turnoActual = 'A';
let victoriasJugadorA = 0;
let victoriasJugadorB = 0;
let juegoPausado = false;


// Iniciar el juego al cargar la página
function comenzar() {
    inicializarFichas();
    mostrarTurno();
}
//ventanas emegerten segun el ganador o el turno de cada jugador
function ventana(texto) {        
    // Recibe un parámetro 'texto' de tipo string, que contiene el mensaje que se mostrará en la nueva ventana.

    let nuevaVentana = window.open('', '_blank', 'height=100px,width=100px');
    // Abre una nueva ventana emergente de 100x100 píxeles sin URL específica.
    // Almacenamos una referencia a esta nueva ventana en la variable 'nuevaVentana'.

    nuevaVentana.document.write('<p>' + texto + '</p>');
    // Escribe el contenido de 'texto' dentro de un párrafo <p> en la nueva ventana.

    setTimeout(function() {          
        nuevaVentana.close(); 
    }, 1000);
    // Cierra la nueva ventana automáticamente después de 1000 milisegundos (1 segundo).
    // La función no devuelve ningún valor (undefined).
}



    //Muestra despues de cada turno un texto para reiniciar la partida con F5
    function f5(oculto) {  
        // La función recibe un parámetro 'oculto', que debería ser un valor booleano.
        // Si 'oculto' es verdadero, el elemento se mostrará; si es falso, se ocultará.
    
        let h1 = document.getElementById('oculto');
        // Busca y almacena en la variable 'h1' el elemento HTML con el id 'oculto'.
    
        if (oculto) {
            h1.style.display = 'block';
            // Si 'oculto' es verdadero, establece el estilo de visualización en 'block',
            // haciendo visible el elemento.
        } else {
            h1.style.display = 'none';
            // Si 'oculto' es falso, establece el estilo de visualización en 'none',
            // ocultando el elemento.
        }
        // La función no devuelve ningún valor (undefined).
    }
        


// Inicia el juego
window.onload = comenzar;
let elementoVictoriasJugadorA = document.getElementById('victoriasJugadorA');
elementoVictoriasJugadorA.innerHTML = 'Victorias A: ' + victoriasJugadorA;

let elementoVictoriasJugadorB = document.getElementById('victoriasJugadorB');
elementoVictoriasJugadorB.innerHTML = 'Victorias B: ' + victoriasJugadorB;

// Obtenemos todas las fichas (tanto jugadores como del tablero)
function inicializarFichas() {
    // La función no recibe ningún parámetro y su propósito es configurar elementos para hacer drag-and-drop.

    const fichas = document.querySelectorAll('.ficha');
    // Selecciona todos los elementos con la clase 'ficha' y los guarda en la constante 'fichas'.

    // A cada ficha se le asignan atributos y eventos necesarios para el drag-and-drop.
    fichas.forEach(ficha => {
        ficha.setAttribute('draggable', true); 
        // Establece el atributo 'draggable' en true para permitir arrastrar el elemento.

        ficha.addEventListener('dragstart', dragStart); 
        // Asigna el evento 'dragstart' al elemento, que se activa al iniciar el arrastre. 
        // Ejecutará la función 'dragStart'.

        ficha.addEventListener('dragover', dragOver); 
        // Asigna el evento 'dragover' para cuando el elemento arrastrado se encuentra sobre otra zona de drop. 
        // Ejecutará la función 'dragOver'.

        ficha.addEventListener('dragleave', dragLeave); 
        // Asigna el evento 'dragleave' al elemento para cuando el elemento arrastrado sale de la zona de drop.
        // Ejecutará la función 'dragLeave'.

        ficha.addEventListener('drop', drop); 
        // Asigna el evento 'drop' que se activa cuando el elemento arrastrado es soltado en la zona de drop. 
        // Ejecutará la función 'drop'.
    });
    // La función no devuelve ningún valor (undefined).
}


// Obtenemos la imagen mediante el ID (fichaA1.. fichaB2...)
function dragStart(e) {
    // La función recibe el evento 'e' que contiene información sobre el elemento que se está arrastrando.

    const turnoElement = document.querySelector("#turno img");
    // Selecciona el elemento <img> dentro del elemento con id 'turno' para identificar de quién es el turno actual.

    const srcCompleto = e.target.src;
    // Obtiene la URL completa de la imagen que se está arrastrando, accediendo a la propiedad 'src' del elemento objetivo.

    const nombreImagen = srcCompleto.substring(srcCompleto.lastIndexOf('/') + 1);
    // Extrae el nombre de la imagen del src completo (parte después de la última '/' en la URL).

    if (turnoElement.src.includes(nombreImagen)) {
        e.dataTransfer.setData('text/plain', e.target.id);
        // Si la imagen del turno actual coincide con la que se está arrastrando, almacena el id del elemento en el objeto dataTransfer.
        
        posicionInicial = e.target.parentNode; 
        // Guarda el elemento padre de la ficha que se arrastra en la variable 'posicionInicial' (para recordar su posición original).
    } else {
        ventana('No es tu turno');
        // Si la imagen no coincide con el turno actual, muestra un mensaje indicando que no es el turno del jugador.
    }
    // La función no devuelve ningún valor (undefined).
}

// Evitamos que el navegador interfiera y al ponerlos encima habilitamos una clase CSS
function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
    // La función no devuelve ningún valor (undefined).
}

// Evitamos que el navegador interfiera y al salir de la zona draggeable quitamos la clase CSS
function dragLeave(e) {
    e.target.classList.remove('drag-over');
    // La función no devuelve ningún valor (undefined).
}

// Insertamos la imagen en la ficha draggeable (tablero)
function drop(e) {
    e.preventDefault();

    const id = e.dataTransfer.getData('text/plain'); // Recuperamos el id del elemento
    const draggable = document.getElementById(id);
    e.target.classList.remove('drag-over');

    // Verificamos el ultimo elemento draggeado
    if (id.startsWith('fichaA')) {
        ultimaFicha = 'A';
    } else if (id.startsWith('fichaB')) {
        ultimaFicha = 'B';    
    } 

    // Verificamos si la casilla está ocupada
    if (e.target.children.length > 0) {
        ventana('Casilla ocupada');
        // Si la casilla está ocupada, devolvemos la ficha a su posición original
        posicionInicial.appendChild(draggable);
        // verifica el ultimo elemento draggeado
        if (id.startsWith('fichaA')) {
            ultimaFicha = 'B';
        } else if (id.startsWith('fichaB')) {
            ultimaFicha = 'A';    
        } 
    } else {
        // Si no está ocupada, movemos la ficha a la nueva posición
        e.target.appendChild(draggable);
        
        // Verificar si hay un ganador después de cada movimiento
        comprobar();
        
    }

    if (draggable) {
        e.target.appendChild(draggable);
    } else {
        console.error("No se encontró el draggable con id:", id);
    }

    actualizarTurno();
    // La función devuelve texto al mostrar los cambios en el HTML segun la condicion que cumpla cuando haga el drop.
}

// Mostrar el turno actual del jugador en el HTML
function mostrarTurno() {

// no recibe ni devuelve ningun valor.
    const turnoElement = document.getElementById("turno");
    turnoElement.innerHTML = ""; // Limpiar contenido anterior
    const imagenTurno = document.createElement("img");
    imagenTurno.src = (turnoActual === 'A') ? 'imagenes/x.jpg' : 'imagenes/o.jpg';
    imagenTurno.alt = `Turno del jugador ${turnoActual}`;
    imagenTurno.style.width = '50px';
    turnoElement.appendChild(imagenTurno);
}

// Actualizar turno
function actualizarTurno(){
    // no recibe ni devuelve ningun valor.
        // Actualizamos el turno en el título del HTML con una imagen
        const turnoElement = document.getElementById("turno");
        const imagenTurno = document.createElement("img");
    
        // Cambia la fuente de la imagen dependiendo del turno
        imagenTurno.src = (ultimaFicha === 'A') ? 'imagenes/o.jpg' : 'imagenes/x.jpg';
        imagenTurno.alt = `Turno del jugador ${(ultimaFicha === 'A') ? 'B' : 'A'}`;
        imagenTurno.style.width = '50px'; 
    
        // Limpiamos el contenido anterior y añadimos la nueva imagen
        turnoElement.innerHTML = ""; // limpia el contenido anterior
        turnoElement.appendChild(imagenTurno);
}

// Función que comprueba si la partida ha finalizado
function comprobar() {
    // no recibe ni devuelve ningun valor.
    // Obtener todas las celdas
    const celdas = document.querySelectorAll('.grid-tablero div'); 

    // Indicamos las combinaciones ganadoras
    const combinacionesGanadoras = [
        [0, 1, 2], // Fila 1
        [3, 4, 5], // Fila 2
        [6, 7, 8], // Fila 3
        [0, 3, 6], // Columna 1
        [1, 4, 7], // Columna 2
        [2, 5, 8], // Columna 3
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        const fichaA = celdas[a].children[0]; // Obtener la ficha de la celda a
        const fichaB = celdas[b].children[0]; // Obtener la ficha de la celda b
        const fichaC = celdas[c].children[0]; // Obtener la ficha de la celda c

        // Comprobar si las fichas son iguales y no están vacías
        if (fichaA && fichaB && fichaC &&
            fichaA.src === fichaB.src && fichaB.src === fichaC.src) {
            if (fichaA.src.includes('x.jpg')) {
                ventana('¡Jugador A gana!');
                victoriasJugadorA++; // Incrementar victorias A
                juegoPausado = true;
                f5(true); 
            } else {
                ventana('¡Jugador B gana!');
                victoriasJugadorB++; // Incrementar victorias B
                juegoPausado = true;
                f5(true);
            }

            // Obtenemos todas las fichas
            const fichasTablero = document.querySelectorAll('.grid-tablero div img');
            const fichasA = document.querySelectorAll('[id^="fichaA"]');
            const fichasB = document.querySelectorAll('[id^="fichaB"]');

            // Cuando el juego esta pausado porque alguien ha ganado, no se podran mover las fichas
            if(juegoPausado){
                fichasTablero.forEach(ficha => ficha.draggable = false);
                fichasA.forEach(ficha => ficha.draggable = false);
                fichasB.forEach(ficha => ficha.draggable = false);
                

            } else {
                fichasTablero.forEach(ficha => ficha.draggable = true);
                fichasA.forEach(ficha => ficha.draggable = true);
                fichasB.forEach(ficha => ficha.draggable = true);
            }

            juegoPausado = false;

            // Actualizar el marcador
            actualizarMarcador();
            return; // Terminar la función
        }
    }
}

// Función para actualizar el marcador
function actualizarMarcador() {
    // no recibe ni devuelve ningun valor.
    const elementoVictoriasJugadorA = document.getElementById('victoriasJugadorA');
    elementoVictoriasJugadorA.innerHTML = 'Victorias A: ' + victoriasJugadorA;

    const elementoVictoriasJugadorB = document.getElementById('victoriasJugadorB');
    elementoVictoriasJugadorB.innerHTML = 'Victorias B: ' + victoriasJugadorB;
}

// Pulsando F5 se reinicia la partida
window.addEventListener('keydown', function(event) {
    if (event.key == 'F5') {
        f5(false);
        event.preventDefault(); // Cambiado a preventDefault() para funcionar correctamente

        // Obtenemos todas las fichas del juego
        const fichasTablero = document.querySelectorAll('.grid-tablero div img');
        const fichasA = document.querySelectorAll('[id^="fichaA"]');
        const fichasB = document.querySelectorAll('[id^="fichaB"]');

        // Eliminamos todo (para que quede limpio)
        fichasTablero.forEach(ficha => ficha.remove());
        fichasA.forEach(ficha => ficha.remove());
        fichasB.forEach(ficha => ficha.remove());

        // Añadimos las fichas del jugador 1
        const contenedorA = document.querySelector('#jugador1 .contenedor');

        for (let i = 1; i <= fichasA.length; i++) {
            let elementoFicha = document.createElement('img');
            elementoFicha.id = 'fichaA' + i;
            elementoFicha.classList.add('ficha');
            elementoFicha.src = 'imagenes/x.jpg';
            contenedorA.appendChild(elementoFicha);
        }

        // Añadimos las fichas del jugador 2
        const contenedorB = document.querySelector('#jugador2 .contenedor');

        for (let i = 1; i <= fichasB.length; i++) {
            let elementoFicha = document.createElement('img');
            elementoFicha.id = 'fichaB' + i;
            elementoFicha.classList.add('ficha');
            elementoFicha.src = 'imagenes/o.jpg';
            contenedorB.appendChild(elementoFicha);
        }

        // Reiniciamos turno
        let turnoActual = 'A';
        mostrarTurno();

        // Vuelve a inicializar fichas después de añadirlas al DOM
        inicializarFichas();
    }

    
});