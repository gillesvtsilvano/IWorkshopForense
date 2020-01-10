//* for�a cache de scripts em chamadas ajax
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
  if ( options.dataType == 'script' || originalOptions.dataType == 'script' ) {
      options.cache = true;
  }
});

/*
 * fun��o respons�vel por todas as chamadas ajax
 * 
 */


$.ajaxApf = function(dados) {
	
	if($("#mci-ibt").val() !== undefined){
		if(!$("html").hasClass(tiraZeros($("#mci-ibt").val()))){
			window.location.href = "/aapf/principal.jsp?ambienteLayout=completo";
		}		
	}
	

	if (dados.type === undefined) { // metodo de passagem de parametros
		dados.type = "post";
	}
	
    if (dados.tiporetorno === undefined) { // tipo de retorno json ou html
        dados.tiporetorno = "html";
    }
    if (dados.parametros == undefined) {  // parametros no formato json  ex: {"nomeParametro" : "valorParametro"}
        dados.parametros = {};
    }
    
    if (dados.atualizaContadorSessao === undefined) { // metodo de passagem de parametros
		dados.atualizaContadorSessao = true;
	}
    
    
    dados.parametros.novoLayout = "sim";
    
    if(dados.tratarErroTransacao){
    	dados.parametros.erroFormatado = "sim";
    }    
    if (dados.funcaoAntesExecucao == undefined) {
        dados.funcaoAntesExecucao = function() {
            if (dados.elemento !== undefined) {
                jQuery(dados.elemento).html('<img id="imgCarregando" src="/aapf/imagens/carregando.gif"/>');
            }
        };
    }
    if($("#simbolo").val()){
    	dados.simbolo = $("#simbolo").val();    	
    	
    }else{
    	dados.simbolo = Date.now()+"8345754";    	
    }
    	
    
    if (dados.funcaoSucesso == undefined) {
        dados.funcaoOk = function(data) {
            try{
            	var elementoTemp = $("<div></div>").html(data);
            	$.atualizarScripts($(dados.elemento),elementoTemp);
            	
            	if(dados.atualizaContadorSessao){
            		if($.atualizarSessao){
            			$.atualizarSessao(elementoTemp);
            		}
            	}
            }catch(err){
                console.error(err.message);
            }
        };
    }else{
    	dados.funcaoOk = function(data){
    		dados.funcaoSucesso(data);
    		var elementoTemp = $("<div></div>").html(data);
    		if($.atualizarSessao){
    			$.atualizarSessao(elementoTemp);
    		}
    	};
    	
    }
    if (dados.funcaoErro == undefined) {
        dados.funcaoErro = function(jqXHR, textStatus, errorThrown ) {
            // console.log(jqXHR.responseXML );
        };
    }

    var conector = "?";
    if (dados.url.indexOf("?") != -1) {
        conector = "&";
    }
    
    if(dados.cache === undefined){
    	dados.cache = false;
    }
    
    var options = {
        type: dados.type,
        cache : dados.cache,
        url: dados.url + conector + 'time=' + Date.now()+dados.simbolo+ '&',
        data: dados.parametros,
        dataType: dados.tiporetorno,
        beforeSend: dados.funcaoAntesExecucao,
        success: dados.funcaoOk,
        error: dados.funcaoErro
    }
    ajax = $.ajax(options);
}

//fun��o que refaz todos os scripts de uma p�gina chamada via ajax
 
