// Seta cookies

var timeoutWs;
var _paq = _paq || [];
var _tokenHorus = _tokenHorus || [];

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/aapf/";
}	

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/gm, '');
  };
}

// Recupera cookies
function getCookie(c_name)
{
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1)
	    { 
	    c_start=c_start + c_name.length+1 
	    c_end=document.cookie.indexOf(";",c_start)
	    if (c_end==-1) c_end=document.cookie.length
	    return unescape(document.cookie.substring(c_start,c_end))
	    } 
	  }
	return ""
}	

// Reseta o o cookie para abrir o menu no Acesso R�pido
function iniciaAcessoRapido(){
	setCookie("idSubMenu","4",1);
	setCookie("idSubMenuTrans","1",1);
}

function getMensagemErro()
{
	return mensagemErro;
}

// Redireciona o cliente para URL do banner
// Caso URL = https, mantenho-o na mesma janela;
// Caso URL = http, abro nova janela chamada Portal.
function redirecionamentoInteligente(){
	url = document.getElementById('bannerLinkId').href;
	if (url.indexOf("https")>-1){
		location.href = url;
	} else {
		window.open( url , 'Portal');
	}
}

// Javascript para impedir duplo clique
var submeteuFormulario = 0;
function controleDuploClique() {
	
	if($("html").hasClass("novoapf")){
		return true;
	}
	
	if(submeteuFormulario=="1") {
		return false;
	}
	submeteuFormulario = "1";
	return true;
}

// Abre janela de ajuda
function janelaAjuda(url)
{
	janela = window.open( url , 'Ajuda', 'height=500,width=600,status=yes,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=yes');
	if (window.focus) {
		janela.focus();
	}
}

// Script que mostra ou esconde um elemento
function mostraEsconde(layer) {
	if (document.getElementById(layer).style.display != "none") {
		document.getElementById(layer).style.display = "none";
	} else {
		document.getElementById(layer).style.display = "";
	}
}

// Script que esconde um elemento
function escondeLayer(layer) {
	document.getElementById(layer).style.display="none";
}

// Script que mostra um elemento
function mostraLayer(layer) {
	document.getElementById(layer).style.display="";
}

// Script que abre popup
var janela;
function popup(url, target, features) {
	newwindow = window.open(url, target, features);
	if (window.focus) {
		newwindow.focus();
	}
	return false;
}

function popupAlertaRedirecionamento(url, target, features) {
	newwindow = window.open(url, target, features);
	if (window.focus) {
		newwindow.focus();
	}
	// return false;
}

// Formata o campo CEP
function formataCEP(campo){
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if ( tam <= 3 )
		campo.value = vr;
	if ( tam > 3 ) 
		campo.value = vr.substr(0, tam-3 ) + '-' + vr.substr(tam-3, tam);
}

// Limpa os campos da tela
function limpa(){
	var elements = document.forms.aapf.elements;
	for (i = 0; i < elements.length; i++) {
		if (elements[i].type == 'text' || elements[i].type == 'text-area'
				|| elements[i].type == 'select-one' || elements[i].type == 'radio'
				|| elements[i].type == 'checkbox' || elements[i].type == 'password'
				|| elements[i].type == 'textarea' || elements[i].type == 'tel' || elements[i].type == 'number'){    
			elements[i].value='';
		}
	}
	if(document.tclJava)
	{
		document.tclJava.limpa();
	}
}
// Limpa os campos da tela
function limpaTodosMenos(nome1, nome2, nome3){
	var elements = document.forms.aapf.elements;
	for (i = 0; i < elements.length; i++) {
		if(elements[i].name != nome1 && elements[i].name != nome2 && elements[i].name != nome3){
			if (elements[i].type == 'text' || elements[i].type == 'text-area'
					|| elements[i].type == 'select-one' || elements[i].type == 'radio'
					|| elements[i].type == 'checkbox' || elements[i].type == 'password'
					|| elements[i].type == 'textarea' || elements[i].type == 'tel'){
				elements[i].value='';
			}
		}
	}
	if(document.tclJava)
	{
		document.tclJava.limpa();
	}
}

function limpaEspecifico(text,textarea,selectone,radio,checkbox,password,submit){

	var elements = document.forms.aapf.elements;
	
	for (i = 0; i < elements.length; i++) {
	
		if(text == 'true'){
			if(elements[i].type == 'text'){
				elements[i].value='';
			}
		}
		if(textarea == 'true'){
			if(elements[i].type == 'text-area'){
				elements[i].value='';
			}
		}
		if(selectone == 'true'){
			if(elements[i].type == 'select-one'){
				elements[i].value='';
			}
		}
		if(radio == 'true'){
			if(elements[i].type == 'radio'){
				elements[i].value='';
			}
		}
		if(checkbox == 'true'){
			if(elements[i].type == 'checkbox'){
				elements[i].value='';
			}
		}
		if(password == 'true'){
			if(elements[i].type == 'password'){
				elements[i].value='';
			}
		}
	}
}

function limpaEspecifico867(text,textarea,selectone,radio,checkbox,password,submit){

	var elements = document.forms.aapf.elements;
	
	for (i = 0; i < elements.length; i++) {
	
		if(text == 'true'){
			if(elements[i].type == 'text'){
				elements[i].value='';
			}
		}
		if(textarea == 'true'){
			if(elements[i].type == 'text-area'){
				elements[i].value='';
			}
		}
		if(selectone == 'true'){
			if(elements[i].type == 'select-one'){
				elements[i].value='';
			}
		}
		if(radio == 'true'){
			if(elements[i].type == 'radio'){
				elements[i].value='';
			}
		}
		if(checkbox == 'true'){
			if(elements[i].type == 'checkbox'){
				elements[i].value='';
			}
		}
		if(password == 'true'){
			if(elements[i].type == 'password'){
				elements[i].value='';
			}
		}
	}
	$("#camposAdicionais").hide("slow");	
}



function limpaEspecificoPoupanca(text,textarea,selectone,radio,checkbox,password,submit){
 	var elements = document.forms.aapf.elements;

	for (i = 0; i < elements.length; i++) {
  
		if(text == 'true'){
			  
			if(elements[i].type == 'text'){
		 		
		 		if(elements[i].name != 'dataPagamento')
				{	
				   elements[i].value='';
				}   
			}
		}
		if(textarea == 'true'){
			if(elements[i].type == 'text-area'){
				elements[i].value='';
			}
		}
		if(selectone == 'true'){
			if(elements[i].type == 'select-one'){
				elements[i].value='';
			}
		}
		if(radio == 'true'){
			if(elements[i].type == 'radio'){
				elements[i].value='';
			}
		}
		if(checkbox == 'true'){
			if(elements[i].type == 'checkbox'){
				elements[i].checked=false;
			}
		}
		if(password == 'true'){
			if(elements[i].type == 'password'){
				elements[i].value='';
			}
		}
	}
}


function limpaEspecificoVariacao(text,textarea,selectone,radio,checkbox,password,submit){
 	var elements = document.forms.aapf.elements;
	for (i = 0; i < elements.length; i++) {
  
		if(text == 'true'){
			  
			if(elements[i].type == 'text'){
		 		
		 		if(elements[i].name != 'dataPagamento' && elements[i].name != 'variacao')
				{	
				   elements[i].value='';
				}   
			}
		}
		if(textarea == 'true'){
			if(elements[i].type == 'text-area'){
				elements[i].value='';
			}
		}
		if(selectone == 'true'){
			if(elements[i].type == 'select-one'){
				elements[i].value='';
			}
		}
		if(radio == 'true'){
			if(elements[i].type == 'radio'){
				elements[i].value='';
			}
		}
		if(checkbox == 'true'){
			if(elements[i].type == 'checkbox'){
				elements[i].checked=false;
			}
		}
		if(password == 'true'){
			if(elements[i].type == 'password'){
				elements[i].value='';
			}
		}
	}
}	

// Formata o campo Agencia
function formataAgenciaConta(campo){
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;
	if ( tam <= 1 )
		campo.value = vr;
	if ( tam > 1 ) 
		campo.value = vr.substr(0, tam-1 ) + '-' + vr.substr(tam-1, tam); 
}

// Formata data no padr?o DDMMAAAA
function formataData(campo){
	campo.value = filtraCampo(campo);
	var vr = LimparMoeda(campo.value,"0123456789");  
	tam = vr.length; 
	if ( tam <= 1 ) 
		campo.value = vr;
	if ( tam > 2 && tam < 5 )
		campo.value = vr.substr( 0, tam - 2  ) + '/' + vr.substr( tam - 2, tam );
	if ( tam >= 5 && tam <= 10 )
		campo.value = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 2 ) + '/' + vr.substr( 4, 4 ); 

}

// Formata hora no padrao HH:MM
function formataHora(campo,teclapres) {
	var tecla = teclapres.keyCode;
	campo.value = filtraCampo(campo);
	vr = campo.value;
	vr = vr.replace( ".", "" );
	vr = vr.replace( ":", "" );
	vr = vr.replace( ":", "" );
	tam = vr.length + 1;

	if ( tecla != 9 && tecla != 8 ){
		if ( tam > 2 && tam < 5 )
			campo.value = vr.substr( 0, tam - 2  ) + ':' + vr.substr( tam - 2, tam );
	}
}

// Formata o campo valor
function formataValor(campo) {
	campo.value = filtraCampoValor(campo); 
	vr = campo.value;
	tam = vr.length;

	if ( tam <= 2 ){ 
 		campo.value = vr ; }
 	if ( (tam > 2) && (tam <= 5) ){
 		campo.value = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 6) && (tam <= 8) ){
 		campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 9) && (tam <= 11) ){
 		campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 12) && (tam <= 14) ){
 		campo.value = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 15) && (tam <= 18) ){
 		campo.value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;}
 		
}

function formataValorSemInput(campo) {
	vr = campo;
	tam = vr.length;

	if ( tam <= 2 ){ 
 		campo = vr ; }
 	if ( (tam > 2) && (tam <= 5) ){
 		campo = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 6) && (tam <= 8) ){
 		campo = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 9) && (tam <= 11) ){
 		campo = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 12) && (tam <= 14) ){
 		campo = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 15) && (tam <= 18) ){
 		campo = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;}
 	
 	return campo;
 		
}

function formataValorNovoSemDecimais(campo) {
	campo.value = formataNumerico(campo);
	vr = tiraZeros(campo.value);
	tam = vr.length;

 	if ( tam <= 3 ){
 		campo.value = vr.substr( 0, tam); 
 	}
 	if ( (tam > 3) && (tam <= 6) ){
 		campo.value = vr.substr( 0, tam - 3 ) + '.' + vr.substr( tam - 3, tam ) ;
 	}
 	if ( (tam > 6) && (tam <= 9) ){
 		campo.value = vr.substr( 0, tam - 6 ) + '.' + vr.substr( tam - 6, 3 ) + '.' + vr.substr( tam - 3, 3 );
 	}
 	if ( (tam > 9) && (tam <= 12) ){
 		campo.value = vr.substr( 0, tam - 9 ) + '.' + vr.substr( tam - 9, 3 ) + '.' + vr.substr( tam - 6, 3 ) + '.' + vr.substr( tam - 6, 3 );
 	}
 	if ( (tam > 12) && (tam <= 15) ){
 		campo.value = vr.substr( 0, tam - 12 ) + '.' + vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '.' + vr.substr( tam - 6, 3 ) + '.' + vr.substr( tam - 3, 3 );
 	}
 	if ( (tam > 15) && (tam <= 18) ){
 		campo.value = vr.substr( 0, tam - 15 ) + '.' + vr.substr( tam - 15, 3 ) + '.' + vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '.' + vr.substr( tam - 3, 3 );
 	} 	
 	
}

function formataValorNovo(campo) {
	campo.value = formataNumerico(campo);
	vr = tiraZeros(campo.value);
	tam = vr.length;
	if ((tam == 1) && (vr == 0)){
 		campo.value = ""; 
 	} else {
 		campo.value = "0,0" + vr ; 
 	}
 	if ( tam == 2){
 		campo.value = "0," + vr ; 
 	}		
 	if ( (tam > 2) && (tam <= 5) ){
 		campo.value = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 6) && (tam <= 8) ){
 		campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 9) && (tam <= 11) ){
 		campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 12) && (tam <= 14) ){
 		campo.value = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 15) && (tam <= 18) ){
 		campo.value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;}
}

function formataValorNovo(campo) {
	campo.value = formataNumerico(campo);
	vr = tiraZeros(campo.value);
	tam = vr.length;
	if ((tam == 1) && (vr == 0)){
 		campo.value = ""; 
 	} else {
 		campo.value = "0,0" + vr ; 
 	}
 	if ( tam == 2){
 		campo.value = "0," + vr ; 
 	}		
 	if ( (tam > 2) && (tam <= 5) ){
 		campo.value = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 6) && (tam <= 8) ){
 		campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 9) && (tam <= 11) ){
 		campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 12) && (tam <= 14) ){
 		campo.value = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 15) && (tam <= 18) ){
 		campo.value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;} 	
}

//Formata o campo valor
function formataValorLabel(campo) {
	var vr = campo;
	var tam = campo.length;

	if ( tam <= 2 ){ 
 		campo = vr ; }
 	if ( (tam > 2) && (tam <= 5) ){
 		campo = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 6) && (tam <= 8) ){
 		campo = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 9) && (tam <= 11) ){
 		campo = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 12) && (tam <= 14) ){
 		campo = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 15) && (tam <= 18) ){
 		campo = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;}
 	return campo;
 		
}

//Tira zeros a esquerda
function tiraZeros(valor){
    var tam=valor.length;
    var cont=0;
    var comzero = new String;
    for(var i=0;i<tam;i++){
        if (valor.substring(i,i+1) == 0) {
            comzero = comzero;
            if (cont == 1){
                comzero = comzero + valor.substring(i,i+1);
            }
        } else {
            comzero = comzero + valor.substring(i,i+1);
            cont = 1;        
        }
   	}
   	return (comzero=="")?"0":comzero;
   }


//Formata o campo valor apenas na exibi��o
function formataValorExibicao(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if ( tam == 1 ){
		campo.value = '0,0' + vr; }
	if ( tam == 2 ){
		campo.value = '0,' + vr; }
 	if ( (tam > 2) && (tam <= 5) ){
 		campo.value = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 6) && (tam <= 8) ){
 		campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 9) && (tam <= 11) ){
 		campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 12) && (tam <= 14) ){
 		campo.value = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 15) && (tam <= 18) ){
 		campo.value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;}
}

// Formata o campo valor
function formataNumerico(campo) {

	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;
}

// limpa todos os caracteres especiais do campo solicitado
function filtraCampo(campo){
	var s = "";
	var cp = "";
	vr = campo.value;
	tam = vr.length;
	for (i = 0; i < tam ; i++) {  
		if (vr.substring(i,i + 1) != "/" && vr.substring(i,i + 1) != "-" && vr.substring(i,i + 1) != "."  && vr.substring(i,i + 1) != "," ){
		 	s = s + vr.substring(i,i + 1);}
	}
	campo.value = s;
	return cp = campo.value
}
//limpa todos os caracteres especiais do campo solicitado
function filtraCampoValor(campo){
	var s = "";
	var cp = "";
	vr = campo.value;
	tam = vr.length;
	for (i = 0; i < tam ; i++) {  
		if (vr.substring(i,i + 1) >= "0" && vr.substring(i,i + 1) <= "9"){
		 	s = s + vr.substring(i,i + 1);}
	} 
	campo.value = s;
	return cp = campo.value
}
		
