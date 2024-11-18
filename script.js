document.addEventListener('DOMContentLoaded', function() {
// Variables para seleccionar formulario y lista de cursos del DOM
        const formularioCurso = document.getElementById('formulario-curso');
        const listaCursos = document.getElementById('lista-cursos');
    
// Cargar cursos al iniciar
        cargarCursos();
    
    // Formulario:
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
                agregarCursoALaLista(curso);
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
    
    // Cargar cursos del localStorage
        function cargarCursos() {
            const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
            cursos.forEach(curso => agregarCursoALaLista(curso));
        }
    
    // Añadir curso a la lista en la página
        function agregarCursoALaLista(curso) {
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="contenedor">
                <div class="informacion-curso">
                    <h2>${curso.nombreCurso}</h2> </br>
    
                </div>
                <div>
                    <p> <strong>Instructor:</strong> ${curso.nombreInstructor}</p>
                    <button class="ver-detalles">Ver más</button>
                    <button class="eliminar-curso">Eliminar</button>
                </div>
                <div class="detalles-curso">
                    <p><strong>Fecha de inicio:</strong> ${curso.fechaInicio}</p>
                    <p><strong>Duración:</strong> ${curso.duracion} semanas</p>
                    <p><strong>Descripción:</strong> ${curso.descripcion}</p>
                </div>
            </div>   
            `;
    
    // Mostrar detalles 
            li.querySelector('.ver-detalles').addEventListener('click', function() {
                const detalles = li.querySelector('.detalles-curso');
                if (detalles.style.maxHeight) {
                    detalles.style.maxHeight = null;
                } else {
                    detalles.style.maxHeight = detalles.scrollHeight + "px";
                }
            });
    
    // Eliminar curso
            li.querySelector('.eliminar-curso').addEventListener('click', function() {
                eliminarCurso(curso.id);
                li.remove();
            });
    
            listaCursos.appendChild(li);
        }
    
    // Eliminar curso de; LocalStorage
        function eliminarCurso(id) {
            let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
            cursos = cursos.filter(curso => curso.id !== id);
            localStorage.setItem('cursos', JSON.stringify(cursos));
        }
    });
    