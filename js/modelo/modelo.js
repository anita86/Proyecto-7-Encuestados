/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.verificarLocalStorage();

};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
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

  //Se borra la pregunta seleccionada por su Id
  borrarPregunta : function(id){
    // var preguntasFiltradas = this.preguntas.filter(pregunta => pregunta.id !== id);
    // this.preguntas = preguntasFiltradas;
    // this.guardar();
    // this.preguntaEliminada.notificar();
    //recorrer array de respuestas, identificar al id q quiero borrar y hacerlo con splice
  //   var index = this.preguntas.indexOf(id,0);
  //   this.preguntas.splice(index,1);
  //   this.guardar();
  //   this.preguntaEliminada.notificar();
  // }
  this.preguntas = this.preguntas.filter(function(pregunta) {
    return pregunta.id != id;
    })
   this.guardar();
   this.preguntaEliminada.notificar();
}
}