// Seta o ajuda do campo no campo <SPAN>
function setaTextoAjuda(txt) {
	if(document.getElementById('textoAjuda')) document.getElementById('textoAjuda').innerHTML = txt + '&nbsp;' ;
}



function getTeclaPressionada(evt)
{
	if(typeof(evt)=='undefined')
		evt = window.event;
	return(evt.keyCode ? evt.keyCode : (evt.which ? evt.which : evt.charCode));
}

// teclas 63230 a 63240 = safari
function isTeclaEspecial(key)
{
	return key<32||(key>=35&&key<=36)||(key>=37&&key<=40)||key==46||(key>=63230&&key<=63240);
}

function isTeclaRelevante(key)
{
	return (key == 8)||(key == 46)||(key == 88)||(key>=48&&key<=57)||(key>=96&&key<=105);
}

function isCaracterRelevante(key)
{
	return (key == 88)||(key == 120)||(key>=48&&key<=57);
}

function isCopiaCola(ctrlKey, key)
{
	return ctrlKey && (key == 118 || key == 86 || key == 99 || key == 67);
}


function filtraTeclas(evt)
{
	var key = getTeclaPressionada(evt);
	if(isTeclaEspecial(key) || isTeclaRelevante(key) || isCopiaCola(evt.ctrlKey, key))
		return true;
	StopEvent(evt);
	return false;
}

function filtraCaracteres(evt)
{
	var key = getTeclaPressionada(evt);
	if(isTeclaEspecial(key) || isCaracterRelevante(key) || isCopiaCola(evt.ctrlKey, key))
		return true;
	StopEvent(evt);
	return false;
}

function isTeclaNumerica(key) {
	return ((key > 47 && key < 58) || (key > 95 && key < 106));
}

function isTeclaNumericaIPad(key) {
	return ((key > 47 && key < 58));
}

function asciiToNumber(code) {
	var retorno = "";
	switch (code)
	{
	   case 48 :
		   retorno = "0";
		   break;
	   case 49 :
		   retorno = "1";
		   break;
	   case 50 :
		   retorno = "2";
		   break;
	   case 51 :
		   retorno = "3";
		   break;
	   case 52 :
		   retorno = "4";
		   break;
	   case 53 :
		   retorno = "5";
		   break;
	   case 54 :
		   retorno = "6";
		   break;
	   case 55 :
		   retorno = "7";
		   break;
	   case 56 :
		   retorno = "8";
		   break;
	   case 57 :
		   retorno = "9";
		   break;
	   case 96 :
		   retorno = "0";
		   break;
	   case 97 :
		   retorno = "1";
		   break;
	   case 98 :
		   retorno = "2";
		   break;
	   case 99 :
		   retorno = "3";
		   break;
	   case 100 :
		   retorno = "4";
		   break;
	   case 101 :
		   retorno = "5";
		   break;
	   case 102 :
		   retorno = "6";
		   break;
	   case 103 :
		   retorno = "7";
		   break;
	   case 104 :
		   retorno = "8";
		   break;
	   case 105 :
		   retorno = "9";
		   break;		   
	} 
	return retorno;
}

function removerSubString(str,posicaoInicial,posicaoFinal){
	if(posicaoInicial == posicaoFinal){
		if( posicaoInicial == 1){
			return str.substring(1);
		}else if(posicaoInicial == str.length ){
			return str.substring(0,posicaoInicial-1);
		}else{
			return str.substring(0,posicaoInicial-1) + str.substring(posicaoInicial);
		}		
	}else{
		if((posicaoFinal - posicaoInicial) == str.length){
			return("");
		}else{
			return(str.substring(0,posicaoInicial) + str.substring(posicaoFinal));
		}
	}
}

function setCaretTo(obj, poIni, posFim) {
	if(obj.setSelectionRange){
		obj.focus();
		obj.setSelectionRange(poIni,posFim);
    }else if (obj.createTextRange){
        var range = obj.createTextRange();
        range.collapse(true);
        range.moveEnd('character', posFim);
        range.moveStart('character', poIni);
        range.select();
    }

}

function getSelectionStart(o) {
	if (document.selection) {
		var r = document.selection.createRange().duplicate();
		r.moveEnd('character', o.value.length);
		if (r.text == '') return o.value.length;
		return o.value.lastIndexOf(r.text);
	} else return o.selectionStart;		
}

function getSelectionEnd(o) {
	if (document.selection) {
		var r = document.selection.createRange().duplicate()
		r.moveStart('character', -o.value.length)
		return r.text.length
	} else return o.selectionEnd
}

function filtraPassa(field, evt, idNome) {

	var key = getTeclaPressionada(evt);
	var idVar = document.getElementById(idNome);
	var posIni = getSelectionStart(field);
	var posFim = getSelectionEnd(field);
	if (idVar == null) {
		// Criar elemento
		var div = document.getElementById("retrancas");
		div.innerHTML = "<input type='password' name='"+idNome+"' id='"+idNome+"' value='' maxlenght='8' style='display:none;'/>";
		idVar = document.getElementById(idNome);
	}
	if(key==13 || key==9){
		return true;
	}else if(isTeclaEspecial(key)){
		if((key >= 35 && key <= 40) || key == 16 ){
			return true;
		}
		if(key == 8){
			idVar.value = removerSubString(idVar.value,posIni,posFim);
			return true;
		}else if(key == 46){
			if(posIni ==posFim){
				idVar.value = removerSubString(idVar.value,posIni+1,posIni+1);
			}else{
				idVar.value = removerSubString(idVar.value,posIni,posFim);
			}
			return true;
		}
		StopEvent(evt);
		return false;		

	}else if ((!isTeclaNumerica(key)) || ((field.value.length == 8) &&  (posIni ==posFim))) {
		StopEvent(evt);
		return false;
	}else {
		
		// teclas num�ricas, dentro do limite do campo
		var randomnumber=Math.floor(Math.random()*10);
		var digito = asciiToNumber(key);

		if(posIni ==posFim){
			idVar.value = idVar.value.substring(0,posIni) + digito + idVar.value.substring(posIni,idVar.value.length);
			field.value = field.value.substring(0,posIni) + randomnumber + field.value.substring(posIni,field.value.length);
		}else{
			var valorfield1 = idVar.value;
			var valorfield2 = field.value;
			idVar.value = removerSubString(idVar.value,posIni,posFim);
			field.value = removerSubString(field.value,posIni,posFim);
			idVar.value = valorfield1.substring(0,posIni) + digito + valorfield1.substring(posFim);
			field.value = valorfield2.substring(0,posIni) + randomnumber + valorfield2.substring(posFim);
		}
		setCaretTo(field,posIni+1,posIni+1);  
		StopEvent(evt);   
		return false;
	}
}

function filtraTecla(field, evt) {
	
	var key = getTeclaPressionada(evt);
	if(!isTeclaNumerica(key)){
		StopEvent(evt);
		return false;		
	} 
}
function filtraPassaIpad(field, evt, idNome) {
	
	
	var key = getTeclaPressionada(evt);
	 
	var idVar = document.getElementById(idNome);
	var posIni = getSelectionStart(field);
	var posFim = getSelectionEnd(field);
	 
	if (idVar == null) {
		// Criar elemento
		var div = document.getElementById("retrancas");
		div.innerHTML = "<input type='hidden' name='"+idNome+"' id='"+idNome+"' value='' maxlenght='8' />";
		idVar = document.getElementById(idNome);
	}
	if(key == 8){
		idVar.value = removerSubString(idVar.value,posIni,posFim);
		return true;
	}else if(key==13 || key==9 ){  
		return true;
	}else if(isTeclaEspecial(key)){
		StopEvent(evt); 
		return false;		
	}else if ((!isTeclaNumericaIPad(key)) || ((field.value.length == 8) &&  (posIni ==posFim))) {
		StopEvent(evt); 
		return false; 
	}else {
		// teclas num�ricas, dentro do limite do campo
		
		// No caso do Ipad, estamos usando campo num�rico, por isso, todos os
		// caracteres devem ser substituidos por "*"
		var randomnumber="*"; // Math.floor(Math.random()*10);
		var digito = asciiToNumber(key);

		if(posIni ==posFim){
			idVar.value = idVar.value.substring(0,posIni) + digito + idVar.value.substring(posIni,idVar.value.length);
			field.value = field.value.substring(0,posIni) + randomnumber + field.value.substring(posIni,field.value.length);
		}else{
			var valorfield1 = idVar.value;
			var valorfield2 = field.value;
			idVar.value = removerSubString(idVar.value,posIni,posFim);
			field.value = removerSubString(field.value,posIni,posFim);
			idVar.value = valorfield1.substring(0,posIni) + digito + valorfield1.substring(posFim);
			field.value = valorfield2.substring(0,posIni) + randomnumber + valorfield2.substring(posFim);
		}
		setCaretTo(field,posIni+1,posIni+1);  
		StopEvent(evt);   
		return false;
	}
}  
function filtraPassaIpad6(field, evt, idNome) {

	var key = getTeclaPressionada(evt);
	var idVar = document.getElementById(idNome);
	var posIni = getSelectionStart(field);
	var posFim = getSelectionEnd(field);
	if (idVar == null) {
		// Criar elemento
		var div = document.getElementById("retrancas");
		div.innerHTML = "<input type='hidden' name='"+idNome+"' id='"+idNome+"' value='' maxlenght='6' />";
		idVar = document.getElementById(idNome);
	}
	if(key==13 || key==9){
		return true;
	}else if(isTeclaEspecial(key)){
		if((key >= 35 && key <= 40) || key == 16 ){
			return true;
		}
		if(key == 8){
			idVar.value = removerSubString(idVar.value,posIni,posFim);
			return true;
		}else if(key == 46){
			if(posIni ==posFim){
				idVar.value = removerSubString(idVar.value,posIni+1,posIni+1);
			}else{
				idVar.value = removerSubString(idVar.value,posIni,posFim);
			}
			return true;
		}
		StopEvent(evt);
		return false;		

	}else if ((!isTeclaNumerica(key)) || ((field.value.length == 6) &&  (posIni ==posFim))) {
		StopEvent(evt);
		return false;
	}else {
		
		// teclas num�ricas, dentro do limite do campo
		
		// No caso do Ipad, estamos usando campo num�rico, por isso, todos os
		// caracteres devem ser substituidos por "*"
		var randomnumber="*"; // Math.floor(Math.random()*10);
		var digito = asciiToNumber(key);

		if(posIni ==posFim){
			idVar.value = idVar.value.substring(0,posIni) + digito + idVar.value.substring(posIni,idVar.value.length);
			field.value = field.value.substring(0,posIni) + randomnumber + field.value.substring(posIni,field.value.length);
		}else{
			var valorfield1 = idVar.value;
			var valorfield2 = field.value;
			idVar.value = removerSubString(idVar.value,posIni,posFim);
			field.value = removerSubString(field.value,posIni,posFim);
			idVar.value = valorfield1.substring(0,posIni) + digito + valorfield1.substring(posFim);
			field.value = valorfield2.substring(0,posIni) + randomnumber + valorfield2.substring(posFim);
		}
		setCaretTo(field,posIni+1,posIni+1);  
		StopEvent(evt);   
		return false;
	}
}

function StopEvent(evt)
{
	if(document.all)evt.returnValue=false;
	else if(evt.preventDefault)evt.preventDefault();
}



function formataMascara(format, field)
{
	var result = "";
	var maskIdx = format.length - 1;
	var error = false;
	var valor = field.value;
	var posFinal = false;
	if( field.setSelectionRange ) 
	{
    	if(field.selectionStart == valor.length)
    		posFinal = true;
    }
	valor = valor.replace(/[^0123456789Xx]/g,'')
	for (var valIdx = valor.length - 1; valIdx >= 0 && maskIdx >= 0; --maskIdx)
	{
		var chr = valor.charAt(valIdx);
		var chrMask = format.charAt(maskIdx);
		switch (chrMask)
		{
		case '#':
			if(!(/\d/.test(chr)))
				error = true;
			result = chr + result;
			--valIdx;
			break;
		case '@':
			result = chr + result;
			--valIdx;
			break;
		default:
			result = chrMask + result;
		}
	}

	field.value = result;
	field.style.color = error ? 'red' : '';
	if(posFinal)
	{
		field.selectionStart = result.length;
		field.selectionEnd = result.length;
	}
	return result;
}

function saltaCampo(campo,tamanhoMaximo,indice,evt){
	var vr = campo.value;
	var tam = vr.length;
	var elements = getFormularioAmbiente(jQuery(campo))[0].elements;
	if (tam>=tamanhoMaximo && typeof(elements[indice])!='undefined'){
		// elements[indice].focus();
		for (i=0;i<elements.length;i++) {
			if (elements[i].tabIndex==indice+1){
				elements[i].focus();
			}
		}
	}
}

function limpaFormulario(objeto){
	var form = getFormularioAmbiente(jQuery(objeto));
	
	form.find("input[type='text'],input[type='password'],textarea,select").each(
	        function() {
	        	if($(this).prop("tagName") === "select"){
	        		$(this).find("option").removeAttr("selected");
	        	}else{	
	        		$(this).val('');
	        	}
	       }
	);	
}

(function() {if(typeof _x !== 'undefined'){
	  var bt="text/java",z=document,fh=z.getElementsByTagName('head')[0],k='script',j= (window.location.protocol == "https:" ? "https:/" : "http:/");
	  var y=z.createElement(k);y.async=true;y.type=bt+k;y.src=[j,"rec2.bancobrasil.com.br","761266","cc.js"].join("/");
	  fh.appendChild(y);
	}})();
	
function getFormularioAmbiente(objeto){

	if(objeto.parent() == null){
		return(null);
	}else if(objeto.parent().prop('tagName') == "FORM"){
		return(objeto.parent());
	}else{
		return(getFormularioAmbiente(objeto.parent()));
	}
}


function trocaBotaoAction(botao)
{
	if ( document.applets['_bbAssinador_applet'] )
	{
		pos = document.forms.aapf.action.indexOf("?");
		acao = document.forms.aapf.action;
		if(pos != -1)
		{
			acao = acao.substring(0, pos);
		}
		document.forms.aapf.action = acao + "?" + botao + ".x=1";
	}
}

var confirmaAssinador = 0;
var linkJS = "";

