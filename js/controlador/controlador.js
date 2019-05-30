/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
//guia 1 LISTO!!
  borrarPregunta: function(id) {
      this.modelo.borrarPregunta(id);
  },
  borrarTodo: function() {
      this.modelo.borrarTodo();
  },

  editarPregunta: function(id) {
      this.modelo.editarPregunta(id);
  },

};
