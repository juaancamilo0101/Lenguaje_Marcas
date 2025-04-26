document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario-animal');
    const alertContainer = document.getElementById('alert-container');
  
    if (!formulario) {
      console.error('Formulario no encontrado');
      return;
    }
  
    // Marca la función del evento como async
    formulario.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      // Obtener los valores del formulario
      const nombre = document.getElementById('nombre').value;
      const especie = document.getElementById('especie').value;
      const edad = document.getElementById('edad').value;
      const descripcion = document.getElementById('descripcion').value;
      const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
      const habitats = Array.from(document.querySelectorAll('input[name="habitat"]:checked')).map(input => input.value);
      const color = document.getElementById('color').value || '#000000'; // Predeterminado si no se selecciona
      const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
      const foto = document.getElementById('foto').files[0];
  
      // Validación de campos
      if (!nombre || !especie || !edad || !descripcion || !tipo) {
        showAlert('Por favor, completa todos los campos obligatorios.', 'danger');
        return;
      }
  
      // Función para leer la imagen y convertirla a un Data URL
      function readImage(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);  // La imagen se convierte en Data URL
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
  
      // Crear el objeto de animal
      const nuevoAnimal = {
        nombre,
        especie,
        edad,
        descripcion,
        tipo,
        habitats,
        color,
        fechaNacimiento,
        foto: foto ? await readImage(foto) : null,  // Convertir la imagen a Data URL si existe
      };
  
      // Obtener los animales almacenados y agregar el nuevo
      const animales = JSON.parse(localStorage.getItem('animales')) || [];
      animales.push(nuevoAnimal);
      localStorage.setItem('animales', JSON.stringify(animales));
  
      // Mostrar mensaje de éxito
      showAlert('El animal ha sido registrado exitosamente.', 'success');
  
      // Limpiar el formulario
      formulario.reset();
    });
  
    // Función para mostrar alertas
    function showAlert(message, type) {
      const alert = document.createElement('div');
      alert.classList.add('alert', `alert-${type}`, 'mt-3');
      alert.textContent = message;
      alertContainer.innerHTML = ''; // Limpiar alertas anteriores
      alertContainer.appendChild(alert);
  
      setTimeout(() => {
        alert.remove();
      }, 3000);
    }
  });
  