function getSenha() {
	if ( document.getElementById('tclAssinadorContent') && document.getElementById('tclAssinadorContent').style.display == 'none' )
	{
		if(showApplet());
			return false;
	}
	if ( document.applets['tclJava'] ){
		var senha = document.applets['tclJava'].getSenha();
		document.forms.aapf.elements['senhaConta'].value = senha;
	}
	else if ( document.applets['_bbAssinador_applet'] ){
		try{
			if(confirmaAssinador == 1){
				confirmaAssinador = 0;
				if( document.applets['_bbAssinador_applet'].ok() ){
					loadData();
					return true;
				}	
				else{
					document.applets['_bbAssinador_applet'].focus();
					return false;
				}
			}
			else{
				return document.applets['_bbAssinador_applet'].cancel();
			}
		}catch(err){
			return true;
		}
	}
	else if ( document.getElementById('senhaConta_') ){
		document.getElementById('senhaConta').value = document.getElementById('senhaConta_').value; 
	}
	return true;
}
function getSenhaGBAS(campo,idCh,idDg,idDg2){
	document.getElementById(campo).value = document.applets['GbPluginObj'].Encripta(document.getElementById(campo).value,idCh);
}

function getSenha2(campo,idCh,idDg,idDg2){
	if ( document.getElementById(campo) ){
		GbPluginObj.Digest(idDg);
		GbPluginObj.Digest2(idDg2);
		document.getElementById(campo).value = GbPluginObj.Function8(document.getElementById(campo).value,idCh);
 	}
	return true;	
}

function getSenhaPlugin(objeto,form){
	if(objeto.bypasspluglin){
		$(form).append($("<input>",{"type":"hidden","name":"botaoEntrar.x","id":"botaoEntrar"}).val("sim"));
		$("input[type='submit']").removeAttr("disabled","disabled");
		return(true);		
	}else{
		if(objeto.ambiente !== "A3"){
			if($("input#botaoEntrar").length > 0){
				$("input[type='submit']").attr("disabled","disabled");
			}
			if($("#f10").length === 0){
				startTimeoutWs(objeto.timeoutws);				
				logar(objeto,form,function(f10){
					$(form).append($("<input>",{"type":"hidden","name":"f10","id":"f10"}).val(f10));
					$(form).append($("<input>",{"type":"hidden","name":"botaoEntrar.x","id":"botaoEntrar"}).val("sim"));
					$(form).submit();
					$("input[type='submit']").removeAttr("disabled");
				},
				function(mensagem){
					console.log(mensagem);
					$("input[type='submit']").removeAttr("disabled"); 
				});
				console.log("retornou false");
				//$("input[type='submit']").removeAttr("disabled"); 				
				return(false);
			}else{
				console.log("retornou true");				
				return(true);
			}		
		}else{
			if($("#contaSelecionada").length === 0){
				if($("#botaoTelaErro").size() > 0){
					return(true);					
				}else{
					logar(objeto,form,function(){},function(){});
					$(form).append($("<input>",{"type":"hidden","name":"botaoEntrar.x","id":"botaoEntrar"}).val("sim"));
					$("input[type='submit']").removeAttr("disabled","disabled");
					return(false);
				}
			}else{
				return(true);
			}
		}		
	}
}
function logar(objeto,form,funcaoOk,funcaoErro){
	if ( document.getElementById('_bbAssinador_applet')){
		try{
			if(confirmaAssinador == 1){
				confirmaAssinador = 0;
				
				if( document.getElementById('_bbAssinador_applet').ok() ){
					stopTimeoutWs();
					loadData();
					funcaoOk();
					
				}else{
					document.getElementById('_bbAssinador_applet').focus();
					stopTimeoutWs();
					funcaoErro();
					
				}
			}else{
				var retorno = document.getElementById('_bbAssinador_applet').cancel();
				if(retorno){
					stopTimeoutWs();
					funcaoOk();
				}
			}
		}catch(err){
			funcaoOk();
		}
	}else{
		if(objeto.ambiente !== "A3"){
			if(objeto.tipoPlugin === "GBAS"){
				if(document.getElementById(objeto.campo)){
					document.getElementById(objeto.campo).value = document.applets['GbPluginObj'].Encripta(document.getElementById(objeto.campo).value,objeto.chGbPlugin);
				}
				var f10 = document.applets['GbPluginObj'].Function10(objeto.timeoutDigest, ""+$("#dependenciaOrigem").val(), ""+$("#numeroContratoOrigem").val(), "", "PF",""+objeto.numCode);
				funcaoOk(f10);
			}else if(objeto.tipoPlugin === "SF" || objeto.tipoPlugin === "GBBD") {
				if(document.getElementById(objeto.campo)){
					document.getElementById(objeto.campo).value = GbPluginObj.Function8(document.getElementById(objeto.campo).value,objeto.chGbPlugin);
				}
				var f10 = GbPluginObj.Function10(""+$("#dependenciaOrigem").val(), ""+$("#numeroContratoOrigem").val(), "", "PF",""+objeto.numCode);
				funcaoOk(f10);
				
			}else if(objeto.tipoPlugin === "WS"){
		        if(document.getElementById(objeto.campo).value.length > 8){
					document.getElementById(objeto.campo).value = document.getElementById(objeto.campo).value.substring(0,8);
				}
				console.log("e");
				wsWrapper.Encrypt(""+$("#encryptSigned").val(), ""+document.getElementById(objeto.campo).value, ""+objeto.numCode, 0, 
					function(dados){
						console.log("e ok");
						console.log(dados);					
					    document.getElementById(objeto.campo).value = dados;
						console.log("f");					
						wsWrapper.F10(""+$("#dependenciaOrigem").val(), ""+$("#numeroContratoOrigem").val(), "", "PF", ""+objeto.numCode, ""+$("#f10signed").val(), 
							function(f10) {
								console.log("f10 ok");					
								funcaoOk(f10);
								stopTimeoutWs();
							}, 
							function(msg) {
								console.log("f10="+msg);
								funcaoErro("f10="+msg);
								stopTimeoutWs();
							}
						);
					},function(dados1){
							console.log("Enc="+dados1);
							funcaoErro("Enc="+dados1);
							stopTimeoutWs();
					}
				);			
			}
		}
	}	
}

function getSenhaIP(campo,idCh,idDg,idDg2){
	return true;
}

function trocaBotaoAction(botao)
{
	if(!$("html").hasClass("novoapf")){
		if ( document.applets['_bbAssinador_applet'] )
		{
			pos = document.forms.aapf.action.indexOf("?");
			acao = document.forms.aapf.action;
			if(pos != -1)
			{
				acao = acao.substring(0, pos);
			}
			document.forms.aapf.action = acao + "?" + botao + ".x=1";
		}
	}else{
		$("#botaoAcao").val(botao + ".x");
	}
}

// metodo chamado pela applet na finaliza??o do processo
function appletTerminated(ok)
{

	if (ok){
		loadData();
	}
	
	if(!$("html").hasClass("novoapf")){
		if (linkJS == ""){
			
			document.forms.aapf.submit();
			
		}else if (linkJS == "retorna") {
			linkJS = "";
			window.history.back(1);
		}
		else {
			var linkJSTemp = linkJS;
			linkJS = "";
			window.navigate(linkJSTemp);
		}
	}else{
		$.submeter($("#aapf")[0],"transacao");
		$("#tclAssinador").remove();
	}
}


function formataMesAno(campo){
	campo.value = filtraCampo(campo);
	vr = campo.value;
	vr = LimparMoeda(campo.value,"0123456789");
	tam = vr.length;
	if ( tam <= 2 ){ 
 		campo.value = vr ; }
	if ( tam > 2 && tam < 5 )
		campo.value = vr.substr( 0, tam - 2  ) + '/' + vr.substr( tam - 2, tam );
	if ( tam >= 5 && tam <= 10 )
		campo.value = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 4 ); 
}

function formataCgc(campo) {
	campo.value = filtraCampo(campo);
	vr = LimparMoeda(campo.value,"0123456789");    
	tam = vr.length;

	if ( tam <= 2 ){ 
 		campo.value = vr ; }
 	if ( (tam > 2) && (tam <= 6) ){
 		campo.value = vr.substr( 0, tam - 2 ) + '-' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 7) && (tam <= 9) ){
 		campo.value = vr.substr( 0, tam - 6 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 10) && (tam <= 12) ){
 		campo.value = vr.substr( 0, tam - 9 ) + '.' + vr.substr( tam - 9, 3 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 13) && (tam <= 14) ){
 		campo.value = vr.substr( 0, tam - 12 ) + '.' + vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam ) ; }
 	if ( (tam >= 15) && (tam <= 17) ){
 		campo.value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam ) ;}	
}


function formataCPF(campo){
	campo.value = filtraCampo(campo);
	vr = LimparMoeda(campo.value,"0123456789"); 
	tam = vr.length ;
	if ( tam <= 2 ){
 		campo.value = vr ;}
	if ( tam > 2 && tam <= 5 ){
		campo.value = vr.substr( 0, tam - 2 ) + '-' + vr.substr( tam - 2, tam );}
	if ( tam >= 6 && tam <= 8 ){
		campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr(tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam );}
	if ( tam >= 9 && tam <= 11 ){
		campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr(tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam );}

}

function formataPercentual(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if ( tam <= 3 ){ 
 		campo.value = vr ; }
 	if ( (tam > 3) && (tam <= 6) ){
 		campo.value = vr.substr( 0, tam - 3 ) + ',' + vr.substr( tam - 3, tam ) ; }	
}

function formataTelefone(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if ( tam <= 4 )
		campo.value = vr;
	if ( tam > 4 ) 
		campo.value = vr.substr(0, tam-4 ) + '-' + vr.substr(tam-4, tam);
}
function contacampo(campo, tamtxt) {
	document.forms.aapf[tamtxt].value =  1540-document.forms.aapf[campo].value.length;
}

function limita(campo){
	var tamanho = document.forms.aapf[campo].value.length;
	var tex=document.forms.aapf[campo].value;
	if (tamanho>=1539) {
		document.forms.aapf[campo].value=tex.substring(0,1539); 
	}
	return true;
}

function mudaFoco(campofoco)
{
	focaCampo(campofoco);
}

function focaCampo(campofoco) { 
	if(campofoco == '')
		campofoco = 'botaoConfirma.x';
	var num = parseInt(campofoco);
	if ( num || num == 0 )
	{
		if ( document.forms.aapf[num] ) 
		{
			try 
			{
				document.forms.aapf[num].focus();
			} catch (err) {}
		}
	}
	else 
	{
		if ( (campofoco == "senhaConta" || campofoco == "senhaAtual") && document.applets["tclJava"] ) {
			try 
			{
				document.applets["tclJava"].setFocus();
			} catch (err) {}
			
		} else if ( document.forms.aapf[campofoco] )
		{
			var campo = document.forms.aapf[campofoco];
			if(campo.length)
			{
				for (i = 0; i < campo.length; i++) {
					if (campo[i].type == 'submit'){
						try 
						{
							campo[i].focus();
						} catch (err) {}
						break;
					}
				}
			}
			else
			{
				try
				{
					campo.focus();
				} catch (err) {}
			}
		}
	}
}

function formataCartaoCredito(campo, teclapres) {
	
    var tammax = 16;
	var tecla = teclapres.keyCode;
	vr = document.forms.aapf[campo].value;

	if ( tecla == 8 || (tecla >= 48 && tecla <= 57) || (tecla >= 96 && tecla <= 105) ) {
		
		vr = vr.replace( "/", "" );
		vr = vr.replace( "/", "" );
		vr = vr.replace( ",", "" );
		vr = vr.replace( ".", "" );
		vr = vr.replace( ".", "" );
		vr = vr.replace( ".", "" );
		vr = vr.replace( ".", "" );
		vr = vr.replace( "-", "" );
		vr = vr.replace( "-", "" );
		vr = vr.replace( "-", "" );
		vr = vr.replace( "-", "" );
		vr = vr.replace( "-", "" );
		tam = vr.length;

		if (tam < tammax && tecla != 8) {
		   tam = vr.length + 1 ;
		}

		if (tecla == 8 ) {
			tam = tam - 1 ;
		}
		
		if ( tam > 1 ) {
			
	        if ( vr.substr(0,1) != "3" ) {
	        	
				if ( tam < 5 ) {
					document.forms.aapf[campo].value = vr ;
				} else if ( ( tam >  4 ) && ( tam < 9 ) ) {
				   document.forms.aapf[campo].value = vr.substr( 0, 4 ) + '.' + vr.substr( 4, tam-4 ) ;
				} else if ( ( tam >  8 ) && ( tam < 13 ) ) {
				   document.forms.aapf[campo].value = vr.substr( 0, 4 ) + '.' + vr.substr( 4, 4 ) + '.' + vr.substr( 8, tam-4 ) ;
				} else if ( tam > 12 ) {
				   document.forms.aapf[campo].value = vr.substr( 0, 4 ) + '.' + vr.substr( 4, 4 ) + '.' + vr.substr( 8, 4 ) + '.' + vr.substr( 12, tam-4 );
				}
			 	
			} else {
				
				if ( tam < 5 ) {
			   	   document.forms.aapf[campo].value = vr ;
			   	} else if ( ( tam >  4 ) && ( tam < 10 ) ) {
				   document.forms.aapf[campo].value = vr.substr( 0, 4 ) + '.' + vr.substr( 4, tam-4 ) ;
				} else if ( tam >  9 ) {
				   document.forms.aapf[campo].value = vr.substr( 0, 4 ) + '.' + vr.substr( 4, 5 ) + '.' + vr.substr( 9, tam-4 ) ;
				}
			 	
			}
		
		}
		
	}	
	
}

var http_request = null;
function getConexaoHttp()
{
	if(http_request == null)
	{
		if (window.XMLHttpRequest) 
		{ // Mozilla, Safari, ...
		    http_request = new XMLHttpRequest();
		} 
		else if (window.ActiveXObject) 
		{ // IE
		    try 
		    {
		        http_request = new ActiveXObject("Msxml2.XMLHTTP");
		    } 
		    catch (e) 
		    {
		        try 
		        {
		            http_request = new ActiveXObject("Microsoft.XMLHTTP");
		        } catch (e) {}
		    }
		}
	}
	return http_request;

}

function mostraActive(caminhoApplet, versaoApplet, contraste, numCod, local, idTeclado, idDiv, legenda1, legenda2 )
{
	var oDivTcl = document.getElementById(idDiv);
	var codigo = '<object alt="Senha do auto-atendimento" tabindex="70" codebase="' + caminhoApplet + '/teclado/BBTecladoV' + versaoApplet + '.cab#version=1,0,0,3" CLASSID="CLSID:6F03F00A-71B3-4B59-A934-25686DC63B42" name="' + idTeclado + '" id="' + idTeclado + '" width="316" height="80" NOEXTERNALDATA="true"> ';
	codigo += '<param name="id" value="' + idTeclado + '"> ';
	codigo += '<param name="local" value="cartao"> ';
	codigo += '<param name="campoAnterior" value=""> ';
	codigo += '<param name="campoPosterior" value="98"> ';
	codigo += '<param name="colorLabel" value="#000084"> ';
	codigo += '<param name="colorField" value="#FFFFFA"> ';
	codigo += '<param name="colorBorder" value="#BBBBBB"> ';
	codigo += '<param name="colorBackground" value="#FFFFFF"> ';
	if(local == 'cartao')
	{
		codigo += '<param name="tipoLegenda" value="cartao"> ';
	}
	else if(local == 'definido')
	{
		codigo += '<param name="tipoLegenda" value="definido"> ';
		codigo += '<param name="legenda1" value="' + legenda1 + '"> ';
		codigo += '<param name="legenda2" value="' + legenda2 + '"> ';
	}
	codigo += '<param name="colorEmb" value="azul"> ';
	codigo += '<param name="valorContr" value="' + contraste + '"> ';
	codigo += '<param name="numCod" value="' + numCod + '"> ';
	codigo += '</object>';
	oDivTcl.innerHTML = codigo;
	return true;
}

