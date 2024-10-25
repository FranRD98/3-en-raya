# 3-en-raya

PRÁCTICA – 3 en Raya.
Instrucciones generales:
1. Esta práctica se realizará en grupos de 2 o 3 personas.
2. Cada grupo debe crear un repositorio en GitHub para el desarrollo de la práctica. Todos los miembros del grupo deben estar agregados como colaboradores en el repositorio.
3. El código debe ser trabajado de manera colaborativa en GitHub, utilizando ramas para el desarrollo.
4. El repositorio debe estar bien organizado e incluir un archivo README.md que explique cómo ejecutar la aplicación y describa brevemente el proyecto.
5. Al finalizar, los grupos deben enviar el enlace al repositorio en lugar de un archivo comprimido.
Práctica:
Este ejercicio simula el juego del 3 en raya. El aspecto que debe tener la página tiene que ser similar al siguiente:
  1
 Desarrollo Web en Entorno Cliente Práctica 3 Cuando se carga la página nos deberán aparecer las siguientes zonas:
1. Jugadores. Aquí tendremos las fichas que tiene cada jugador (las 3 imágenes que os proporciono).
Ejemplo: Esta imagen indicaría que los jugadores no han empezado a jugar ya que tienen las tres fichas cada uno y que el jugador ‘A’ ha ganado 5 veces y el ‘B’ ha ganado 2.
2. Tablero. En esta parte tendremos el tablero donde iremos arrastrando las fichas de cada jugador. En ‘TURNO JUGADOR’ deberá aparecer la imagen de la ficha que toca mover.
    Ejemplo: Esta imagen nos indica que ha movido una ficha cada jugador y el turno es para el jugador ‘A’.
La partida no terminará hasta que uno de los dos jugadores consiga el tres en raya. En ese momento se abrirá una nueva ventana indicando que jugador ha ganado. Para volver a jugar o reiniciar la partida tendremos que pulsar ‘F5’.
 2

 Desarrollo Web en Entorno Cliente Práctica 3
 Una vez se arrastre la ficha de la zona de jugadores al tablero no se podrá volver a poner en la zona de jugadores. Las fichas que hay dentro del tablero se podrán arrastrar a una nueva posición siempre que no esté ocupada.
 Consideraciones:
• Las fichas estarán representadas por imágenes en el HTML.
• Al soltar una ficha sobre una posición del tablero que ya este ocupada, se abrirá una ventana indicando que la casilla está ocupada y la ficha
volverá a la posición de origen.
• Si intentamos mover una ficha que no tiene el turno asignado en ese momento también nos deberá avisar con una ventana.
• Las ventanas se abrirán, mostrarán el mensaje durante 1 segundo y se cerrarán automáticamente.
   3

 Desarrollo Web en Entorno Cliente Práctica 3 Funciones:
• comenzar(): En esta función se cargaran/inicializaran todos los valores.
• funciones Drag and Drop necesarias.
• comprobar(): Después de realizar un movimiento compruebo si se ha
ganado la partida.
• Las funciones anteriores son imprescindibles. Se puede (y se debería)
añadir más funciones para que el código sea más legible.
• Esta práctica es totalmente libre quitando de las funciones que se han indicado anteriormente.
• Os dejo las imágenes para que las utilicéis en las fichas.
• IMPRESCINDIBLE COMENTAR EL CODIGO.
• Comentar que realiza cada función e indicar que son los valores
que reciben y devuelven.
• La practica se realizará sobre la plataforma Github como se ha
indicado anteriormente
• No realizar algunos de los puntos anteriores supondrá una
puntuación máxima de 4 puntos.
Puntuación:
• Código HTML y CSS (1,5pts). No se evalúa que sea responsive.
• Control Eventos Drag and Drop y funcionalidad de estos.
o Dragstart (1pto). o Drop (2ptos).
o Restantes (1pto).
• Comprobación de errores (0,5ptos).
o Casilla Ocupada, Turno Incorrecto.
• Comprobar quien ha ganado la partida (2pts).
• Utilización de Github (1pto).
• Funcionamiento tecla F5 (1pto).
