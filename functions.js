// 1. Obtenemos todas las fichas (tanto jugadores como del tablero)
function inicializarFichas() {
    const fichas = document.querySelectorAll('.ficha');
    
    // 2. A cada ficha le asignamos el atributo 'draggable', el evento 'DragStart', 'dragover' y el evento 'drop'
    fichas.forEach(ficha => {
        ficha.setAttribute('draggable', true); // Permitirá hacer drag
        ficha.addEventListener('dragstart', dragStart); // Se iniciará al iniciar el drag
        ficha.addEventListener('dragover', dragOver); // Se activa al ponerse encima de la zona draggeable
        ficha.addEventListener('dragleave', dragLeave); // De activa al salir de la zona draggeable
        ficha.addEventListener('drop', drop); // Se activa al soltar el drag
    });
}

// Inicializar fichas en la carga de la página
inicializarFichas();

// Obtenemos la imagen mediante el ID (fichaA1.. fichaB2...)
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    posicionInicial = e.target.parentNode; // guarda la posición inicial
}

// Evitamos que el navegador interfiera y al ponerlos encima habilitamos una clase CSS
function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

// Evitamos que el navegador interfiera y al salir de la zona draggeable quitamos la clase CSS
function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

// Insertamos la imagen en la ficha draggeable (tablero)
function drop(e) {
    e.preventDefault();
    
    const id = e.dataTransfer.getData('text/plain'); // Recuperamos el id del elemento
    const draggable = document.getElementById(id);
    e.target.classList.remove('drag-over');
    
    // verifica el ultimo elemento draggeado
    if(id.startsWith('fichaA')){
        ultimaFicha = 'A';
    } else if(id.startsWith('fichaB')){
        ultimaFicha = 'B';    
    } 

    // Verificamos si la casilla está ocupada
    if (e.target.children.length > 0) {
        alert('Casilla ocupada');
        // Si la casilla está ocupada, devolvemos la ficha a su posición original
        posicionInicial.appendChild(draggable);
        // verifica el ultimo elemento draggeado
        if(id.startsWith('fichaA')){
            ultimaFicha = 'B';
        } else if(id.startsWith('fichaB')){
            ultimaFicha = 'A';    
        } 
    } else {
        // Si no está ocupada, movemos la ficha a la nueva posición
        e.target.appendChild(draggable);
    }    
  
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
  
    if (draggable) {
        e.target.appendChild(draggable);
    } else {
        console.error("No se encontró el draggable con id:", id);
    }
}

// Pulsando F5 se reinicia la partida
window.addEventListener('keydown', function(event) {
    if (event.key == 'F5') {
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

        // Vuelve a inicializar fichas después de añadirlas al DOM
        inicializarFichas();
    }
});