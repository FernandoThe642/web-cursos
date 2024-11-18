document.addEventListener('DOMContentLoaded', function() { 
// Variables para seleccionar formulario y lista de cursos del DOM
    const formularioCurso = document.getElementById('formulario-curso');

// Formulario
    formularioCurso.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nombreCurso = document.getElementById('nombre-curso').value;
        const nombreInstructor = document.getElementById('nombre-instructor').value;
        const fechaInicio = document.getElementById('fecha-inicio').value;
        const duracion = document.getElementById('duracion').value;
        const descripcion = document.getElementById('descripcion').value;

        if (validarFormulario(nombreCurso, nombreInstructor, fechaInicio, duracion, descripcion)) {
            const curso = {
                id: Date.now(),
                nombreCurso,
                nombreInstructor,
                fechaInicio,
                duracion,
                descripcion
            };

            guardarCurso(curso);
            formularioCurso.reset();
        }
    });


// Validar formulario
    function validarFormulario(nombreCurso, nombreInstructor, fechaInicio, duracion, descripcion) {
        if (!nombreCurso || !nombreInstructor || !fechaInicio || !duracion || !descripcion) {
            alert('Por favor, complete todos los campos.');
            return false;
        }
        return true;
    }

// Guardar curso en localStorage
    function guardarCurso(curso) {
        let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        cursos.push(curso);
        localStorage.setItem('cursos', JSON.stringify(cursos));
    }


});