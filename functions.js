const fichas = document.querySelectorAll('.ficha');

console.log(fichas);

fichas.forEach(ficha => {
    ficha.setAttribute('draggable', true);
    ficha.addEventListener('dragstart', dragstart);
    ficha.addEventListener('drop', drop);
});

function dragstart(e){
    e.dataTransfer.setData('text/plain', e.target.id);
    console.log(e.target.id);
}

function drop(e){
    e.preventDefault();
    
    const id = e.dataTransfer.getData('text/plain'); // Recuperamos el id del elemento
    const draggable = document.getElementById(id);

    e.target.appendChild(draggable);
}