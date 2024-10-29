// 1. Obtenemos todas las fichas (tanto jugadores como del tablero)
const fichas = document.querySelectorAll('.ficha');

let ultimaFicha = null;

// 2. A cada ficha le asignamos el atributo 'draggable', el evento 'DragStart', 'dragover' y el evento 'drop'
fichas.forEach(ficha => {
    ficha.setAttribute('draggable', true); // Permitirá hacer drag
    ficha.addEventListener('dragstart', dragStart); // Se iniciará al iniciar el drag
    ficha.addEventListener('dragover', dragOver); // Se activa al ponerse encima de la zona draggeable
    ficha.addEventListener('dragleave', dragLeave); // De activa al salir de la zona draggeable
    ficha.addEventListener('drop', drop); // Se activa al soltar el drag
});

// Obtenemos la imagen mediante el ID (fichaA1.. fichaB2...)
function dragStart(e){
    e.dataTransfer.setData('text/plain', e.target.id);
}

// Evitamos que el navegador interfiera y al ponerlos encima habilitamos una clase CSS
function dragOver(e){
    e.preventDefault();
    e.target.classList.add('drag-over');
}

// Evitamos que el navegador interfiera y al salir de la zona draggeable quitamos la clase CSS
function dragLeave(e){
    e.target.classList.remove('drag-over');
}

// Insertamos la imagen en la ficha draggeable (tablero)
function drop(e){
    e.preventDefault();
    console.log(e.target);
    
    const id = e.dataTransfer.getData('text/plain'); // Recuperamos el id del elemento
    const draggable = document.getElementById(id);
    e.target.classList.remove('drag-over');

    e.target.appendChild(draggable);
    // verifica el ultimo elemento draggeado
    if(id.startsWith('fichaA')){
        ultimaFicha = 'A';
    } else if(id.startsWith('fichaB')){
        ultimaFicha = 'B';    
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
}

