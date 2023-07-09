//Obtener elementos del dom
const botonSiguiente = document.getElementById("botonSiguiente");
const botonAnterior = document.getElementById("botonAnterior");
const botonBuscar = document.getElementById('buscar');
const buscador = document.getElementById('buscador');
const mensaje = document.getElementById('mensaje');
var contador = 0;
var dataPersonajes = [];
var url = "https://rickandmortyapi.com/api/character";
var contadorPaginas = 1;



//Funcion principal para cargar los datos
const setPersonajesData = () => {
  
  url = "https://rickandmortyapi.com/api/character/?page=" + contadorPaginas;

  fetch(url,{method:'GET'})

    .then((res) => res.json())
    .then((data) => setPjData(data.results, data));


  const setPjData = (resultado, data) => {
    console.log(data);
    dataPersonajes = resultado;
    cargarDatos(resultado);
    asignarEvento();
  };
};


//Cargar datos en pantalla
function cargarDatos (data) {
  var personajesData = {
    image: data[contador].image,
    name: data[contador].name,
    status: data[contador].status,
    species: data[contador].species,
    location: data[contador].location.name
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
  if(contadorPaginas==42){
    contadorPaginas=1;
    contador=0;
  }

  if (contador > 19) {
    contador = 0;
    contadorPaginas ++;
   
  }

  setPersonajesData();
};

//Boton Anterior
const setAnterior = () => {
  contador--;
  mensaje.style.display = 'none';
  
  if (contador < 0) {
    if (contadorPaginas == 1){
      contadorPaginas = 42;
      contador = 5;
    }else{
      contador = 19;
      contadorPaginas--;
      console.log(contadorPaginas);
    }

    
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
