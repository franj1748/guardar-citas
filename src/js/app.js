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

// Listeners 
document.addEventListener('DOMContentLoaded', () => {

    btnAgregar.disabled = true;    

    // Guarda el contenido de localStorage en el arreglo de citas para mostrarlo en el DOM al cargar la página. Si no hay elementos, se mantiene como un arreglo vacío. 
    citas = JSON.parse(localStorage.getItem('citas')) || [];

    crearHtml();
    
    // Inicia características de Bootstrap: tooltip.
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
});

inputCita.addEventListener('input', validarCampos);
inputAutor.addEventListener('input', validarCampos);
btnAgregar.addEventListener('click', agregarCita);