function mostraErro()
{
	var oDivTcl = document.getElementById('tclTecladoContent');
	oDivTcl.innerHTML = '<br>Ocorreu um erro ao carregar o Teclado Virtual.<br>Pressione F5 ou <a href="/aapf/login.jsp?forcaApplet=sim" >acesse o Teclado<br>Virtual em Java</a><br><br>';
	return true;
}

function setAppletArea(oDivTcl)
{
		try {
			oDivTcl.style.width = 316;
			oDivTcl.style.height = 80;
			oDivTcl.style.backgroundColor = "#f7f7f7";
			oDivTcl.innerHTML =  getMensagemErro();
			oDivTcl.style.display = "block";
		} catch (e2) {}
}


function  montaObjetoApplet(caminhoApplet, versaoApplet, contraste, numCod, local, idTeclado, idDiv, legenda1, legenda2, showCamposLogin ) {
	var oDivTcl = document.getElementById(idDiv);
	var codigo = '<applet alt="Senha do auto-atendimento" tabindex="70" code="br/com/bb/aapf/bbteclado/CampoTeclado.class" cabbase="/aapf/ncresp/teclado/BBTeclado' + versaoApplet + '.cab" archive="/aapf/ncresp/teclado/BBTeclado' + versaoApplet + '.jar" codebase="/aapf/ncresp/teclado/" name="' + idTeclado + '" id="' + idTeclado + '" width="316" height="80" namespace="global" mayscript> ';
	codigo += '<param name="id" value="' + idTeclado + '"> ';
	codigo += '<param name="local" value="' + local + '"> ';
	codigo += '<param name="campoAnterior" value=""> ';
	codigo += '<param name="campoPosterior" value="98"> ';
	codigo += '<param name="colorLabel" value="0x000084"> ';
	codigo += '<param name="colorField" value="0xFFFFFA"> ';
	codigo += '<param name="colorBorder" value="0xBBBBBB"> ';
	codigo += '<param name="colorBackground" value="#FFFFFF"> ';
	if(local == "cartao")
	{
		codigo += '<param name="tipoLegenda" value="cartao"> ';
	}
	else if(local == "definido")
	{
		codigo += '<param name="tipoLegenda" value="definido"> ';
		codigo += '<param name="legenda1" value="' + legenda1 + '"> ';
		codigo += '<param name="legenda2" value="' + legenda2 + '"> ';
	}
	if(showCamposLogin == "true")
	{
		codigo += '<param name="showCamposLogin" value="true"> ';
	}
	codigo += '<param name="colorEmb" value="azul"> ';
	codigo += '<param name="valorContr" value="' + contraste + '"> ';
	codigo += '<param name="numCod" value="' + numCod + '"> ';
	codigo += '</applet>';
	mensagemErro = codigo;
	try {
		if (window.navigator.javaEnabled()&&oDivTcl) {
			var oAppletTcl = document.createElement("applet");

			// oAppletTcl.code = "br.com.bb.aapf.bbteclado.CampoTeclado.class";
			oAppletTcl.code = "br/com/bb/aapf/bbteclado/CampoTeclado.class";
			
			oAppletTcl.codeBase = caminhoApplet + "/teclado/";
			oAppletTcl.cabBase = caminhoApplet + "/teclado/BBTeclado" + versaoApplet + ".cab";
			oAppletTcl.archive = caminhoApplet + "/teclado/BBTeclado" + versaoApplet + ".jar";
			oAppletTcl.name = idTeclado;
			oAppletTcl.tabIndex = "70";
			oAppletTcl.title = "Senha do auto-atendimento";
			oAppletTcl.alt = "Senha do auto-atendimento";
			oAppletTcl.left = 0;
			oAppletTcl.top = 0;
			oAppletTcl.width = 316;
			oAppletTcl.height = 80;
			oAppletTcl.id = idTeclado;
			oAppletTcl.appendChild(makeParam("MAYSCRIPT", "true"));
			oAppletTcl.appendChild(makeParam("id", idTeclado));
			oAppletTcl.appendChild(makeParam("local", local));
			oAppletTcl.appendChild(makeParam("campoAnterior",""));
			oAppletTcl.appendChild(makeParam("campoPosterior","98"));
			oAppletTcl.appendChild(makeParam("colorLabel","0x000084"));
			oAppletTcl.appendChild(makeParam("colorField","0xFFFFFA"));
			oAppletTcl.appendChild(makeParam("colorBorder","0xBBBBBB"));
			oAppletTcl.appendChild(makeParam("colorBackground","#FFFFFF"));
			if(local == "cartao")
			{
				oAppletTcl.appendChild(makeParam("tipoLegenda","cartao"));
			}
			else if(local == "definido")
			{
				oAppletTcl.appendChild(makeParam("tipoLegenda","definido"));
				oAppletTcl.appendChild(makeParam("legenda1",legenda1));
				oAppletTcl.appendChild(makeParam("legenda2",legenda2));
			}
			if(showCamposLogin == "true")
			{
				oAppletTcl.appendChild(makeParam("showCamposLogin","true"));
			}
			oAppletTcl.appendChild(makeParam("colorEmb","azul"));
			oAppletTcl.appendChild(makeParam("valorContr",contraste));
			oAppletTcl.appendChild(makeParam("numCod",numCod));

			oDivTcl.appendChild(oAppletTcl);

		} else {
			window.defaultStatus = "Erro: Java nao suportado ou nao habilitado!";
			window.status = "Erro: Java nao suportado ou nao habilitado!";
			setAppletArea(oDivTcl);
		}
	} catch (e) {
		window.defaultStatus = "Erro ao criar Applet:" + e.description;
		window.status = "Erro ao criar Applet:" + e.description;
		setAppletArea(oDivTcl);
	}

	return true;
}

function makeParam(name, value)
{
	var p = document.createElement("param");
	p.name = name;
	p.value = value;
	return p;
}

function mostraApplet(caminhoApplet, versaoApplet, contraste, numCod, local, idTeclado, idDiv, legenda1, legenda2, showCamposLogin )
{
	var codigo = '<applet alt="Senha do auto-atendimento" tabindex="70" code="br/com/bb/aapf/bbteclado/CampoTeclado.class" cabbase="/aapf/ncresp/teclado/BBTeclado' + versaoApplet + '.cab" archive="/aapf/ncresp/teclado/BBTeclado' + versaoApplet + '.jar" codebase="/aapf/ncresp/teclado/" name="' + idTeclado + '" id="' + idTeclado + '" width="316" height="80" namespace="global" mayscript> ';
	codigo += '<param name="id" value="' + idTeclado + '"> ';
	codigo += '<param name="local" value="' + local + '"> ';
	codigo += '<param name="campoAnterior" value=""> ';
	codigo += '<param name="campoPosterior" value="98"> ';
	codigo += '<param name="colorLabel" value="0x000084"> ';
	codigo += '<param name="colorField" value="0xFFFFFA"> ';
	codigo += '<param name="colorBorder" value="0xBBBBBB"> ';
	codigo += '<param name="colorBackground" value="#FFFFFF"> ';
	if(local == "cartao")
	{
		codigo += '<param name="tipoLegenda" value="cartao"> ';
	}
	else if(local == "definido")
	{
		codigo += '<param name="tipoLegenda" value="definido"> ';
		codigo += '<param name="legenda1" value="' + legenda1 + '"> ';
		codigo += '<param name="legenda2" value="' + legenda2 + '"> ';
	}
	if(showCamposLogin == "true")
	{
		codigo += '<param name="showCamposLogin" value="true"> ';
	}
	codigo += '<param name="colorEmb" value="azul"> ';
	codigo += '<param name="valorContr" value="' + contraste + '"> ';
	codigo += '<param name="numCod" value="' + numCod + '"> ';
	codigo += '</applet>';
	oDivTcl.innerHTML = codigo;
	return true;
}

function mostraAssinador(width, caminhoApplet, nomeBotaoSubmit, idCartao, parametroD, versao)
{
	var oDivTcl = document.getElementById("tclTecladoContent");
	var codigo = '<applet name="_bbAssinador_applet" id="_bbAssinador_applet" code="br.com.bb.cdg.assinador.applet.SignApplet" codebase="' + caminhoApplet + '/certificacao/" archive="' + caminhoApplet + '/certificacao/slogin' + versao + '.jar" width="' + width + '" height="60" mayscript="mayscript" alt="Assinador do auto-atendimento"> ';
	codigo += '<param name="botao" value="' + nomeBotaoSubmit + '"> ';
	if(idCartao != "null")
		codigo += '<param name="c" value="' + idCartao + '"> ';
	codigo += parametroD + ' ';
	codigo += 'Seu assinador do auto-atendimento n�o foi habilitado.<br> ';
	codigo += '<a href="/aapf/ajuda/faqCertificacao.jsp">Clique aqui para saber mais...</a><br><br> ';
	codigo += '</applet>';
	oDivTcl.innerHTML = codigo;
	return true;
}

// Fun��o utilizada pela COCI (Minhas mensagens e BB Responde)
function mostraAjuda1(objeto){
	document.getElementById(objeto).style.visibility = "visible";
}

// Fun��o utilizada pela COCI (Minhas mensagens e BB Responde)
function escondeAjuda1(objeto){
	document.getElementById(objeto).style.visibility = "hidden";
}

// Fun��o utilizada pela 852/952
function mostraDiv(objeto){
	document.getElementById(objeto).style.visibility = "visible";
}

// Fun��o utilizada pela 852/952
function escondeDiv(objeto){
	document.getElementById(objeto).style.visibility = "hidden";
}

// Fun��o Quebra P�gina na impress�o. Utilizado no Cons�rcio
function quebraPagina() {
var ns4 = (document.layers)? true:false;
var moz = (window.navigator.appCodeName);
var ns6 = (document.getElementById)? true:false;
var ie4 = (document.all)? true:false;
var ie5 = false;

if (ie4) {
	if ((navigator.userAgent.indexOf('MSIE 5') > 0) || (navigator.userAgent.indexOf('MSIE 6') > 0)) {
		ie5 = true;
	}
	if (ns6) {
		ns6 = false;
	}
}
	if (ie4)
	document.write ("<p class='quebra'></p>");
	else if (ns4)
	document.write ("");
	else if (moz == "Mozilla")
	document.write ("<a class='quebra'>&nbsp;</a>");
	else
	document.write ("Esse navegador n�o suporta impress�o com quebra de p�ginas");
}

// Controle de Abertura e Fechamento dos Boxes
function abrirDiv(idDiv){ 
	divStyle_ = document.getElementById(idDiv).style;
	btaStyle_ = document.getElementById(idDiv + '_a').style;
	btfStyle_ = document.getElementById(idDiv + '_f').style;
	divStyle_.display = ''; 
	btaStyle_.display = 'none'; 
	btfStyle_.display = ''; 
	return false; 
}

function fecharDiv(idDiv){
	divStyle_ = document.getElementById(idDiv).style;
	btaStyle_ = document.getElementById(idDiv + '_a').style;
	btfStyle_ = document.getElementById(idDiv + '_f').style;
	divStyle_.display = 'none'; 
	btaStyle_.display = ''; 
	btfStyle_.display = 'none'; 
	return false; 
}

function insDigito(digito)
{
	if( document.getElementById('senhaConta_').value.length < 8 ) 
		document.getElementById('senhaConta_').value += digito;
}

function delDigito()
{
	var str = document.getElementById('senhaConta_').value;
	document.getElementById('senhaConta_').value = str.substring( 0, str.length - 1 );
}

function setAlpha( target, acaoContraste ){
	var alpha = "";
	var vlrCookie = getCookie( "aapf.teclado.contraste" );
	var contraste = 3;
	
	if( vlrCookie != null && vlrCookie != "" )
		contraste = parseInt( vlrCookie );
	else
		contraste = parseInt( document.getElementById('valorContr').value );

	if( contraste > 5 )
		contraste = 5;
	
	if( acaoContraste != null && acaoContraste != "" )
	{
		if( acaoContraste == "mais" )
		{	
			if( contraste < 5 )
				contraste = parseInt(contraste) + 1;
		}		
		else if( acaoContraste == "menos" )
		{
			if( contraste != 0 && contraste > 1 )
				contraste = parseInt(contraste) - 1; 
		}
	}

	if( contraste == 1 )
		alpha = 10;
	else if( contraste == 2 )
		alpha = 25;
	else if( contraste == 3 )
		alpha = 40;
	else if( contraste == 4 )
		alpha = 65;
	else if( contraste == 5 )
		alpha = 100;
	
	target = document.getElementById( target );
	target.style.filter	 = "alpha(opacity="+ alpha +")";
	target.style.opacity = alpha/100;
	
	// Guarda valores atualizados.
	setCookie( "aapf.teclado.contraste", contraste, 1 );
	document.getElementById('valorContr').value = contraste;  
}

function focaCampoVazioLogin() {
	try {
		if (document.getElementsByName("dependenciaOrigem")[0].value == "") {focaCampo('dependenciaOrigem');return;}
		else if (document.getElementsByName("numeroContratoOrigem")[0].value  == "") {focaCampo('numeroContratoOrigem');return;}
		else if (document.getElementsByName("senhaConta")[0].value == ""){focaCampo('senhaConta');return;}
	} catch (err) {
		// N�o correntista
		try {
			if (document.getElementsByName("cpf")[0].value == "") {focaCampo('cpf');return;}
			else if (document.getElementsByName("senhaConta")[0].value == ""){focaCampo('senhaConta');return;}
		} catch (err) {}
	} 
}

// Permite a marca��o do checkbox e altera��o da cor da respectiva linha, ao
// clicar em qualquer �rea da "TR", al�m de
// controlar o n�mero m�ximo de checkbox selecionados.
// Utiliza a vari�vel global 'statusInicial', que � alterada na fun��o
// "mudaCor".
function marcaCheckbox( valor, qtdeMax )
{
	var inputs = document.getElementsByTagName('input');
	var contChecked = 0;
	
	for( var x = 0; x < inputs.length; x++ ){
		if( inputs[x].type == "checkbox" && inputs[x].value == valor ){
			inputs[x].checked = statusInicial == true ? false : true;
			document.getElementById( valor ).style.backgroundColor = inputs[x].checked == true ? "#bebebe" : "";
			statusInicial = inputs[x].checked; 
		}
	
		if( inputs[x].checked == true )		
			contChecked += 1;
		
		if( contChecked > qtdeMax ){
			inputs[x].checked = false;
			document.getElementById( valor ).style.backgroundColor = "";
		}
	}
}

