
/**
 * Todas las funciones del programa. 
 * @module Funciones
 */

/**
 * Valida los campos del formulario asegurándose de que ninguno esté vacío y de que el texto de la cita no tenga más de 160 caractres.  
 * @param {Event} e El evento que se desencadena. 
 */
function validarCampos(e){

    if (e.target.type === 'textarea'){

        // Validar que el campo de cita no tenga más de 160 caracteres. 
        if (e.target.value.length > 160){
            e.target.classList.add('is-invalid');
            validarCita.classList.add('hide');
            btnAgregar.disabled = true; 
        }else{

            e.target.classList.remove('is-invalid');
            if (inputAutor.value !== ''){

                btnAgregar.disabled = false;
            }
        }

        // Validar que el campo no este vacío. 
        if (e.target.value.length > 0){
            validarCita.classList.add('hide');
            e.target.classList.remove('border-danger');
        } else {
            e.target.classList.add('border-danger');
            validarCita.classList.remove('hide');
            validarCita.classList.add('text-danger');
            validarCita.style.fontSize = '.875em';
            btnAgregar.disabled = true;  
        }
        
    }else if (e.target.type === 'text'){

        if (e.target.value.length > 0){
            e.target.classList.remove('is-invalid');
        } else {
            e.target.classList.add('is-invalid');
            btnAgregar.disabled = true;  
        }
    }

    
    if (inputCita.value !== '' && inputAutor.value !== '' && inputCita.value.length <= 160){
    
        btnAgregar.disabled = false;    
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
    
}

/**
 * Crea el HTML para mostran en el DOM por cada objeto generado con el contenido de las citas. 
 */
function crearHtml(){

    limpiarHtml();

    if (citas.length > 0){
        
        citas.forEach(citaObj => {
    
            const {cita, autor, id} = citaObj;
            const citaHtml = `
            <li class="list-group-item d-flex justify-content-between lh-sm mb-2">
                <div>
                    <blockquote class="blockquote">
                        <p>${cita}</p>
                    </blockquote>
                    <figcaption class="blockquote-footer">
                        <cite title="Source Title">${autor}</cite>
                    </figcaption>
                </div>
                <button onclick="borrarCita(${id})" type="button" class="btn-close float-end" data-bs-toggle="tooltip" title="Eliminar"></button>
            </li>`;

            const contenedorCita     = document.createElement('div');
            contenedorCita.innerHTML = citaHtml;
            
            listaCitas.appendChild(contenedorCita);            
            
        });
    }
    
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