$.atualizarScripts = function(elemento,elementoTemp){

    var elementos = [];
    var elementosSrc = [];
    
    if(typeof elementoTemp === 'string'){
    	elementoTemp = $("<div></div>").html(elementoTemp);
    }
    
    elementoTemp.find('script').each(function(j) {
   	   
    	if($(this).attr("src")===undefined){
   		   try{
   			   elementos.push(jQuery("<script></script>").attr("type","text/javascript").text(jQuery(this).text()));
   			   $(this).remove();
	   	    }catch(err){
	   	    	console.log(err.message);
	   	    }	    
   	   }else{
   		   elementosSrc.push(jQuery("<script></script>").attr("type","text/javascript").attr("src",$(this).attr("src")));
   		   $(this).remove();	
   	   }
   });
   elemento.html(elementoTemp.html());

   if(elementosSrc !=undefined && elementosSrc.length > 0){
	   for(i=0;i<elementosSrc.length;i++){
		   try{
			   elemento.append(elementosSrc[i]);
		   }catch(err){}
	   }
   }
   if(elementos !=undefined && elementos.length > 0){
	   for(i=0;i<elementos.length;i++){
		   try{
			   elemento.append(elementos[i]);
		   }catch(err){}
	   }
   }
}


$.carregaFormularioAjax = function(url,parametros,funcaoSucesso) {
	
	if($("html").hasClass("a3") && $("#_bbAssinador_applet").length > 0){ //tratramento para remover a apllet
		$("#_bbAssinador_applet").remove();
	}
	if(!parametros){
		parametros = {};
	}
	parametros.ambienteLayout =  "transacao"
	var dados = {"url" : url,
				"type" : "post",
			    "tratarErroTransacao" : false,
			    "elemento" : ".corpo",
			    "parametros" : parametros,
				"funcaoAntesExecucao" : function(){
					$(".corpo").empty();
					
//					console.log("funcaoAntesExecucao 2");
					if (url.indexOf("/aapf/extrato/ins.jsp") != -1 ) {
						$(".corpo").html("<div> <center> Aguardando dados da Dataprev...</br>Tempo de resposta pode ser superior a 1min30s. </center> </div>");
					}
					$(".corpo").addClass("corpo-aguarde");
				},
			    "funcaoSucesso" : function(data){
		            try{
		            	
		            	var elementoTemp = $("<div></div>").html(data);
		            	
		            	if(elementoTemp.find("sessaofinalizada").length > 0){
		            		$(".corpo").removeClass("corpo-aguarde");
		            		$(".sessao").contadorSessao("telaSessaoFinalizada");
		            	}else{ 
			            	$.mudarLinkApf(elementoTemp);
			            	$(".corpo").removeClass("corpo-aguarde");
			            	$.atualizarScripts($(dados.elemento),elementoTemp);
			            	try{
			            		//$.atualizarSessao(elementoTemp);
			            	}catch(err){
			            	}
		            	}
		            }catch(err){
		            	$(".corpo").removeClass("corpo-aguarde");
		                console.error(err.message);
		            }
	            	$.buscarBannerTransacao();	
	            	if(funcaoSucesso && typeof funcaoSucesso === 'function'){
	            		funcaoSucesso(data);
	            	}
				}};
	
	$.ajaxApf(dados);
	$(window).scrollTop(0);
	
	if(optDadosCliente.dadosCliente.servidor === "externo" || optDadosCliente.dadosCliente.servidor === "interno"){
		if(!optDadosCliente.dadosCliente.inibeENI){
			$.carregarENI(url);
		}									
	}
}


