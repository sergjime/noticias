var contador;
var posicion;
var desplegar;

var rowContador;
var rowPosicion;


window.test = "prueba";

window.onload = function() {
    contador = 1;
    posicion = 5;
    desplegar = true;
    rowPosicion = 0;
    rowContador = 0;
}

function pintar(json) {
    $.each(json, function(key, val) {
        if (rowContador == 2) {
            rowPosicion++;
            $("#nuevoContenido").append("<div id='nuevoContenido" + rowPosicion + "' class='row'></div>");
            rowContador = 0;
        }
        $("#nuevoContenido" + rowPosicion).append("<div id='box_" + posicion + "' class='col-sm-4'></div>");
        $("#box_" + posicion).append("<div id='noticia" + posicion + "' class='col-sm-12'></div>");
        $("#noticia" + posicion).append("<div id='thumbnail" + posicion + "' class='thumbnail'></div>");
        $("#thumbnail" + posicion).append("<p><img src='" + val.Imagen + "' alt='noticia" + posicion + "' /> </p>");
        $("#thumbnail" + posicion).append("<p id='titulo" + posicion + "'> <strong>" + val.Titulo + "</strong></p>");
        $("#thumbnail" + posicion).append("<p id='descripcion" + posicion + "'>" + val.Descipcion + "</p>");
        posicion++;
        rowContador++;
        if (key == 3) {
            desplegar = false;
        }
    });
}

function cargaJson() {
    if (desplegar) {
        $.getJSON("https://rawgit.com/sergjime/noticias/master/json/json" + contador + ".json", function(jsonObject) {
            console.log(jsonObject[0]);
            pintar(jsonObject);
        });
    }
}

function masCarga() {
    if (contador == 1) {
        desplegar = true;
        cargaJson(contador);

    } else if (contador == 2) {
        desplegar = true;
        cargaJson(contador);
    }
    contador++;
}

$(document).ready(function() {

	$("#arriba").click(function(){
    	$("html, body").animate({scrollTop:"0px"});
	});
    var win = $(window);
    win.scroll(function() {
        if (($(document).height() - win.height()) - 1.5 <= win.scrollTop()) {
            masCarga();
        }
        $("button").click(function(){
     		masCarga();
    	});
    }); 
});