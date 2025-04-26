window.onload = function() {
  // Asegúrate de que apunta al servidor Express corriendo en el puerto 3000
  fetch('http://localhost:3000/animales') 
    .then(response => response.json())
    .then(animales => {
      const tablaAnimales = document.getElementById('tabla-animales');
      animales.forEach(animal => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${animal.nombre}</td>
          <td>${animal.especie}</td>
          <td>${animal.edad}</td>
          <td>${animal.descripcion}</td>
          <td>${animal.tipo}</td>
          <td>${animal.habitat.join(', ')}</td>
          <td style="background-color: ${animal.color};"></td>
          <td>${animal.fecha_nacimiento}</td>
          <td><img src="${animal.foto}" alt="${animal.nombre}" width="100"></td>
        `;
        tablaAnimales.appendChild(fila);
      });
    })
    .catch(err => console.error('Error al cargar los animales:', err));
};
