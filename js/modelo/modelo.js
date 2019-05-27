/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.preguntaEditada = new Evento(this);

  this.verificarLocalStorage();

};

Modelo.prototype = {
  //guia 1 LISTO!! se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var maxId = -1;
    for (var i = 0; i < this.preguntas.length; ++i){
      if (this.preguntas[i].id > maxId)
        maxId = this.preguntas[i].id;
      }
    return maxId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  verificarLocalStorage: function(){
    if (localStorage.getItem('preguntas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },

  reiniciarLocalStorage: function(){
    localStorage.setItem('preguntas', JSON.stringify([]));
  },

  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  //guia 1 LISTO!! Se borra la pregunta seleccionada por su Id
  borrarPregunta : function(id){
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodo : function(){
    this.preguntas.splice(0, this.preguntas.length);
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  editarPregunta: function(id) {
  var nuevaPregunta = prompt ("Escriba su pregunta");
  var index =  this.encontrarIndex(this.preguntas[].id);
  this.preguntas[index].textoPregunta = nuevaPregunta;
  this.guardar();
  this.preguntaEditada.notificar();
},

encontrarIndex: function(indice) {
  for(var i=0; i<this.preguntas.length; i++){
    if(indice==this.preguntas[i].id)
    {
      return i;
    }
  }
},

}
