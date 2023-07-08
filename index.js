//Obtener elementos del dom
const botonSiguiente = document.getElementById("botonSiguiente");
const botonAnterior = document.getElementById("botonAnterior");
const botonBuscar = document.getElementById('buscar');
const buscador = document.getElementById('buscador');
const mensaje = document.getElementById('mensaje');
var contador = 0;
var dataPersonajes = [];



//Funcion principal para cargar los datos
const setPersonajesData = () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((data) => setPjData(data.results));


  const setPjData = (data) => {
    dataPersonajes = data;
    cargarDatos(data);
    asignarEvento();
  };
};


//Cargar datos en pantalla
function cargarDatos (data) {
  var personajesData = {
    image: data[contador].image,
    name: data[contador].name,
    status: data[contador].status,
    species: data[contador].species
  };

  Object.keys(personajesData).forEach(key => {
    if(key === 'image'){
      document.getElementById(key).src = personajesData[key];
    }
      document.getElementById(key).textContent = personajesData[key];
  })


}

//Boton Siguiente
const setSiguiente = () => {
  mensaje.style.display = 'none';
  if (contador >= 0) {
    contador++;
  }
  if (contador > 19) {
    contador = 0;
   
  }

  setPersonajesData();
};

//Boton Anterior
const setAnterior = () => {
  contador--;
  mensaje.style.display = 'none';
  
  if (contador < 0) {
    contador = 19;
  }

  setPersonajesData();
};



//Buscar Personaje
const buscarPersonaje = () =>{

  var buscar = buscador.value.toLowerCase();
  const resultado = dataPersonajes.findIndex((objeto) => objeto.name.toLowerCase().includes(buscar))
if(resultado != -1){
  contador = resultado;
  mensaje.style.display = 'none';
  setPersonajesData();
}else{
  mensaje.style.display = 'flex';
}


}


//Asignar Eventos a los botones
const asignarEvento = () => {
botonSiguiente.addEventListener("click", setSiguiente);
botonAnterior.addEventListener("click", setAnterior);
botonBuscar.addEventListener('click', buscarPersonaje);


}






setPersonajesData();
