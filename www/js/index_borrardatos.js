/**
* Archivo JS para página index.html
* 
* @package	AppFLISoL Manizales 2014
* @author	Cristian Gómez Alvarez <cristianpark@gmail.com>
* @date		Mayo 17 de 2014
*/

/************************************************************************
 *********************** jQuery Functions ******************************* 
 ************************************************************************/

/**
 * Function for assign events first time the app is loaded
 */
function asignarEventos(){
	document.addEventListener("backbutton", onBackKeyDown, false);	//Evento al pulsar botón back
	
	/******** Events ************/
	//Pages
	$("body").on("change", ".slmarcador", grabarPronostico);
	
	mostrarPartidos();
	paginaCompleta();
}
//--------------------------------------------------

//Eliminar acción para botón back
function onBackKeyDown(){
	alert('Has pulsado el botón back');
	
	if(confirm('¿Eliminar datos?')){
		for(var p in partidos){
			eliminarItem("pronosticoU_"+p+"_L");
			eliminarItem("pronosticoU_"+p+"_V");
			
			//Vibrar y mostrar mensaje
			navigator.notification.vibrate(200);
			navigator.notification.alert('Datos eliminados', alertCallback, 'Exito');
		}
	}
	return false;
}

//Función para mostrar los partidos con los pronósticos del usuario
function mostrarPartidos(){
	var cadena='<table class="tbpartidos">';
	var pronosticoL=null;
	var pronosticoV=null;
	var resultadoL=null;
	var resultadoV=null;
	
	for(var p in partidos){
		//Pronósticos del usuario y marcador (si aplica)
		pronosticoL=obtenerItem("pronosticoU_"+p+"_L");
		pronosticoV=obtenerItem("pronosticoU_"+p+"_V");
		resultadoL=partidos[p]['marcadorl'];
		resultadoV=partidos[p]['marcadorv'];
		
		cadena+='<tr>'+
					'<td><div class="bandera '+equipos[partidos[p]['local']]['bandera']+'"></div></td>'+
					'<td>'+equipos[partidos[p]['local']]['nombre']+'</td>'+
					'<td align="center">'+formarSelectPartido(p, 'L', pronosticoL, resultadoL)+'</td>'+
					'<td><div class="bandera '+equipos[partidos[p]['visitante']]['bandera']+'"></div></td>'+
					'<td>'+equipos[partidos[p]['visitante']]['nombre']+'</td>'+
					'<td align="center">'+formarSelectPartido(p, 'V', pronosticoV, resultadoV)+'</td>'+
				'</tr>';
	}
	
	cadena+='</table>';
	
	$("#DVpartidos").html(cadena);
}
//--------------------------------------------

//Formar select partido
function formarSelectPartido(partidoId, equipo, pronostico, resultado){
	if(resultado==null){
		var cadena='<select class="slmarcador" partidoId="'+partidoId+'" equipo="'+equipo+'">';
		var opcionesGoles=[0, 1, 2, 3, 4 , 5, 6];
		
		for(var opcion in opcionesGoles){
			cadena+='<option value="'+opcion+'" '+(opcion==pronostico?'selected':'')+'>'+opcion+'</option>';
		}
		
		cadena+='</select>';
	}
	else{
		var cadena=resultado;
	}
	
	return cadena;
}
//-------------------------------------

//Función para grabar pronóstico
function grabarPronostico(){
	var partidoId=$(this).attr("partidoId");
	var equipo=$(this).attr("equipo");
	var marcador=$(this).val();
	
	grabarItem("pronosticoU_"+partidoId+"_"+equipo, marcador);
	
	//Vibrar y mostrar mensaje
	navigator.notification.vibrate(200);
	navigator.notification.alert('Grabado correctamente', alertCallback, 'Exito');
}
//-----------------------------------------

//Función de callback para alerts
function alertCallback(){
	return true;
}