$.submeterGeral = function(dados){
	
	var form = undefined;
	
	if($(dados.form).prop("tagName") !== "FORM"){
		var formTemp = $(dados.form);
		form = $("<form></form>",{"action":formTemp.attr("action"),"target":"_self"}).append(formTemp);
	}else{
		form = $(dados.form);
	}
	
	var ambientLayout = dados.ambientLayout ? dados.ambientLayout : "transacao"  
	var botaoAcao = form.find("input[name='"+ $("#botaoAcao").val() + "']");
	
	if(botaoAcao.length === 0) {
		botaoAcao = $("input[name='"+ $("#botaoAcao").val() + "']");
	}
	
	if(botaoAcao.length > 0){
		botaoAcao.attr("disabled","disabled");
	}
	
	var elemento =  dados.elemento ? dados.elemento : ambientLayout ==="transacao" ? ".corpo" : ".corpoModal";
	
	var requisicaoA3 = false;
	try{
		
		if($("html").hasClass("a3") ){ // tratamento para autentica��o via certificado digital
			if ( $("#_bbAssinador_applet").length > 0 ){
				if(confirmaAssinador && $("#assinatura").val() === "" && $("#idCartao").val() === "" && $("#ac").val() === "" && $("#nrSerie").val() === ""){
					confirmaAssinador = 0;
					if( document.applets['_bbAssinador_applet'].ok() ){
						loadData();
					}else{
						document.applets['_bbAssinador_applet'].focus();
					}
					return false;
				}else{
					$("#_bbAssinador_applet").remove();
				}
			}			
		}else{ // tratamento para cadastramento e vincula��o de certificado digital
			if(confirmaAssinador && $("#idCartao").val() === "" && $("#ac").val() === "" && $("#nrSerie").val() === ""){
				if(document.applets['_bbAssinador_applet']){
					if( document.applets['_bbAssinador_applet'].ok() ){
						loadData();
					}else{
						document.applets['_bbAssinador_applet'].focus();
					}
					return false;					
				}else{
					loadData();
				}
				
			}
		}		
		
		var funcaoDepoisSucesso = dados.funcaoDepoisSucesso;
		
		var dados = {};
		dados.type = "post";
		dados.url = form.attr("action");
		dados.tratarErroTransacao = false;
		dados.parametros = {};
		dados.elemento = elemento;
		dados.funcaoAntesExecucao = function(){
			$(elemento).empty();
			
//			console.log("funcaoAntesExecucao 3");
			if (dados.url.indexOf("/aapf/extrato/ins.jsp") != -1 ) {
				$(".corpo").html("<div> <center> Aguardando dados da Dataprev...</br>Tempo de resposta pode ser superior a 1min30s. </center> </div>");
			}
			$(elemento).addClass("corpo-aguarde");
		};	
		dados.funcaoSucesso = function(data){
            try{
            	$(elemento).removeClass("corpo-aguarde");
            	try{
            		var elementoTemp = $("<div></div>").html(data);
            		$.mudarLinkApf(elementoTemp);
            		$.atualizarScripts($(dados.elemento),elementoTemp);
            	}catch(err){
            		console.log(err.message);
            	}
            	$.buscarBannerTransacao();            		            	
            }catch(err){
                console.log(err.message);
            }	
        	if(botaoAcao.length > 0){
        		botaoAcao.removeAttr("disabled");
        	}
        	if(funcaoDepoisSucesso){
        		funcaoDepoisSucesso(data);
        	}
		}
		if(dados.funcaoErro){
			var funcaoErro = dados.funcaoErro; 
			dados.funcaoErro = function(){
	        	if(botaoAcao.length > 0){
	        		botaoAcao.removeAttr("disabled");
	        	}			
				funcaoErro();
			}
			
		}else{
			dados.funcaoErro = function(){
	        	if(botaoAcao.length > 0){
	        		botaoAcao.removeAttr("disabled");
	        	}			
			};
		}
		
		var array = form.serializeArray();
		dados.parametros =  array;
		dados.parametros.push({"name" : "ambienteLayout", "value" : ambientLayout});
		dados.parametros.push({"name" : $("#botaoAcao").val(), "value" : "sim"});
		dados.parametros.push({"name" : form.find("#botaoAcao").val(), "value" : "sim"});
		//console.log(dados.parametros);
		$.ajaxApf(dados);
		if(ambientLayout ==="transacao"){
			$(window).scrollTop(0);
		}

	}catch(err){
		console.log(err.message);
    	if(botaoAcao.length > 0){
    		botaoAcao.removeAttr("disabled");
    	}			
	}
	return false;
};



$.submeterTransacao = function(objeto,ambientLayout){
	try{
		var form = getFormularioAmbiente($(objeto));
		if(!ambientLayout){
			ambientLayout = "transacao";
		}
		$.submeter(form[0],ambientLayout);

	}catch(err){
		console.log(err.message);
	}
};

$.submeter = function(form,ambientLayout){
	return  $.submeterGeral({"form":form,"ambientLayout":ambientLayout});
};

