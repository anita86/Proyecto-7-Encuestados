/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
//guia 1 LISTO!!
  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
  });
  //guia 2: borrar todas las preguntas, editar una pregunta, agregar los votos, . Local storage
  this.modelo.preguntasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
      contexto.reconstruirLista();
  });
  
  this.modelo.votoSumado.suscribir(function() {
      contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //guia 1 LISTO!! llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    //completar
    //guia 1 LISTO!!asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var nuevoItem = $('<li></li>').addClass("list-group-item").attr('id', pregunta.id);
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var pregunta = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar //guia 1 LISTO!!
      var respuesta = $(this).val();

      respuestas.push({ 'textoRespuesta' : respuesta,'cantidad' : 0});
      })

      if(respuestas[0].textoRespuesta == ''){
        alert('Escribi una pregunta con sus respuestas')
        return
      }
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(pregunta, respuestas);
    });

    //asociar el resto de los botones a eventos
    //guia 1 LISTO!! Registro boton para borrar la pregunta
    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(isNaN(id)) {
        alert("Elegi que pregunta queres borrar");
      } else {
        contexto.controlador.borrarPregunta(id)
      }
    });

    e.borrarTodo.click(function() {
      alert('Estás a punto de borrar todas las preguntas');
      contexto.controlador.borrarTodo();
    });

    e.botonEditarPregunta.click(function(id) {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(isNaN(id)) {
          alert("Elegi la pregunta que querés editar");
          return
      }
      contexto.controlador.editarPregunta(id);
    });

  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },

};
