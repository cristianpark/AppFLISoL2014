/**
 * Stores data on localStorage
 * @param	key: Key to be stored
 * @param	data: Data to be stored
 */
function grabarItem(key, data){
	if(typeof data=="object") {
        data=JSON.stringify(data);
    }
    localStorage.setItem(key, data);
}
//-------------------------------

/**
 * Gets data from localStorage
 * @param	key: Key to get data from
 * @return	data: Data to be stored
 */
function obtenerItem(key){
	var value=localStorage.getItem(key);
    //Assume it is an object that has been stringified
    if(value!=null && value[0] == "{") {
        value=JSON.parse(value);
    }
	return value;
}
//-------------------------------

/**
 * Deletes item from localStorage
 * @param {Object} key
 */
function eliminarItem(key){
	localStorage.removeItem(key);
}
//---------------------------

/**
 * Función para mostrar la página en pantalla completa
 */
function paginaCompleta(){
	var screen = $.mobile.getScreenHeight();
	var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight() - 1 : $(".ui-header").outerHeight();
	var footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight();
	var contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height();
	var content = screen - header - footer - contentCurrent;
	$(".ui-content").height(content);
	
	//$(document).delegate(".ui-content", "scrollstart", false);
}