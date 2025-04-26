let especiesExistentes = [];

window.onload = function() {
  cargarEspecies();

  const especieSelect = document.getElementById('especie-select');
  especieSelect.addEventListener('change', function() {
    const otraEspecieContainer = document.getElementById('otra-especie-container');
    if (especieSelect.value === 'otro') {
      otraEspecieContainer.style.display = 'block';
      document.getElementById('otra-especie').setAttribute('required', 'required');
    } else {
      otraEspecieContainer.style.display = 'none';
      document.getElementById('otra-especie').removeAttribute('required');
    }
  });

  document.getElementById('formulario-animal').addEventListener('submit', function(event) {
    event.preventDefault();

    let especieSeleccionada = document.getElementById('especie-select').value;
    let especieFinal = especieSeleccionada;

    if (especieSeleccionada === 'otro') {
      especieFinal = document.getElementById('otra-especie').value.trim();
      if (!especieFinal) {
        mostrarAlerta('Debes escribir una nueva especie.', 'danger');
        return;
      }
      if (especiesExistentes.includes(especieFinal.toLowerCase())) {
        mostrarAlerta('Esa especie ya existe. Selecciona una del listado.', 'warning');
        return;
      }
    }

    const formData = new FormData(this);
    formData.set('especie', especieFinal); // Sobreescribir la especie final para enviar

    fetch('http://localhost:3000/registrar', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al registrar el animal');
      }
      return response.json();
    })
    .then(data => {
      mostrarAlerta(data.mensaje, 'success');
      document.getElementById('formulario-animal').reset();
      document.getElementById('otra-especie-container').style.display = 'none';
    })
    .catch(error => {
      mostrarAlerta('Error al registrar el animal: ' + error.message, 'danger');
      console.error('Error al registrar el animal:', error);
    });
  });
};

function cargarEspecies() {
  fetch('http://localhost:3000/animales')
    .then(response => response.json())
    .then(animales => {
      const especieSelect = document.getElementById('especie-select');
      const especies = [...new Set(animales.map(animal => animal.especie))];

      especiesExistentes = especies.map(e => e.toLowerCase());

      especies.forEach(especie => {
        const option = document.createElement('option');
        option.value = especie;
        option.textContent = especie;
        especieSelect.appendChild(option);
      });

      const optionOtro = document.createElement('option');
      optionOtro.value = 'otro';
      optionOtro.textContent = 'Otro (Agregar nueva especie)';
      especieSelect.appendChild(optionOtro);
    })
    .catch(error => {
      console.error('Error al cargar especies:', error);
    });
}

function mostrarAlerta(mensaje, tipo) {
  const alertContainer = document.getElementById('alert-container');
  alertContainer.innerHTML = `
    <div class="alert alert-${tipo} mt-3" role="alert">
      ${mensaje}
    </div>`;
}
