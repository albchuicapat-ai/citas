document.addEventListener('DOMContentLoaded', function () {
  // Consigna 03: Arreglo de horarios y horario no disponible
  const horariosBase = ["09:00", "10:00", "11:00", "15:00", "16:00"];
  const horarioBloqueado = "11:00"; 

  const selectHorario = document.getElementById('horario');
  const alertaHorarios = document.getElementById('alertaHorarios');
  const form = document.getElementById('formCita');

  // Poblar el selector de horarios recorriendo el arreglo con un bucle
  let contadorDisponibles = 0;

  for (let i = 0; i < horariosBase.length; i++) {
    const hora = horariosBase[i];
    const option = document.createElement('option');
    option.value = hora;

    if (hora === horarioBloqueado) {
      option.textContent = `${hora} - (No disponible)`;
      option.disabled = true; 
    } else {
      option.textContent = hora;
      contadorDisponibles++;
    }

    selectHorario.appendChild(option);
  }

  if (contadorDisponibles === 0) {
    alertaHorarios.textContent = "No existen horarios habilitados en este momento.";
    alertaHorarios.classList.remove('d-none');
    selectHorario.disabled = true;
  }

  // Consigna 02: Validación al enviar el formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    limpiarErrores();
    let esValido = true;

    const nombreVal = document.getElementById('nombre').value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const fechaVal = document.getElementById('fecha').value;
    const especialidadVal = document.getElementById('especialidad').value;
    const horarioVal = selectHorario.value;

    // Regla: Nombre de 3 a 60 caracteres
    if (nombreVal.length < 3 || nombreVal.length > 60) {
      mostrarError('nombre', 'errorNombre', 'El nombre debe contener entre 3 y 60 caracteres.');
      esValido = false;
    }

    // Regla: Correo válido
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailVal)) {
      mostrarError('email', 'errorEmail', 'Ingrese un correo electrónico válido.');
      esValido = false;
    }

    // Regla: Fecha igual o posterior a la actual
    if (!fechaVal) {
      mostrarError('fecha', 'errorFecha', 'Debe seleccionar una fecha.');
      esValido = false;
    } else {
      const fechaSeleccionada = new Date(fechaVal + 'T00:00:00');
      const fechaHoy = new Date();
      fechaHoy.setHours(0, 0, 0, 0);

      if (fechaSeleccionada < fechaHoy) {
        mostrarError('fecha', 'errorFecha', 'La fecha debe ser igual o posterior a la fecha de hoy.');
        esValido = false;
      }
    }

    // Regla: Especialidad obligatoria
    if (!especialidadVal) {
      mostrarError('especialidad', 'errorEspecialidad', 'Debe seleccionar una especialidad.');
      esValido = false;
    }

    // Regla: Horario obligatorio y no bloqueado
    if (!horarioVal) {
      mostrarError('horario', 'errorHorario', 'Debe seleccionar un horario.');
      esValido = false;
    } else if (horarioVal === horarioBloqueado) {
      mostrarError('horario', 'errorHorario', 'El horario de las 11:00 no está disponible.');
      esValido = false;
    }

    // Consigna 04: Guardar en sessionStorage y navegar a la confirmación
    if (esValido) {
      const solicitud = {
        nombre: nombreVal,
        email: emailVal,
        fecha: fechaVal,
        especialidad: especialidadVal,
        horario: horarioVal
      };

      sessionStorage.setItem('solicitudCita', JSON.stringify(solicitud));
      window.location.href = 'confirmacion-cita.html';
    }
  });

  function mostrarError(campoId, errorId, mensaje) {
    const input = document.getElementById(campoId);
    const feedback = document.getElementById(errorId);
    input.classList.add('is-invalid');
    feedback.textContent = mensaje;
  }

  function limpiarErrores() {
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => input.classList.remove('is-invalid'));
    const feedbacks = document.querySelectorAll('.invalid-feedback');
    feedbacks.forEach(fb => fb.textContent = '');
  }
});