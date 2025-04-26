window.onload = function() {
  fetch('http://localhost:3000/animales')
    .then(response => response.json())
    .then(animales => {
      const listaOrdenada = document.getElementById('lista-ordenada');
      const listaNoOrdenada = document.getElementById('lista-no-ordenada');
      const listaDefinicion = document.getElementById('lista-definicion');

      if (animales.length === 0) {
        // Si no hay animales
        mostrarMensajeVacio(listaOrdenada);
        mostrarMensajeVacio(listaNoOrdenada);
        mostrarMensajeVacio(listaDefinicion);
        return;
      }

      // Obtener especies únicas
      const especies = [...new Set(animales.map(animal => animal.especie))];
      const especiesOrdenadas = [...especies].sort();
      const especiesOriginal = [...especies];

      // Llenar lista ordenada (<ol>)
      especiesOrdenadas.forEach(especie => {
        const itemOrdenado = document.createElement('li');
        itemOrdenado.className = 'list-group-item';
        itemOrdenado.textContent = especie;
        listaOrdenada.appendChild(itemOrdenado);
      });

      // Llenar lista no ordenada (<ul>)
      especiesOriginal.forEach(especie => {
        const itemNoOrdenado = document.createElement('li');
        itemNoOrdenado.className = 'list-group-item';
        itemNoOrdenado.textContent = especie;
        listaNoOrdenada.appendChild(itemNoOrdenado);
      });

      // Llenar lista de definición (<dl>)
      especiesOriginal.forEach(especie => {
        const dt = document.createElement('dt');
        dt.className = 'col-sm-3 fw-bold text-primary';
        dt.textContent = especie;

        // Buscar el primer animal de esa especie para saber su tipo
        const animalEncontrado = animales.find(animal => animal.especie === especie);
        const tipo = animalEncontrado ? animalEncontrado.tipo : 'Desconocido';

        const dd = document.createElement('dd');
        dd.className = 'col-sm-9';
        dd.textContent = generarDescripcionEspecie(especie, tipo);

        listaDefinicion.appendChild(dt);
        listaDefinicion.appendChild(dd);
      });
    })
    .catch(err => console.error('Error al cargar las especies:', err));
};

// Función para mostrar mensaje cuando no hay datos
function mostrarMensajeVacio(lista) {
  const item = document.createElement(lista.tagName === 'DL' ? 'dd' : 'li');
  item.className = 'list-group-item text-muted';
  item.textContent = 'No hay especies registradas aún.';
  lista.appendChild(item);
}

// Función para generar una descripción bonita según el tipo de animal
function generarDescripcionEspecie(especie, tipo) {
  switch (tipo.toLowerCase()) {
    case 'salvaje':
      return `La especie "${especie}" pertenece a los animales salvajes, conocidos por su vida libre en la naturaleza y su fuerza imponente.`;
    case 'doméstico':
      return `La especie "${especie}" es un animal doméstico, compañero cercano de los humanos, brindando amor y compañía.`;
    case 'acuático':
      return `La especie "${especie}" habita principalmente en ambientes acuáticos, adaptándose a la vida en ríos, lagos o mares.`;
    case 'volador':
      return `La especie "${especie}" domina los cielos con su habilidad para volar, representando la libertad y la majestuosidad aérea.`;
    default:
      return `La especie "${especie}" tiene características únicas que la distinguen en su ecosistema.`;
  }
}
