function preencheData(palavra,campo,event){
	//Não computa barras
	var tam = palavra.length;
	if(event.keyCode == 111){
		form.elements[campo].value = palavra.substring(0,tam-1);
		palavra = form.elements[campo].value;
	}
	else if((palavra.length == 6 || palavra.length == 3) && palavra.substring(palavra.length-1,palavra.length) != "/"){
		form.elements[campo].value = palavra.substring(0,tam-1)+"/"+palavra.substring(tam-1,tam);
		palavra = form.elements[campo].value;
	}
	//Coloca as barras nos lugares corretos
	if((palavra.length == 2  || palavra.length==5) && event.keyCode != 8){
			form.elements[campo].value = form.elements[campo].value+'/';
	}
	//Coloca barra se até a ultima barra colocada for apagada
}