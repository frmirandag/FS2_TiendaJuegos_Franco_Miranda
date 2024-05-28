// Función para mostrar el elemento con el ID especificado y ocultar los demás
function mostrar(id) {
    // Obtener todos los elementos con la clase 'article'
    var articles = document.querySelectorAll('article');
    // Recorrer los elementos y ocultarlos
    articles.forEach(function(article) {
        article.style.display = 'none';
    });
    // Mostrar el elemento con el ID especificado
    document.getElementById(id).style.display = 'block';
}

// Función para validar el formulario de registro
function validarFormulario() {
    var nombreCompleto = document.getElementById('nombre_completo').value;
    var nombreUsuario = document.getElementById('nombre_usuario').value;
    var correo = document.getElementById('correo').value;
    var clave = document.getElementById('clave').value;
    var confirmarClave = document.getElementById('confirmar_clave').value;
    var fechaNacimiento = new Date(document.getElementById('fecha_nacimiento').value);
    var direccionDespacho = document.getElementById('direccion').value;

    // Verificar si algún campo obligatorio está vacío
    if (!nombreCompleto || !nombreUsuario || !correo || !clave || !confirmarClave || !fechaNacimiento) {
        alert('Todos los campos obligatorios deben ser completados.');
        return false;
    }

    // Verificar si el correo electrónico tiene un formato válido
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        alert('El correo electrónico no es válido.');
        return false;
    }

    // Verificar si las contraseñas coinciden
    if (clave !== confirmarClave) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    // Verificar si la contraseña cumple con los requisitos mínimos
    var passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,18}$/;
    if (!passwordRegex.test(clave)) {
        alert('La contraseña debe contener al menos un número, una letra en mayúscula y tener entre 6 y 18 caracteres.');
        return false;
    }

    // Calcular la edad a partir de la fecha de nacimiento
    var today = new Date();
    var age = today.getFullYear() - fechaNacimiento.getFullYear();
    var monthDifference = today.getMonth() - fechaNacimiento.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < fechaNacimiento.getDate())) {
        age--;
    }

    // Verificar si el usuario tiene al menos 13 años
    if (age < 13) {
        alert('Debes tener al menos 13 años para registrarte.');
        return false;
    }

    return true;
}

// Función para manejar el envío del formulario de registro
function enviarRegistro(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    if (validarFormulario()) {
        alert('Formulario enviado correctamente.');
        // Aquí se puede agregar el código para enviar el formulario al servidor
        console.log('Registro enviado');
    }
}

// Función para limpiar el formulario de registro
function limpiarFormulario() {
    document.getElementById('registro').reset(); // Restablecer el formulario
}

// Agregar eventos a los elementos del DOM una vez que el contenido esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento submit al formulario de registro
    document.getElementById('registro').addEventListener('submit', enviarRegistro);
    // Agregar evento click al botón de limpiar formulario
    document.getElementById('registro').querySelector('button[type="reset"]').addEventListener('click', limpiarFormulario);
});