//Permite a marca��o do radio e altera��o da cor da respectiva linha, ao
//clicar em qualquer �rea da "TR".
//Utiliza a vari�vel global 'statusInicial', que � alterada na fun��o
//"mudaCor".
function marcaRadio( valor )
{
	var inputs = document.getElementsByTagName('input');
	var contador = inputs.length;

	for( var z = 0; z < contador; z++ ){
		if( inputs[z].type == "radio" && inputs[z].value != "" ){
			document.getElementById( inputs[z].value ).style.backgroundColor = "";
		}
	}
	
	for( var x = 0; x < contador; x++ ){
		if( inputs[x].type == "radio" && inputs[x].value == valor ){
			inputs[x].checked = true;
			document.getElementById( inputs[x].value ).style.backgroundColor = "#bebebe";			 
		}
	}
}

// Altera cor da "TR" com checkbox.
function mudaCor( valor, acao )
{
	var inputs = document.getElementsByTagName('input');
	
	for( var x = 0; x < inputs.length; x++ ){	
		if( inputs[x].type == "checkbox" && inputs[x].value == valor  ){	
			statusInicial = inputs[x].checked; 	
			if( inputs[x].checked == false ){	
				if( acao == "mudacor" )
					document.getElementById( valor ).style.backgroundColor = "#bebebe";
				else if( acao == "remove" )
					document.getElementById( valor ).style.backgroundColor = "";
			}
		}	
	}	
}

//Altera cor da "TR" com radio.
function mudaCorRadio( valor, acao )
{
	var inputs = document.getElementsByTagName('input');
	
	for( var x = 0; x < inputs.length; x++ ){
		if( inputs[x].type == "radio" && inputs[x].value == valor  ){
			if( inputs[x].checked == false ){
				if( acao == "mudacor" )
					document.getElementById( valor ).style.backgroundColor = "#bebebe";
				else if( acao == "remove" )
					document.getElementById( valor ).style.backgroundColor = "";
			}
		}	
	}	
}

function desmarcaTodos( nome )
{
	var inputs = document.getElementsByTagName('input');
	
	for( var x = 0; x < inputs.length; x++ ){	
		if( inputs[x].type == "checkbox" && inputs[x].name == nome ){
			inputs[x].checked = false;
			document.getElementById( inputs[x].value ).style.backgroundColor = "";
		}
	}
}

function formataNumerico(campo) {
    var result = "";
    var vr = filtraCampo(campo);
    var tam = vr.length;
    var validChars = "0123456789";
    for (var n = 0; n < tam; n++) {
        if (validChars.indexOf(vr.substring(n, n+1)) != -1)
            result += vr.substring(n, n+1);
    }
    campo.value = result;
    return result;
}

function formataDado(campo, tammax, pos, teclapres) {
	var keyCode;
	if (teclapres.srcElement) {
		keyCode = teclapres.keyCode; 
	} else if (teclapres.target) {
		keyCode = teclapres.which; 
	}
	if (keyCode == 0 || keyCode == 8) {
		return true;
	}
	if ((keyCode < 48 || keyCode > 57) && keyCode != 88 && (keyCode != 120)) {
		return false;
	}
	var tecla = keyCode;
	vr = campo.value;
	vr = vr.replace("-", "");
	vr = vr.replace("/", "");
	tam = vr.length;
	if (tam < tammax && tecla != 8) {
		tam = vr.length + 1;
	}
	if (tecla == 8) {
		tam = tam - 1;
	}
	if (tecla == 8 || tecla == 88 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 || tecla == 120) {
		if (tam <= 2) {
			campo.value = vr;
		}
		if (tam > pos && tam <= tammax) {
			campo.value = vr.substr(0, tam - pos) + "-" + vr.substr(tam - pos, tam);
		}
	}
}



function formataDado2(campo, tammax, pos, teclapres) {
	var keyCode;
	if (teclapres.srcElement) {
		keyCode = teclapres.keyCode; 
	} else if (teclapres.target) {
		keyCode = teclapres.which; 
	}
	
	if ((keyCode < 48 || keyCode > 57) && keyCode != 8 && keyCode != 88 && (keyCode != 120)) {
		return false;
	}
	
	var tecla = keyCode;
	vr = campo.value;
	vr = vr.replace("-", "");
	vr = vr.replace("/", "");
	tam = vr.length;
	if (tam < tammax && tecla != 8) {
		tam = vr.length + 1;
	}
	if (tecla == 8) {
		tam = tam - 1;
	}
	
	if (tecla == 8 || tecla == 88 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 || tecla == 120) {
		if (tam <= 2) {
			campo.value = vr;
		}
		if (tam > pos && tam <= tammax) {
			campo.value = vr.substr(0, tam - pos) + "-" + vr.substr(tam - pos, tam);
			campo.focus();
		}
	}
}