$.submeterFormulario = function(form,event,ambienteLayout){
	if(!ambienteLayout){
		ambienteLayout = "transacao";
	}
	event.preventDefault();
	$.submeter(form,ambienteLayout);
}

/*****************************************************************
 * 
 * Fun��es de adapta��o para o layout antigo
 * 
****************************************************************** */

function executarAjaxCompleto (div,url,parametros,assincrono,funcaoantesdeenviar,funcaosucesso,funcaoErro){
	$.ajaxApf ({"elemento" : "#" + div, 
				"url" : url, 
				"parametros" : parametros,
				"funcaoAntesExecucao" : funcaoantesdeenviar,
				"funcaoSucesso" : funcaosucesso,
				"funcaoErro" : funcaoErro});
}
function ativarScripts(div){} 
function ajax(dados){
	$.ajaxApf(dados);
}
function submeterTransacaoAjax(objeto,ambientLayout){
	$.submeterTransacao(objeto,ambientLayout);
}
function executarAjax(div,url,parametros,assincrono){
	$.ajaxApf ({"elemento" : "#" + div, 
		"url" : url, 
		"parametros" : parametros});	
}
function atualizarScripts(elemento,data){
	var elementoTemp = $("<div></div>").html(data);
	$.atualizarScripts(elemento,elementoTemp);
}



/****************
 *  Chamada dos servicos do apf 
 *  parametros 
 *  
 *    nomeServico :  nome do servi�o que deseja executar
 *    parametros : parametros da url no formato json Ex : {"nomeParametro1" : "valorParametro1","nomeParametro2" : "valorParametro2"}
 *    funcaoAguarde : fun��o que ser� executada enquanto a o navegador aguarda a resposta da requisi��o
 *    funcaoOk : fun��o que ser� executada se a requisi��o n�o retornar erro       
 *    funcaoErro : fun��o que ser� executada se a requisi��o retornar erro
 *  */ 


$.ajaxServico  = function(dados){
	if(!dados.parametros){
		dados.parametros = {};
	}
	dados.parametros["servico"] = dados["nomeServico"];
	$.ajaxApf({"url" : "/aapf/servico","tiporetorno" : "json",
		"parametros" : dados.parametros, 
		"funcaoAntesExecucao" :  dados.funcaoAguarde && typeof dados.funcaoAguarde === 'function' ? dados.funcaoAguarde : undefined,
		"funcaoSucesso" : function(data){
			if(!data.retorno || data.retorno === 0){
				if(dados.funcaoOk && typeof dados.funcaoOk === 'function'){
					dados.funcaoOk(data);
				}
			}else{
				if(dados.funcaoErro && typeof dados.funcaoErro === 'function'){
					dados.funcaoErro(data);
				}
			}
		 }
	});	
};


/*******************************************************************************
 ********************* Chamadas aos servi�os do Facebook *********************** 
 *******************************************************************************/
/* Busca as fotos dos relacionamentos no facebook e grava no cache do navegador*/
$.buscaFotoClienteFacebook = function(objeto,funcao){
	var urlfoto = objeto.pic_square;
	var xhr = new XMLHttpRequest();
	xhr.open("get", urlfoto, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e) {
		var arr = new Uint8Array(this.response);
		var raw = String.fromCharCode.apply(null,arr);
		var base64 = btoa(raw);
		funcao({"base64" : base64});
	}
	xhr.send();
}

/* remove ades�o do cliente ao aplicativo do banco no facebook */
$.removerAdesaoAplicativo = function(token,funcaoAguarde,funcaoSucesso,funcaoErro){
	$.ajaxApf({
        type: "get",
        "tiporetorno" :"jsonp",
        url: "https://graph.facebook.com/me/permissions?access_token=" + token + "&method=delete",
        "funcaoAntesExecucao": funcaoAguarde,
        "funcaoSucesso": function(data){
        	funcaoSucesso();
        },
        "funcaoErro" : funcaoErro
    });
}