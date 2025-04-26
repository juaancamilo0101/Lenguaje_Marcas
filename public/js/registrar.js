document.getElementById('formulario-animal').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this); // Crea un objeto FormData con los datos del formulario
  
    fetch('http://localhost:3000/registrar', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al registrar el animal');
      }
      return response.json(); // Parsear la respuesta JSON
    })
    .then(data => {
        console.log(data); // Verificar los datos que se reciben
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = `<div class="alert alert-success" role="alert">${data.mensaje}</div>`;
        document.getElementById('formulario-animal').reset();
      })
    .catch(error => {
      // Mostrar mensaje de error si algo falla
      const alertContainer = document.getElementById('alert-container');
      alertContainer.innerHTML = `<div class="alert alert-danger" role="alert">Error al registrar el animal: ${error.message}</div>`;
      console.error('Error al registrar el animal:', error);
    });
  });
  