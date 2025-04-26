document.addEventListener('DOMContentLoaded', function () {
    // Obtener las especies desde localStorage
    const especies = JSON.parse(localStorage.getItem('animales')) || [];
  
    // Función para cargar las especies en las listas
    function cargarEspecies() {
      const listaOrdenada = document.getElementById('lista-ordenada');
      const listaNoOrdenada = document.getElementById('lista-no-ordenada');
      const listaDefinicion = document.getElementById('lista-definicion');
  
      // Limpiar las listas antes de agregar las nuevas especies
      listaOrdenada.innerHTML = '';
      listaNoOrdenada.innerHTML = '';
      listaDefinicion.innerHTML = '';
  
      especies.forEach((animal) => {
        // Crear los elementos de las listas
  
        // Lista ordenada
        const itemOrdenado = document.createElement('li');
        itemOrdenado.classList.add('list-group-item');
        itemOrdenado.textContent = animal.especie;
        listaOrdenada.appendChild(itemOrdenado);
  
        // Lista no ordenada
        const itemNoOrdenado = document.createElement('li');
        itemNoOrdenado.classList.add('list-group-item');
        itemNoOrdenado.textContent = animal.especie;
        listaNoOrdenada.appendChild(itemNoOrdenado);
  
        // Lista de definición
        const definicion = document.createElement('div');
        definicion.classList.add('col-md-4');
        const term = document.createElement('dt');
        term.textContent = animal.especie;
        const descripcion = document.createElement('dd');
        descripcion.textContent = animal.descripcion || 'No disponible';
        definicion.appendChild(term);
        definicion.appendChild(descripcion);
        listaDefinicion.appendChild(definicion);
      });
    }
  
    // Llamar a la función para cargar las especies cuando el DOM esté listo
    cargarEspecies();
  });
  