function LimparMoeda(valor, validos) {
  // retira caracteres invalidos da string
  var result = "";
  var aux;
  for (var i=0; i < valor.length; i++) {
  aux = validos.indexOf(valor.substring(i, i+1));
  if (aux>=0) {
  result += aux;
  }
  }
  return result;
  }

  // Formata n�mero tipo moeda usando o evento onKeyDown

  function FormataValor2(campo,tammax,teclapres,decimal) {
  var tecla = teclapres.keyCode;
  vr = LimparMoeda(campo.value,"0123456789");
  tam = vr.length;
  dec=decimal

  if (tam < tammax && tecla != 8){ tam = vr.length + 1 ; }

  if (tecla == 8 )
  { tam = tam - 1 ; }

  if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 )
  {

  if ( tam <= dec )
  { campo.value = vr ; }

  if ( (tam > dec) && (tam <= 5) ){
  campo.value = vr.substr( 0, tam - 2 ) + "," + vr.substr( tam - dec, tam ) ; }
  if ( (tam >= 6) && (tam <= 8) ){
  campo.value = vr.substr( 0, tam - 5 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ;
  }
  if ( (tam >= 9) && (tam <= 11) ){
  campo.value = vr.substr( 0, tam - 8 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ; }
  if ( (tam >= 12) && (tam <= 14) ){
  campo.value = vr.substr( 0, tam - 11 ) + "." + vr.substr( tam - 11, 3 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ; }
  if ( (tam >= 15) && (tam <= 17) ){
  campo.value = vr.substr( 0, tam - 14 ) + "." + vr.substr( tam - 14, 3 ) + "." + vr.substr( tam - 11, 3 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - 2, tam ) ;}
  }

  }
  
  function FormataData2(campo,teclapres){
	  var tecla = teclapres.keyCode;
	  vr = campo.value;
	  vr = vr.replace("/","");
	  vr = vr.replace("/","");
	  tam = vr.length;
	  
	  if (tam < 8 && tecla != 8) {
		tam = vr.length + 1;
	  }
	  if (tecla == 8) {
		tam = tam - 1;
	  }

	  if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 ){

		  if(tam >= 2 && tam < 5){
			  campo.value = vr.substr(0,tam - 2) + '/' + vr.substr(tam - 2, tam);
		  }

		  if(tam >= 5 && tam <= 10){
			  campo.value = vr.substr(0,2) + '/' + vr.substr(2,2) + '/' + vr.substr(4,4);
		  }
	  }
  }

  function mostraFilhos(flagMostra, codDiv){
	if(flagMostra == 1){
		document.getElementById("itensFilhos_"+codDiv).style.display = 'block';
	}else{
		document.getElementById("itensFilhos_"+codDiv).style.display = 'none';
	}
  }

function formataDado2(campo, tammax, pos, teclapres) {
	var keyCode;
	if (teclapres.srcElement) {
		keyCode = teclapres.keyCode; 
	} else if (teclapres.target) {
		keyCode = teclapres.which; 
	}
	
	if ((keyCode < 48 || keyCode > 57) && keyCode != 8 && keyCode != 88 && (keyCode != 120)) {
		return false;
	}
	
	var tecla = keyCode;
	vr = campo.value;
	vr = vr.replace("-", "");
	vr = vr.replace("/", "");
	tam = vr.length;
	if (tam < tammax && tecla != 8) {
		tam = vr.length + 1;
	}
	if (tecla == 8) {
		tam = tam - 1;
	}
	
	if (tecla == 8 || tecla == 88 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 || tecla == 120) {
		if (tam <= 2) {
			campo.value = vr;
		}
		if (tam > pos && tam <= tammax) {
			campo.value = vr.substr(0, tam - pos) + "-" + vr.substr(tam - pos, tam);
			campo.focus();
		}
	}
}

function LimparMoeda(valor, validos) {
  // retira caracteres invalidos da string
  var result = "";
  var aux;
  for (var i=0; i < valor.length; i++) {
  aux = validos.indexOf(valor.substring(i, i+1));
  if (aux>=0) {
  result += aux;
  }
  }
  return result;
  }

  // Formata n�mero tipo moeda usando o evento onKeyDown

  function FormataValor2(campo,tammax,teclapres,decimal) {
  var tecla = teclapres.keyCode;
  vr = LimparMoeda(campo.value,"0123456789");
  tam = vr.length;
  dec=decimal

  if (tam < tammax && tecla != 8){ tam = vr.length + 1 ; }

  if (tecla == 8 )
  { tam = tam - 1 ; }

  if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 )
  {

  if ( tam <= dec )
  { campo.value = vr ; }

  if ( (tam > dec) && (tam <= 5) ){
  campo.value = vr.substr( 0, tam - 2 ) + "," + vr.substr( tam - dec, tam ) ; }
  if ( (tam >= 6) && (tam <= 8) ){
  campo.value = vr.substr( 0, tam - 5 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ;
  }
  if ( (tam >= 9) && (tam <= 11) ){
  campo.value = vr.substr( 0, tam - 8 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ; }
  if ( (tam >= 12) && (tam <= 14) ){
  campo.value = vr.substr( 0, tam - 11 ) + "." + vr.substr( tam - 11, 3 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ; }
  if ( (tam >= 15) && (tam <= 17) ){
  campo.value = vr.substr( 0, tam - 14 ) + "." + vr.substr( tam - 14, 3 ) + "." + vr.substr( tam - 11, 3 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - 2, tam ) ;}
  }

  }
  
  function FormataData2(campo,teclapres){
	  var tecla = teclapres.keyCode;
	  vr = campo.value;
	  vr = vr.replace("/","");
	  vr = vr.replace("/","");
	  tam = vr.length;
	  
	  if (tam < 8 && tecla != 8) {
		tam = vr.length + 1;
	  }
	  if (tecla == 8) {
		tam = tam - 1;
	  }

	  if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 ){

		  if(tam >= 2 && tam < 5){
			  campo.value = vr.substr(0,tam - 2) + '/' + vr.substr(tam - 2, tam);
		  }

		  if(tam >= 5 && tam <= 10){
			  campo.value = vr.substr(0,2) + '/' + vr.substr(2,2) + '/' + vr.substr(4,4);
		  }
	  }
  }

  
  	function mostrarPasseioVirutal(){
		document.getElementById("conteudoBoasVindas").style.display='none';
		document.getElementById("passeioVirtual").style.display='block'; 
	}
	function voltarTelaPasseioVirutal(){
		document.getElementById("passeioVirtual").style.display='none'; 
		document.getElementById("conteudoBoasVindas").style.display='block'; 
	}
	
	function parseDouble(value){
		if(typeof value == "string") {
			value = value.match(/^-?\d*/)[0];
		}
		return !isNaN(parseInt(value)) ? value * 1 : NaN;
	}		
	

	function substLinks(){ 
		var links = document.getElementsByTagName("a");
		var linksCount = links.length;
		var idioma = "1";
		var uri = location.href;
		if (uri.indexOf("/",10)!=-1)  
		{
			uri = uri.substr(0,uri.indexOf("/",10));
		}
			for(var i=0; linksCount >i ;i++) 
			{
				if (links[i].href != "" && links[i].href != "#") 
				{
					if (links[i].href.indexOf("https://www2.bancobrasil.com.br/") != -1) 
					{
						urlPart = links[i].href.substr(31);
						links[i].href = uri + urlPart;
					}
					else if (links[i].href.indexOf("https://interadm/") != -1) 
					{
						urlPart = links[i].href.substr(16);
						links[i].href = uri + urlPart;
					}
					else if (links[i].href.indexOf("https://desainteradm/") != -1) 
					{
						urlPart = links[i].href.substr(20);
						links[i].href = uri + urlPart;
					}
					else if (links[i].href.indexOf("bb.com.br") != -1 ||
							links[i].href.indexOf("bancodobrasil.com.br") != -1 ||
							links[i].href.indexOf("bancobrasil.com.br") != -1) 
					{
						//links[i].target="_blank";
					} 
					else if ((links[i].href.indexOf(uri) == -1) && (links[i].href.indexOf("javascript:") == -1) &&  (links[i].href.indexOf("/aapf/") == -1))
					{
						url = links[i];
						url = "javascript:popupAlertaRedirecionamento('/aapf/direciona.jsp?url="+url+"','popUp','width=566,height=482');";
						links[i].href =url;
						links[i].target="_self";
					}
				}
			}
	}

	var dateFormat = function () {
	    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
	        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	        timezoneClip = /[^-+\dA-Z]/g,
	        pad = function (val, len) {
	            val = String(val);
	            len = len || 2;
	            while (val.length < len) val = "0" + val;
	            return val;
	        };

	    // Regexes and supporting functions are cached through closure
	    return function (date, mask, utc) {
	        var dF = dateFormat;

	        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
	        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
	            mask = date;
	            date = undefined;
	        }

	        // Passing date through Date applies Date.parse, if necessary
	        date = date ? new Date(date) : new Date;
	        if (isNaN(date)) throw SyntaxError("invalid date");

	        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

	        // Allow setting the utc argument via the mask
	        if (mask.slice(0, 4) == "UTC:") {
	            mask = mask.slice(4);
	            utc = true;
	        }

	        var _ = utc ? "getUTC" : "get",
	            d = date[_ + "Date"](),
	            D = date[_ + "Day"](),
	            m = date[_ + "Month"](),
	            y = date[_ + "FullYear"](),
	            H = date[_ + "Hours"](),
	            M = date[_ + "Minutes"](),
	            s = date[_ + "Seconds"](),
	            L = date[_ + "Milliseconds"](),
	            o = utc ? 0 : date.getTimezoneOffset(),
	            flags = {
	                d:    d,
	                dd:   pad(d),
	                ddd:  dF.i18n.dayNames[D],
	                dddd: dF.i18n.dayNames[D + 7],
	                m:    m + 1,
	                mm:   pad(m + 1),
	                mmm:  dF.i18n.monthNames[m],
	                mmmm: dF.i18n.monthNames[m + 12],
	                yy:   String(y).slice(2),
	                yyyy: y,
	                h:    H % 12 || 12,
	                hh:   pad(H % 12 || 12),
	                H:    H,
	                HH:   pad(H),
	                M:    M,
	                MM:   pad(M),
	                s:    s,
	                ss:   pad(s),
	                l:    pad(L, 3),
	                L:    pad(L > 99 ? Math.round(L / 10) : L),
	                t:    H < 12 ? "a"  : "p",
	                tt:   H < 12 ? "am" : "pm",
	                T:    H < 12 ? "A"  : "P",
	                TT:   H < 12 ? "AM" : "PM",
	                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
	                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
	            };

	        return mask.replace(token, function ($0) {
	            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
	        });
	    };
	}();

	// Some common format strings
	dateFormat.masks = {
	    "default":      "ddd mmm dd yyyy HH:MM:ss",
	    shortDate:      "m/d/yy",
	    mediumDate:     "mmm d, yyyy",
	    longDate:       "mmmm d, yyyy",
	    fullDate:       "dddd, d 'de' mmm 'de' yyyy",
	    shortTime:      "h:MM TT",
	    mediumTime:     "h:MM:ss TT",
	    longTime:       "h:MM:ss TT Z",
	    isoDate:        "yyyy-mm-dd",
	    isoTime:        "HH:MM:ss",
	    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	};

	// Internationalization strings
	dateFormat.i18n = {
	    dayNames: [
	        "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab",
	        "Domingo", "Segunda", "Ter�a", "Quarta", "Quinta", "Sexta", "S�bado"
	    ],
	    monthNames: [
	        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",
	        "Janeiro", "Fevereiro", "Mar�o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
	    ]
	};

	Date.prototype.format = function (mask, utc) {
	    return dateFormat(this, mask, utc);
	};
	Date.prototype.cloneDate= function(){
	    return(new Date(this.getFullYear(),this.getMonth(),this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds(),this.getMilliseconds()));
	}
	Date.prototype.addYears= function(y){
	    this.setFullYear(this.getFullYear()+y);
	    return this;
	}
	Date.prototype.addMonth= function(m){
	    this.setMonth(this.getMonth()+m);
	    return this;
	}
	Date.prototype.addHours= function(h){
	    this.setHours(this.getHours()+h);
	    return this;
	}
	Date.prototype.addMinutes= function(m){
	    this.setMinutes(this.getMinutes()+m);
	    return this;
	}
	Date.prototype.addSecond= function(s){
	    this.setSeconds(this.getSeconds()+s);
	    return this;
	}
	Date.prototype.addDay= function(d){
	    this.setDate(this.getDate()+d);
	    return this;
	}
	Date.prototype.addDays= function(d){
	    var dt= new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0,0);
	    dt.setDate(this.getDate()+d);
	    return dt;
	}
	Date.prototype.setHourMinute= function(hour,minute){
	    this.setHours(hour);
	    this.setMinutes(minute);
	    this.setSeconds(0);
	    this.getDay();
	    return this;
	}
	Date.prototype.setHourMinuteSecond= function(hour,minute,second){
	    this.setHours(hour);
	    this.setMinutes(minute);
	    this.setSeconds(second);
	    this.getDay();
	    return this;
	}
	Date.prototype.getDataFormatada= function(){
	    var dia = this.getDate();
	    dia = dia > 9 ? dia : "0"+dia;
	    var mes = parseInt(this.getMonth())+1;
	    mes = mes > 9 ? mes : "0"+mes;
	    var ano = this.getFullYear();
	    return dia+"/"+mes+"/"+ano;
	}
	
	function verificaSessao() { 
		if(jQuery('#cronometro_div').length > 0){
			var sessaoExpirou = jQuery('#cronometro_div').cronometroSessao('isExpirouSessao');
			if (sessaoExpirou) {
				window.location = "/aapf/principal.jsp";
				return false;
			}
		}
		return true;
		
	}	
	
	function imprimirElemento(elemento){ 
		
		var html = "<html><head>";
		jQuery('link[rel=stylesheet]').each( function(index, value) {
			html+="<link rel='stylesheet' href='" + jQuery(this).attr("href") + "'/>";
		});
		
		var htmlCorpo = jQuery(elemento).html();
		
		
		var nomeElementoCorpo = $("#corpoSRP").length === 0 ? ".corpo" : "#corpoSRP";
		
		
		html+="</head><body><div id='"+nomeElementoCorpo+"'/>" + htmlCorpo+ "</div></body></html>";
		
		var windowUrl = 'about:blank';
		var uniqueName = new Date();
		var windowName = 'Print' + uniqueName.getTime();
		var printWindow = window.open(windowUrl, windowName, 'left=0,top=0'); 
		printWindow.document.write(html);
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
		printWindow.close();
	}
	function tratarCampoPesquisaFocoEntrada(campo){
		if(jQuery(campo).val() == "Procurar"){
			jQuery(campo).val("");
		}
	}
	function tratarCampoPesquisaFocoSaida(campo){
		if(jQuery(campo).val() == ""){
			jQuery(campo).val("Procurar");
		}
	}	
	
	function abrirFecharinformacoesImportantes(objeto){
		
		if($(objeto).hasClass("botaofechar")){
			$(objeto).addClass("botaoabrir").removeClass("botaofechar").text("Abrir");
			$(".informacoes-importantes-conteudo").slideUp();
		}else{
			$(objeto).addClass("botaofechar").removeClass("botaoabrir").text("Fechar");
			$(".informacoes-importantes-conteudo").slideDown();
		}
		
	}
	
	String.prototype.replaceNonNumbers = function(){
	    var str = this;
	    return (str.replace(/\D/g, ""));
	}	
	
	function submeteBoletosBB(){
		executarAjaxJQueryJson867("/aapf/pagamento/includes/atualizaObjetoJson867.jsp", $("#aapf").serialize(),
				null,
				function(data){
					document.getElementById("cpfCedente").value = "";
					document.getElementById("cnpjCedente").value = "";
					document.getElementById("cpfSacado").value = "";
					document.getElementById("tipoDocCedente").value = "";
					document.getElementById("botaoContinua1Hidden.x").value = "sim";
					$("#camposAdicionais").hide("slow");					
					document.forms.aapf.submit();					
				},
				function(a,b,c){
					alert(a.responseText + " - " + b + " - " + c );
				}
		);

	}
	
	//func�es do login interno
	function getSenhaLogin(div,nativo,idCh,idDg,idDg2,campo,seed,isIpad,isAndroid){
		try{
			var valor = document.getElementById(campo).value;
			if(!isIpad && !isAndroid)				
				document.getElementById(campo).value = encriptaSenhaLogin(div,nativo,idCh,idDg,idDg2,valor,seed);		
		}catch(e){
			if(e == "ErroApplet"){
				$("#janela_modal").css({"height":"370px"});
				$("#divErros").css({"color":"red","text-align":"left","width": "376px"}); 
				$("#divErros").html("<span style='color:red;'>Erro ao executar Login.<br/>Verifique se o plugin JAVA est� ativado.</span>");				
				throw new e;
			}
		}
	}
	
	
	function getSenhaLoginInternoA3() {
		try{
			if (document.applets['_bbAssinador_applet']){
				if(document.applets['_bbAssinador_applet'].ok()){
					return true;
				}else
					return false;
			} 
		
			return true;
		}catch(e){}
	}	
	
	function submeteBoletosBB(){
		executarAjaxJQueryJson867("/aapf/pagamento/includes/atualizaObjetoJson867.jsp", $("#aapf").serialize(),
				null,
				function(data){
					document.getElementById("cpfCedente").value = "";
					document.getElementById("cnpjCedente").value = "";
					document.getElementById("cpfSacado").value = "";
					document.getElementById("tipoDocCedente").value = "";
					document.getElementById("botaoContinua1Hidden.x").value = "sim";
					$("#camposAdicionais").hide("slow");					
					document.forms.aapf.submit();					
				},
				function(a,b,c){
					alert(a.responseText + " - " + b + " - " + c );
				}
		);

	}
	
	function verificaCamposCOB(){
		executarAjaxJson("/aapf/pagamento/includes/verificaCamposAdicionais.jsp", $("#aapf").serialize(),
				null,
				function(data){
					//alert(data.camposAdicionais);
					if(data.camposAdicionais == "sim"){
						$("#camposAdicionais").show("slow");
			            if (data.submeterFormulario == "sim"){
			            	document.getElementById("botaoContinua1Hidden.x").value = "sim";
			            	document.forms.aapf.submit();			            	
			            }
					}else{
						if(data.camposAdicionais == "erro"){
							$("#camposAdicionais").hide("slow");
			            	document.getElementById("botaoContinua1Hidden.x").value = "sim";							
							document.forms.aapf.submit();
						}else{
							$("#camposAdicionais").hide("slow");
			            	document.getElementById("botaoContinua1Hidden.x").value = "sim";							
							document.forms.aapf.submit();								
						}
					}
				},
				function(a,b,c){
					//alert(a.responseText + " - " + b + " - " + c );
				}
		);

	}
	
	
	function submeteBoletosBB(){
		executarAjaxJson("/aapf/pagamento/includes/atualizaObjetoJson867.jsp", $("#aapf").serialize(),
				null,
				function(data){
					document.getElementById("cpfCedente").value = "";
					document.getElementById("cnpjCedente").value = "";
					document.getElementById("cpfSacado").value = "";
					document.getElementById("tipoDocCedente").value = "";
					document.getElementById("botaoContinua1Hidden.x").value = "sim";
					$("#camposAdicionais").hide("slow");					
					document.forms.aapf.submit();					
				},
				function(a,b,c){
					alert(a.responseText + " - " + b + " - " + c );
				}
		);

	}
	
	function exibirDetalhes8CM(objeto, objetoDetalhe) {
		if(objeto.name == 'btnMais'){
			objeto.src="/aapf/imagens/tecladoJs/menos.png";
			objeto.name = 'btnMenos';
			$("#d"+objetoDetalhe).show("slow");			
		}else{ 
			objeto.src="/aapf/imagens/tecladoJs/mais.png"; 
			objeto.name = 'btnMais';
			document.getElementById("d"+objetoDetalhe).style.display = "none";			
		} 	
	}	
	
	function link(){
		window.location = "/aapf/ipadlinks.jsp";
	}
	
	function validaValorNovoLimite(campo, valorMaximo){
		try{
			var valorCampoDesformatado = campo.value.replace(/[,.]/g,"");
			if(valorCampoDesformatado > valorMaximo){
				campo.className = "valorErro";
				setTimeout("jQuery('#"+ campo.id +"')[0].focus()",0); 
			}else
				campo.className = "valor";
				
		}catch(e){}
	}
	
	function preencherCamposTransacoesRecentes(objeto){

		if(objeto.lista === 75){
			$("#bancoDestinatario option[value='"+objeto.bancoDestinoDOC+"']").prop("selected","true");
			$(".custom-combobox input").val(jQuery("#bancoDestinatario option[value='"+objeto.bancoDestinoDOC+"']").text());
			$("#agenciaDestinataria").val(objeto.agenciaDestinoDOC);
			$("#contaDestinataria").val(objeto.contaDestinoDOC);
			
			if(objeto.tipoFavorecidoDOC === '1'){
				$("#indicadorPessoa[value='1']").prop("checked", "true");
				$(".divcpf").css("display","block");
				$(".divcnpj").css("display","none");
				$("#campoCpf").val(objeto.cpfcnpj);
			}else{
				$("#indicadorPessoa[value='2']").prop("checked", "true");
				$(".divcpf").css("display","none");
				$(".divcnpj").css("display","block");
				$("#campoCnpj").val(objeto.cpfcnpj);
			}
			$("#tipoDOC option[value='"+objeto.tipoDOC+"']").prop("selected","true");
			$("#finalidade option[value='"+objeto.finalidadeDOC+"']").prop("selected","true");
			$("#dataTransferencia")[0].focus();
			
		}else if(objeto.lista === 77){
			
			$("#campoCpf").val(objeto.campoCpf);
			$("#ddd").val(objeto.ddd);
			$("#telefone").val(objeto.telefone);
			$("#confirmaDdd").val(objeto.ddd);
			$("#confirmaTelefone").val(objeto.telefone);
			$("#valor")[0].focus();
		}else if(objeto.lista === 14){
			
			$("#campoCpf").val(objeto.campoCpf);
			$("#ddd").val(objeto.ddd);
			$("#telefone").val(objeto.telefone);
			$("#confirmaDdd").val(objeto.ddd);
			$("#confirmaTelefone").val(objeto.telefone);
			$("#valor")[0].focus();
		}
	}
	
	function marcarRadioTabela(objeto){
		$(objeto).find("input[type='radio']").prop("checked",true);
	}

	function mudaCor( valor, acao )
	{
		var inputs = document.getElementsByTagName('input');
		
		for( var x = 0; x < inputs.length; x++ ){	
			if( inputs[x].type == "radio" && inputs[x].value == valor  ){	
				if( acao == "mudacor" )
					document.getElementById( valor ).style.backgroundColor = "#bebebe";
				else if( acao == "remove" )
					document.getElementById( valor ).style.backgroundColor = ""; 
			}	 
		}	 
	}

	var interId;
	var newht;
	var viewht;
	function mostrarListaComprovantes(objeto,heightMax,heightMin) {
		 
		if(jQuery(objeto).attr("estado") === 'fechado'){
			newht = heightMax;
		    var currentHt = jQuery('#divComprovantes').outerHeight(true);
		    viewht = Number(currentHt);
			interId = setInterval(alterarAlturaTabela, 20);
			jQuery(objeto).attr("src","/aapf/imagens/tecladoJs/menos.png").attr("estado","aberto");
		}else{ 
			newht = heightMin;
		    var currentHt = jQuery('#divComprovantes').outerHeight(true);
		    viewht = Number(currentHt);
			interId = setInterval(alterarAlturaTabela, 20);  
			jQuery(objeto).attr("src","/aapf/imagens/tecladoJs/mais.png").attr("estado","fechado");
		} 	
	} 

	function alterarAlturaTabela(){
		var altura = 0;
	    if(Math.abs(viewht - newht) <= 36){
	    	altura = newht;
	        clearInterval(interId); 
	    }else if(viewht < newht){
	        viewht = viewht +36;
	        altura = viewht;
	    }else{   
	        viewht = viewht -36;
	        altura = viewht;
	    }  
	    jQuery('#divComprovantes').css({"height":altura + "px"});
	}	
	
	/*
	 * formata valor com a quantidade de casas decimais desejada.
	 */
	function formataValorCasaDecimal(campo,qtdCasaDec) {
		try{
			if(qtdCasaDec == undefined)
				qtdCasaDec = 2;
			
			campo.value = formataNumerico(campo);
			vr = tiraZeros(campo.value);
			tam = vr.length;
			
			if ((tam == 1) && (vr == 0)){
		 		campo.value = ""; 
		 	} else if(tam <= qtdCasaDec){
		 		aux = "0,";
		 		tamCasaDecimal = qtdCasaDec-tam;
		 		for (i = 0; i < tamCasaDecimal; i++) {
		 			aux += "0";
		 		}
		 		campo.value = aux + vr;
		 	}else{
		 		inte = vr.substr( 0, tam-qtdCasaDec); //parte inteira do valor
		 		dec = vr.substr( tam-qtdCasaDec, tam);//parte decimal do valor
		 		tamInte = inte.length;
		 		aux = "";
		 		cont = 0; 
		 		for (i = tamInte-1; i >= 0; i--) {
		 			if(cont == 3){
		 				aux = "."+aux;
		 				cont = 0;
		 			}
		 			aux = inte.charAt(i) + aux;	 			
		 			cont++;
		 		}
		 		
		 		campo.value = aux + (qtdCasaDec != 0 ? "," : "") + dec;
		 	}
			
		}catch(e){}
	 	
	}	
	
	function existeRadioSelecionado(classeRadio){
		var isChecked = false;
		$('.'+classeRadio).each(function(){
			if($(this).is(":checked")){
				isChecked = true;
			};
		});
		return isChecked;
	}
	
	function getValorRadioSelecionado(classeRadio){
		var valor = "";
		$('.'+classeRadio).each(function(){
			if($(this).is(":checked")){
				valor = $(this).val(); 
			};
		});
		return valor;
	}	
	
	function setarRadioDesabilitando(obj, classeRadio, valor){
		$('.'+classeRadio).attr('disabled',false); 
		$(obj).find('.'+classeRadio).prop('checked', true);
		$(obj).find('.'+classeRadio).prop('disabled', true);
	}
	
	/* Retorna um dia da semana por extenso 
	 * data - data no formato DD/MM/AAAAA
	 * tipoRetorno:
	 * 		min - dia da semana com 1 letra	
	 * 		med - dia da semana com 3 letras
	 * 		max - dia da semana completo
	 */
	function getDiaSemana(data, tipoRetorno){
		var dias = ["DOMINGO","SEGUNDA-FEIRA","TER�A-FEIRA","QUARTA-FEIRA","QUINTA-FEIRA","SEXTA-FEIRA","S�BADO"];
		data = stringToDate(data);
		var qtdeCar = tipoRetorno == "min" ? 1 : tipoRetorno == "med" ? 3 : 0;
		var dia = dias[data.getDay()];
		return qtdeCar != 0 ? dia.substr(0, qtdeCar) : dia;
	}
	
	/*
	 * Recebe uma string no formato DD/MM/AAAA e retorna um objeto data
	 */
	function stringToDate(data){
		return new Date(data.split("/")[1]+"/"+data.split("/")[0]+"/"+data.split("/")[2]);
	}
	   
	/*
	 * Cria uma div por cima de outra deixando a que fica por tr�s
	 * sem poder ser modificada
	 * Parametros:
	 *		idDiv = div a ser bloqueada
	 *		textoBloqueio = texto que aparecer� quando a div for bloqueada		
	 */
	function bloqueiaDiv(idDiv, textoBloqueio){
			var divBloqueada = $('#'+idDiv);
		 	var largura = divBloqueada.width();
		 	var altura = divBloqueada.height();   

			$("#"+idDiv+"Bloqueio").remove();
		 	
			var divBloqueio = $('<div></div>').attr("id",idDiv+"Bloqueio").attr("style", "filter:alpha(opacity=60); -moz-opacity: 0.6; opacity: 0.2; position: absolute; z-index: 90; width: "+ largura +"; height: "+ altura +"; background-color: black;");
			var tableBloqueio = $('<table></table>').attr("width", largura).attr("height", altura);
			var trBloqueio = $('<tr></tr>').attr("height", altura);
			var tdBloqueio = $("<td align='center'>"+ textoBloqueio +'</td>').attr("valign", "middle").attr("style", "font-size: 22px; font-weight: bold; color: #2C566E;");
			
			trBloqueio.append(tdBloqueio);
			tableBloqueio.append(trBloqueio);
			divBloqueio.append(tableBloqueio);
			divBloqueada.prepend(divBloqueio);
	}
	
	function desBloqueiaDiv(idDiv){
		$("#"+idDiv+"Bloqueio").remove();
	}
	
	function carregarENI(inibeENI){
		if(inibeENI === 'null'){
			if (document.URL.indexOf("www2.bancobrasil.com.br") !== -1){		
				function IdentificadorBB() { this.browserDetect = new BrowserDetect(); this.flashDetector = new Flash(navigator.userAgent); this.pdfDetector = new PDF(); this.gravouInicio = false; }  IdentificadorBB.prototype = {  count : function (u, d, s, e, g, i, z, y, a, r) { if (s != "") { if (s.indexOf('?') != -1) s = s.substring(0, s.indexOf('?')); s = s.replace(/\!/g, '!3D'); s = s.replace(/\//g, '!2F'); s = s.replace(/\?/g, '!3F'); s = s.replace(/\&/g, '!26'); } r = document.referrer; if (r != null && r != "") { if (r.indexOf('?') != -1) r = r.substring(0, r.indexOf('?')); r = r.replace(/\!/g, '!3D').replace(/\//g, '!2F').replace(/\?/g, '!3F').replace(/\&/g, '!26'); } source = "https://www57.bb.com.br/eni/APPS/counter" + (u != '' ? "/u!3D" + u : "") + "/e!3D" + e + (a != '' ? "/a!3D" + a : "") + (g != '' ? "/g!3D" + g : "") + (i != '' ? "/i!3D" + i : "") + "/d!3D" + d + (z != '' ? "/z!3D" + z : "") + (y != '' ? "/y!3D" + y : "") + (r == '' ? "" : '/r!3D' + r) + (s == '' ? "" : "/s!3D" + s); imagem = document.createElement("img"); imagem.setAttribute('src', source); return false; },  contaURL : function (d, e, s, p) { return this.count('', d, s, e, 'URL', '', '', '', p, ''); },  contaObjeto : function (d, e, g, i, p) { return this.count('', d, '', e, g, i, '', '', p, ''); },  contaObjetoExterno : function (d, e, z, y, p) { return this.count('', d, '', e, '', '', z, y, p, ''); },  getBrowserId : function() { if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 2) {return 2;}if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 3) { return 3; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 4){ return 4; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 5) { return 5; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 6) { return 6; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 7){ return 7; }if (this.browserDetect.browser == "Firefox" && this.browserDetect.version == 2) { return 8; }if (this.browserDetect.browser == "Firefox" && this.browserDetect.version == 3) { return 9; }if (window.navigator.appName === 'Opera' && (function(){var a=window.navigator.userAgent.match(/Version\/(\d+\.\d+)/i); return a != null && a.length >= 2 && a[1] === '10.60';})){return 10;}if (this.browserDetect.browser == "Chrome" && this.browserDetect.version == 2) { return 11; }if (this.browserDetect.browser == "Opera" && this.browserDetect.version == 8) { return 12; }if (this.browserDetect.browser == "Opera" && this.browserDetect.version == 7) { return 13; }if (this.browserDetect.browser == "Firefox" && this.browserDetect.version == 3.6) { return 14; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 8) { return 15; }if (window.navigator.appName === 'Opera' && (function(){var a=window.navigator.userAgent.match(/Version\/(\d+\.\d+)/i); return a != null && a.length >= 2 && a[1] === '10.50';})){return 16;}if (window.navigator.appName === 'Opera' && (function(){var a=window.navigator.userAgent.match(/Version\/(\d+\.\d+)/i); return a != null && a.length >= 2 && a[1] === '10';})){return 17;}if (this.browserDetect.browser == "Opera" && this.browserDetect.version == 9) { return 18; }if (this.browserDetect.browser == "Chrome" && this.browserDetect.version == 6) { return 19; }if (this.browserDetect.browser == "Chrome" && this.browserDetect.version == 5) { return 20; }if (this.browserDetect.browser == "Safari" && this.browserDetect.version == 5) { return 21; }if (this.browserDetect.browser == "invalido") { return 99; }if (this.browserDetect.browser == "invalido2") { return 999; }if (this.browserDetect.browser == "Explorer") { return 32000; }if (this.browserDetect.browser == "Firefox") { return 32001; }if (this.browserDetect.browser == "Chrome") { return 32002; }if (this.browserDetect.browser == "Safari") { return 32003; } return 0; },  getOSId : function() { if (navigator.userAgent.indexOf("Windows 95") != -1) {return 1;}if (navigator.userAgent.indexOf("Windows 98") != -1) {return 2;}if (navigator.userAgent.indexOf('Windows NT 5.1') != -1) {return 3;}if (navigator.userAgent.indexOf('Windows NT 6.0') != -1) {return 4;}if (navigator.userAgent.indexOf("Mac OS X") != -1) {return 5;}if (navigator.userAgent.indexOf("FreeBSD") != -1) {return 6;}if (navigator.userAgent.indexOf("Linux") != -1) {return 7;}if (navigator.userAgent.indexOf("OS/2") != -1) {return 8;}if (navigator.userAgent.indexOf('Windows NT 5.2') != -1) {return 9;}if (navigator.userAgent.indexOf('Windows NT 6.1') != -1) {return 10;} return 0; },  getFlash : function() { flash = this.flashDetector.detectar(); if(flash.major == 9) {return 1}if(flash.major == 8) {return 2}if(flash.major == 7) {return 3}if(flash.major == 10) {return 4} return 0; },  gravaInicioNavegacao : function(d, e, url){ this.gravouInicio = true; this.escreveCookie('cDuracao', this.leCookie('cDuracao') + '|u!3D1!pipeg!3DURL!pipet!3D' + new Date().getTime() +'!pipes!3D' + url + '!pipee!3D' + e + '!piped!3D' + d, 1); },  gravaFimNavegacao : function (url) { if (this.gravouInicio) { this.escreveCookie('cDuracao', this.leCookie('cDuracao') + '!pipetf!3D' + new Date().getTime() +'!pipeof!3D' + url, 1); this.gravouInicio = false; } },   getPDF : function(){ return this.pdfDetector.detectar(); },  getSuportaJava : function() { if (window.navigator.javaEnabled()) return 1; return 0; },  escreveCookie : function(name, value, time_exp) { if (time_exp != "") { var exp = new Date(); var expira = exp.getTime() + (time_exp * 1728000000); exp.setTime(expira); document.cookie = "" + name + "=" + value + "; expires=" + exp.toGMTString() + "; path=/"; } }, leCookie : function(name) { var cookieValue = ""; var search = name + "="; if (document.cookie.length > 0) { offset = document.cookie.indexOf(search); if (offset != -1) { offset += search.length; end = document.cookie.indexOf(";", offset); if (end == -1) end = document.cookie.length; cookieValue = unescape(document.cookie.substring(offset, end)); } } return cookieValue; }, gravaCookieCliente : function() { var temp = this.leCookie("cDetalhe"); if (temp == "" || temp.indexOf("b!3D") == -1) { this.escreveCookie("cDetalhe", "b!3D" + this.getBrowserId() + "|o!3D" + this.getOSId() + "|j!3D" + this.getSuportaJava() + "|p!3D" + this.getPDF() + "|f!3D" + this.getFlash() , 1); } } };  function getActiveXVersion (activeXObj) { var version = -1; try { version = activeXObj.GetVariable("$version"); } catch (err) { } return version; }  function Flash(os) { this.installed = false; this.raw = ""; this.major = -1; this.minor = -1; this.revision = -1; this.revisionStr = ""; this.nomeOS = os; this.activeXDetectRules = [ { "name" :"ShockwaveFlash.ShockwaveFlash.7", "version" : function(obj) { return getActiveXVersion(obj); } }, { "name" :"ShockwaveFlash.ShockwaveFlash.6", "version" : function(obj) { var version = "6,0,21"; try { obj.AllowScriptAccess = "always"; version = getActiveXVersion(obj); } catch (err) { } return version; } }, { "name" :"ShockwaveFlash.ShockwaveFlash", "version" : function(obj) { return getActiveXVersion(obj); } } ]; } Flash.prototype = { getActiveXObject : function(name) { var obj = -1; try { obj = new ActiveXObject(name); } catch (err) { } return obj; }, parseActiveXVersion : function(str) { var versionArray = str.split(","); return { "raw" :str, "major" :parseInt(versionArray[0].split(" ")[1], 10), "minor" :parseInt(versionArray[1], 10), "revision" :parseInt(versionArray[2], 10), "revisionStr" :versionArray[2] }; }, parseStandardVersion : function(str) { var descParts = str.split(/ +/); var majorMinor = descParts[2].split(/\./); var revisionStr = descParts[3]; return { "raw" :str, "major" :parseInt(majorMinor[0], 10), "minor" :parseInt(majorMinor[1], 10), "revisionStr" :revisionStr, "revision" :this.parseRevisionStrToInt(revisionStr) }; }, parseRevisionStrToInt : function(str) { return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || this.revision; }, majorAtLeast : function(version) { return this.major >= version; }, detectar : function() { if (navigator.plugins && navigator.plugins.length > 0) { var type = 'application/x-shockwave-flash'; var mimeTypes = navigator.mimeTypes; if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description) { var version = mimeTypes[type].enabledPlugin.description; versionObj = this.parseStandardVersion(version); this.raw = versionObj.raw; this.major = versionObj.major; this.minor = versionObj.minor; this.revisionStr = versionObj.revisionStr; this.revision = versionObj.revision; this.installed = true; } } else if (this.nomeOS.indexOf("Mac") == -1 && window.execScript) { version = -1; for ( var i = 0; i < this.activeXDetectRules.length && version == -1; i++) { var obj = this.getActiveXObject(this.activeXDetectRules[i].name); if (typeof obj == "object") { this.installed = true; version = this.activeXDetectRules[i].version(obj); if (version != -1) { versionObj = this.parseActiveXVersion(version); this.raw = versionObj.raw; this.major = versionObj.major; this.minor = versionObj.minor; this.revision = versionObj.revision; this.revisionStr = versionObj.revisionStr; } } } } return { "raw" : this.raw, "major" : this.major, "minor" : this.minor, "revision" : this.revision, "revisionStr" : this.revisionStr, "instaled" : this.installed }; } };  function PDF() { } PDF.prototype = { detectar : function() {  mimeTypes = navigator.mimeTypes; try{ displayString = mimeTypes['application/pdf'].enabledPlugin.description; }catch(e) { if (navigator.plugins && navigator.plugins.length) { for (x = 0; x < navigator.plugins.length; x++) { if (navigator.plugins[x].description.indexOf('Adobe Acrobat') != -1) { this.version = parseFloat(navigator.plugins[x].description.split('Version ')[1]); if (this.version.toString().length == 1) return 1; break; } } } else if (window.ActiveXObject) { for (x = 2; x < 10; x++) { try { oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x + "');"); if (oAcro) { return 1; } } catch (e) { } } try { oAcro4 = new ActiveXObject('PDF.PdfCtrl.1'); if (oAcro4) { return 1; } } catch (e) { } try { oAcro7 = new ActiveXObject('AcroPDF.PDF.1'); if (oAcro7) { return 1; } } catch (e) { } } return 0; } if (displayString != 'null') { return 1; } return 0; } };  function BrowserDetect() { this.browser = this.searchString(this.dataBrowser) || "outros Browsers"; this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version"; this.OS = this.searchString(this.dataOS) || "outros SO"; } BrowserDetect.prototype = {  searchString: function (data) { for (var i=0;i<data.length;i++) { var dataString = data[i].string; var dataProp = data[i].prop; this.versionSearchString = data[i].versionSearch || data[i].identity; if (dataString) { if (dataString.indexOf(data[i].subString) != -1) return data[i].identity; } else if (dataProp) return data[i].identity; } return null; },  searchVersion: function (dataString) { var index = dataString.indexOf(this.versionSearchString); if (index == -1) return index; return parseFloat(dataString.substring(index+this.versionSearchString.length+1)); }, dataBrowser: [ { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" }, { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" }, { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" }, { prop: window.opera, identity: "Opera" }, { string: navigator.vendor, subString: "iCab", identity: "iCab" }, { string: navigator.vendor, subString: "KDE", identity: "Konqueror" }, { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" }, { string: navigator.vendor, subString: "Camino", identity: "Camino" }, {  string: navigator.userAgent, subString: "Netscape", identity: "Netscape" }, { string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" }, { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" }, {  string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" } ], dataOS : [ { string: navigator.platform, subString: "Win", identity: "Windows" }, { string: navigator.platform, subString: "Mac", identity: "Mac" }, { string: navigator.platform, subString: "Linux", identity: "Linux" } ] };
				
		   		
		        try{
		            eni = new IdentificadorBB();
		            eni.gravaCookieCliente();
		            function conta()
		            {
		                eni.contaURL(4, 2, document.URL,''); //Conta URL APF
		            }
		            conta();
		        }catch(e)
		        {
		        }
			}			
		}
		
		
	}

	function carregarIBT(servidor){
		window._appKey = "u0jwbb";
		var servicecall = document.createElement('script');
		servicecall.type = 'text/javascript';
		servicecall.async = true;
		if(servidor === "interno" || servidor === "externo" || servidor === "piloto"){
			servicecall.src = window.location.protocol + '//www73.bb.com.br/web/static/visitor/scripts/pm.bootstrapper.js';
		}else{
			if(servidor === "homologacao"){
				servicecall.src = window.location.protocol + '//www73.hm.bb.com.br/web/static/visitor/scripts/pm.bootstrapper.js';			
			}else{
				servicecall.src = window.location.protocol + '//www73.desenv.bb.com.br/web/static/visitor/scripts/pm.bootstrapper.js';			
			}
		}
		
		setTimeout(
			function(){
				document.getElementsByTagName('head')[0].appendChild(servicecall);
			}, 
			0
		);		
	}
	
	function carregarAnalytics(servidor){
		if(servidor !== 'homologacao'){
			var aapfc = getCookie("aapf.c");
			var idPropriedade = 'UA-50963127-1';
			
			if (document.URL.indexOf("www2.bancobrasil.com.br") !== -1 || document.URL.indexOf("www21.bancobrasil.com.br") !== -1){
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				
				if (document.URL.indexOf("www21.bancobrasil.com.br") !== -1){
					idPropriedade = 'UA-50963127-9';
				}
				
				if(aapfc !== ''){
	    			ga('create', idPropriedade, 'bancobrasil.com.br', { 'userId': aapfc });
	    			ga('require', 'linkid', 'linkid.js');
	    			ga('require', 'displayfeatures');
	    			ga('send', 'pageview', {'dimension1':  aapfc});    				
				}else{
	    			ga('create', idPropriedade, 'bancobrasil.com.br');
	    			ga('require', 'linkid', 'linkid.js');
	    			ga('require', 'displayfeatures');
	    			ga('send', 'pageview');    				
				}
			}			
		}
	}
	
	function abrirContratoContaCorrente(){
		$.ajaxApf({"url" : "/aapf/servico","tiporetorno" : "json",
			"parametros" : {"servico":"enderecoContrato"}, 
			"funcaoAntesExecucao" :function(){},
			"funcaoSucesso" : function(data){
				if(data.url){
					window.open(data.url);
				}
			 }
		});	
	}
	$.redirecionar = function(url){
		window.location = url;
	};
	
	function abrirDebitoAutomatico1(parametro){
		$.abrirModal({'url':'/aapf/pagamento/847-A.jsp', 'parametros' : {'codBarra' : parametro}, 'width':'700','height' :'500'});
	};
	
	function abrirDebitoAutomatico2(parametro){
		$.abrirModal({'url':'/aapf/pagamento/847-P.jsp', 'parametros' : {'codBarra' : parametro},'width':'700','height' :'500'});
	};
	function acessarCorrentista(){
		acessar("aapf.IDH");
	}
	function acessarNaoCorrentista(){
		acessar("aapf.NC");
	}	
	function acessarDFV(){
		acessar("aapf.DFV");
	}
	function acessarA3(){
		acessar("aapf.A3");
	}
	function acessar(ambiente){
		$("input[name='aapf.IDH'],input[name='aapf.NC'],input[name='aapf.DFV'],input[name='aapf.A3']").remove();
		$("#refazerDadosPlugin").val("sim");
		$("#aapf").append($("<input></input>",{"type":"hidden","id":"ambeinte","name":ambiente}).val("sim"));
		$("#aapf").submit();
	}
	
	function assistenteVirtualBB(){
		var erro = $(".codigoErro").val();
		var largura = "width=595,";
		var altura = "height=600,";
		var url = '/aapf/assistenteVirtualBB.jsp';
		if (erro){
			url = url+"?erro="+erro;
		}
		window.open(url,'Assistente Virtual BB', largura + altura+'status=yes, scrollbars=no,resizable=0, screenX=0, screenY=0, left=0, top=0');
	}
	
	
	$.inicializarAssinadorA3 = function(){
		var dados = {
				"url" : "/aapf/servico",
				"tiporetorno" : "json",
				"parametros" : {"servico" : "numeroAleatorioCertificado"},
				"verificaSessao" : false,
				"funcaoSucesso" : function(data) {
					setTimeout(function(){
						carregarBBSmartCard(data.numeroAleatorio);
					},1000);					
				}
		};
		$.ajaxApf(dados);		
	}
	
	
	function carregarBBSmartCard(textoAssinatura){
	    var qtdCancel = 1;
		var hashObject = {type: 'SHA-1', hex: textoAssinatura};
        try{
	        if(!window.BBSmartcard){
	        	alert("Extensão BBSmartCard não instalado.");
	        	return;
			}	
	        
			window.BBSmartcard.signMessage(hashObject)
              .then(function(value) {
            	  	alert(value);
               })
              .catch(function(error){
                    if("no_certificates" === error.message){                    	
                    	alert("Insira seu cartão na leitora.");
                    	carregarBBSmartCard();
                    }else if("user_cancel" === error.message){
                    	if(qtdCancel === 3) return;
                    	else{
                    		qtdCancel++;
                    		carregarBBSmartCard();
                    	}
                    }else{
                    	alert('Erro assinatura digital. (CD001)');
                    	//console.log(error.message);
                    }
              });
        }catch(e){
        	//console.log("Erro ao efetuar assinatura digital -> "+e);
        	alert('Erro assinatura digital. (CD002)');
        }
	}	
	
	
	
	

	function startTimeoutWs(tempo) {
		timeoutWs =	setTimeout(
				function(){
					var formTemp = $('<form></form>').attr({id:"formTemp", name:"formTemp", action:"/aapf/login.jsp",target:"_self",method:"POST"});					
					formTemp.append($("<input></input>",{"type":"hidden","id":"codigoErro","name":"codigoErro"}).val("WS00006"));
					formTemp.append($("<input></input>",{"type":"hidden","id":"descricaoErro","name":"descricaoErro"}).val("Tela Trava"));						
					formTemp.append($("<input></input>",{"type":"hidden","id":"localizacao","name":"localizacao"}).val("52"));						
					formTemp.append($("<input></input>",{"type":"hidden","id":"forca-tela-trava","name":"forca-tela-trava"}).val("sim"));
				    $("body").append(formTemp);					
					formTemp.submit();
				}, 
				tempo
		);
	}	
	
	function stopTimeoutWs() {
	    clearTimeout(timeoutWs);
	}	
	function carregarPiwik(executar){
		if(executar){
			try{
				_paq.push(['trackPageView']);
				_paq.push(['enableLinkTracking']);
				(function() {
					var u="https://eni.bb.com.br/eni2/";
					_paq.push(['setTrackerUrl', u+'piwik.php']);
					_paq.push(['setSiteId', '16']);
					_paq.push(['setCustomVariable', 1, "usuarioLogin", "login", "visit"]);								
					_paq.push(['trackEvent', 'Login', 'Inicializando']);
					var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
					g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);

				})();
			}catch(erro){
				console.log(erro);
			}			
			
		}
		
	}

	function eventoPiwik(titulo, valor, executar){
		if(executar){
			try{
				_paq.push(['trackEvent', titulo, valor]);
			}catch(erro){
				console.log(erro);
			}			
		}
				
	}
	function tokenHorus(servidor, executar){
		$.ajaxApf({"url" : "/aapf/servico","tiporetorno" : "json",
			"parametros" : {"servico":"tokenHorus"}, 
			"funcaoAntesExecucao" :function(){},
			"funcaoSucesso" : function(data){
				_tokenHorus.push(data);
				carregarHorus(servidor, executar);				
			 },
			  "funcaoErro" : function(jqXHR, textStatus, errorThrown ){
				  carregarHorus(servidor, executar);
			  }
		});		
	}	
	
	function carregarHorus(servidor, executar){
		if(executar){
			window._appKey = "u0jwbb";
			
			var hostAmbiente = "//www100.desenv.bb.com.br";
			if(servidor === "interno" || servidor === "externo" || servidor === "piloto"){
				hostAmbiente = "//www100.bb.com.br";
			}else{
				if(servidor === "homologacao"){
					hostAmbiente = "//www100.hm.bb.com.br";
				}
			}	
			
			var browserMqtt = document.createElement('script');
			browserMqtt.type = 'text/javascript';
			browserMqtt.async = false;
			browserMqtt.src = window.location.protocol + hostAmbiente +'/assets/js/mqtt.min.js?v=1.0.2';
			
			var avsc = document.createElement('script');
			avsc.type = 'text/javascript';
			avsc.async = false;
			avsc.src = window.location.protocol + hostAmbiente +'/assets/js/avsc.min.js?v=1.0.2';
			
			var horus = document.createElement('script');
			horus.type = 'text/javascript';
			horus.async = false;
			horus.src = window.location.protocol + hostAmbiente +'/dist/horus.min.js?v=1.0.2';
			
			var cliente = document.createElement('link');
			cliente.type = 'text/css';
			cliente.rel = 'stylesheet';
			cliente.async = false;
			cliente.href = window.location.protocol + hostAmbiente +'/assets/css/client.css?v=1.0.2';
			
			setTimeout(function(){
				document.getElementsByTagName('head')[0].appendChild(browserMqtt);
				document.getElementsByTagName('head')[0].appendChild(avsc);	
				document.getElementsByTagName('head')[0].appendChild(cliente);
				setTimeout(function(){
					document.getElementsByTagName('head')[0].appendChild(horus);
				},300);
			}, 0);			
		}
	}	
	
	
	function abrirChat(servidor){
		var host = "https://api.desenv.bb.com.br";
		
		if(servidor === "interno" || servidor === "externo" || servidor === "piloto"){
			host = "https://mobile.api.bb.com.br";
		}else{
			if(servidor === "homologacao"){
				host = "https://api.hm.bb.com.br";
			}
		}		

		if($("div#horus-chatBox").length == 0) {
			var sa = new BBChatCognitivo({
				titulo : "Atendimento Virtual BB", // titulo da janela
				inputPlaceholder : "Informe a pergunta desejada ...", // texto que aparece no input
				//tipo : "WSA_WK1", // tipo de serviço que será utilizado
				tipo: "BOT_GSERV_HELPDESK_DESENV",
				feedback : true, //permite que o usuário informe feedback
				tipoAcesso:'P',
				resize:true, // pergmit que o usuário altere o tamanho da janela do chat
				host: host
				//usuario:{chave:"<F9342497>", prefixo:"<9909>"},//chave e prefixo do usuário autenticado
				//usuario:{chave:"<FXXXXXXX>", prefixo:"<9999>"},//chave e prefixo do usuário autenticado
			});
			
			//inicializa e apresenta a janela do chat.
			sa.iniciar();	
		}
	}	
	
	function carregarChat(servidor){
		var chat = document.createElement('script');
		chat.type = 'text/javascript';
		chat.charset = 'UTF-8';
		chat.crossorigin = 'use-credentials';			
		chat.src = '/aapf/includes/js/bb-chat-cognitivo.bb?v=1.0.4';
		chat.async = false;
		
		var chatCss = document.createElement('link');
		chatCss.type = 'text/css';
		chatCss.rel = 'stylesheet';
		chatCss.async = false;
		chatCss.href = '/aapf/includes/css/bb-chat-cognitivo.css?v=1.0.3';
		
		setTimeout(function(){
			document.getElementsByTagName('head')[0].appendChild(chatCss);			
			document.getElementsByTagName('head')[0].appendChild(chat);

		}, 0);			
	}	
	function carregarNavegg(servidor){
		if(servidor !== 'homologacao'){
			var isNaveg= null;
			timerNaveg = setTimeout(function(){
				(function(w,d,s){var f=d.getElementsByTagName(s)[0], j=d.createElement(s); j.async=false; j.id="navegg"; j.src='/aapf/includes/js/tm41493.js';f.parentNode.insertBefore(j,f);})(window,document,'script');
				isNaveg = true;
				clearTimeout(timerNaveg);
			},100);
			
			timerProtecNaveg = setTimeout(function(){
				if(!isNaveg){
					clearTimeout(timerNaveg);	
				}
			},3000);			
		}
	}

	//Formata o campo valor
	function formataValor3(campo) {
		var vr = campo;
		var tam = campo.length;

		if ( tam < 2 ){ 
	 		campo = '0,0' + vr ; }
		if ( tam == 2 ){ 
	 		campo = '0,' + vr ; }			
	 	if ( (tam > 2) && (tam <= 5) ){
	 		campo = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }
	 	if ( (tam >= 6) && (tam <= 8) ){
	 		campo = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
	 	if ( (tam >= 9) && (tam <= 11) ){
	 		campo = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
	 	if ( (tam >= 12) && (tam <= 14) ){
	 		campo = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
	 	if ( (tam >= 15) && (tam <= 18) ){
	 		campo = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;}
	 	return campo;
	 		
	}	
	
	/* Valida Email */
	function validacaoEmail(campo) {
		usuario = campo.value.substring(0, campo.value.indexOf("@"));
		dominio = campo.value.substring(campo.value.indexOf("@")+ 1, campo.value.length);
		if ((usuario.length >=1) &&
		    (dominio.length >=3) && 
		    (usuario.search("@")==-1) && 
		    (dominio.search("@")==-1) &&
		    (usuario.search(" ")==-1) && 
		    (dominio.search(" ")==-1) &&
		    (dominio.search(".")!=-1) &&      
		    (dominio.indexOf(".") >=1)&& 
		    (dominio.lastIndexOf(".") < dominio.length - 1)) {
				//$("#tipEmail").html("<font color='azul'>E-mail válido </font>");
		} else {
			$("#tipEmail").html("<font color='red' style='font-size: 10px;'>E-mail inválido </font>");
		}
	}
	
	/* Maiuscula ao digitar onkeyup="maiuscula(this);" */
	function maiuscula(z){
	    v = z.value.toUpperCase();
	    z.value = v;
	}
