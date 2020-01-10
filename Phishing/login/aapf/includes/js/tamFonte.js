var num = 0;
var title;

function maisZoom() {
	// var sizeAtual = document.getElementById('div_conteudo').style.fontSize;
    // sizeAtual = sizeAtual.substring(0, sizeAtual.indexOf('p'));
    var as = document.getElementsByTagName('a');
    var ps = document.getElementsByTagName('p');
    var h3s = document.getElementsByTagName('h3');
    var lis = document.getElementsByTagName('li');
    var divs = document.getElementsByTagName('div');

    aumentaPx(ps);
    aumentaPx(lis);
    aumentaPx(as);
    aumentaPx(h3s);
    aumentaPx(divs);
    
}

function menosZoom() {

	var as = document.getElementsByTagName('a');
	var ps = document.getElementsByTagName('p');
	var h3s = document.getElementsByTagName('h3');
	var lis = document.getElementsByTagName('li');
	var divs = document.getElementsByTagName('div');
   
	diminuiPx(ps);
	diminuiPx(lis);
	diminuiPx(as);
	diminuiPx(h3s);
	diminuiPx(divs);
    
}

function aumentaPx(elementos){
	var max = 15;
	
	for(i=0;i<elementos.length;i++) {
      if(elementos[i].style.fontSize) {
    	  var s = parseInt(elementos[i].style.fontSize.replace("px",""));
      } else {
    	  var s = 12;
      }
      if(s!=max) {
    	  s += 1;
      }
      elementos[i].style.fontSize = s+"px"
	}
}

function diminuiPx(elementos) {
	var min=10;
	
	for(i=0;i<elementos.length;i++) {
      if(elementos[i].style.fontSize) {
         var s = parseInt(elementos[i].style.fontSize.replace("px",""));
      } else {
         var s = 12;
      }
      if(s!=min) {
         s -= 1;
      }
      elementos[i].style.fontSize = s+"px"
  	}
}

function setActiveStyleSheet(param, reset) {
  if((param == "mais")&&(num < 3)){
  	  ++num;
	  if(num == 1){ title = "fonte12"; document.getElementById("amenos").src = "/aapf/im/imgDiminuiFonte.png"; }
	  if(num == 2){ title = "fonte13"; document.getElementById("amenos").src = "/aapf/im/imgDiminuiFonte.png"; }
	  if(num == 3){ title = "fonte14";  document.getElementById("amais").src = "/aapf/im/imgAumentaFonte.png"; }   
  }
   if((param == "menos")&&(num > 0)){
  	  --num;
	  if(num == 0){ title = "fonte11";  document.getElementById("amais").src = "/aapf/im/imgAumentaFonte.png"; document.getElementById("amenos").src = "/aapf/im/imgDiminuiFonte.png"; }
	  if(num == 1){ title = "fonte12";  document.getElementById("amais").src = "/aapf/im/imgAumentaFonte.png"; }
	  if(num == 2){ title = "fonte13";  document.getElementById("amais").src = "/aapf/im/imgAumentaFonte.png"; }
  }
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("href").indexOf("Fonte") != -1){
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
   }
  }  
 
 function setActiveStyleSheetEsp(param, reset) {
  if((param == "mais")&&(num < 3)){
  	  ++num;
	  if(num == 1){ title = "fonte12"; document.getElementById("amenos").src = "/aapf/im/imgAMenos.gif"; }
	  if(num == 2){ title = "fonte13"; document.getElementById("amenos").src = "/aapf/im/imgAMenos.gif"; }
	  if(num == 3){ title = "fonte14";  document.getElementById("amais").src = "/aapf/im/imgAMais.gif"; }   
  }
   if((param == "menos")&&(num > 0)){
  	  --num;
	  if(num == 0){ title = "fonte11";  document.getElementById("amais").src = "/aapf/im/imgAMais.gif"; document.getElementById("amenos").src = "/aapf/im/imgAMenos.gif"; }
	  if(num == 1){ title = "fonte12";  document.getElementById("amais").src = "/aapf/im/imgAMais.gif"; }
	  if(num == 2){ title = "fonte13";  document.getElementById("amais").src = "/aapf/im/imgAMais.gif"; }
  }
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("href").indexOf("Fonte") != -1){
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
   }
  }  