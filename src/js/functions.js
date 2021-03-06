
/**
 * Todas las funciones del programa. 
 * @module Funciones
 */

/**
 * Valida los campos del formulario asegurándose de que ninguno esté vacío y de que el texto de la cita no tenga más de 160 caractres.  
 * @param {Event} e El evento que se desencadena. 
 */
function validacion(e){

    const {cita, autor} = expresiones;

    switch (e.target.name) {
        case "cita":
            validarCampo(cita, e.target, 'cita');
        break;
        case "autor":
            validarCampo(autor, e.target, 'autor');
        break;
    }
        
}

/**
 * Valida cada campo de formulario contra su respectiva expresión regular. 
 * @param {RegExp} expresion Expresion regular para validar cada campo del formulario.
 * @param {HTMLElement} input Elemento de formulario donde se desencadena el evento. 
 * @param {String} campo Nombre del campo del formulario a evaluar. 
 */
function validarCampo(expresion, input, campo){

    if (input.value === '' || !expresion.test(input.value)){
        input.classList.add('is-invalid');
        input.classList.remove('is-valid'); 
        campos[campo] = false;
    }else{
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        campos[campo] = true;
    }
    
    const {cita, autor} = campos; 

    if (cita && autor){
        btnAgregar.disabled = false; 
    }else{
        btnAgregar.disabled = true; 
    }

}

/**
 * Crea objetos con cada cita agregada y los incluye en el arreglo de citas. 
 * @param {Event} e El evento que se desencadena. 
 */
function agregarCita(e){

    e.preventDefault();

    const cita = inputCita.value;
    const autor = inputAutor.value;

    const citaObj = {
        id: Date.now(),
        cita,
        autor
    }

    citas = [...citas, citaObj];

    crearHtml();

    inputCita.value = '';
    inputAutor.value = '';
    btnAgregar.disabled = true;  
    inputCita.classList.remove('is-valid');
    inputAutor.classList.remove('is-valid');
    
}

/**
 * Crea el HTML para mostran en el DOM por cada objeto generado con el contenido de las citas. 
 */
function crearHtml(){

    limpiarHtml();

    if (citas.length > 0){
        
        citas.forEach(citaObj => {
            
            // ID aleatorio para capturar los elementos de lista que se generan dinamicamente.  
            let idRandom        = 'li-' + Math.floor(Math.random() * 100000);

            // Creación del botón para eliminar las citas. 
            let btnEliminar     = document.createElement('button');
            btnEliminar.classList.add('btn-close', 'float-end');
            btnEliminar.onclick = () => {
                borrarCita(id);
            };         
    
            const {cita, autor, id} = citaObj;
            const citaHtml = `
            <li id="${idRandom}" class="list-group-item d-flex justify-content-between lh-sm mb-2">
                <div>
                    <blockquote class="blockquote">
                        <p>${cita}</p>
                    </blockquote>
                    <figcaption class="blockquote-footer">
                        <cite title="Source Title">${autor}</cite>
                    </figcaption>
                </div>
            </li>`;

            let contenedorCita       = document.createElement('div');
            contenedorCita.innerHTML = citaHtml;
            listaCitas.appendChild(contenedorCita);     
            let elementoLista        = document.querySelector(`#${idRandom}`);
            elementoLista.appendChild(btnEliminar);
            
        });
    }
    
    // Contador para la cantidad de citas. 
    contador = citas.length;
    contadorCitas.innerText = contador;

    cargarLocalStorage();

}

/**
 * Carga el contenido del arreglo de citas en el localStorage.
 */
function cargarLocalStorage() {

    localStorage.setItem('citas', JSON.stringify(citas));
    localStorage.setItem('contadorCitas', contador);
}

/**
 * Borra la cita seleccionada y devuelve un nuevo con array sin la cita eliminada. 
 * @param {number} id El identificador de cada cita, asociado al botón para eliminarla.
 */
function borrarCita(id) {
    
    citas = citas.filter(cita => cita.id != id);
    contador = citas.length;
    contadorCitas.innerText = contador;

    crearHtml();

}

/**
 * Limpia el contenido de las citas del DOM.
 */
function limpiarHtml(){

    while (listaCitas.firstChild){
        listaCitas.removeChild(listaCitas.firstChild);
    }
    
}