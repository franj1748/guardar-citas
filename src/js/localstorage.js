/* 
    La propiedad de sólo lectura localStorage permite acceder al objeto local Storage; los datos persisten almacenados entre las diferentes sesiones de navegación. localStorage es similar a sessionStorage. La única diferencia es que, mientras los datos almacenados en localStorage no tienen fecha de expiración, los datos almacenados en sessionStorage son eliminados cuando finaliza la sesion de navegación - lo cual ocurre cuando se cierra la página.
*/

// Para almacenar datos con Local Storage se utiliza el método setItem que funciona con un par Llave/Valor.
localStorage.setItem('nombre', 'Juan');

// sessionStorage, tiene exactamente la misma sintaxis. 
sessionStorage.setItem('nombre', 'Pablo');

// Local Storage solo soporta strings, no soporta arrays ni objetos pero puedes almacenarlos convirtiendolos a string.
const producto = {
    nombre: 'Monitor 24"',
    precio: 300
}

// El método stringify del objeto JSON, convierte arreglos y objetos en string para poderlos almacenar en LocalStorage. 
const productoString = JSON.stringify(producto);
localStorage.setItem('productoJSON', productoString);

// Lo mismo con un array pero puede convertirse a un string directamente dentro de la creación del dato en localStorage, sin crear una nueva variable. 
 const meses = ['Enero', 'Febrero', 'Marzo'];
localStorage.setItem('meses',  JSON.stringify(meses));


// Para obtener los datos almacenados en localStorage, se utiliza el método getItem, pasandole como parámetro solamente la llave del valor que se quiere obtener. 
const nombre = localStorage.getItem('nombre');
console.log(nombre);

// Se obtiene el string guardado anteriormente pero se transforma de nuevo a un objeto con el método parse del objeto JSON. 
const productoJSON = localStorage.getItem('productoJSON');
console.log(typeof productoJSON); // Aquí será un string. 
console.log( JSON.parse( productoJSON )); // Aquí será un objeto.

// Aquí se obtiene el string con los meses y se transforma en la misma línea a un array. 
const mesesNuevo = JSON.parse( localStorage.getItem('meses'));
console.log(meses);

// Con esta sintaxis se elimina un elemento del localStorage, a través de su llave. 
localStorage.removeItem('nombre');

// La única funcionalidad que faltaría en localStorage, sería la de actualizar un registro. Aunque no existe tal cosa, puede hacerse lo siguiente. 
const mesesArray = JSON.parse(localStorage.getItem('meses'));
mesesArray.push('nuevo Mes');
localStorage.setItem('meses', JSON.stringify(mesesArray))
console.log(mesesArray);