document.addEventListener('DOMContentLoaded', function () {
    const tablaAnimales = document.getElementById('tabla-animales');  // Tabla donde se listarán los animales
  
    // Función para cargar los animales en la tabla
    function cargarAnimales() {
      // Obtener los animales desde el localStorage
      const animales = JSON.parse(localStorage.getItem('animales')) || [];
  
      // Limpiar la tabla antes de agregar los nuevos animales
      tablaAnimales.innerHTML = '';
  
      // Verificar si hay animales registrados
      if (animales.length === 0) {
        tablaAnimales.innerHTML = '<tr><td colspan="3" class="text-center">No hay animales registrados.</td></tr>';
      } else {
        // Mostrar cada animal en la tabla
        animales.forEach(animal => {
          const fila = document.createElement('tr');
  
          // Crear la celda para la imagen
          const celdaImagen = document.createElement('td');
          if (animal.foto) {
            const imagen = document.createElement('img');
            imagen.src = animal.foto;  // Usar el Data URL de la imagen
            imagen.alt = animal.nombre;
            imagen.classList.add('img-thumbnail', 'img-fluid', 'w-25');
            celdaImagen.appendChild(imagen);
          } else {
            celdaImagen.innerHTML = '<i>No hay foto</i>';
          }
          fila.appendChild(celdaImagen);
  
          // Crear las celdas para el nombre y la especie
          const celdaNombre = document.createElement('td');
          celdaNombre.textContent = animal.nombre;
          fila.appendChild(celdaNombre);
  
          const celdaEspecie = document.createElement('td');
          celdaEspecie.textContent = animal.especie;
          fila.appendChild(celdaEspecie);
  
          // Añadir la fila a la tabla
          tablaAnimales.appendChild(fila);
        });
      }
    }
  
    // Cargar los animales cuando la página se carga
    cargarAnimales();
  });
  