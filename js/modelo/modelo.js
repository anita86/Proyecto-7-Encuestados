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
  this.votoAgregado = new Evento(this);
  this.recuperarPreguntas();

};

Modelo.prototype = {
  //guia 1 LISTO!! se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let max = 0;
    this.preguntas.forEach(function(preg) {
      if (preg.id > max) {
        max = preg.id;
      }
    });
    return max;
  },


  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {
      'textoPregunta': nombre,
      'id': id,
      'cantidadPorRespuesta': respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //guia 1 LISTO!! Se borra la pregunta seleccionada por su Id
  borrarPregunta: function(id) {
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodo: function() {
    this.preguntas.splice(0, this.preguntas.length);
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  obtenerPosicionArr: function(id) {
    var index = this.preguntas.findIndex(x => x.id === id);
    return index
  },

  editarPregunta: function(id) {
    var index = this.obtenerPosicionArr(id);
    var verificarEdicion = alert("Vas a editar la pregunta '" + (this.preguntas[index].textoPregunta) + "'");
    var nuevaPregunta = prompt("Escriba la nueva pregunta");
    if (nuevaPregunta === null || nuevaPregunta == "") {
      alert("No ingresaste la nueva pregunta!");
    } else {
      this.preguntas[index].textoPregunta = nuevaPregunta;
    }
    this.guardar();
    this.preguntaEditada.notificar();
  },

  agregarVoto: function(pregunta, respuesta) {
    for (var i = 0; i < this.preguntas.length; i++) {
      if (pregunta == this.preguntas[i].textoPregunta) {
        for (var j = 0; j < this.preguntas[i].cantidadPorRespuesta.length; j++) {
          if (this.preguntas[i].cantidadPorRespuesta[j].textoRespuesta == respuesta) {
            this.preguntas[i].cantidadPorRespuesta[j].cantidad++;
            this.guardar();
            this.votoAgregado.notificar();
            return 0;
          }
        }
      }
    }

  },

  //se guardan las preguntas
  guardar: function() {
    localStorage.setItem("preguntasAlmacenadas", JSON.stringify(this.preguntas));
  },
  //Se recuperan las preguntas
  recuperarPreguntas: function() {
    if (localStorage.getItem('preguntasAlmacenadas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntasAlmacenadas'));
    } else {
      localStorage.setItem('preguntasAlmacenadas', JSON.stringify([]));
    }
  },

}
