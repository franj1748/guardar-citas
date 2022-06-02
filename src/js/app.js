// Variables
/**
 * Contenedor donde se agrega el texto de la cita.  
 * @type {HTMLElement}
 */
const inputCita   = document.querySelector('#cita');
/**
 * Contenedor donde se agrega el autor de la cita.  
 * @type {HTMLElement}
 */
const inputAutor  = document.querySelector('#autor');
/**
 * Botón para agregar una cita.  
 * @type {HTMLElement}
 */
const btnAgregar  = document.querySelector('#agregarCita');
/**
 * Mensaje de error para el campo de Cita si está vacío.  
 * @type {HTMLElement}
 */
const validarCita = document.querySelector('#validarCita');
/**
 * Contenedor de las citas.  
 * @type {HTMLElement}
 */
 const listaCitas = document.querySelector('#listaCitas');
 /**
  * Contenedor del contador de la cantidad de citas agregadas. 
  * @type {HTMLElement}
  */
 const contadorCitas = document.querySelector('.rounded-pill');
/**
 * Arreglo que contendrá todas las citas que se vayan agregando. 
 * @type {Array}
 */
let citas         = [];
/**
 * Contenido del contador de citas agregadas. 
 * @type {number}
 */
let contador = 0;

/**
 * Contiene las expresiones regulares contra las que se comprobaran los valores de cada input. 
 * @type {Object}
 */
const expresiones = {
	cita  : /^[a-zA-ZÀ-ÿ\s\d\_\-]{1,160}$/, // Letras y números,  pueden llevar acentos. De 1 a 160 caracteres. 
	autor : /^[a-zA-ZÀ-ÿ\s\d\_\-]{1,60}$/ // Letras y números, pueden llevar acentos. De 1 a 60 caracteres.
}

/**
 * Contiene una declaración booleana para cada campo de formulario, que cambiará a true si el campo pasa la validación correctamente.
 * @type {Object} 
 */
 const campos = {
	cita  : false,
	autor : false
}

// Listeners 
document.addEventListener('DOMContentLoaded', () => {

    btnAgregar.disabled = true;    

    // Guarda el contenido de localStorage en el arreglo de citas para mostrarlo en el DOM al cargar la página. Si no hay elementos, se mantiene como un arreglo vacío. 
    citas = JSON.parse(localStorage.getItem('citas')) || [];

    crearHtml();
    
});

inputCita.addEventListener('keyup', validacion);
inputAutor.addEventListener('keyup', validacion);
inputCita.addEventListener('blur', validacion);
inputAutor.addEventListener('blur', validacion);
btnAgregar.addEventListener('click', agregarCita);
