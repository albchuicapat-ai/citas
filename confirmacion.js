document.addEventListener('DOMContentLoaded', function () {
  const mensajeSinDatos = document.getElementById('mensajeSinDatos');
  const cardResumen = document.getElementById('cardResumen');
  const btnCorregir = document.getElementById('btnCorregir');

  // Recuperar datos desde sessionStorage
  const datosGuardados = sessionStorage.getItem('solicitudCita');

  // Consigna 05: Control de acceso directo sin datos
  if (!datosGuardados) {
    mensajeSinDatos.classList.remove('d-none');
    cardResumen.classList.add('d-none');
  } else {
    // Consigna 04: Recuperar y presentar los datos
    const solicitud = JSON.parse(datosGuardados);

    document.getElementById('resNombre').textContent = solicitud.nombre;
    document.getElementById('resEmail').textContent = solicitud.email;
    document.getElementById('resEspecialidad').textContent = solicitud.especialidad;
    document.getElementById('resFecha').textContent = solicitud.fecha;
    document.getElementById('resHorario').textContent = solicitud.horario;

    cardResumen.classList.remove('d-none');
    mensajeSinDatos.classList.add('d-none');
  }

  // Consigna 05: Opción para corregir o modificar la solicitud
  if (btnCorregir) {
    btnCorregir.addEventListener('click', function () {
      window.location.href = 'cita.html';
    });
  }
});