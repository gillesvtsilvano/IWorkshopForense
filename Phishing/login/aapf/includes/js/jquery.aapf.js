var prevHeight;
var optDadosCliente = {};
var optToolbarMenuLateral ={};
var urlBase = location.protocol+'//'+location.hostname;
var situacaoRequisicao = 0;;
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var mostrarMenu = false;
var fecharMenu = true;
var posicaoInicial = undefined;
var _paq = _paq || [];
var _tokenHorus = _tokenHorus || [];

(function($) {

	var isiTablet = navigator.userAgent.match(/iPad/i) != null;
	
	$.fn.aapfCfe = function(dadosCliente){
		optDadosCliente.dadosCliente = dadosCliente;
	}
	
	/*
	 * Inicializa todos os plugins de acordo com os dados do cliente
	 * 
	 * 
	 */
	$.fn.aapf = function(){
		
		$.ajaxServico({"nomeServico" : "dadosCliente",
			"funcaoAguarde" : function(){
				$(".principal-overlay").show();
			},	
			"funcaoOk" : function(data) {
				carregarLayout(data);
			}
		});
		
		function carregarLayout(data){
			if(data.loginNovo){
				$(".barraSuperior").addClass("barraSuperiorLoginNovo");				
			}
			
			
			try{
				Modernizr.load();
			}catch(err){
			}
			
			optDadosCliente.dadosCliente = data;
			
			if(optDadosCliente.dadosCliente.executarCNL){
				$.recuperarTicketCNL();
			}
			
			$.tokenHorus();			
			
			if(!optDadosCliente.dadosCliente.desativarIBT){
				$.carregarIBT(optDadosCliente.dadosCliente.servidor, data.segmento);
			}
			
			var ambiente = !optDadosCliente.dadosCliente.ambiente ? "idh" : optDadosCliente.dadosCliente.ambiente.toLowerCase();
			
			$("html").addClass(ambiente);
			$("html").addClass(optDadosCliente.dadosCliente.mci);			
			$("html").addClass(optDadosCliente.dadosCliente.navegador);
			
			$(".principal-overlay").hide();
			$(".principal").addClass("principal-show").addClass(data.segmento);
			setCookie("segmento",data.segmento,7);


			$("#nomePersonalizado").html(data.nomepersonalizado);
			$(".sessao").contadorSessao({tempo : data.tempoSessao});
			
			if(data.dataUltimoAcesso){
				$(".ultmio-acesso").html("&Uacute;ltimo acesso: " +data.dataUltimoAcesso+" "+data.horaUltimoAcesso);
			}
			$("#acheFacil").acheFacil(data.menuCompleto);
			
			if(ambiente === "naocorrentista"){
				$("#cpf").html(data.cpf);
			}else{
				var textoAgConta = "Ag&ecirc;ncia: " + data.agencia + " " + "Conta: " + data.conta;
				$("#dependenciaOrigem").html(data.agencia);
				$("#numeroContratoOrigem").html(data.conta);
				$(".combo-contas a").attr({"title":textoAgConta,"alt":textoAgConta});
				if(optDadosCliente.dadosCliente.indicadorImagem === "S"){
					$.getFoto({"id" : data.codigo,"tipo" :"srp","dataAtualizacao" : optDadosCliente.dadosCliente.dtAtuaFoto},function(foto) {
						if(foto){
							$(".fotoPerfil a").css({"background-image": "url(data:image/png;base64,"+ foto + ")"});
						}
				    });						
				}
				if(window.FileReader) {
					$(".fotoPerfil a").click(function(e){
						$.abrirModal({"url":"/aapf/srp/perfil/RL06-04.jsp","width":"700","height" :"500"});	
					});
				}
				$(".agencia-conta").controleContas();
			}
			var dadosUrl = $.getDadosUrl(window.location.href);
			if(dadosUrl.parametros && dadosUrl.parametros.url){
				if(data.isLoginBBCode){
					$.carregaFormularioAjax(data.urlinicial);
				}else{
					$.carregaFormularioAjax(dadosUrl.parametros.url);	
				}
			}else if(data.urlinicial){
				if(data.parametrosLoginInteligente){
					$.carregaFormularioAjax(data.urlinicial,data.parametrosLoginInteligente);
				}else{
					$.carregaFormularioAjax(data.urlinicial);
				}
			}
			
			data.menuSelecionado = "menu-completo";
			$(".menu-relacionamento-barra").toolbarMenuLateral(data);
			
			if(optDadosCliente.dadosCliente.mostrarNovaCentralNotificacao == true){
				$.criarCentralNotificacoes('geral');
			}else{
				$.listarTotalPendencias(function(data){
					if(data.quantidadeTotalPendencias!== undefined && data.quantidadeTotalPendencias > 0){
						$(".cabecalho .notificacao").append($("<span></span>",{"class":"notificacao-quantidade piscar-notificacao"}).html(data.quantidadeTotalPendencias));
					}
				});
			}	
			
			
			$.verificarPublicoAlvoMensagemInstantanea(function(data){
				$(".menu-relacionamento-barra .botaoTelefone").addClass("botaoChat");
				$(".menu-relacionamento-barra .botaoTelefone a").attr("title","Fale com o BB").attr("alt","Fale com o BB");
				optDadosCliente.dadosCliente.publicoAlvoMensagemInstantanea = true;
				optDadosCliente.dadosCliente.mensagensChatNaoLidas = 0;
				optDadosCliente.dadosCliente.erroFaleGerente = data.erroFale;
				optDadosCliente.dadosCliente.erroFaleGerente = data.erroFale;
				if(data.mensagensNaoLidas > 0){
					optDadosCliente.dadosCliente.mensagensChatNaoLidas = data.mensagensNaoLidas;
					$(".menu-relacionamento-barra").toolbarMenuLateral("atualizarNotificacao");
				}
			});
			
			$.gravarCookiePropensaoConsumo();
			//verifica a posicao inicial do mouse;
			$("body").hover(function(e){
				
				try{
					if(!posicaoInicial){
						var areaMenuItens = {"x" :$(".menu-completo .menu-itens").offset().left,"y" :$(".menu-completo .menu-itens").offset().top,"x1" : $(".menu-completo .menu-itens").offset().left + $(".menu-completo .menu-itens").outerWidth(),"y1" :$(".menu-completo .menu-itens").offset().top+$(".menu-completo .menu-itens").outerHeight()}
						posicaoMouseInicial = {"x" : e.pageX , "y" : e.pageY};
						if(posicaoMouseInicial.x > areaMenuItens.x && posicaoMouseInicial.x < areaMenuItens.x1 &&
						   posicaoMouseInicial.y > areaMenuItens.y && posicaoMouseInicial.y < areaMenuItens.y1){
							mostrarMenu = false;
						}else{
							mostrarMenu = true;
						}
					}else{
						mostrarMenu = true;
					}
				}catch(err){}
			},function(){});
			if(optDadosCliente.dadosCliente.mostrarTourSistema){
				iniciarTourSistema();
			}
		}	
	}	

	$.simbolo = function(){
		
		setTimeout(function(){
			$.ajaxServico({"nomeServico":"simbolo",
				"funcaoOk" : function(data) {
					if ($(".cabecalho").find("#simbolo").length > 0) {
						$("#simbolo").val(data.s);
					}else{
						$(".cabecalho").append($('<input>', {type: 'hidden',id: 'simbolo',name: 'simbolo', value: data.s}));		
					}
				}
			});
		},1000);		
		
	}	
	
	/***************************************************************************
	 * 
	 * Plugin respons�vel pelo controle das contas do cliente;
	 * 
	 * 
	 * 
	 */	
	$.fn.controleContas = function(options){
	
		var optContas = null;
		
		return this.each(function() {
			optContas = $.extend({}, options);
			optContas.obj = $(this);
			criarComboContas();
			$("#listaOutrasContas").bind('mousewheel', function (event) {
				$.stopPropagationScroll(this,event);
			});
			
		});		
		
		function criarComboContas(){

			$(".outras-contas").find(".contas-item-trocar-conta").click(function(e){
				fecharCaixaContas();	
				$.trocarConta({});
			});
						
			verificaClickForaCaixa();
			optContas.obj.children("a").click(function(e){
				
				if($(".outras-contas").hasClass("outras-contas-selecionado")) {
					fecharCaixaContas();
				}else{
					$(this).addClass("combo-selecionado");
					$(".outras-contas").find("ul").show();
					$(".outras-contas").addClass("outras-contas-selecionado");
					if($(".outras-contas").find("ul").children("li").length <= 1){
						buscarDadosContas();
					}
				}
				e.stopPropagation();
			});
		}
		function buscarDadosContas(){
			$.ajaxServico({"nomeServico":"contasCliente",
				"funcaoOk" : function(data) {
					criarContas(data);
				}
			});			
		}
		function criarContas(dados){
			
			var itens =  $(".outras-contas").find("ul");

			if(dados.titulares && dados.titulares.length > 0){
				
				$("<span></span>").html("Outros titulares")
				.appendTo($("<li></li>").appendTo(itens));

				$.each(dados.titulares,function(i,objeto){
					var item = $("<a></a>",{"href":"javascript:void(0)"}).html(objeto.titularidade + "&ordm;&nbsp;-&nbsp;" + objeto.noCli)
					.append($("<span></span>",{"class":"avatar"}))
					.appendTo($("<li></li>").appendTo(itens))
					.click(function(e){
						fecharCaixaContas();
						$.trocaTitular(objeto.titularidade);
					});
					$.getFoto({"id":objeto.cdSrp,"tipo":"srp"},function(foto) {
						if(foto){
							item.children("span") .css({"background-image": "url(data:image/png;base64,"+ foto + ")"});
						}
				    });
				});
			}
			if(dados.contas && dados.contas.length > 0){
				
				$("<span></span>").html("Outras contas")
				.appendTo($("<li></li>").appendTo(itens));				

				$.each(dados.contas,function(i,objeto){
					var item = $("<a></a>",{"href":"javascript:void(0)"}).html("Ag. " + objeto.agencia + "&nbsp;&nbsp;&nbsp;C.c. " + objeto.conta)
					.append($("<span></span>",{"class":"avatar"}))
					.appendTo($("<li></li>").appendTo(itens))
					.click(function(e){
							fecharCaixaContas();
							$.trocarConta({"dependenciaOrigem" : objeto.agencia,"numeroContratoOrigem" : objeto.conta});
					});
					$.getFoto({"id":objeto.cdSrp,"tipo":"srp"},function(foto) {
						if(foto){
							item.children("span") .css({"background-image": "url(data:image/png;base64,"+ foto + ")"});
						}
				    });						
				});
			}
			
		}
		function verificaClickForaCaixa(){
			$("body").click(function (e){
				if($(".outras-contas").hasClass("outras-contas-selecionado")) {
					var elementoClick = $(e.target);
					if(elementoClick.closest(".outras-contas").length === 0){
						fecharCaixaContas();
				    }
				}
			});				
		}
		function fecharCaixaContas(){
			$(".outras-contas").find("ul").hide();
			$(".agencia-conta > a").removeClass("combo-selecionado");
			$(".outras-contas").removeClass("outras-contas-selecionado");
		}	
	}
	
	/***************************************************************************
	 * 
	 * Plugin com de cronometro da sess�o
	 * 
	 * options : tempo {tempo: ?}
	 * 
	 * 
	 **************************************************************************/	
	
	var sessaoExpirou = false;
	var ligado = false;
	var timeout = null;
	var optSessao = null;
	
	$.fn.extend({
    	
    	contadorSessao: function(options) {
    		
    		var defaults= {tempo : 450};

    		if (typeof options === 'string') {
	
	            var args = Array.prototype.slice.call(arguments, 1);
	            
	            if(options === 'isExpirouSessao'){
	            	return(sessaoExpirou);
	            }
	            if(options === 'iniciarSessao'){
	            	iniciarCronometro(args);
	            }   
	            if(options === 'telaSessaoFinalizada'){
	            	$.abrirModal({"elementoAppend" : criarTelaRefazerlogin(),"width" : 400,"height": 300,closeOnEscape: false,"mostrarTitulo" : false});
	            }
	            return; 
	        }
		
			return this.each(function() {
				optSessao = $.extend(defaults, options);
				optSessao.obj = $(this);
	            
				optSessao.minutos = parseInt(optSessao.tempo/60);
				optSessao.segundos = parseInt(optSessao.tempo%60);
	            
	            sessaoExpirou = false;
	            tempoSessao = new Date();
	            tempoSessao.setHourMinuteSecond(0,optSessao.minutos,optSessao.segundos);
	            ligado = true;
	            mostraTempoSessao(tempoSessao);
	        });	
			
			function iniciarCronometro(tempo){
				optSessao.tempo = tempo;
				if(optSessao){
					optSessao.minutos = parseInt(optSessao.tempo/60);
					optSessao.segundos = parseInt(optSessao.tempo%60);
					pararCronometro();
					tempoSessao = new Date();
					tempoSessao.setHourMinuteSecond(0,optSessao.minutos,optSessao.segundos);
					ligado = true;
					mostraTempoSessao(tempoSessao,false);
				}
			}
			function pararCronometro(){
				clearTimeout(timeout);
				ligado = false;
			}
			function mostraTempoSessao(tempoSessao,ignorarVerificacaoCookie){
				
				verificaSessaoAtiva(function(retorno,ignorarVerificaCookie){
					
					var cookiel = getCookie("aapf.l");
					if(cookiel == "" || cookiel == "0"){
						window.location = "/aapf/includes/sair.jsp";
					}					
					if(retorno){
				
						if(tempoSessao.getMinutes() ===  0 && tempoSessao.getSeconds() === 30){
							var modal = $.abrirModal({"elementoAppend" : criarTelaInformacaoSessao(),"width" : 400,"height": 300,closeOnEscape: false,"mostrarTitulo" : false});
							
							contadorSessao(function(){
								modal.empty().append(criarTelaRefazerlogin());
							});
						}
						

						
						if(tempoSessao.getMinutes() ===  0 && tempoSessao.getSeconds() === 0){
							sessaoExpirou = true;
							clearTimeout(timeout);
							ligado = false;
							optSessao.obj.html("Sess&atilde;o expirada!");
						}else{
							if(ligado){
								optSessao.obj.html("Sess&atilde;o " +  tempoSessao.format("MM'min'ss"));
								timeout = setTimeout(function(){
									mostraTempoSessao(tempoSessao,ignorarVerificaCookie);
								},1000);
							}
						}
						tempoSessao.addSecond(-1);
					}else{
						if(!sessaoExpirou){
							sessaoExpirou = true;
							pararCronometro();
							optSessao.obj.html("Sess&atilde;o finalizada!");
							var modal = $.abrirModal({"elementoAppend" : criarTelaRefazerlogin(),"width" : 400,"height": 300,closeOnEscape: false,"mostrarTitulo" : false});
						}
					}
				},ignorarVerificacaoCookie);
			}
			function criarTelaInformacaoSessao(modal){
				
				var ul = $("<ul></ul>",{"class":"tela-expira-sessao"})
					.append($("<li></li>",{"class":"tela-expira-sessao-texto"}).html("Sua sess&atilde;o expira em"))
					.append($("<li></li>",{"class":"tela-expira-sessao-tempo","id":"tempoExpiraSessao"}).text("30"))
					.append($("<li></li>",{"class":"tela-expira-sessao-texto"}).text("segundos"))
					.append($("<li></li>",{"class":"tela-expira-sessao-botoes"})
							.append(
									$("<input></input>",{"class":"botaoapf","type":"button","id":"botaoRevalidaSessao", "title":"Revalidar sess&atilde;o"}).val("REVALIDAR SESSAO")
									.click(function(e){
										$.refazerSessao($(this).closest(".modal"));
									})
							)
					);
				
				return(ul);
			}
			function criarTelaRefazerlogin(modal){
				var ul = $("<ul></ul>",{"class":"tela-refazer-login"})
				.append($("<li></li>",{"class":"tela-expira-sessao-texto"}).html("Sua sess&atilde;o expirou."))
				.append($("<li></li>",{"class":"tela-expira-sessao-botoes"}).css({"padding-top":"130px;"})
						.append(
								$("<input></input>",{"class":"botaoapf","type":"button","id":"botaoLogin", "title":"login"}).val("REFAZER LOGIN")
								.click(function(e){
										$(this).closest(".modal").dialog("close");
									$.trocarConta({"dependenciaOrigem" : optDadosCliente.dadosCliente.agencia , "numeroContratoOrigem" : optDadosCliente.dadosCliente.conta,"closeOnEscape" : false ,"mostrarBotaoFechar" : "nao","atualizaContadorSessao" : false, "isLoginBBCode" : optDadosCliente.dadosCliente.isLoginBBCode});
								})
						)
						.append(
								$("<input></input>",{"class":"botaoapf","type":"button","id":"botaoSair", "title":"login"}).val("SAIR   ")
								.click(function(e){
									window.location = "http://www.bb.com.br";
								})
						)
				);		
				return(ul);
			}
			function contadorSessao(funcaoTelarefazerLogin){
				var contador = parseInt($("#tempoExpiraSessao").text());
				if(contador > 0){
					setTimeout(function(){
						$("#tempoExpiraSessao").text(contador-1);
						contadorSessao(funcaoTelarefazerLogin);
					},1000);			
				}else{
					funcaoTelarefazerLogin();
				}
			}
			function verificaSessaoAtiva(funcaoCallback,ignorarVerificacaoCookie){//verifica se o finalizou a sess�o ou limpou os cookies
				
				var session1 = getCookie("aapf.l");
				if(session1 && session1 !== "" && session1 !== 0 && session1 !== "0"){
					funcaoCallback(true);
				}else{
					if(!ignorarVerificacaoCookie){
						$.refazerSessao(undefined,function(data){
	
							if(data.retorno === 1){
								funcaoCallback(false,false);
							}else{
								funcaoCallback(true,true);
							}
						});
					}
					
				}
			}
    	}
    });
	

	/***************************************************************************
	 * 
	 * Plugin com as fun��es do ache f�cil
	 * 
	 * options : estrutura de menus no formato JSON mesmo objeto json utilizado
	 * na cria��o do menu completo
	 * 
	 **************************************************************************/

	$.fn.acheFacil = function(options) {

		var opt;

		var settings = $.extend({}, options);

		return this.each(function() {
			opt = $.extend(settings, options);
			opt.obj = $(this);
			criarCampoAutoComplete();
			
		});

		function criarCampoAutoComplete() {
			verificaClickForaCaixa();
			opt.obj.keyup(function(event) {

				if (event.keyCode === 27) {
					if ($("#listaAcheFacil").is(":visible")) {
						$("#listaAcheFacil").slideUp();
						jQuery(this).val("");
					}
				} else if (event.keyCode === 40) {
					jQuery(this).blur();
					$("#listaAcheFacil ul li a").first().focus();
					event.stopPropagation();

				} else {
					autoComplete($(this).val());
				}
			});

			$("#listaAcheFacil").css({
				"left" : opt.obj.position().left + (opt.obj.outerWidth(true) -  opt.obj.innerWidth())
			});
		}

		function autoComplete(texto) {
			var words = $.acentuacaoAmigavel(texto).toUpperCase();
			var i = 2;
			contadorEncontrados = 0; 
			if (words != null && words.trim() !== '') {
				var ul = $("<ul></ul>").appendTo($("#listaAcheFacil").empty());
				for(i=0;i< opt.menus.length ;i++){// Menu primeiro nivel
					var menu1 = opt.menus[i]; 
					var nomeMenu = menu1.nm;
					for(j=0;j< menu1.subMenus.length ;j++){ // Menu segundo
															// nivel
						var subMenu =  menu1.subMenus[j];
						var nomesubMenu = subMenu.nm;
						for(l=0;l<subMenu.transacoes.length;l++){// Menu terceiro nivel
							var transacao = subMenu.transacoes[l];
							var descricao = nomeMenu + " - " + nomesubMenu + " - " + transacao.nm;
							var bAchou = buscaTexto(descricao,words);
							if (bAchou) {
								if(contadorEncontrados <= 20){
									$("<li></li>").appendTo(ul)
									  .append($("<a></a>",{"tabindex" : "-1","url" : transacao.url, "tipoLink" : transacao.tipoLink})
											  .html(descricao)
											  .click(function(e) {
													$("#listaAcheFacil").slideUp();
													opt.obj.val("");  
													if($(this).attr("tipoLink") == "externo"){
														window.open($(this).attr("url"));
													}else{
														$.carregaFormularioAjax($(this).attr("url"));
													}	
											   })
											   .keyup(function(event) {
											   		if (event.keyCode === 27) { // tecla esc fecha a lista de transa��es
											   			$("#listaAcheFacil").slideUp();
													} else if (event.keyCode === 13) { // tecla enter fecha a lista e direciona para transa��o selecionada
														$("#listaAcheFacil").slideUp();
														opt.obj.val("");
														if($(this).attr("tipoLink") == "externo"){
															window.open($(this).attr("url"));
														}else{
															$.carregaFormularioAjax($(this).attr("url"));
														}	
														event.stopPropagation();
													}
												})
												.scroll(function(e) {return false;})
												.keydown(function(event) {
													if (event.keyCode === 40) {
														if ($(this).parent().next()) {
															$(this).parent().next().children("a")[0].focus();
															event.preventDefault();
														} else {
															event.stopPropagation();
														}
													} else if (event.keyCode === 38) {
														if ($(this).parent().prev()) {
															$(this).parent().prev().children("a")[0].focus();
															event.preventDefault();
														}
													}
												}));
									
								}else{
									if (!$("#listaAcheFacil").is(":visible")) {
										$("#listaAcheFacil").slideDown();
									}
									return;
								}
								contadorEncontrados++;
							}
						}
					}
				}
				
			} else {
				if ($("#listaAcheFacil").is(":visible")) {
					$("#listaAcheFacil").slideUp();
				}
			}
		}
		function verificaClickForaCaixa(){
			$("body").click(function (e){
				if($("#listaAcheFacil").is(":visible")) {
					var elementoClick = $(e.target);
					if(elementoClick.closest("#listaAcheFacil").length === 0){
						$("#listaAcheFacil").slideUp();
				    }
				}
			});				
		}
		function criarTextoComSelecao(texto, coordenadas) {
			var retorno = "";
			var posInicial = 0;
			var posfinal = 0;
			$.each(coordenadas, function(i, objeto) {
				if(objeto.ini > 0 ){
					retorno += texto.substring(posInicial, objeto.ini);
				}
				retorno += "<span>" + texto.substring(objeto.ini, objeto.fim) + "</span>";
				posInicial = objeto.fim;
				posfinal = objeto.fim;
			});
			retorno += texto.substring(posfinal);
			return (retorno);
		}
		function buscaTexto(texto, textoBusca){
			texto =  $.acentuacaoAmigavel(texto);
			var palavras = textoBusca.split(" ");
			var regex = "";
			if(palavras !=null && palavras.length > 0){
				for(k=0;k<palavras.length;k++){
					regex += regex === "" ? palavras[k] : ".+" + palavras[k]; 
				}
			}
			var patt = new RegExp(regex,"i");
			return(patt.test(texto));
		}
	}

	/*
	 * 
	 */
	
	$.fn.toolbarMenuLateral = function(options) {

		if (typeof options === 'string') {
			
            var args = Array.prototype.slice.call(arguments, 1);
            
            if(options === 'selecionar'){
            	selecionar(args[0],args[1]);
            }
            if(options === 'atualizarNotificacao'){
            	atualizarNotificacao();
            }         
            if(options === 'inicializarMenus'){
            	inicializarMenus();
            }         
            
            return;
        }
		
		var settings = $.extend({}, options);
		
		return this.each(function() {
			optToolbarMenuLateral = $.extend(settings, options);
			
			optToolbarMenuLateral.obj = $(this);
			criarToolBar();
			criarNotificacoes();
			if (options.menuSelecionado) {
				selecionar(options.menuSelecionado,true);
			}
		});
		function criarToolBar() {
			ajustaAlturaConteinerMenus();
			optToolbarMenuLateral.obj.find(".botoes a").click(function(e) {
				var conteudo = $(this).attr("conteudo");
				selecionar(conteudo,true);
			});
		}
		function criarNotificacoes(){
			if(optDadosCliente.dadosCliente.qtConvitesRelacionamento > 0 ){
				var elementoBotao = optToolbarMenuLateral.obj.find(".botaoRelacionamento");
				elementoBotao.append($("<div></div>",{"class":"notificacao"}).html(optDadosCliente.dadosCliente.qtConvitesRelacionamento));
			}
			if(optDadosCliente.dadosCliente.qtMensagensNovas > 0 ){
				var elementoBotao = optToolbarMenuLateral.obj.find(".botaoMensagem");
				elementoBotao.append($("<div></div>",{"class":"notificacao"}).html(""+optDadosCliente.dadosCliente.qtMensagensNovas));
			}			
		}

		function selecionar(tipoMenu, hasEfeito) {
			
			var botaoSelecionado = optToolbarMenuLateral.obj.find("li a.selecionado");
			optToolbarMenuLateral.obj.find(".botoes a").removeClass("selecionado").parent().removeClass("botao-selecionado");
			optToolbarMenuLateral.obj.find(".botoes a[conteudo='" + tipoMenu + "']").addClass("selecionado").parent().addClass("botao-selecionado");
			criarOpcoesMenu(tipoMenu, optToolbarMenuLateral);

			if (botaoSelecionado.length > 0) {
				if(hasEfeito){
					trocarMenu("." + botaoSelecionado.attr("conteudo"), function(e) {
					}, "." + tipoMenu, function(e) {
						var elementoSelecionado = $("."+tipoMenu);
						var elementoScroll = elementoSelecionado.find(".nano");
						if(elementoScroll.length > 0 ){
							criarNanoScroll(elementoScroll);	
						}
						
					});
				}else{
					$("." + botaoSelecionado.attr("conteudo")).hide(0);
					$("." + tipoMenu).show(0);
				}
			} else {
				$("." + tipoMenu).show();
				var elementoSelecionado = $("."+tipoMenu);
				
				var elementoScroll;
				if(tipoMenu === "menu-completo"){
					elementoScroll = elementoSelecionado.find(".menu-nivel1 .nano");
				}else{
					elementoScroll = elementoSelecionado.find(".nano");
				}
					
				if(elementoScroll.length > 0 ){
					criarNanoScroll(elementoScroll);	
				}
			}
		}
		function inicializarMenus(){
			criarMenuTelefones();
			criarMenuRelacionamentosPJ();
			criarMenuMensagens();
			criarMenuRelacionamentos();
		}
		
		function criarOpcoesMenu(tipoMenu, opcoes) {
			
			if (tipoMenu === "menu-completo") {
				criarMenuCompleto();
			}
			if (tipoMenu === "menu-relacionamento") {
				criarMenuRelacionamentos();
			}
			if (tipoMenu === "menu-telefones") {
				criarMenuTelefones();
			}
			if (tipoMenu === "menu-mensagens") {
				criarMenuMensagens();
			}
			if (tipoMenu === "menu-relacionamentoPJ") {
				criarMenuRelacionamentosPJ();
			}
		}

		function criarMenuCompleto() {
			var conteudoMenuCompleto = optToolbarMenuLateral.obj.find(".menu-completo");
			if (conteudoMenuCompleto.find(".menu-itens").is(':empty')) {
				conteudoMenuCompleto.menuCompleto({});
			}
		}

		function criarMenuRelacionamentos() {
			var conteudoMenuRelacionamento = optToolbarMenuLateral.obj.find(".menu-relacionamento");
			if (conteudoMenuRelacionamento.find(".menu-itens").is(':empty')) {
				$.verificaLoginFB();
				conteudoMenuRelacionamento.menuRelacionamento();
				if($(".solicitacoes-relacionamento div > ul").is(':empty')){
					conteudoMenuRelacionamento.menuRelacionamento("buscaSolicitacoes");
				}else{

				}
			}
		}
		
		function criarMenuTelefones() {
			var conteudoMenuTelefones = optToolbarMenuLateral.obj.find(".menu-telefones");
			if (conteudoMenuTelefones.find(".menu-itens").is(':empty')) {
				conteudoMenuTelefones.menuTelefones({});
			}
		}
		function criarMenuMensagens() {
			var conteudoRelacionamentos = optToolbarMenuLateral.obj.find(".menu-mensagens");
			if (conteudoRelacionamentos.find(".menu-itens").is(':empty')) {
				
				$.ajaxServico({"nomeServico":"listarComunicados",
					"funcaoOk" : function(data) {
						conteudoRelacionamentos.menuMensagens({"mensagens":data});
					},
					"funcaoErro" : function(data) {
						conteudoRelacionamentos.menuMensagens(data);
					}
				});				
			}
		}

		function criarMenuRelacionamentosPJ() {
			var conteudoMenuRelacionamento = optToolbarMenuLateral.obj.find(".menu-relacionamentoPJ");
			if (conteudoMenuRelacionamento.find(".menu-itens").is(':empty')){
				$.ajaxServico({"nomeServico":"relacionamentospj",
					"funcaoOk" : function(data) {
						conteudoMenuRelacionamento.menuRelacionamentoPJ({"convenios":data});
					},
					"funcaoErro" : function(data) {
						conteudoMenuRelacionamento.menuRelacionamentoPJ({"convenios":[]});
					}
				});				
			}
		}
		//Fun��o que atualiza as notifica��es de solicita��o de relacionamento e novas mensagens
		function atualizarNotificacao(){
			
			if(optDadosCliente.dadosCliente.qtConvitesRelacionamento > 0 ){
				var elementoBotao = optToolbarMenuLateral.obj.find(".botaoRelacionamento");
				if(elementoBotao.find(".notificacao").length > 0 ){
					elementoBotao.find(".notificacao").html(optDadosCliente.dadosCliente.qtConvitesRelacionamento);
				}else{
					elementoBotao.append($("<div></div>",{"class":"notificacao"}).html(optDadosCliente.dadosCliente.qtConvitesRelacionamento));
				}
			}else{
				optToolbarMenuLateral.obj.find(".botaoRelacionamento").find(".notificacao").remove();
			}
			if(optDadosCliente.dadosCliente.qtMensagensNovas > 0 ){
				var elementoBotao = optToolbarMenuLateral.obj.find(".botaoMensagem");
				if(elementoBotao.find(".notificacao").length > 0 ){
					elementoBotao.find(".notificacao").html(optDadosCliente.dadosCliente.qtMensagensNovas);
				}else{
					elementoBotao.append($("<div></div>",{"class":"notificacao"}).html(optDadosCliente.dadosCliente.qtMensagensNovas));
				}				
			}else{
				optToolbarMenuLateral.obj.find(".botaoMensagem").find(".notificacao").remove();
			}	
			if(optDadosCliente.dadosCliente.mensagensChatNaoLidas > 0 ){
				var elementoBotao = optToolbarMenuLateral.obj.find(".botaoTelefone");
				if(elementoBotao.find(".notificacao").length > 0 ){
					elementoBotao.find(".notificacao").html(optDadosCliente.dadosCliente.mensagensChatNaoLidas);
				}else{
					elementoBotao.append($("<div></div>",{"class":"notificacao"}).html(optDadosCliente.dadosCliente.mensagensChatNaoLidas));
				}				
			}else{
				optToolbarMenuLateral.obj.find(".botaoMensagem").find(".notificacao").remove();
			}			
		}
	}
	
	/***************************************************************************
	 * 
	 * Plugin que cria o menu completo
	 * 
	 **************************************************************************/
	
	$.fn.menuCompleto = function(options) {

		var opt;
		var settings = $.extend({}, options);
		var timer;
		var timerSaida;

		if (typeof options === 'string') {
			
            var args = Array.prototype.slice.call(arguments, 1);
            if(options === 'salvarMenuPersonalizado'){
            	salvarItensMenuPersonalizado(args[0],args[1],args[2]);
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if(options === 'salvarFavorita'){
            	salvarFavorita(args[0],args[1],args[2],args[3]);
            }            
            return;
        }			
		
		return this.each(function() {
			opt = $.extend(settings, options);
			opt.obj = $(this);
			criarMenu();
		});

		// Cria a lista de menus no 1� nivel
		function criarMenu() {

			var ulItensMenu = $("<ul></ul>").appendTo(opt.obj.find(".menu-itens").empty());
			
			if(!$("html").hasClass("naocorrentista")){			
				criarItemMenu(ulItensMenu,{"id" : 0, "nm" : "Meu menu","img" : "/aapf/imagens/icones/menu/logo_bb_alinhamento.png","tipo" : 0 });
			}
			
			if(optDadosCliente.dadosCliente.menuCompleto.menus){
				$.each(optDadosCliente.dadosCliente.menuCompleto.menus,function(i, menuNivel1) {
					criarItemMenu(ulItensMenu,menuNivel1);	
				});
			}
			$( window ).scroll(function() {
				adaptarMenuScroll();
			});	
			
		}
		function criarItemMenu(ul,menuNivel1){
			
			if((menuNivel1.subMenus && menuNivel1.subMenus.length > 0) || menuNivel1.tipo === 0){
				
				var li = $("<li></li>").appendTo(ul).mouseout(function(e){
					e.stopPropagation();
				}).click(function(e){
					e.stopPropagation();
				});
				var menusegundonivel = null;
				if(menuNivel1.tipo === undefined || menuNivel1.tipo === 1){
					menusegundonivel = criarMenuSegundoNivel(menuNivel1);
				}else if(menuNivel1.tipo === 0){
					menusegundonivel = criarMeuMenu(menuNivel1);
				}
				var link = $("<a></a>",{"codigo" : menuNivel1.id,"nome" : menuNivel1.nm,"href":"javascript:void(0);"})
				.append($("<div></div>").text(menuNivel1.nm))
				.appendTo(li)
				.css({"background-image" : "url('"+ (menuNivel1.img0 === undefined ? menuNivel1.img : "img.ImgWriter?codigo=" + menuNivel1.img0) + "')"})
				.append(menusegundonivel);

				if($("html").hasClass("dfv")){
					link.click(function(e){
						if(mostrarMenu){
							var elemento = $(this);
							mostrarSubMenu(elemento);
						}
					});
				}else{
				
					link.hover(function(e) {
						if(mostrarMenu){
							clearTimeout(timerSaida);
							var elemento = $(this);
							timer = setTimeout( function(){
								mostrarSubMenu(elemento);
							}, 500 );
						}
					}
					,function(e) {
						if(mostrarMenu){
							clearTimeout(timer);
							timerSaida = setTimeout( function(){
								fecharSubMenu();
							},500);
						}else{
							mostrarMenu = true;
						}
					}).click(function(e){
						if(mostrarMenu){
							clearTimeout(timerSaida);
							var elemento = $(this);
							timer = setTimeout( function(){
								mostrarSubMenu(elemento);
							}, 500 );
						}
					}).keyup(function(e) {
						  if (e.keyCode == 27) {
							  clearTimeout(timer);
							  fecharSubMenu();
						  }   
					});
				}
			}	
		}
		function adaptarMenuScroll(){
			
			var scrollTop = $(document).scrollTop();
			var menuLateral = $(".menu-lateral");
			var alturaMenuLateral = menuLateral.outerHeight(true);
			var scrollTopAnterior = menuLateral.attr("pos") != null ? parseInt(menuLateral.attr("pos")) : 0;
			var direcao =  scrollTop > scrollTopAnterior ? 1 : 0;
			
			if(scrollTop > 0 ){
				if(alturaMenuLateral < $(".corpo").outerHeight(true)){
					if(alturaMenuLateral < $(window).outerHeight(true)){
						menuLateral.css({"position":"fixed","top":"0px"});//posiciona o menu-lateral na altura do scrolltop
					}else{
						if(direcao === 1){
							if((alturaMenuLateral - $(window).outerHeight(true)) < scrollTop){ // verifica se o scrolltop + a altura do menu-lateral � maior que a altura da tela
								menuLateral.css({"position":"fixed","top":-(alturaMenuLateral - $(window).outerHeight(true)) + "px","border-right":"1px solid #eee"});//posiciona o menu-lateral na altura do scrolltop
							}
						}else{
							if((alturaMenuLateral - $(window).outerHeight(true)) > scrollTop){ // verifica se o scrolltop + a altura do menu-lateral � maior que a altura da tela
								menuLateral.css({"position":"relative","top":"0px","border-right":"none"});//posiciona o menu-lateral na altura do scrolltop
							}
						}
					}
					menuLateral.attr("pos",scrollTop);
				}
			}else{
				menuLateral.css({"position":"relative","top":"0px","border-right":"none"});//posiciona o menu-lateral na altura do scrolltop
			}			
		}
		function criarMenuSegundoNivel(menuNivel1){
			
			var div = $("<div></div>",{"class":"menu-segundo-nivel"});
			
			$("<div></div>",{"class":"menu-titulo-nivel1"}).html(menuNivel1.nm).css({"background-image" : "url('"+ (menuNivel1.img0 === undefined ? menuNivel1.img : "img.ImgWriter?codigo=" + menuNivel1.img0) + "')"}).appendTo(div);
			var ul  = $("<ul></ul>").appendTo(div)
			
			var coluna = [];
			coluna[0] = $("<ul></ul>").appendTo($("<li></li>").appendTo(ul));
			coluna[1] = $("<ul></ul>").appendTo($("<li></li>").appendTo(ul));
			coluna[2] = $("<ul></ul>").appendTo($("<li></li>").appendTo(ul));
			
			$.each(menuNivel1.subMenus, function(i, objetoNivel2) {
				if(objetoNivel2.transacoes.length > 0 ){
					
					if(objetoNivel2.col !== undefined && objetoNivel2.col <=3){	
						var conlunaSubMenu =  objetoNivel2.col > 3 ? 2 : objetoNivel2.col - 1;
						coluna[conlunaSubMenu].append($("<li></li>",{"class":"menu-titulo-nivel2"}).html(objetoNivel2.nm));
						
						objetoNivel2.transacoes.sort(function (a, b) {
						    if (a.ord > b.ord){
						      return 1;
						    }
						    if (a.ord < b.ord){
						      return -1;
						    }
						    return 0;
						});						
						
						$.each(objetoNivel2.transacoes, function(i, objetoNivel3) {
							var link = $("<a></a>",{"href":"javascript:void(0)","codigo":objetoNivel3.id}).html(objetoNivel3.nm)
							.click(function(e) {
								e.stopPropagation();
								if(objetoNivel3.tipoLink === "interno"){
									if(optDadosCliente.dadosCliente.ativarPiwik){
										setTimeout(function(){
											try{
												_paq.push(['trackEvent', 'Menu', menuNivel1.nm +" -> "+ objetoNivel2.nm + " -> " + objetoNivel3.nm]);
											}catch(erro){
												console.log(erro);
											}											
										},500);										
										
									}									
									$.carregaFormularioAjax(objetoNivel3.url);
								}
								fecharSubMenu();
							})						
							.appendTo($("<li></li>").appendTo(coluna[conlunaSubMenu]));
							if(objetoNivel3.tipoLink !== "interno"){
								link.attr("href",objetoNivel3.url);
								$.substituiLinkApf(link);
							}
						});
					}
				}
			});
			return(div);
		}
		function criarMeuMenu(menuNivel1){
			
			var div = $("<div></div>",{"class":"menu-segundo-nivel meu-menu-segundo-nivel"});
			
			$("<div></div>",{"class":"menu-titulo-nivel1"}).html(menuNivel1.nm).css({"background-image" : "url('"+menuNivel1.img+"')"}).appendTo(div);

			// Monta a lista de menus personalizados			
			
			var divMenuPersonalizado = $("<div></div>",{"class":"menu-conteudo-nivel2 meu-menu-conteudo-personalizado"}).appendTo(div);
			
			criarMenuPersonalizado(divMenuPersonalizado);

			// Monta a lista de transa��es favoritas
			
			divMenuPersonalizado = $("<div></div>",{"class":"menu-conteudo-nivel2 meu-menu-conteudo-favoritas"}).appendTo(div);

			criarMenuFavoritos(divMenuPersonalizado);
			
			return(div);
		}
		
		function criarMenuPersonalizado(div){
			
			$("<div></div>",{"class":"meu-menu-titulo"}).html("Menu personalizado")
			.appendTo(div)
			.append(
					$("<a></a>",{"href":"javascript:void(0)","title":"Personalizar menu"}).click(function(e){
						e.stopPropagation();
						abrirPersonalizacaoMenu();
					})
			);
			var divScroll = undefined
			$("<div></div>",{"class":"meu-menu-mensagem-erro"}).appendTo(div);
			$("<div></div>",{"class":"meu-menu-conteudo"})
			.appendTo(div)
			.append($("<div></div>",{"class":"meu-menu-overlay"}))
			.append(
				divScroll = $("<div></div>")
				.append(ul = $("<ul></ul>"))	
			);

			criarListaMenuPersonalizado(ul);
			
			divScroll.bind('mousewheel', function (event) {
				$.stopPropagationScroll(this,event);
			});			
			
			
		}
		function criarListaMenuPersonalizado(ul){
			
			if(optDadosCliente.dadosCliente.menusPersonalizados && optDadosCliente.dadosCliente.menusPersonalizados.length > 0){
				if(ul.hasClass("sem-informacao")){
					ul.removeClass("sem-informacao");
				}
				$.each(optDadosCliente.dadosCliente.menusPersonalizados,function(a, objeto) {
					var dadosMenu = _getDadosMenuPersonalizado(objeto);	
					if(dadosMenu){
						var descricao = dadosMenu.descricao;

						if (dadosMenu.descricao.length > 50){
							descricao = dadosMenu.descricao.substring(0, 50) + "...";
						}
						var a = $("<a></a>",{"href":"javascript:void(0)","codigo":0,"title":dadosMenu.descricao}).html(descricao)
						.click(function(e) {
							e.stopPropagation();
							$.carregaFormularioAjax(dadosMenu.link);
							fecharSubMenu();
						});
						var div = $("<div>X</div>");
						
						$("<li></li>").append(a).append(div).appendTo(ul);			
					}
				});
			}
			if(ul.children().length === 0 ){
				$("<li></li>").html("N&atilde;o h&aacute; menus personalizados").appendTo(ul.addClass("sem-informacao"));
			}			
		}
		function criarMenuFavoritos(div){

			var divScroll = undefined;
			$("<div></div>",{"class":"meu-menu-titulo"}).html("Transa&ccedil;&otilde;es favoritas").appendTo(div);
			$("<div></div>",{"class":"meu-menu-mensagem-erro"}).appendTo(div);
			ul = $("<ul></ul>").appendTo(
					divScroll = $("<div></div>").appendTo(
								$("<div></div>",{"class":"meu-menu-conteudo"})
								.append($("<div></div>",{"class":"meu-menu-overlay"}))
								.appendTo(div)
							)
					);
			criarListaFavoritos(ul);

			divScroll.bind('mousewheel', function (event) {
				$.stopPropagationScroll(this,event);
			});				
		}
		function criarListaFavoritos(ul){
			
			if(optDadosCliente.dadosCliente.favoritos && optDadosCliente.dadosCliente.favoritos.length > 0){
				
				if(ul.hasClass("sem-informacao")){
					ul.removeClass("sem-informacao");
				}
				
				$.each(optDadosCliente.dadosCliente.favoritos,function(i,objeto){
					var a = $("<a></a>",{"href":"javascript:void(0)","codigo":0,"title":objeto.nome}).html(objeto.nome)
					.click(function(e) {
						e.stopPropagation();
						if(objeto.url && objeto.url !== ""){
							carregarMenu(objeto);
						}
						fecharSubMenu;
					});
					
					var div = $("<div>X</div>").click(function(e){
						e.stopPropagation();
						excluirFavorita(objeto);
					});
					$("<li></li>",{"class":"item-favorito","codigo":+objeto.id,"sequencial":objeto.sequencial}).append(a).append(div).appendTo(ul);						
				});
			}else{
				$("<li></li>").html("N&atilde;o h&aacute; transa&ccedil;&otilde;es favoritas").appendTo(ul.addClass("sem-informacao"));
			}				
			
		}
		
		// Busca o complemento dos dados do menu personalizado no menu completo
		function _getDadosMenuPersonalizado(objeto){
			var dadosMenu = undefined;
			for(i=0;i< optDadosCliente.dadosCliente.menuCompleto.menus.length ;i++){// Menu primeiro nivel
				var menu1 = optDadosCliente.dadosCliente.menuCompleto.menus[i];
				if(menu1.id === objeto.codigoMenu){
					for(j=0;j< menu1.subMenus.length ;j++){// Menu segundo nivel
						var subMenu = menu1.subMenus[j];
						for(l=0;l< subMenu.transacoes.length ;l++){
							var transacao = subMenu.transacoes[l];
							if (objeto.codigoTransacao === parseInt(transacao.id)) {
								dadosMenu = {imagem2 : menu1.img1,codigoMenu : menu1.id,codigoSubmenu : subMenu.id,codigoTransacao : transacao.id,descricao : subMenu.nm + " - " + transacao.nm,link : transacao.url,img : objeto.img};
								break;
							}
						}
					}
				}
			}
			return dadosMenu;
		}
		
		function mostrarSubMenu(elemento){

			elemento = elemento.parent(); 
			fecharSubMenu();
			elemento.addClass("mouseover");
			//calcula a posi��o do sub menu
			var height = elemento.find(".menu-segundo-nivel").outerHeight();
			var topElemento = elemento.offset().top;
			var top = topElemento - elemento.outerHeight() - 8;
			var topPosition = elemento.position().top - elemento.outerHeight() - 8;

			if((top -$(document).scrollTop() + height)  > $(window).outerHeight()){
				top =   $(document).scrollTop() + ($(window).outerHeight()) - $(".menu-lateral").offset().top - height  - 14;
			}else{
				top = top -  $(".menu-lateral").offset().top;
			}
			//posiciona e mostra o submenu
			elemento.find(".menu-segundo-nivel").css({"top" : top}).show();
		}
		//carregar transa��o favorita
		function carregarMenu(objeto){
			fecharSubMenu();
			var parametros = {"codigoFavorito" : objeto.id,"numSeqlTransFavorita":objeto.sequencial,"codigoTransacao" :objeto.menu};
			$.carregaFormularioAjax(objeto.url,parametros);
		}		
		//fecha o menu de segundo n�vel
		function fecharSubMenu(){
			if(fecharMenu){ 
				$(".menu-itens > ul > li > a > div.menu-segundo-nivel").hide();
				opt.obj.find(".menu-itens > ul > li").removeClass("mouseover");
				opt.obj.find(".menu-itens > ul > li > a > div.menu-segundo-nivel").hide();
			}
		}		
		//abrir tela de personaliza��o do menu
		function abrirPersonalizacaoMenu(){
			fecharMenu = false;
			var modal = $.abrirModal({"url" : "/aapf/srp/personalizacao/RL02.jsp","width" : 960,"height": 560,"resizeAuto" : false,
				"close" : function(){
					fecharMenu = true;
				}});
			modal.parent().click(function(e){
				e.stopPropagation();
			});
		}		
		//excluir favoritas
		function excluirFavorita(objeto){
			fecharMenu = false;
			$.abrirCaixaDialogConfirmacao(1,"Tem certeza que deseja excluir?",
				function(retorno){
					if(retorno){
						$.ajaxServico({"nomeServico":"excluirFavorito",
							"parametros" : objeto,
							"funcaoAguarde" : function() {
								$(".meu-menu-conteudo-favoritas .meu-menu-overlay").show();
							},
							"funcaoOk" : function(data) {
								removeFavoriaListaLocal(objeto);
								criarListaFavoritos($(".meu-menu-conteudo-favoritas ul").empty());
								$(".meu-menu-conteudo-favoritas .meu-menu-overlay").hide();
								fecharMenu = true;
							},
							"funcaoErro" : function(data) {
								$(".meu-menu-conteudo-favoritas .meu-menu-overlay").hide();
								$(".meu-menu-conteudo-favoritas .meu-menu-mensagem-erro").html(data.mensagem).show();
								setTimeout(function(){
									$(".meu-menu-conteudo-favoritas .meu-menu-mensagem-erro").hide();
								},4000);
								fecharMenu = true;
							}
						});										
					}
				});
		}
		function removeFavoriaListaLocal(objeto){
			var favoritos = optDadosCliente.dadosCliente.favoritos;
			if(favoritos && favoritos.length > 0 ){
				for(i=0;i<favoritos.length;i++){
					if(favoritos[i].id === objeto.id && favoritos[i].sequencial === objeto.sequencial){
						favoritos.splice(i,1);
						break;
					}
				}
			}
		}
		function salvarFavorita(nomePersonalizado,funcaoAguarde,funcaoOk,funcaoErro){

			$.ajaxServico({"nomeServico":"salvarTransacaoFavorita",
				"parametros" : {"nomePersonalizado" : nomePersonalizado},
				"funcaoAguarde" : function(){
					if(funcaoAguarde){
						funcaoAguarde();
					}
				},
				"funcaoOk" : function(data) { 
					if(!optDadosCliente.dadosCliente.favoritos){
						optDadosCliente.dadosCliente.favoritos = []; 
					}
					optDadosCliente.dadosCliente.favoritos.push(data.dados);
					criarListaFavoritos($(".meu-menu-conteudo-favoritas ul").empty());
					if(funcaoOk){
						funcaoOk(data);
					}
				},
				"funcaoErro" : function(data) {
					if(funcaoErro){
						funcaoErro(data);
					}
				}		
			});		
		}		
		function salvarItensMenuPersonalizado(codigosMenuSel,funcaoOk,funcaoErro){
			$.ajaxServico({"nomeServico":"salvarMenuPersonalizado",
				"parametros" : {"menusSelecionados" : JSON.stringify(codigosMenuSel)},
				"funcaoAguarde" : function() {
					$(".menu-conteudo-personalizado .meu-menu-overlay").show();
				},
				"funcaoOk" : function(data) {
					optDadosCliente.dadosCliente.menusPersonalizados = data.menus;
					$(".menu-conteudo-personalizado .meu-menu-overlay").hide();
					criarListaMenuPersonalizado($(".meu-menu-conteudo-personalizado ul").empty());
					fecharMenu = true;
					if(funcaoOk){
						funcaoOk();
					}			
				},
				"funcaoErro" : function(data) {
					fecharMenu = true;
					if(funcaoErro){
						funcaoErro();
					}
				}
			});	
		}
	}
	
	
	/***************************************************************************
	 * 
	 * Plugin que cria o menu de relacionamento
	 * 
	 **************************************************************************/
	
	
	$.fn.menuRelacionamento = function(options) {
		
		var opt = optDadosCliente.dadosCliente;
		var timer;
		var timerSaida;
		
		if (typeof options === 'string') {
			
            var args = Array.prototype.slice.call(arguments, 1);
            
            if(options === 'buscaSolicitacoes'){
            	buscaListaSolicitacoes();
            }
            return;
        }		
		
		return this.each(function() {
			opt.obj = $(this);
			criarMenuRelacionamentos();
		});
		// fun��o que filtra os relacionamentos pela parte nome digitada
		function buscaRelacionamentos(texto){ 
			
			var itens = opt.obj.find(".menu-itens > ul > li > a");
			if(texto.length > 0){
				texto = $.acentuacaoAmigavel(texto);
				var valores = texto.toUpperCase().split(" ");
				itens.each(function( index ) {
					var nomeCliente = $.acentuacaoAmigavel(jQuery(this).attr("tags").toUpperCase());
					var bAchou = false;
					for(i=0;i<valores.length;i++){
						if(nomeCliente.indexOf(valores[i]) != -1){
							bAchou = true;
							break;
						}
					}
					if(!bAchou){
						$(this).parent().css({"display":"none"});
					}else{
						$(this).parent().css({"display":"block"});
					}
				});
			}else{
				itens.css({"display":"block"});
			}
		}
		// Fun��o que cria a lista de relacionamentos
		function criarMenuRelacionamentos() {
				
			$("#pesquisaRelacionamento").unbind("keyup")
			.bind("keyup",function(e){
				buscaRelacionamentos($(this).val());
			});
			$("#botaoConectarFacebook a").unbind("click")
			.bind("click",function(e){
				if($(this).attr("conectado") === "1"){
					$.removerAdesao();
				}else{
					$.loginRedeRelaconamento();
				}
			});
			ordernarListaRelacionamentos();
			var ulItens = $("<ul></ul>").appendTo(opt.obj.find(".menu-itens").empty());
			if(optDadosCliente.dadosCliente.relacionamentos && optDadosCliente.dadosCliente.relacionamentos.length > 0){
				$.each(optDadosCliente.dadosCliente.relacionamentos,function(i, objeto) {
					adicionarElementoMenuRelacionamento(ulItens,objeto);
				});
				$("#pesquisaRelacionamento").show();
			}else{
				ulItens.append($("<li></li>",{"class":"sem-informacao"}).html("N&atilde;o h&aacute; relacionamentos."));
			}

		}
		// adicionar um elemento com o  novo relacionamento
		function adicionarElementoMenuRelacionamento(ulItens,objeto){   
			
			var itemRelacionamento = $("<a></a>",{"href":"javascript:void(0);","tags" : objeto.nome,"alt" : objeto.nome,"title" : objeto.nome,"identificadorConta":objeto.identificadorConta,"uid": objeto.uid})
		    .append($("<span></span>",{"class":"foto avatar"}))
			.append($("<span></span>",{"class":objeto.dependenciaRelacionamento ? "nomeRel":"nomeRelFb"}).html(objeto.nome))
			.appendTo($("<li></li>").appendTo(ulItens))
			.click(function(e){ // mostra o menu de transa��es
				criarMenuTranscacoesRelacionamento($(this),objeto);
			});
			
			var objetoFoto = {}
			if(objeto.dependenciaRelacionamento){
				itemRelacionamento.append($("<span></span>",{"class":"conta"}).html("Ag:&nbsp;"+ objeto.dependenciaRelacionamento + "&nbsp;&nbsp;" + "c/c: "+ objeto.numeroContratoRelacionamento));
				objetoFoto = {"id": objeto.identificadorConta,"tipo" : "srp","hasFoto" : objeto.indicadorFoto,"dataAtualizacao":objeto.dtAtuaFoto};
			}else{
				objetoFoto = {"id": objeto.uid,"tipo" : "fb","pic_square" : objeto.pic_square};
			}
 
			var menuTransacoes = criarMenuTranscacoesRelacionamento(itemRelacionamento,objeto); 
			
			itemRelacionamento.parent()
			.click(function(e){
				e.stopPropagation();
			})
			.append(menuTransacoes)
			.hover(function(e) {
				clearTimeout(timerSaida);
				var elemento = $(this);
				timer = setTimeout( function(){
					mostrarSubMenu(elemento);
				}, 200 );
				
			}
			,function(e) {
				clearTimeout(timer);
				var elementoSaida = $(this);
				timerSaida = setTimeout( function(){
					fecharSubMenu();					
				},300);
			});			
			$.getFoto(objetoFoto ,function(foto) { // busca a foto do cliente no cache
				if(foto){
					itemRelacionamento.children(".foto").css({"background-image": "url(data:image/png;base64,"+ foto + ")"});
					menuTransacoes.find(".avatar").css({"background-image": "url(data:image/png;base64,"+ foto + ")"});
				}
		    });	
		}		
		
		// Fun��o que cria o menu de trasa��es com o relacionamento selecionado
		function criarMenuTranscacoesRelacionamento(elemento, objeto){
			
			var divItens = $("<div></div>",{"class":"relacionamentos-transacoes"});
			
			// Cria cabe�alho do sub menu
			$("<div></div>")
			.html(objeto.nome)
			.append($("<span></span>",{"class":"avatar"}))
			.appendTo(divItens);
			
			var ulItens = $("<ul></ul>").appendTo(divItens);
			var transacoes = [{"nome" : "Transfer&ecirc;ncia para conta corrente","url" : "/aapf/transferencia/nova/centralTransferencia-00.jsp","transacao" : 1},
			                  {"nome" : "Transfer&ecirc;ncia para poupan&ccedil;a","url" : "/aapf/transferencia/nova/centralTransferencia-00.jsp","transacao" : 2},
			                  {"nome" : "&Uacute;ltimas transa&ccedil;&otilde;es","url" : "/aapf/comprovante/869-CO.jsp","transacao" :3}];
			                  
			if(objeto.dependenciaRelacionamento){
				//transacoes.push({"nome" : "Mensagens","transacao" :4});
			    transacoes.push({"nome" : "Excluir relacionamento","transacao" :5});
			}
			$.each(transacoes,function(i,transacao){
				
				$("<a></a>",{"href" :"javascript:void(0);"}).html(transacao.nome)
				.appendTo($("<li></li>").appendTo(ulItens))
				.click(function(e){
					divItens.hide();
					divItens.parent().removeClass("mouseover");					
					
					executarTransacao(objeto,transacao);
				});
			});
			
			return(divItens);
		}
		//Executa a transa��o 
		function executarTransacao(objeto,transacao){
			
			var parametros = {};
			if(objeto.dependenciaRelacionamento){
				parametros = {"dependenciaDestino" : objeto.dependenciaRelacionamento,"numeroContratoDestino" : objeto.numeroContratoRelacionamento, "agenciaDestino" : objeto.dependenciaRelacionamento, "contaDestino" : objeto.numeroContratoRelacionamento, "tipoTransferencia": "CCtoCC" };
			}else{
				parametros = {"codigoRelacionamentoExterno" : objeto.uid};
			}
			var url = transacao.url;
			if(transacao.transacao === 2){// transfer�ncia de conta corrente para poupan�a
				parametros["codT"] = "1"; 
				parametros["tipoTransferencia"] = "CCtoPP";				
			}else if(transacao.transacao === 3){// lista de comprovantes de transfer�ncias para o relacionamento
				parametros["codT"] = "1";
				parametros["botaoContinua1.x"] = "sim";
				parametros["verificaRelacionamento869"] = "sim";
			}else if(transacao.transacao === 5){// Excluir relacionamento
				$.abrirCaixaDialogConfirmacao(1,"Tem certeza que deseja excluir o relacionamento com "+ objeto.nome+"?",
						function(retorno){
							if(retorno){
								$.ajaxServico({"nomeServico":"excluirRelacionamento",
									"parametros" : objeto,
									"funcaoAguarde" : function() {
										opt.obj.find(".overlay").show();
									},
									"funcaoOk" : function(data) {
										opt.obj.find(".overlay").hide();
										opt.obj.find("a[identificadorConta='"+objeto.identificadorConta+"']").parent().remove();
										opt.obj.find(".menu-lista-opcoes-relacionamento").hide("slide");
									},
									"funcaoErro" : function(data) {
									}
								});								
							}
						});
			}
			if(url){
				$.carregaFormularioAjax(url,parametros);
			}
		}
		// busca as solicita��es de relacionamento enviadas e recebidas
		function buscaListaSolicitacoes(){  
			
			$.ajaxServico({"nomeServico":"listaSolicitacoesRelacionamento",
				"funcaoOk" : function(data) {
					if(data.solicitacoesRecebidas.length > 0 || data.solicitacoesEnviadas.length > 0 ){
						opt.obj.find(".menu-itens").addClass("menu-itens-solicitacoes");
						opt.obj.find(".solicitacoes-relacionamento").show();
						var ul = $(".solicitacoes-relacionamento div > ul");
						
						if(data.solicitacoesRecebidas.length > 0 ){
							$("<li></li>",{"class" : "recebidas solicitacao-titulo"}).appendTo(ul).html("Recebidas");
							$.each(data.solicitacoesRecebidas,function(i,solicitacao){
								var li = $("<li></li>",{"class" : "recebidas", "codigo" : solicitacao.codIdentificadorContaSolicitante}).appendTo(ul);
								$("<a></a>")
								.append($("<span></span>",{"class":"avatar"}))
								.append($("<span></span>",{"class" :"solicitacao-nome"}).html(solicitacao.nomeRelacionamento))
								.append($("<span></span>",{"class" :"solicitacao-conta"}).html("Ag. " + solicitacao.agContaSolicitante + "&nbsp;&nbsp;C.c " + solicitacao.contaSolicitante))
								.appendTo(li);
								var div = $("<div></div>").appendTo(li);
								$("<a></a>").html("Aceitar").appendTo(div)
								.click(function(e){
									enviarResposta(solicitacao,1);
								});
								$("<a></a>").html("Recusar").appendTo(div)
								.click(function(e){
									enviarResposta(solicitacao,2);
								});
							});
						}
						if(data.solicitacoesEnviadas.length > 0 ){
							$("<li></li>",{"class" : "enviadas solicitacao-titulo"}).appendTo(ul).html("Enviadas");
							$.each(data.solicitacoesEnviadas,function(i,solicitacaoEnviada){
								var li = $("<li></li>",{"class" : "enviadas", "codigo" : solicitacaoEnviada.codIdentificadorContaSolicitada }).appendTo(ul);
								$("<a></a>")
								.append($("<span></span>",{"class" :"solicitacao-agencia-conta"}).html("Ag. " + solicitacaoEnviada.agContaSolicitada + "&nbsp;&nbsp;C.c " + solicitacaoEnviada.contaSolicitada))
								.append($("<span></span>",{"class" :"solicitacao-data-envio"}).html("Data do envio: " +solicitacaoEnviada.dataEnvioConvite + " "+ solicitacaoEnviada.horaEnvioConvite ))
								.appendTo(li);
								var div = $("<div></div>").appendTo(li);
								$("<a></a>").html("Cancelar").appendTo(div)
								.click(function(e){
									cancelarSolicitacao(solicitacaoEnviada);
								});
							});
						}							
					}
				}
			});			
		}
		//Envia a resposta da solicita��o
		function enviarResposta(solicitacao,reposta){ 
			
			$.ajaxServico({"nomeServico":"reponderSolicitacoesRelacionamento",
				"parametros" : {"codigoIdentificadorConta" : solicitacao.codIdentificadorContaSolicitante,"resposta" : reposta},
				"funcaoAguarde" : function() {
					opt.obj.find(".solicitacoes-relacionamento .overlay").show();
				},
				"funcaoOk" : function(data) {
					opt.obj.find(".solicitacoes-relacionamento .overlay").hide();
					opt.obj.find(".solicitacoes-relacionamento li[codigo='"+solicitacao.codIdentificadorContaSolicitante+"']")
					.slideUp(function(){
						if(reposta === 1){
							adicionarNovoRelacionamento({"dependenciaRelacionamento" : solicitacao.agContaSolicitante ,"numeroContratoRelacionamento":solicitacao.contaSolicitante,"identificadorConta": solicitacao.codIdentificadorContaSolicitante,"nome":solicitacao.nomeRelacionamento});	
						}
						$(this).remove();
						if(opt.obj.find(".solicitacoes-relacionamento .recebidas").length === 1){
							opt.obj.find(".solicitacoes-relacionamento .recebidas").remove();
						}
						verificaSolicitacoes();
						optDadosCliente.dadosCliente.qtConvitesRelacionamento --;
						$(".menu-relacionamento-barra").toolbarMenuLateral("atualizarNotificacao");
						
					});
				},
				"funcaoErro" : function(data) {
					opt.obj.find(".solicitacoes-relacionamento .overlay").hide();
				}
			});			
		}
		
		//Envia o cancelamento de uma solicitacao
		function cancelarSolicitacao(solicitacao){ 
			
			$.ajaxServico({"nomeServico":"cancelarSolicitacao",
				"parametros" : {"codigoIdentificadorConta" :solicitacao.codIdentificadorContaSolicitada},
				"funcaoAguarde" : function() {
					opt.obj.find(".solicitacoes-relacionamento .overlay").show();
				},
				"funcaoOk" : function(data) {
					opt.obj.find(".solicitacoes-relacionamento .overlay").hide();
					opt.obj.find(".solicitacoes-relacionamento .enviadas[codigo='"+solicitacao.codIdentificadorContaSolicitada+"']")
					.slideUp(function(){
						$(this).remove();
						if(opt.obj.find(".solicitacoes-relacionamento .enviadas").length === 1){
							opt.obj.find(".solicitacoes-relacionamento .enviadas").remove();
						}
						verificaSolicitacoes();
					});
				},
				"funcaoErro" : function(data) {
					opt.obj.find(".solicitacoes-relacionamento .overlay").hide();
				}
			});			
		}		
		//Adiciona novo relacionamento ao array de relacionamentos e reordena o array
		function adicionarNovoRelacionamento(objeto){ 
			optDadosCliente.dadosCliente.relacionamentos.push(objeto);
			ordernarListaRelacionamentos()
			criarMenuRelacionamentos();
		}
		//ordena o array por nome
		function ordernarListaRelacionamentos(){
			if(optDadosCliente.dadosCliente.relacionamentos){
				optDadosCliente.dadosCliente.relacionamentos.sort(function (a, b) {
				    if (a.nome > b.nome){
				      return 1;
				    }
				    if (a.nome < b.nome){
				      return -1;
				    }
				    return 0;
				});
			}
		}

		// verifica se n�o h� solicita��es e esconde o elemento de solicita��es
		function verificaSolicitacoes(){ 
			if(opt.obj.find(".solicitacoes-relacionamento-conteudo ul li").length === 0){
				opt.obj.find(".solicitacoes-relacionamento").slideUp(function(){
					opt.obj.find(".menu-itens").removeClass("menu-itens-solicitacoes");
				});
			}
		}
		function mostrarSubMenu(elemento){
			fecharSubMenu();
			elemento.addClass("mouseover");
			//calcula a posi��o do sub menu
			var height = elemento.children("div").outerHeight();
			var topElemento = elemento.offset().top;
			var scroll = $(document).scrollTop();
			var top = topElemento - elemento.outerHeight() + 12; 
			if((top -$(document).scrollTop() + height)  > $(window).outerHeight()){
				top =   $(document).scrollTop() + ($(window).outerHeight()) - $(".menu-lateral").offset().top - height  - 14;
			}else{
				top = top -  $(".menu-lateral").offset().top;
			}
			//posiciona e mostra o submenu
			elemento.children("div").css({"top" : top}).show();
		}
		function fecharSubMenu(){
			opt.obj.find(".menu-itens > ul > li").removeClass("mouseover");
			opt.obj.find(".menu-itens > ul > li > div").hide();	
		}		
	}
	
	
	/***************************************************************************
	 * 
	 * Plugin que cria o menu de relacionamento pessoa juridica
	 * 
	 **************************************************************************/	

	$.fn.menuRelacionamentoPJ = function(options) {
		
		var opt;
		var timer;
		var timerSaida;
		
		var settings = $.extend({}, options);
		return this.each(function() {
			opt = $.extend(settings, options);
			opt.obj = $(this);
			criarMenu();
		});
		// Cria a lista de menus no 1� nivel
		function criarMenu() {

			var itensMenu = opt.obj.find(".menu-itens");
			var ulItensMenu = $("<ul></ul>").appendTo(itensMenu.empty());

			if(opt.convenios && opt.convenios.retorno != 1 &&  opt.convenios.length > 0){
				$.each(options.convenios,function(i, objeto) {
					var li = $("<li></li>")
					.appendTo(ulItensMenu)
					.append(
							$("<a></a>",{"href":"javascript:void(0)"})
							.append($("<span></span>").html(objeto.nomeConvenio))
					).hover(function(e) {
						clearTimeout(timerSaida);
						var elemento = $(this);
						timer = setTimeout( function(){
							mostrarSubMenu(elemento);	
						}, 200 );
						
					}
					,function(e) {
						clearTimeout(timer);
						timerSaida = setTimeout( function(){
							fecharSubMenu();				
						},300);
					});	
					criarSubMenu(li,objeto);
				});
			}else{
				ulItensMenu.append($("<li></li>",{"class":"sem-informacao"}).html("N&atilde;o h&aacute; relacionamentos com empresas."));
			}
		}
		function criarSubMenu(elementoPai,objeto){

			var divItens = $("<div></div>").appendTo(elementoPai);  
			
			// Cria o cabe�calho do sub menu
			$("<div></div>")
			.html(objeto.nomeConvenio)
			.append($("<span></span>"))
			.appendTo(divItens);
			
			var ulItens = $("<ul></ul>")
			.appendTo(divItens);
			
			$.each(objeto.lancamentos,function(i, lancamento) {
					
				$("<a></a>",{"href" :"javascript:void(0);"})
				.append($("<span></span>").html(lancamento.dataDocumento).css({"width" : "30%"}))
				.append($("<span></span>").html(lancamento.descricao).css({"width" : "50%"}))
				.append($("<span></span>").html("RS"+lancamento.valor).css({"width" : "20%","text-align":"right"}))
				.appendTo($("<li></li>").appendTo(ulItens))
				.click(function(e){
					//fecha o su menu e carrega a transa��o e comprovante
					fecharSubMenu();
					$.carregaFormularioAjax("/aapf/comprovante/869-CO.jsp",
							{"comprovanteRelacionamentoPJ" :"sim","numeroDocumento" : lancamento.numeroDocumento,
							 "dataDocumento" : lancamento.dataDocumento,"sequencialDoc" : lancamento.sequencialdoc,
							 "ocorrencia" :lancamento.ocorrencia,"emergencial": lancamento.emergencial});							
				});
				
			});			
		}
		function mostrarSubMenu(elemento){
		
			fecharSubMenu();
			elemento.addClass("mouseover");
			//calcula a posi��o do sub menu
			var height = elemento.children("div").outerHeight();
			var topElemento = elemento.offset().top;
			var scroll = $(document).scrollTop();
			var top = topElemento - elemento.outerHeight() - 8; 
			if(top + height  > scroll + $(window).outerHeight()){
				top = (scroll  + $(window).outerHeight()) - height - 10;
			}
			//posiciona e mostra o submenu
			elemento.children("div").css({"top" : top}).show();
		}
		function fecharSubMenu(){
			opt.obj.find(".menu-itens > ul > li").removeClass("mouseover");
			opt.obj.find(".menu-itens > ul > li > div").hide();	
		}
		
	}
	/***************************************************************************
	 * 
	 * Plugin que cria o menu de telefones �teis
	 * 
	 **************************************************************************/	
	$.fn.menuTelefones = function(options) {
		
		var settings = $.extend({}, options);
		return this.each(function() {
			opt = $.extend(settings, options);
			opt.obj = $(this);
			criarListaTelefones();
		});
		
		function criarListaTelefones() {
			var itens = $("<ul></ul>").appendTo(opt.obj.find(".menu-itens"));
			
			if (optDadosCliente.dadosCliente.agencia) {
				$("<li></li>").html("<b>Ag&ecirc;ncia:</b> " + optDadosCliente.dadosCliente.agencia+ "&nbsp;-&nbsp;"+optDadosCliente.dadosCliente.nomeAgencia).appendTo(itens);
				
				var telefone = optDadosCliente.dadosCliente.telefoneAgencia;
				if (telefone) {
					var numeroTel = telefone.replace(/[^0-9]/g,'');
					
					if (numeroTel) {
						var ddd = optDadosCliente.dadosCliente.dddAgencia;
						ddd = (ddd) ? "(" + optDadosCliente.dadosCliente.dddAgencia + ")" : "";
						var complem = (numeroTel.indexOf("400") != -1) ? " (Capitais)" : "";
						$("<li></li>").html("<b>Telefone:</b> " + ddd + telefone + complem).appendTo(itens);
					}
				}
				
				telefone = optDadosCliente.dadosCliente.telefoneGerente;
				if (telefone) {
					var numeroTel = telefone.replace(/[^0-9]/g,'');
					
					if (numeroTel) {
						var ddd = optDadosCliente.dadosCliente.dddGerente.trim();
						var complem = (numeroTel.indexOf("800") != -1) ? " (Outras localidades)" : "";
						var telFormat = (numeroTel.length == 10) ? numeroTel.substring(0, 3) + " " + numeroTel.substring(3, 6) + " " + numeroTel.substring(6, 10) : numeroTel;
						$("<li></li>").html("<b>Telefone:</b> " + ddd + telFormat + complem).appendTo(itens);
					}
				}
				
				if (optDadosCliente.dadosCliente.nomeGerente) {
					$("<li></li>").html("<b>Gerente:</b> " + optDadosCliente.dadosCliente.nomeGerente).appendTo(itens);
				}
			}
			
			//Telefones registrados no publicador
//			if(optDadosCliente.dadosCliente.telefones && optDadosCliente.dadosCliente.telefones.length > 0){
//				$.each(optDadosCliente.dadosCliente.telefones,function(i,telefone){
//					$("<li></li>").html(telefone.texto).appendTo(itens);
//				});
//			}
			
			if(optDadosCliente.dadosCliente.publicoAlvoMensagemInstantanea){
				montarItemFaleComGerente();
			}
		}

		
		function montarItemFaleComGerente(){
			var item = $("<div></div>",{"class":"chat-gerente"}).appendTo(opt.obj.find(".menu-itens"));
			$("<a id='linkFale'></a>",{"href":"javascript:void(0)"}).html("Fale com o BB").appendTo(item)
			.click(function (e){
				$.ajaxApf({"url" : "/aapf/servico","tiporetorno" : "json",
					"parametros" : {"servico":"mostraFaleGerente"},
					"funcaoSucesso" : function(data){
						if(optDadosCliente.dadosCliente.erroFaleGerente == 'true'){
							$("#linkFale").append("<div style='color: red;font-size: 11px;'>Erro ao executar MIV</div>");
						}else{	
							$.ajaxApf({"url" : "/aapf/relacionamento/mensagemInstantanea-01.jsp",
								"funcaoSucesso" : function(data){
									$("#faleGerente").show();
									$("#faleGerente").html(data);
								 }
							});
						}	
					 }
				});				
			});
			if(optDadosCliente.dadosCliente.habilitarRepositorioArquivos){
				item = $("<div></div>",{"class":"item-repositorio-arquivos"}).appendTo(opt.obj.find(".menu-itens"));
				$("<a></a>",{"href":"javascript:void(0)"}).html("Reposit&oacute;rio de arquivos").appendTo(item)
				.click(function (e){
					$.carregaFormularioAjax("/aapf/relacionamento/repositorioArquivos-00.jsp",{});
				});
			}
			
		}
	}
	
	/***************************************************************************
	 * 
	 * Plugin que cria o menu o contole de mensagens da caixa postal BB
	 * 
	 **************************************************************************/	
	
	$.fn.menuMensagens = function(options) {
		var opt;

		var settings = $.extend({}, options);
		return this.each(function() {
			opt = $.extend(settings, options);
			opt.obj = $(this);
			criarMenu();
		});		
		// Cria a lista de menus no 1� nivel
		function criarMenu() {
			var itensMenu = opt.obj.find(".menu-itens");
			var ulItens = $("<ul></ul>",{"class":"menu-lista-mensagens"}).appendTo(itensMenu.empty()); 
			
			try {
				if(opt.retorno  === 1){
					ulItens.append($("<li></li>",{"class":"sem-informacao"}).css({"color":"red"}).text(opt.mensagem));
				}else if(opt.mensagens && opt.mensagens.length > 0){
					$.each(opt.mensagens,function(i, objeto) {
						$("<a></a>",{"href":"javascript:void(0);"})
						.append($("<div></div>").html(objeto.titulo).addClass(objeto.estadoApresentacao === "10" ? "" :  "mensagem-nao-lida"))
						.append($("<span></span>",{"class":"mensagem-data"}).html(objeto.data))
						.append(
								$("<a></a>",{"href":"javascript:void(0)","class":"mensagem-excluir","alt" :"Excluir mensagem","title" :"Excluir mensagem"})
								.click(function(e){
									e.stopPropagation();
									excluirMensagem(objeto,$(this),ulItens);
								})
						)
						.appendTo($("<li></li>").appendTo(ulItens))
						.click(function(e){
							var objetoClick = $(this);
							$.carregaFormularioAjax("/aapf/relacionamento/CPPSC.jsp",{"lerMsg":objeto.comunicado},
							function(data){
								if(objetoClick.find(".mensagem-nao-lida").length > 0){
									objetoClick.find(".mensagem-nao-lida").removeClass("mensagem-nao-lida");
								}
								optDadosCliente.dadosCliente.qtMensagensNovas = ulItens.find(".mensagem-nao-lida").length;
								$(".menu-relacionamento-barra").toolbarMenuLateral("atualizarNotificacao");
								
							});
						});
					});
				}else{
					ulItens.append($("<li></li>",{"class":"sem-informacao"}).html("N&atilde;o h&aacute; mensagens."));
				}
			} catch (err) {
				console.log(err);
			}
			optDadosCliente.dadosCliente.qtMensagensNovas = ulItens.find(".mensagem-nao-lida").length;
			$(".menu-relacionamento-barra").toolbarMenuLateral("atualizarNotificacao");
			
		}
		//funcao responsavel por excluir a mensagem selecionada
		function excluirMensagem(objeto,objetoClick,elementoPai){
			$.abrirCaixaDialogConfirmacao(1,"Tem certeza que deseja excluir a mensagem?",
				function(retorno){
					if(retorno){

						$.ajaxServico({"nomeServico":"excluirComunicado",
							"parametros" : {"codigoMensagem" : objeto.comunicado},
							"funcaoOk" : function(data) {
								objetoClick.closest("li").hide("fade",function(){
									$(this).remove;
								});
							},
							"funcaoErro" : function(data) {
								var eleMentoMensagemErro = null;
								$(".mensagem-erro").remove(); //Se houver um elemento de mensagem de erro exclui
								elementoPai.prepend(eleMentoMensagemErro =$("<li></li>",{"class":"mensagem-erro"}).html(data.mensagem)); // cria o elemento que mostra a mensagem de erro;
								eleMentoMensagemErro.slideDown();
								setTimeout(function(){
									eleMentoMensagemErro.slideUp(function(){ // fechar o elemento com o efeito slide e depois exclui o elemento ap�s dois segundos
										$(this).remove(); // exclui o elemento
									});
								},5000);
							}
						});
					}
			});			
		}
	}
	
	

	$.fn.contextMenu = function(options) {

		var opt;
		var obj;
		var menuContexto = null;

		var defaults = {
			objetoClick : null,
			classe : "context-menu"
		};

		return this.each(function() {
			opt = $.extend(defaults, options);
			obj = $(this);
			criarMenu();

			opt.objetoTrigger.click(function(e) {
				jQuery("div." + opt.classe).remove();
				criarMenu();
				montarPopup(e, $(this));
				e.preventDefault();
				return false;

			});

			$(document).click(function(e) {
				if (e.target.id != opt.objetoTrigger.attr("id")) {
					jQuery("div." + opt.classe).remove();
				}
			});
		});

		function criarMenu() {

			var ul = jQuery("<ul></ul>", {
				"id" : "ulSalvarComprovante"
			});
			ul.append(jQuery("<li></li>", {
				"class" : "setacima"
			}));

			if (opt.titulo && opt.titulo.length > 0) {
				ul.append(jQuery("<li></li>", {
					"class" : "titulo"
				}).html(opt.titulo));
			}
			$.each(opt.itens, function(i) {

				var classe = "item";
				if (opt.itens[i].classe != undefined) {
					classe = opt.itens[i].classe;
				}

				ul.append(jQuery("<li></li>", {
					"class" : classe
				}).html(opt.itens[i].texto).mouseup(function() {
					jQuery("div." + opt.classe).remove();
				}).mouseup(opt.itens[i].click));
			});
			ul.append(jQuery("<li></li>", {
				"class" : "setabaixo"
			}));
			menuContexto = jQuery("<div></div>", {
				"id" : opt.id,
				"class" : opt.classe
			}).append(ul);
			obj.append(menuContexto);
		}

		function montarPopup(e, objeto) {

			var offsetX = e.pageX - 20;
			var offsetY = e.pageY + 25;
			var posicaoTela = $(window).scrollTop() + $(window).height();

			if (opt.posicionamentoObjeto) {

				offsetX = objeto.offset().left
						+ parseInt(objeto.outerWidth() / 2) - 22;
				offsetY = objeto.offset().top
						+ parseInt(objeto.outerHeight() / 2) + 17;

			} else {
				if (e.pageY + menuContexto.outerHeight(true) + 15 > posicaoTela
						|| e.pageY + menuContexto.outerHeight(true) + 15 > $(
								document).outerHeight(true)) {
					offsetY = e.pageY - menuContexto.outerHeight(true) - 12;
					jQuery(".setacima").css({
						"display" : "none"
					});
					jQuery(".setabaixo").css({
						"display" : "block"
					});
				}
			}
			menuContexto.css('top', offsetY);
			menuContexto.css('left', offsetX);
			menuContexto.css('z-index', 9999);

			menuContexto.show("fast");
			menuContexto.css('display', 'block');
		}
	}

	/* func�o que troca a op��o do menu lateral com o efeito de slide */

	function trocarMenu(elementoHide, callBackHide, elementoShow, callBackShow) {

		if (elementoHide !== elementoShow) {
			$(elementoHide).hide("slide", {}, 0, function() {
				if (callBackHide && typeof (callBackHide) === "function") {
					callBackHide();
				}
				$(elementoShow).show("slide", {}, 0, callBackShow);
			});
		}
	}

	/* ajusta a altura do container dos menus de acordo com a altura da janela */

	function ajustaAlturaConteinerMenus() {
		try{
			$(".principal").css({"min-height" : $(window).outerHeight(true)});
		}catch(err){
			console.error(err);
		}
	}

	$(window).resize(function() {
		ajustaAlturaConteinerMenus();
	});
	
	
	/*
	 * 
	 * Plugin que faz a navega��o do tour do sistema
	 * 
	 */

	
	$.fn.tourapf = function(options){
		
		var indice = 0;
		var opt = options;
		var itensApresentacaoCanvasTemp = options.itensApresentacaoCanvas;
		var itensApresentacaoCanvas = [];
		var aguarde = false;
		return this.each(function() {
			limparElementos();
			iniciarTour();
		});
		
		function limparElementos(){ // verifica se os elementos informados existem, se n�o existirem ser�o descartados da lista
			
			itensApresentacaoCanvas = [];
			
			var indices = [];
			for(a=0;a<itensApresentacaoCanvasTemp.length;a++){
				var bAchou = true;
				for(b=0;b<itensApresentacaoCanvasTemp[a].itens.length;b++){
					if($(itensApresentacaoCanvasTemp[a].itens[b].seletor).length === 0){
						bAchou = false;
						break;
					}
				}
				if(bAchou){
					itensApresentacaoCanvas.push(itensApresentacaoCanvasTemp[a])
				}				
			}
		}
		
		function iniciarTour(){
			
			if(opt.aoIniciar){
				opt.aoIniciar();
			}
			
			$("body").resize(function(e){
				if($(".apresentacao-itens").length > 0 && $(".apresentacao-overlay").length > 0){
					$(".apresentacao-itens").css({"height": $('body').outerHeight(true)});
					$(".apresentacao-overlay").css({"height": $('body').outerHeight(true)});
				}
			});
			
			
			$("<div></div>",{"class":"apresentacao-itens"}).css({"height": $('body').outerHeight(true)})
			.append(
					$("<a></a>",{"class":"fechar","title":"Finalizar tour do auto atendimento pessoa física"}).html("X").click(function(e){
						apresentacaoFechar();
					})	
			)
			.append(
					$("<a></a>",{"class":"apresentacao-seta apresentacao-anterior"}).html("&lsaquo;").on("click",function(e){
						apresentacaoAnterior();
					})	
			)
			.append(
					$("<a></a>",{"class":"apresentacao-seta apresentacao-proximo"}).html("&rsaquo;").on("click",function(e){
						apresentacaoProximo();
					})	
			).appendTo($("body"));
			
			$("<div></div>",{"class":"apresentacao-overlay"}).css({"height": $('body').outerHeight(true)}).appendTo($("body"));
			$("body").addClass("apresentacao");
			posicionar(0);
		}
		//seleciona o elemento de um determindado indice
		function posicionar(x){
			$(".apresentacao-overlay").css({"height": $('body').outerHeight(true)});
			$(".apresentacao-itens").css({"height": $('body').outerHeight(true)});
			$(".apresentacao-item").hide();
			$(".apresentacao-ajuda").remove();
			
			$.each(itensApresentacaoCanvas,function(i,objeto){
				if(i === x ){
					
					$(".apresentacao-anterior,.apresentacao-proximo").hide(0);
					
					var separador = ""
					var elementos = "";
					
					if(objeto.beforeShow){
						setTimeout(function(){
							objeto.beforeShow();
						},100);
					}
					
					$.each(itensApresentacaoCanvas[i].itens,function(j,objetoItem){
						
						var canvasElemento = $("#"+objetoItem.id);
						if(canvasElemento.length > 0 ){
							elementos += separador + "#"+objetoItem.id;
							separador = ",";
							if(j === itensApresentacaoCanvas[i].itens.length-1){
								$(elementos).show(0,function(){
									if(objeto.dadosBoxAjuda){
										var div = posicionarCaixaAjuda(objeto.dadosBoxAjuda,canvasElemento);
									}
									if(objeto.afterShow){
										objeto.afterShow(canvasElemento);
									}
									habilitarBotoes(x);
									$(".navegacao-bullet[posicao='" + x + "']").addClass("navegacao-bullet-selecionado");
									if(objeto.posicionarScrollElemento !== undefined){
										posicionaElementoScroll(canvasElemento,objeto.posicionarScrollElemento);
									}
									
								});
							}
						}else{
							var elemento = $(objetoItem.seletor);
							if(elemento.length > 0 ){
								var elementoEscondido = !elemento.is(":visible");
								elementos += separador + "#"+objetoItem.id;
								separador = ",";
								elemento.show(0,function(){
									
									var elementoPosicao = elemento;
									if(objetoItem.seletorElementoPosicao){
										elementoPosicao = $(objetoItem.seletorElementoPosicao);
									}
									
									if(objetoItem.img){
										
										var img = $("<img></img>",{"id":objetoItem.id ,"src":objetoItem.img,"class":"apresentacao-item"}).css({"top": elementoPosicao.offset().top,"left": elementoPosicao.offset().left,"width": elemento.outerWidth(),"height": elemento.outerHeight()});
										$(".apresentacao-itens").append(img);
										img.load(function(){
											if(j === itensApresentacaoCanvas[i].itens.length-1){
												$(elementos).show(0,function(){
													if(objeto.dadosBoxAjuda){
														posicionarCaixaAjuda(objeto.dadosBoxAjuda,$(this));
													}
													if(objeto.afterShow){
														objeto.afterShow($(this));
													}
													habilitarBotoes(x);
													$(".navegacao-bullet[posicao='" + x + "']").addClass("navegacao-bullet-selecionado");
													if(objeto.posicionarScrollElemento !== undefined){
														posicionaElementoScroll($(this),objeto.posicionarScrollElemento);
													}													
													if(elementoEscondido){
														elemento.hide(0);
													}
												});
											}
											
										});
									}else{
										html2canvas(elemento[0], {
											"svgRendering" :true,
										    onrendered: function(canvas) {
												gerarCanvas(canvas,elementoPosicao,elemento,objetoItem);									    	
												if(j === itensApresentacaoCanvas[i].itens.length-1){
													$(elementos).show(0,function(){
														if(objeto.dadosBoxAjuda){
															posicionarCaixaAjuda(objeto.dadosBoxAjuda,$(canvas));
														}												
														if(objeto.afterShow){
															objeto.afterShow($(canvas));
														}
														habilitarBotoes(x);
														$(".navegacao-bullet[posicao='" + x + "']").addClass("navegacao-bullet-selecionado");
														if(objeto.posicionarScrollElemento !== undefined){
															posicionaElementoScroll($(canvas),objeto.posicionarScrollElemento);
														}
														if(elementoEscondido){
															elemento.hide(0);
														}
													});
												}									    	
										    }
										});	
									}
								});

							}
						}
					});
				}
			});

		}
		
		function posicionaElementoScroll(elemento,top){
			var posicaoInicial = elemento.offset().top -top;
			$(window).scrollTop(posicaoInicial);
		}
		
		function habilitarBotoes(x){
			$(".apresentacao-anterior,.apresentacao-proximo").show(0);
			if(x === 0 ){
				$(".apresentacao-anterior").hide(0);
			}else if(x===itensApresentacaoCanvas.length-1 ){
				$(".apresentacao-proximo").hide(0);
			}				
		}
		function gerarCanvas(canvas,elementoPosicao, elemento,objetoItem){
			$(".apresentacao-itens").append($(canvas));
		    $(canvas).attr("id",objetoItem.id).css({"top": elementoPosicao.offset().top,"left": elementoPosicao.offset().left,"width": elemento.outerWidth(),"height": elemento.outerHeight()}).addClass("apresentacao-item");
		}

		function posicionarCaixaAjuda(dados,elemento){
			
			var div = undefined;
				
			if($(".apresentacao-itens").find(".apresentacao-ajuda").length === 0){	
				div = $("<div></div>",{"class":"apresentacao-ajuda apresentacao-ajuda-topo"})
				.append(
					$("<div></div>",{"class":"apresentacao-ajuda-triangulo"}).append($("<div></div>"))	
				)
				.append(
					$("<div></div>",{"class":"apresentacao-ajuda-conteudo"})
					.append(
						$("<div></div>",{"class":"apresentacao-conteudo-titulo"}).html(dados.dados  && dados.dados.titulo ? dados.dados.titulo : "")
					)
					.append(
						$("<div></div>",{"class":"apresentacao-conteudo-texto"})
						.append($("<div></div>").html(dados.dados  && dados.dados.texto ? dados.dados.texto : ""))
					)
				).appendTo($(".apresentacao-itens"))
				.append(criarElementosNavegacao());
				
			}else{
				div = $(".apresentacao-itens").find(".apresentacao-ajuda");
			}

			div.find(".apresentacao-ajuda-triangulo").removeAttr("style");
			if(dados.estiloSeta){
				div.find(".apresentacao-ajuda-triangulo").css(dados.estiloSeta);
			}
			var espacoVertical = 0;
			if(dados.espacoVertical!==undefined){
				espacoVertical = dados.espacoVertical;
			}
			var espacoHorizontal = 0;
			if(dados.espacoHorizontal!==undefined){
				espacoHorizontal = dados.espacoHorizontal;
			}
			
			if(dados.estilo){
				div.css(dados.estilo);
			}
			if(dados.classe){
				div.attr("class","apresentacao-ajuda " + dados.classe);
				if(dados.classe === "apresentacao-ajuda-fundo"){
					div.css({"left": (elemento.offset().left + (elemento.outerWidth(true)/2) - ($(".apresentacao-ajuda").outerWidth(true)/2)  + espacoHorizontal) + "px",
												  "top": (elemento.offset().top - $(".apresentacao-ajuda").outerHeight(true) + 10 + espacoVertical) + "px"});
				}else if(dados.classe === "apresentacao-ajuda-esquerda"){
					div.css({"left": (elemento.offset().left - $(".apresentacao-ajuda").outerWidth(true) + 10   + espacoHorizontal ) + "px",
						  "top": (elemento.offset().top - $(".apresentacao-ajuda").find(".apresentacao-ajuda-triangulo").position().top + espacoVertical)  + "px"});
				
				}else if(dados.classe === "apresentacao-ajuda-direita"){
					div.css({"left": (elemento.offset().left + elemento.outerWidth() - 10   + espacoHorizontal ) + "px",
						  "top": (elemento.offset().top - $(".apresentacao-ajuda").find(".apresentacao-ajuda-triangulo").position().top + espacoVertical)  + "px"});
					
				}else if(dados.classe === "apresentacao-ajuda-topo"){
					div.css({"left": (elemento.offset().left + (elemento.outerWidth(true)/2) - ($(".apresentacao-ajuda").outerWidth(true)/2)   + espacoHorizontal ) + "px",
						  "top": (elemento.offset().top + elemento.outerHeight(true) - 20 + espacoVertical) + "px"});
				}
			}
			div.fadeIn();
		}
		function criarElementosNavegacao(){
			
			var div = $("<div></div>",{"class":"navegacao"});
			for(i=0;i<itensApresentacaoCanvas.length;i++){
				var item = itensApresentacaoCanvas[i];
				if(item.dadosBoxAjuda){
					$("<a></a>",{"class": "navegacao-bullet" ,"href":"javascript:void(0);","title":item.dadosBoxAjuda.dados ?  item.dadosBoxAjuda.dados.titulo : "" ,"posicao":i})
					.appendTo(div)
					.click(function(e){
						$(".navegacao-bullet").removeClass("navegacao-bullet-selecionado");
						indice = parseInt($(this).attr("posicao"));
						posicionar(indice);
					});
				}
			}
			
			$("<a></a>",{"class": "navegacao-fechar" ,"href":"javascript:void(0);","title":"Finalizar tour do auto atendimento pessoa f&iacute;sica"}).html("X")
			.click(function(e){
				apresentacaoFechar();
			})
			.appendTo(div);
			return(div);
		}

		function apresentacaoProximo(){
			if(indice < itensApresentacaoCanvas.length){
				indice ++;
				posicionar(indice);
			}
		}
		function apresentacaoAnterior(){
			if(indice > 0){
				indice --;
				posicionar(indice);
			}	
		}
		function apresentacaoFechar(){
			$(".apresentacao-item").remove();
			$(".apresentacao-overlay").remove()
			$(".apresentacao-itens").remove()
			$('body').removeClass('apresentacao');
			if(opt.aoFechar){
				opt.aoFechar();
			}
		}		
	}
})(jQuery);


$.criarCaixaDialogo = function(options){
	
	var defaults = {
		width : 300,
		height : 300,
		left : 0,
		top : 0,		
		posicaoseta : "superior-esquerdo"			
	};
	var opt = $.extend(defaults, options);

	var classeseta = "seta"; 
	
	if(opt.posicaoseta === "superior-esquerdo"){
		classeseta += " seta-superior seta-superior-esquerdo";
	}else if(opt.posicaoseta === "superior-direito"){
		classeseta += " seta-superior seta-superior-direito";
		opt.left = opt.left - opt.width;
	}
	
	var div = $("<div></div",{"class" : "caixa-dialogo"})
	.append($("<div></div>",{"class" : classeseta}))
	.append($("<div></div>",{"class" :  "caixa-dialogo-conteudo"}).append($("<div></div>",{"class" :  "overlay"})))
	.css({"width" : opt.width , "height": opt.height,"left" : opt.left,"top": opt.top })
	.appendTo($("body"));
	
	if(opt.mostrarbotaofechar){
		div.append(
			$("<div></div>",{"class" : "fechar"}).text("X")
			.click(function(e){
				if(opt.close){
					opt.close();
				}else{
					$(".caixa-dialogo").remove();
				}
			}
		));		
	}
	
	if(opt.html){
		div.find(".caixa-dialogo-conteudo").html(opt.html);
	}else if(opt.elemento){
		div.find(".caixa-dialogo-conteudo").append(opt.elemento);
	} 
	return(div);
}
/*
 * Cria a caixa de dialogo com o conte�do de ajuda da transa��o
 * 
 */
$.criarCaixaDialogoAjuda = function(botao,event){
	
	event.stopPropagation();
	
	if($(".caixa-dialogo").length > 0){
		$(".caixa-dialogo").remove();
	}
	var botao = $(botao);
	$("body").click(function (e){
		var elementoClick = $(e.target);
		var elemento = $.buscaElementoPaiporClasse(elementoClick,"caixa-dialogo");
		if (!elemento){
			$(".caixa-dialogo").remove();
	    }
	});		
	
	var codigoAjuda = botao.attr("codigoajuda");
	
	var opcoes = { left : botao.offset().left + (botao.outerWidth(true) / 2) + 19 ,
				   top : botao.offset().top  - $(window).scrollTop() + (botao.outerHeight(true)),
				   width : 400,
				   posicaoseta : "superior-direito",
				   mostrarbotaofechar : true};
	
	
	var dialog =  $.criarCaixaDialogo(opcoes);
	$.ajaxApf({"url": "/aapf/templates/ajudaTransacao.jsp", 
		"parametros" : {"codigoAjuda" :codigoAjuda},
		"funcaoSucesso" : function(data){
			dialog.find(".caixa-dialogo-conteudo").html(data);
		}
	});
	
	
}
/*
 * 
 * Criar menu de sele��o do tipo de arquivo que deseja salvar
 */
$.criarCaixaDialogoSalvar = function(botao,event){
	
	event.stopPropagation();
	
	if($(".caixa-dialogo").length > 0){
		$(".caixa-dialogo").remove();
	}
	
	botao = $(botao);
	$("body").click(function (e){
		var elementoClick = $(e.target);
		var elemento = $.buscaElementoPaiporClasse(elementoClick,"caixa-dialogo");
		if (!elemento){
			$(".caixa-dialogo").remove();
	    }
	});		
	
	var codigoAjuda = botao.attr("codigoajuda");
	
	// Descri��o dos tipos de arquivos pass�veis de exporta��o
	
	var descricaoTipos = {"pdf": "PDF (pdf)","txt" : "Arquivo texto (txt)","csv" : "Texto tabulado (csv)","ofx" : "Money 2000+ (ofx)","ofc" : "Money 97/99 (ofc)" };
	var tiposTransacao = [];
	
	if(botao.attr("tipos") && botao.attr("tipos") !== ""){
		tiposTransacao = botao.attr("tipos").split(",");
	}
	
	var ul = $("<ul></ul>",{"class" : "salvar-documento-itens"}).append($("<li></li>",{"class": "salvar-documento-titulo"}).text("Salvar no formato:") );
	$.each(tiposTransacao,function(i,tipo){
		$("<a></a>",{"href" : "javascript:void(0)", "class" : tipo}).text(descricaoTipos[tipo]).attr("tipo" , tipo)
		.click(function(e){
			$.salvarDocumento({"tipo": $(this).attr("tipo"),elemento : botao.attr("elemento"),"nomeArquivo" : botao.attr("nomeArquivo")});
			$(".caixa-dialogo").remove();
		})
		.appendTo(
			$("<li></li>",{"class": "salvar-documento-item"}).appendTo(ul)
		);
	});
	
	var opcoes = { left : botao.offset().left + (botao.outerWidth(true) / 2) - 19,
				   top : botao.offset().top  - $(window).scrollTop() + (botao.outerHeight(true)),
				   width : "auto",
				   height : "auto",
				   posicaoseta : "superior-esquerdo",
				   elemento : ul};
	
	var dialog =  $.criarCaixaDialogo(opcoes);
		
	
}
/*
 * Criar caixa de dialog adicionar relacionamento
 */
$.criarCaixaDialogoAdicionarRelacionamento = function(botao,event){
	
	event.stopPropagation();
	
	if($(".caixa-dialogo").length > 0){
		$(".caixa-dialogo").remove();
	}
	var botao = $(botao);
	$("body").click(function (e){
		var elementoClick = $(e.target);
		if (elementoClick.closest(".caixa-dialogo").length === 0 ){
			$(".caixa-dialogo").remove();
	    }
	});		
	
	var opcoes = { left : botao.offset().left + (botao.outerWidth(true) / 2) - 22 ,
				   top : botao.offset().top  - $(window).scrollTop() + (botao.outerHeight(true)/2) + 9,
				   width : 240,
				   height : "auto",
				   posicaoseta : "superior-esquerdo",
				   mostrarbotaofechar : false};
	
	
	var dialog =  $.criarCaixaDialogo(opcoes);
	dialog.css({"position" :"absolute"});
	$.ajaxApf({"url": "/aapf/srp/relacionamentoPF/RL11-01.jsp",
		"parametros" : {"ambienteLayout" :"modalTransacao"},
		"funcaoSucesso" : function(data){
			dialog.find(".caixa-dialogo-conteudo").html(data);
		}
	});	
};

/*
 * Criar caixa de dialog adicionar favoritas
 */
$.criarCaixaDialogoAdicionarFavorita = function(botao,event){
	
	event.stopPropagation();
	
	if($(".caixa-dialogo").length > 0){
		$(".caixa-dialogo").remove();
	}
	var botao = $(botao);
	$("body").click(function (e){
		var elementoClick = $(e.target);
		if (elementoClick.closest(".caixa-dialogo").length === 0 ){
			$(".caixa-dialogo").remove();
	    }
	});		
	
	var opcoes = { left : botao.offset().left + (botao.outerWidth(true) / 2) + 19 ,
				   top : botao.offset().top  - $(window).scrollTop() + (botao.outerHeight(true)/2) + 9,
				   width : 380,
				   height : "auto",
				   posicaoseta : "superior-direito",
				   mostrarbotaofechar : true};
	
	
	var dialog =  $.criarCaixaDialogo(opcoes);
	dialog.css({"position" :"absolute"});
	$.ajaxServico({"nomeServico": "dadosFavoritar",
		"funcaoOk" : function(data){
			if(data.dados && data.dados.length > 0 ){
				var lista = $("<ul></ul>",{"class":"dados-transacao-favorita"}).appendTo(dialog.find(".caixa-dialogo-conteudo"));
				
				$("<li></li>",{"class":"caixa-dialogo-titulo"}).html("Adiciconar como favorita").appendTo(lista);
				$("<li></li>",{"class":"mensagem-erro"}).appendTo(lista);
				$("<li></li>").html("Nome Personalizado:").append($("<input></input>",{"type":"text","id":"nomePersonalizadoFavorita","autofocus":"autofocus"})).appendTo(lista);
				
				$.each(data.dados, function(i,objeto){
					$("<li></li>")
					.append($("<div></div>",{"class":"label-fav"}).html(objeto.label + ":"))
					.append($("<div></div>",{"class":"valor-fav"}).html(objeto.valor)).appendTo(lista);
				});
				
				$("<li></li>",{"class": "transacao-botoes" }).append(
						$("<input></input>",{"class":"botaoapf noPrint","type":"button","value":"SALVAR","id": "salvaFavorita","name": "salvaFavorita"})
						.click(function(e){
							$(".menu-completo").menuCompleto("salvarFavorita",$("#nomePersonalizadoFavorita").val(),
									function(){
										dialog.find(".overlay").show();
									},function (data){
										dialog.find(".overlay").hide();
										$(".caixa-dialogo .caixa-dialogo-conteudo").append($("<div></div>",{"class":"trancasao-sucesso"}).html("Transa&ccedil;&atilde;o favorita cadastrada com sucesso!"));
										setTimeout(function(){
											$(".caixa-dialogo").remove();
										},1500);
									},
									function (data){
										dialog.find(".overlay").hide();
										dialog.find(".mensagem-erro").html(data.mensagem);
									});
							})
						
				).appendTo(lista);
			}
		}
	});	
};


/*
 * Criar caixa de dialog adicionar relacionamento
 */
$.criarCaixaDialogoMenuContexto = function(botao,event,opcoesMenu){
	
	var width =  240;
	
	event.stopPropagation();
	
	if($(".caixa-dialogo").length > 0){
		$(".caixa-dialogo").remove();
	}
	var botao = $(botao);
	$("body").click(function (e){
		var elementoClick = $(e.target);
		if (elementoClick.closest(".caixa-dialogo").length === 0 ){
			$(".caixa-dialogo").remove();
	    }
	});		
	
	if(botao.offset().left + width > $(window).outerWidth()){
		var opcoes = { left : botao.offset().left + (botao.outerWidth(false) / 2) +18 ,
				   top : botao.offset().top  +  (botao.outerHeight(true)/2) ,
				   width : width,
				   height : "auto",
				   posicaoseta : "superior-direito",
				   mostrarbotaofechar : false};
		
	}else{
		var opcoes = { left : botao.offset().left + (botao.outerWidth(false) / 2) - 18 ,
				   top : botao.offset().top  + (botao.outerHeight(true)/2) ,
				   width : width,
				   height : "auto",
				   posicaoseta : "superior-esquerdo",
				   mostrarbotaofechar : false};
	}
	
	var dialog =  $.criarCaixaDialogo(opcoes);
	dialog.css({"position" :"absolute"});
	var ul = $("<ul></ul",{"class" : opcoesMenu.classelista ? opcoesMenu.classelista : "menu-contexto-itens"}).appendTo(dialog.find(".caixa-dialogo-conteudo"));
	if(opcoesMenu.itens){
		$.each(opcoesMenu.itens,function(i,objeto){
			var li = $("<li></li>").html(objeto.texto).addClass(objeto.classe ? objeto.classe : "").appendTo(ul);
			if(objeto.click){
				li.click(function(e){
					$(this).closest(".caixa-dialogo").remove();
					objeto.click();
				});
			}
		});
	}
};


$.abrirCaixaDialogConfirmacao = function(tipo,texto,callback){
	
	tipo = tipo === undefined || (tipo != 1 && tipo != 2 && tipo != 3) ? 1 : tipo;

	var modalConfirmacao = $("<div></div>",{"id":"modalconfirmacao","class":"modalConfirmacao"})
							.append($("<div></div>",{"class":"texto-confirmacao"}).html(texto))
							.addClass("tipo"+ tipo)
							.appendTo($("body"));

	modalConfirmacao.dialog({
        resizable: false,
        modal: true,
        title: "Confirmação",
        height: "auto",
        width: 400,
        buttons: {
            "Sim": function () {
                $(this).dialog('close');
                callback(true);
            },
             "Não": function () {
                $(this).dialog('close');
                callback(false);
            }
        },
        open : function(){
        	modalConfirmacao.parent().children(".ui-dialog-titlebar").css({"display":"block"});
        	modalConfirmacao.parent().position({my: "center",at: "center",of: window});
        	modalConfirmacao.parent().click(function(e){
        		e.stopPropagation();
        	});      	
        }
    });	
}

/* verifica se o item de menu est� na lista de menus personalizados */ 

$.verificaMenuPersonalizado = function(codigoMenu,codigoTransacao){
	
	var retorno = false;
	$.each(optDadosCliente.dadosCliente.menusPersonalizados,function(i,menuPerso){
		if (parseInt(codigoMenu) === menuPerso.codigoMenu && parseInt(codigoTransacao) === menuPerso.codigoTransacao){
			retorno = true;
		}
	});
	return(retorno);
	
};


/*
 * fun��o que chama a p�gina que respons�vel por salvar os documentos nos
 * diversos formatos
 * 
 */
$.salvarDocumento = function (dados){
	
	var url = "/aapf/includes/salvarDocumento.jsp";  
	var simbolo = jQuery("#simbolo").val();
	if(simbolo){
		var time = Date.now();
		url = url + '?time=' + time + simbolo;
	}
	var formTemp = $('<form></form>').attr("id",'hiddenForm' ).attr("name", 'hiddenForm').attr("action",url).attr("target","_self").attr("method","POST");
	formTemp.append(jQuery("<input></input>",{"type":"hidden","id":"tipoDocumento","name":"tipoDocumento"}).val(dados.tipo));
	formTemp.append(jQuery("<input></input>",{"type":"hidden","id":"ambienteLayout","name":"ambienteLayout"}).val("completo"));	
	
	if(dados.nomeArquivo){
		formTemp.append(jQuery("<input></input>",{"type":"hidden","id":"nomeArquivo","name":"nomeArquivo"}).val(dados.nomeArquivo));
	}
	
	if(dados.elemento){
		formTemp.append(jQuery("<input></input>",{"type":"hidden","id":"elemento","name":"elemento"}).val(dados.elemento));
	}
	
	
    $('body').append(formTemp);
    formTemp.submit();
    formTemp.remove();
}

$.downloadArquivo  = function (url){
	var formTemp = $('<form></form>').attr("id",'hiddenForm' ).attr("name", 'hiddenForm').attr("action",url).attr("target","_self").attr("method","POST");
    $('body').append(formTemp);
    formTemp.submit();
    formTemp.remove();
}
/*
 * 
 * fun��o respons�vel pela cria��o do modal parametros opcoes : { url : "p�gina
 * que deseja carregar no modal", parametros : "parametros da url";
 * elementoAppend : "elemento que deseja adicionar ao modal" , height : "altura
 * do modal", width : " largura do modal ", closeOnEscape : "habilitar o fechar
 * atrav�s do bot�o esc" }
 */


$.abrirModal = function abrirModal(opcoes){

	var nomeModal = $("body").find("#modal").length > 0 ?  $("body").find("#modal1").length > 0 ? "modal2" : "modal1" : "modal" ;
    var modal = $("<div></div>",{"id":nomeModal,"class":"modal"}).appendTo($("body"));
    var closeOnEscape = true;
    if(opcoes.closeOnEscape !== undefined) {
    	closeOnEscape = opcoes.closeOnEscape; 
    }
    if(opcoes.resizeAuto === undefined) {
    	opcoes.resizeAuto = true;
    }
    
    if(opcoes.mostrarTitulo === undefined){
    	opcoes.mostrarTitulo = false;
    }
    opcoes.mostrarBotaoFechar = "sim";
    
    if(opcoes.mostrarBotaoFechar !== undefined){
    	opcoes.mostrarBotaoFechar = opcoes.mostrarBotaoFechar;
    }
    
    modal.dialog({
            autoOpen: false,
            modal: true,
            closeOnEscape : closeOnEscape,
            resizable : false,
            draggable : false,
            stack : false,
            closeText : "X",
            close: function( event, ui ) {
                $(this).dialog("destroy");
                $(this).remove();
                
                if(opcoes.close){
                	opcoes.close(event,ui);
                }
                $("html").removeClass("modal-aberto");
            },
            open: function() { 
            	$("html").addClass("modal-aberto");	
            }
    });
    
	if(opcoes.width === '0'){
		opcoes.width = 'auto';
	}
	if(opcoes.height === '0'){
		opcoes.height = 'auto';
	}    

	if(opcoes.mostrarTitulo){
		modal.parent().find(".ui-dialog-titlebar").css({"display" : "block"});
		modal.dialog('option', 'title', opcoes.titulo);
	}
	
    modal.dialog('option', 'height', opcoes.height);
    modal.dialog('option', 'width', opcoes.width);
    modal.dialog("open");
    
    if(!opcoes.elementoAppend){
    	if(!opcoes.parametros){
    		opcoes.parametros = {}	
    	}
    	if(!opcoes.parametros.ambienteLayout){
    		opcoes.parametros.ambienteLayout = "modalTransacao";
    	}
    	
    	if(opcoes.mostrarBotaoFechar=== false){
    		opcoes.parametros.mostrarBotaoFechar = "nao";
    	}
    	
        if (opcoes.atualizaContadorSessao === undefined) { // metodo de passagem de parametros
        	opcoes.atualizaContadorSessao = true;
    	}    	
    	
	    var dados = {
	    		atualizaContadorSessao : opcoes.atualizaContadorSessao,
	    		url : opcoes.url,
	    		parametros : opcoes.parametros,
	    		funcaoAntesExecucao : function(){
	    			if(opcoes.resizeAuto){
	    				var height = modal.outerHeight(true);
	    				modal.dialog('option','height',height);
	    			}
					modal.html('<img class="carregandoAjax" src="/aapf/imagens/carregando.gif"/>');     			
	    		},
	    		funcaoSucesso : function(data){
	    			
	    			var elementoTemp = $("<div></div>").html(data);
	    			
				    $.atualizarScripts(modal,elementoTemp);
				    $.atualizarSessao(elementoTemp);
				    if(opcoes.resizeAuto){
				    	modal.dialog('option','height','auto');
				    }
				    modal.position({my: "center",at: "center",of: window});
	    			if(optDadosCliente.dadosCliente.servidor === "externo" || optDadosCliente.dadosCliente.servidor === "interno"){
	    				if(!optDadosCliente.dadosCliente.inibeENI){
	    					$.carregarENI(opcoes.url);
	    				}									
	    			}
	    			
	    			if(opcoes.callback){
    					opcoes.callback(modal);
	    			}
	    			
	    		}		
	    }
	    
	    $.ajaxApf(dados);
    }else{
		if(opcoes.mostrarTitulo){
			modal.parent().find(".ui-dialog-titlebar").css({"display" : "block"});
			modal.dialog('option', 'title', opcoes.titulo);
		}else{
			modal.parent().find(".ui-dialog-titlebar").css({"display" : "none"});
		} 
    	modal.append(opcoes.elementoAppend);
    }
    
    prevHeight = modal.parent().height();
    modal.parent().mutate('height',function (element,info){  
        if(prevHeight != $(element).height()){
    		var posicao = ($(window).outerHeight() /2) -  ($(element).height() /2);	
    		modal.parent().css({"top" : posicao + "px"});
        	prevHeight = modal.parent().height();
        }
    });     
    
    return(modal);
}
$.fecharModal = function(elemento){
	
	if(elemento.closest(".modal").length > 0){
		elemento.closest(".modal").dialog("close");
	}else if(elemento.closest(".caixa-dialogo").length > 0){
		elemento.closest(".caixa-dialogo").remove();
	}
}


$.minhaPagina = function(){
	$.carregaFormularioAjax('/aapf/personalizacao/coca.jsp');
};

$.registroReclamacao = function(){
	$.carregaFormularioAjax("/aapf/comunicacao/BBR-00.jsp",{"codNoticia":"39254"});
};

/*
 * Carrega o formulario da transa��o atrav�s do menu url :
 */



$.atualizarSessao =function(elementoTemp){
	try{
		var tempo = parseInt(elementoTemp.find("#temposessao").val());
		if(isNaN(tempo)){
			tempo = 450;
		}
		$(".sessao").contadorSessao("iniciarSessao",tempo);
	}catch(err){
		
	}
}


/*
 * 
 * fun��o que executa chamada no servidor para reiniciar sess�o
 * 
 */
$.refazerSessao = function(modal,funcaoCallback){
	var cookiel = getCookie("aapf.l");
	if(cookiel && cookiel !== "" && cookiel !== 0 && cookiel !== "0"){
		$.ajaxServico({"nomeServico":"ping",
			"funcaoOk" : function(data) {
				if(funcaoCallback){
					funcaoCallback(data);
				}else{
					$(".sessao").contadorSessao("iniciarSessao" , parseInt(data.tempoSessao));
					modal.dialog("close");
				}
			},
			"funcaoErro" : function(data) {
				if(funcaoCallback){
					funcaoCallback(data);
				}else{
					$.trocarConta({"dependenciaOrigem" : optDadosCliente.dadosCliente.agencia,"numeroContratoOrigem" : optDadosCliente.dadosCliente.conta});
					modal.dialog("close");
				}
			}
		});	
	}
}

$.listarTotalPendencias = function(funcao){
	$.ajaxServico({"nomeServico":"listarTotalPendencias",
		"parametros" : {},
		"funcaoAguarde" : function() {},
		"funcaoOk" : funcao,
		"funcaoErro" : function(data) {
		}
	});  
}

$.carregarFormularioListaPendencia = function(){
	$.carregaFormularioAjax("/aapf/pendencia/PN8-01.jsp");
};

$.buscarLinkFaleCom = function(cdLink){
	$.ajaxServico({"nomeServico":"buscarLinkFaleCom",
		"parametros" : {"cdLink": cdLink},
		"funcaoAguarde" : function() {},
		"funcaoOk" : function(data) {
			//console.log(data);
			if(data.linkExterno == "S"){
				var link = encodeURIComponent(data.link);
				if(data.mostrarAviso == "S"){
					popupAlertaRedirecionamento('/aapf/direciona.jsp?url='+link,'popUp','width=566,height=482');
				}else{
					window.open(link, '_blank');
				}
			}else{
				$.carregaFormularioAjax(data.link);
			}
		},
		"funcaoErro" : function(data) {
			console.log(data);
		}
	});  	
};


$.carregarFormularioErrosCadastro = function(){
	$.carregaFormularioAjax("/aapf/cadastroCliente/index.jsp");
};


$.trocarConta = function(dados){
	if (optDadosCliente.dadosCliente.isLoginBBCode){
		$.abrirModal({"elementoAppend" : criarTelaRefazerloginBBCode(),"parametros" : dados,"width":"750","height":"520","resizeAuto":false,"closeOnEscape" : dados.closeOnEscape,"mostrarBotaoFechar" : dados.mostrarBotaoFechar,"atualizaContadorSessao" : dados.atualizaContadorSessao});
	}else{
		$.abrirModal({"url":"/aapf/seguranca/loginTrocaConta.jsp","parametros" : dados,"width":"720","height":"390","resizeAuto":false,"closeOnEscape" : dados.closeOnEscape,"mostrarBotaoFechar" : dados.mostrarBotaoFechar,"atualizaContadorSessao" : dados.atualizaContadorSessao});
	}
}

// Chamada do servi�o de troca de titular
$.trocaTitular = function(titular){
	
	$.ajaxServico({"nomeServico":"trocaTitular",
		"parametros" : {"servico": "trocaTitular","titular" : titular},
		"funcaoAguarde" : function() {
			$(".principal-overlay").show();
		},
		"funcaoOk" : function(data) {
			$.getFoto({"id" : data.codigo,"tipo" :"srp","dataAtualizacao" : data.dataAtualizacao},function(foto) {
				if(foto){
					$(".fotoPerfil a").css({"background-image": "url(data:image/png;base64,"+ foto + ")"});
				}
		    });			
			 window.location = "/aapf/principal.jsp?ambienteLayout=completo";
		},
		"funcaoErro" : function(data) {

		}
	});	
}

function getAcaoBotao(botao){
	jQuery("#botaoAcao").val(botao);
}
$.verificaUserMedia = function(){
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	return(navigator.getUserMedia)
};
/*******************************************************************************
 * ***********************************************************************
 * Fun��es de tratamento do cache das imagens dos relacionamentos
 * **********************************************************************
 ******************************************************************************/


var db;

/* Cria a estrutura de cache que ir� guardar as fotos dos relacionamentos */
$.incializadb = function (funcao,funcaoNaoSuportaIDB){
	if(window.indexedDB){
		if(!db){
		
			request = window.indexedDB.open("fotosaapf2", 3);
			request.onerror = function(event) {console.log("error: ");};
			request.onsuccess = function(event) {
				db = request.result; 
				funcao();
			};
			request.onupgradeneeded = function(event) {
			    var db = event.target.result;
			    if(!db.objectStoreNames.contains("fotos")) {
			    	var objectStore = db.createObjectStore("fotos", {keyPath: "id"});
			    }
			    if(!db.objectStoreNames.contains("dados")) {
			    	db.createObjectStore("dados", {keyPath: "id"});
			    }			    
			}
		}else{
			funcao();
		}
	}else{
		if(!optDadosCliente.dadosCliente.foto){
			$.buscaFotosServidor(optDadosCliente.dadosCliente.codigo);
		}
	}
};
$.atualizaDadosPerfilLocal = function(dados){
	optDadosCliente.dadosCliente.nomepersonalizado = dados.nomepersonalizado;
	$("#nomePersonalizado").html(dados.nomepersonalizado);
	$(".fotoPerfil a").css({"background-image": "url(data:image/png;base64,"+ dados.base64 + ")"});
	$.setImagemRelacionamento(dados.id,dados.base64);
	$.novaFoto({"id" :parseInt(dados.id) , "base64" : dados.base64,"dataAtualizacao" : dados.dataAtualizacao});
}

$.atualizaFotoLocalRelacionamento = function(dados){

	$.setImagemRelacionamento(dados.id,dados.base64);
	$.novaFoto({"id" :parseInt(dados.id) , "base64" : dados.base64,"dataAtualizacao" : dados.dataAtualizacao});
}

/* adicina nova foto no cache do navegador */
$.novaFoto = function(dados) {
	$.incializadb(function(){
	    var request = db.transaction(["fotos"], "readwrite").objectStore("fotos").put(dados);
	    request.onsuccess = function(event) {}
	    request.onerror = function(event) {}
	});
}
/* Busca a foto no cache do navegador */
$.getFoto = function(objeto,funcao){
	if(window.indexedDB && objeto.tipo !== 'fb'){
		$.incializadb(function(){
			
		    var request = db.transaction(["fotos"], "readwrite").objectStore("fotos").get(parseInt(objeto.id));
		    request.onsuccess = function(event) {
		    	if(event.target.result){
		    		if(objeto.tipo === "srp" && $.verificaAtualizacaoFoto(objeto.id,event.target.result.dataAtualizacao)){
		    			$.buscaFotoServidor(objeto,function(data){
		    				$.atualizaFotoLocalRelacionamento({"id" :parseInt(objeto.id) , "base64" : data.base64, "dataAtualizacao" : objeto.dataAtualizacao});
		    				funcao(data.base64);							  
		    			});
		    		}else{
		    			funcao(event.target.result.base64);
		    		}
		    	}else{
	    			$.buscaFotoServidor(objeto,function(data){
	    				$.atualizaFotoLocalRelacionamento({"id" :parseInt(objeto.id) , "base64" : data.base64, "dataAtualizacao" : objeto.dataAtualizacao});
	    				funcao(data.base64);							  
	    			});
		    	}
		    }
		    request.onerror = function(event) {}
		});		
	}else{
		$.buscaFotoServidor(objeto,function(data){
			$.atualizaFotoLocalRelacionamento({"id" : parseInt(objeto.id) , "base64" : data.base64});
			funcao(data.base64);							  
		});
	}
};
$.buscaFotoServidor = function(objeto,funcao){
	if(objeto.tipo === "srp"){
		if(objeto.hasFoto === undefined || objeto.hasFoto === true){
			
			$.ajaxServico({"nomeServico":"fotoCliente",
				"parametros" : {"codIdentificadorConta" :objeto.id},
				"funcaoOk" : function(data) {
					funcao(data);	
				}
			});			
		}
	}else{
		$.buscaFotoClienteFacebook(objeto,funcao);
	}
}
/* Verifica se a foto do cache necessita de atualiza��o */
$.verificaAtualizacaoFoto = function (id,data){
	if(parseInt(optDadosCliente.dadosCliente.codigo) === parseInt(id)){
		if(optDadosCliente.dadosCliente.indicadorImagem === "S"){
			if(!data ||  data === "" || data != optDadosCliente.dadosCliente.dtAtuaFoto){
				return(true);
			}
		}
	}else{
		if(optDadosCliente.dadosCliente.relacionamentos && optDadosCliente.dadosCliente.relacionamentos.length > 0){
			for(i=0;i<optDadosCliente.dadosCliente.relacionamentos.length;i++){
				if(parseInt(optDadosCliente.dadosCliente.relacionamentos[i].identificadorConta) === parseInt(id)){
					var rel = optDadosCliente.dadosCliente.relacionamentos[i];
					if(!data || data === "" || data != rel.dtAtuaFoto){
						return(true);
					}			
				}
			}
		}
	}
	return(false);
};
$.setImagemRelacionamento = function(id,base64){
	if(parseInt(optDadosCliente.dadosCliente.codigo) === parseInt(id)){
		optDadosCliente.dadosCliente.foto = base64;
	}else{
		if(optDadosCliente.dadosCliente.relacionamentos){
			for(j=0;j<optDadosCliente.dadosCliente.relacionamentos.length;j++){
				if(parseInt(optDadosCliente.dadosCliente.relacionamentos[j].identificadorConta) === parseInt(id)){
					optDadosCliente.dadosCliente.relacionamentos[j].base64 = base64;
				}
			}
		}
	}
};

/*******************************************************************************
 * fim das fun��es de tratamento das fotos dos relacionamentos
 ******************************************************************************/
/*
 * 
 * Fun��es de conex�o com facebook
 * 
 */

$.verificaLoginFB = function(){
	if(optDadosCliente.dadosCliente.uid){
		var url = "https://www.facebook.com/v2.10/dialog/oauth?redirect_uri="+ urlBase +"/aapf/srp/relacionamentoPF/verificarLogadoRedeRelacionamento.jsp?uid="+optDadosCliente.dadosCliente.uid+"&client_id=380699942014883&response_type=token&format=jsonp";
		var frame =  $("<iframe></iframe>",{width:0,height:0,'src': url}).load(function(){
			 jQuery(this).remove();
		}).appendTo('body');
	}
}

$.montarUrl = function(comando){
	var url = undefined;
	if(comando === "login"){
		url = "https://www.facebook.com/v2.10/dialog/oauth?client_id=380699942014883&&scope=public_profile%2Cuser_friends%2Cpublic_profile%2Cuser_friends%2Cemail&display=popup&response_type=token" +
			   "&redirect_uri="+ urlBase + encodeURIComponent("/aapf/srp/relacionamentoPF/respostaLoginRedeRelacionamento.jsp?uid="+optDadosCliente.dadosCliente.uid);
	}
	return(url);
}
$.loginRedeRelaconamento = function (){
	var url = $.montarUrl("login");
	$.abrirPopup(url,600,350);
}
/* busca os dados do cliente no fb*/
$.getDadosCliente = function(token,funcao){
	$.ajaxApf({
		type : "get",
		url: "https://graph.facebook.com/v2.10/me",
		parametros : {"fields" : "id,first_name,last_name","access_token":token},
		"tiporetorno" :"jsonp",
		"funcaoSucesso" : funcao
	});
}
/* busca os relacionamento do cliente no facebook que aderiram ao aplicativo do bb*/
$.getRelacionamentos = function(token,uid,funcao){
	$.ajaxApf({
		type : "get",
		url: "https://graph.facebook.com/v2.10/me/friends",
		parametros : {"fields" : "id,first_name,last_name,name,cover,picture","access_token":token},
		"tiporetorno" :"jsonp",
		"funcaoSucesso" : funcao
	});
}
/* atualiza a lista de relacionamento adicionando os do facebook */
$.atualizaRelacionamentos = function (token,uid,janela){
	janela.$.getRelacionamentos(token,uid,function(data){
		var relacionamentosBB = janela.optDadosCliente.dadosCliente.relacionamentos;
		for(var j = 0;j < data.data.length;j++){
			var objetoFB = data.data[j];
			var bAchou = false;
			for(var i=0;i<relacionamentosBB.length;i++){
				var objetoBB = relacionamentosBB[i];
				if(parseInt(objetoBB.uid) === parseInt(objetoFB.id)){
					bAchou = true;
				}	
			}
			if(!bAchou){
				janela.optDadosCliente.dadosCliente.relacionamentos.push({"uid":objetoFB.id,  "nome" : objetoFB.name,"pic_square" : objetoFB.picture.data.url,"tipo" : "fb"});
			}
		}
		janela.$("#botaoConectarFacebook a").html("Desconecte-se").attr("conectado","1");
		janela.$(".menu-relacionamento").menuRelacionamento();
		janela.criarNanoScroll(janela.$(".menu-lista-relacionamento").find(".nano"));
	});
}
/* remove ades�o do cliente ao aplicativo do banco no facebook no SRP */
$.removerAdesaoFacebook = function(funcaoAguarde,funcaoSucesso,funcaoErro){
	
	$.ajaxServico({"nomeServico":"removerAdesaoRedeRelacionamento",
		"funcaoAguarde" : funcaoAguarde,
		"funcaoOk" : function(data) {
			$.removerAdesaoAplicativo(data.access_token,function(){},funcaoSucesso,funcaoErro);
		},
		"funcaoErro" : funcaoErro
	});	
};

/* remove ades�o do cliente ao aplicativo do banco no facebook */
$.removerAdesao = function(){

	$.removerAdesaoFacebook(
	function(){
		$(".menu-relacionamento .menu-itens .overlay").show();
	},
	function(data){
		$(".menu-relacionamento .menu-itens .overlay").hide();
		var relacionamentos = [];
		for(j=0;j<optDadosCliente.dadosCliente.relacionamentos.length;j++){
			if(optDadosCliente.dadosCliente.relacionamentos[j].tipo!=="fb"){
				relacionamentos.push(optDadosCliente.dadosCliente.relacionamentos[j]);
			}	
		}
		optDadosCliente.dadosCliente.relacionamentos = relacionamentos;
		$("#botaoConectarFacebook a").attr("conectado","0").html("conecte-se");
		$(".menu-relacionamento").menuRelacionamento();
		criarNanoScroll($(".menu-lista-relacionamento").find(".nano"));
	},
	function(){
		$(".menu-relacionamento .menu-itens .overlay").hide();
	});
	
	
}
/* Envia solicita��o de relacionamento 
   parametro objeto json no formanto  {"dependenciaDestino" : "agencia do relacionamento", "numeroContratoDestino" : "conta do relacionamento", "titularidade":"titularidade do relacionamento"}*/
function enviarSolicitacao(solicitacao){
	$.ajaxServico({"nomeServico":"solicitarRelacionamento",
		"parametros" : solicitacao,
		"funcaoAguarde" : function() {
			$(".caixa-dialogo .caixa-dialogo-conteudo").append($("<div></div>",{"class":"overlay"}).show());
		},
		"funcaoOk" : function(data) {
			$(".caixa-dialogo .caixa-dialogo-conteudo").append($("<div></div>",{"class":"trancasao-sucesso"}).html("Solicita&ccedil;&atilde;o enviada com sucesso!"));
			setTimeout(function(){
				$(".caixa-dialogo").remove();
				$(".menu-relacionamento").menuRelacionamento("buscaSolicitacoes");
			},1000);
		},
		"funcaoErro" : function(data) {
			$(".caixa-dialogo .overlay").remove();
			$(".caixa-dialogo .transacao-erros-validacao").html("<span>"+data.mensagem +"</span>");
		}
	});	
};


//Carregar menus para personalizacao

$.carregarDadosPersonalizacaoMenu = function(){
	
	var menus = optDadosCliente.dadosCliente.menuCompleto.menus;

	var menuSelecao = $(".menu-itens-selecao").bind('mousewheel', function (event) {
		$.stopPropagationScroll(this,event);
	});

	for(i=0;i< menus.length ;i++){// Menu primeiro nivel
		var menu1 = menus[i];
		if(menu1.subMenus && menu1.subMenus.length > 0 ){
			var itemNivel= $("<div></div>",{"class" : "menu-personalizacao-item-nive1"}).appendTo(menuSelecao);
			var menuTitulo = $("<div></div>",{"class" : "menu-personalizacao-titulo"}).html(menu1.nm).appendTo(itemNivel).css({"background-image": "url("+ menu1.img + ")"})
			var conteudoTitulo = $("<div></div>",{"class" : "menu-personalizacao-conteudo"}).appendTo(itemNivel);
			var contador = 0;
			for(j=0;j< menu1.subMenus.length ;j++){// Menu segundo nivel
				var subMenu = menu1.subMenus[j];
				$("<li></li>",{"class" : "personalizacao-item-nivel2"}).appendTo(conteudoTitulo).html(subMenu.nm);
				for(l=0;l< subMenu.transacoes.length ;l++){
						var transacao = subMenu.transacoes[l];
						var itemnivel3 = $("<li></li>",{"class" : "personalizacao-item-nivel3"}).appendTo(conteudoTitulo);
						var isMenuPersonalizado = $.verificaMenuPersonalizado(menu1.id,transacao.id);
						
						$("<div></div>",{"codigoPai" : menu1.id,"codigo" : transacao.id}).text(transacao.nm).appendTo(itemnivel3)
						.click(function(e){
							e.stopPropagation();
							$(this).toggleClass("menu-item-selecionado");
						})
						.addClass(isMenuPersonalizado ? "menu-item-selecionado":"");
						contador++;
				}
				contador++;
			}
			if(contador > 7 ){
				conteudoTitulo.css({"height" : ((contador * 40) / 3) + 40 + "px"});
			}else if(contador < 3 ){
				conteudoTitulo.css({"height" : (contador * 40)  + 40 + "px"});
			}else{
				conteudoTitulo.css({"height" : (contador * 40)  + 40 + "px"});
			}
		}
	}	
	
}

//*salvar personalizacao do menu
$.salvarPersonalizacao = function(){
	var codigosMenuSel = [];
	$(".menu-item-selecionado").each(function(i){
		var indice = -1;
		for(j=0;j<codigosMenuSel.length;j++){
			if($(this).attr("codigoPai") === codigosMenuSel[j].codigoPai){
				indice = j;
			}
		}
		if(indice!==-1){
			codigosMenuSel[indice].itens.push({"codigo": $(this).attr("codigo")});
		}else{
			codigosMenuSel.push({"codigoPai": $(this).attr("codigoPai"),"itens" :[{"codigo": $(this).attr("codigo")}]});	
		}
	});	
	
	$(".menu-completo").menuCompleto("salvarMenuPersonalizado",codigosMenuSel,
			function(){$("#modal").dialog("close");},
			function(){});
		
}

/*******************************************************************************
 * fim das fun��es de conex�o com o facebook /
 ******************************************************************************/


/* retira acentos de um texto */ 
$.acentuacaoAmigavel = function (txt) {
	var texto = txt;
	var textoSemAcento;
	textoSemAcento = texto.replace(/�/gi, "a");
	textoSemAcento = textoSemAcento.replace(/�/gi, "a");
	textoSemAcento = textoSemAcento.replace(/�/gi, "a");
	textoSemAcento = textoSemAcento.replace(/�/gi, "e");
	textoSemAcento = textoSemAcento.replace(/�/gi, "e");
	textoSemAcento = textoSemAcento.replace(/�/gi, "e");
	textoSemAcento = textoSemAcento.replace(/�/gi, "i");
	textoSemAcento = textoSemAcento.replace(/�/gi, "i");
	textoSemAcento = textoSemAcento.replace(/�/gi, "o");
	textoSemAcento = textoSemAcento.replace(/�/gi, "o");
	textoSemAcento = textoSemAcento.replace(/�/gi, "o");
	textoSemAcento = textoSemAcento.replace(/�/gi, "u");
	textoSemAcento = textoSemAcento.replace(/�/gi, "u");
	textoSemAcento = textoSemAcento.replace(/�/gi, "u");
	textoSemAcento = textoSemAcento.replace(/�/gi, "c");
	return textoSemAcento;
}
/*
 * Busca um elemento pelo menos um nivel acima que tenha uma determinada classe
 * 
 */

$.buscaElementoPaiporClasse = function(elemento,classe){
	
	if(elemento.prop("tagName").toLowerCase() || elemento.parent().prop("tagName").toLowerCase() === "body"){
		return undefined;
	}else{
		if(elemento.parent() && elemento.parent().hasClass(classe)){
			return(elemento.parent());
		}else{ 
			return($.buscaElementoPaiporClasse(elemento.parent(),classe));
		}
	}
}
/*
 * impede que o evento de scroll se propague para outros elementos. parametros
 * objeto : elemento que receber� o evento de scroll evento : objeto evento
 */
$.stopPropagationScroll = function(objeto,event){
	var direcao = event.originalEvent.wheelDelta /120 > 0 ? 1 : 2;
	var height = $(objeto).outerHeight();
    if (((height + $(objeto).scrollTop()) >= objeto.scrollHeight && direcao ===2) ||
    	($(objeto).scrollTop() === 0  && direcao ===1)) {
        event.preventDefault();
    }
}
/*
 * transforma uma url em um objeto json no formato ex : {"url" : "url" ,
 * "parametros" : {"a", "a"} parametro url : url que deseja transformar em um
 * objeto
 */
$.getDadosUrl = function(url){
	
	if(url.indexOf("?") !=-1 &&  url.indexOf("#") !=-1){
		urlcompleta = url.replace("#", "&");
	}else if(url.indexOf("#") !=-1){
		urlcompleta =url.replace("#", "?");
	}else{
		urlcompleta = url;
	}
	var pos = urlcompleta.indexOf("?");
	var dados = {};
	if(pos!=-1){
		dados.url = urlcompleta.substring(0,pos);
		dados.parametros = {};
		var strparametros = urlcompleta.substring(pos+1);
		var parametros = strparametros.split("&");
		for(i = 0;i<parametros.length;i++){
			var parametro = decodeURIComponent(parametros[i]);
			var indice = parametro.indexOf("="); 
			if(indice!==-1){
				var nomeParametro = parametro.substring(0, indice);  
				var valorParametro = "";
				if(parametro.length >=indice+1){
					valorParametro = parametro.substring(indice+1);
				}
				dados.parametros[nomeParametro] = valorParametro;
			}else{
				dados.parametros[parametro] = "";
			}
		}
	}else{
		dados.url= urlcompleta;
	}
	return(dados);
};
/*
 * abre um popup parametros url : pagina que deseja abrir no popup w : largura
 * do popup h : altura do popup
 */
$.abrirPopup = function(url,w,h) {
	  var left = (screen.width/2)-(w/2);
	  var top = (screen.height/2)-(h/2);
	  var targetWin = window.open (url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 


/* cria barra de rolagem estilizada */

function criarNanoScroll(objeto){
	setTimeout(function() {
		objeto.nanoScroller({preventPageScrolling: true,alwaysVisible: false});
    }, 200);
} 

$(document).ajaxSuccess(function() {
	situacaoRequisicao = 0;
});
$(document).ajaxStop(function() {
	situacaoRequisicao = 0;
});
$(document).ajaxError(function() {
	situacaoRequisicao = 0;
});
$(document).ajaxStart(function() {
	situacaoRequisicao = 1;
});

function IdentificadorBB() { this.browserDetect = new BrowserDetect(); this.flashDetector = new Flash(navigator.userAgent); this.pdfDetector = new PDF(); this.gravouInicio = false; }  IdentificadorBB.prototype = {  count : function (u, d, s, e, g, i, z, y, a, r) { if (s != "") { if (s.indexOf('?') != -1) s = s.substring(0, s.indexOf('?')); s = s.replace(/\!/g, '!3D'); s = s.replace(/\//g, '!2F'); s = s.replace(/\?/g, '!3F'); s = s.replace(/\&/g, '!26'); } r = document.referrer; if (r != null && r != "") { if (r.indexOf('?') != -1) r = r.substring(0, r.indexOf('?')); r = r.replace(/\!/g, '!3D').replace(/\//g, '!2F').replace(/\?/g, '!3F').replace(/\&/g, '!26'); } source = "https://www57.bb.com.br/eni/APPS/counter" + (u != '' ? "/u!3D" + u : "") + "/e!3D" + e + (a != '' ? "/a!3D" + a : "") + (g != '' ? "/g!3D" + g : "") + (i != '' ? "/i!3D" + i : "") + "/d!3D" + d + (z != '' ? "/z!3D" + z : "") + (y != '' ? "/y!3D" + y : "") + (r == '' ? "" : '/r!3D' + r) + (s == '' ? "" : "/s!3D" + s); imagem = document.createElement("img"); imagem.setAttribute('src', source); return false; },  contaURL : function (d, e, s, p) { return this.count('', d, s, e, 'URL', '', '', '', p, ''); },  contaObjeto : function (d, e, g, i, p) { return this.count('', d, '', e, g, i, '', '', p, ''); },  contaObjetoExterno : function (d, e, z, y, p) { return this.count('', d, '', e, '', '', z, y, p, ''); },  getBrowserId : function() { if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 2) {return 2;}if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 3) { return 3; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 4){ return 4; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 5) { return 5; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 6) { return 6; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 7){ return 7; }if (this.browserDetect.browser == "Firefox" && this.browserDetect.version == 2) { return 8; }if (this.browserDetect.browser == "Firefox" && this.browserDetect.version == 3) { return 9; }if (window.navigator.appName === 'Opera' && (function(){var a=window.navigator.userAgent.match(/Version\/(\d+\.\d+)/i); return a != null && a.length >= 2 && a[1] === '10.60';})){return 10;}if (this.browserDetect.browser == "Chrome" && this.browserDetect.version == 2) { return 11; }if (this.browserDetect.browser == "Opera" && this.browserDetect.version == 8) { return 12; }if (this.browserDetect.browser == "Opera" && this.browserDetect.version == 7) { return 13; }if (this.browserDetect.browser == "Firefox" && this.browserDetect.version == 3.6) { return 14; }if (this.browserDetect.browser == "Explorer" && this.browserDetect.version == 8) { return 15; }if (window.navigator.appName === 'Opera' && (function(){var a=window.navigator.userAgent.match(/Version\/(\d+\.\d+)/i); return a != null && a.length >= 2 && a[1] === '10.50';})){return 16;}if (window.navigator.appName === 'Opera' && (function(){var a=window.navigator.userAgent.match(/Version\/(\d+\.\d+)/i); return a != null && a.length >= 2 && a[1] === '10';})){return 17;}if (this.browserDetect.browser == "Opera" && this.browserDetect.version == 9) { return 18; }if (this.browserDetect.browser == "Chrome" && this.browserDetect.version == 6) { return 19; }if (this.browserDetect.browser == "Chrome" && this.browserDetect.version == 5) { return 20; }if (this.browserDetect.browser == "Safari" && this.browserDetect.version == 5) { return 21; }if (this.browserDetect.browser == "invalido") { return 99; }if (this.browserDetect.browser == "invalido2") { return 999; }if (this.browserDetect.browser == "Explorer") { return 32000; }if (this.browserDetect.browser == "Firefox") { return 32001; }if (this.browserDetect.browser == "Chrome") { return 32002; }if (this.browserDetect.browser == "Safari") { return 32003; } return 0; },  getOSId : function() { if (navigator.userAgent.indexOf("Windows 95") != -1) {return 1;}if (navigator.userAgent.indexOf("Windows 98") != -1) {return 2;}if (navigator.userAgent.indexOf('Windows NT 5.1') != -1) {return 3;}if (navigator.userAgent.indexOf('Windows NT 6.0') != -1) {return 4;}if (navigator.userAgent.indexOf("Mac OS X") != -1) {return 5;}if (navigator.userAgent.indexOf("FreeBSD") != -1) {return 6;}if (navigator.userAgent.indexOf("Linux") != -1) {return 7;}if (navigator.userAgent.indexOf("OS/2") != -1) {return 8;}if (navigator.userAgent.indexOf('Windows NT 5.2') != -1) {return 9;}if (navigator.userAgent.indexOf('Windows NT 6.1') != -1) {return 10;} return 0; },  getFlash : function() { flash = this.flashDetector.detectar(); if(flash.major == 9) {return 1}if(flash.major == 8) {return 2}if(flash.major == 7) {return 3}if(flash.major == 10) {return 4} return 0; },  gravaInicioNavegacao : function(d, e, url){ this.gravouInicio = true; this.escreveCookie('cDuracao', this.leCookie('cDuracao') + '|u!3D1!pipeg!3DURL!pipet!3D' + new Date().getTime() +'!pipes!3D' + url + '!pipee!3D' + e + '!piped!3D' + d, 1); },  gravaFimNavegacao : function (url) { if (this.gravouInicio) { this.escreveCookie('cDuracao', this.leCookie('cDuracao') + '!pipetf!3D' + new Date().getTime() +'!pipeof!3D' + url, 1); this.gravouInicio = false; } },   getPDF : function(){ return this.pdfDetector.detectar(); },  getSuportaJava : function() { if (window.navigator.javaEnabled()) return 1; return 0; },  escreveCookie : function(name, value, time_exp) { if (time_exp != "") { var exp = new Date(); var expira = exp.getTime() + (time_exp * 1728000000); exp.setTime(expira); document.cookie = "" + name + "=" + value + "; expires=" + exp.toGMTString() + "; path=/"; } }, leCookie : function(name) { var cookieValue = ""; var search = name + "="; if (document.cookie.length > 0) { offset = document.cookie.indexOf(search); if (offset != -1) { offset += search.length; end = document.cookie.indexOf(";", offset); if (end == -1) end = document.cookie.length; cookieValue = unescape(document.cookie.substring(offset, end)); } } return cookieValue; }, gravaCookieCliente : function() { var temp = this.leCookie("cDetalhe"); if (temp == "" || temp.indexOf("b!3D") == -1) { this.escreveCookie("cDetalhe", "b!3D" + this.getBrowserId() + "|o!3D" + this.getOSId() + "|j!3D" + this.getSuportaJava() + "|p!3D" + this.getPDF() + "|f!3D" + this.getFlash() , 1); } } };  function getActiveXVersion (activeXObj) { var version = -1; try { version = activeXObj.GetVariable("$version"); } catch (err) { } return version; }  function Flash(os) { this.installed = false; this.raw = ""; this.major = -1; this.minor = -1; this.revision = -1; this.revisionStr = ""; this.nomeOS = os; this.activeXDetectRules = [ { "name" :"ShockwaveFlash.ShockwaveFlash.7", "version" : function(obj) { return getActiveXVersion(obj); } }, { "name" :"ShockwaveFlash.ShockwaveFlash.6", "version" : function(obj) { var version = "6,0,21"; try { obj.AllowScriptAccess = "always"; version = getActiveXVersion(obj); } catch (err) { } return version; } }, { "name" :"ShockwaveFlash.ShockwaveFlash", "version" : function(obj) { return getActiveXVersion(obj); } } ]; } Flash.prototype = { getActiveXObject : function(name) { var obj = -1; try { obj = new ActiveXObject(name); } catch (err) { } return obj; }, parseActiveXVersion : function(str) { var versionArray = str.split(","); return { "raw" :str, "major" :parseInt(versionArray[0].split(" ")[1], 10), "minor" :parseInt(versionArray[1], 10), "revision" :parseInt(versionArray[2], 10), "revisionStr" :versionArray[2] }; }, parseStandardVersion : function(str) { var descParts = str.split(/ +/); var majorMinor = descParts[2].split(/\./); var revisionStr = descParts[3]; return { "raw" :str, "major" :parseInt(majorMinor[0], 10), "minor" :parseInt(majorMinor[1], 10), "revisionStr" :revisionStr, "revision" :this.parseRevisionStrToInt(revisionStr) }; }, parseRevisionStrToInt : function(str) { return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || this.revision; }, majorAtLeast : function(version) { return this.major >= version; }, detectar : function() { if (navigator.plugins && navigator.plugins.length > 0) { var type = 'application/x-shockwave-flash'; var mimeTypes = navigator.mimeTypes; if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description) { var version = mimeTypes[type].enabledPlugin.description; versionObj = this.parseStandardVersion(version); this.raw = versionObj.raw; this.major = versionObj.major; this.minor = versionObj.minor; this.revisionStr = versionObj.revisionStr; this.revision = versionObj.revision; this.installed = true; } } else if (this.nomeOS.indexOf("Mac") == -1 && window.execScript) { version = -1; for ( var i = 0; i < this.activeXDetectRules.length && version == -1; i++) { var obj = this.getActiveXObject(this.activeXDetectRules[i].name); if (typeof obj == "object") { this.installed = true; version = this.activeXDetectRules[i].version(obj); if (version != -1) { versionObj = this.parseActiveXVersion(version); this.raw = versionObj.raw; this.major = versionObj.major; this.minor = versionObj.minor; this.revision = versionObj.revision; this.revisionStr = versionObj.revisionStr; } } } } return { "raw" : this.raw, "major" : this.major, "minor" : this.minor, "revision" : this.revision, "revisionStr" : this.revisionStr, "instaled" : this.installed }; } };  function PDF() { } PDF.prototype = { detectar : function() {  mimeTypes = navigator.mimeTypes; try{ displayString = mimeTypes['application/pdf'].enabledPlugin.description; }catch(e) { if (navigator.plugins && navigator.plugins.length) { for (x = 0; x < navigator.plugins.length; x++) { if (navigator.plugins[x].description.indexOf('Adobe Acrobat') != -1) { this.version = parseFloat(navigator.plugins[x].description.split('Version ')[1]); if (this.version.toString().length == 1) return 1; break; } } } else if (window.ActiveXObject) { for (x = 2; x < 10; x++) { try { oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x + "');"); if (oAcro) { return 1; } } catch (e) { } } try { oAcro4 = new ActiveXObject('PDF.PdfCtrl.1'); if (oAcro4) { return 1; } } catch (e) { } try { oAcro7 = new ActiveXObject('AcroPDF.PDF.1'); if (oAcro7) { return 1; } } catch (e) { } } return 0; } if (displayString != 'null') { return 1; } return 0; } };  function BrowserDetect() { this.browser = this.searchString(this.dataBrowser) || "outros Browsers"; this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version"; this.OS = this.searchString(this.dataOS) || "outros SO"; } BrowserDetect.prototype = {  searchString: function (data) { for (var i=0;i<data.length;i++) { var dataString = data[i].string; var dataProp = data[i].prop; this.versionSearchString = data[i].versionSearch || data[i].identity; if (dataString) { if (dataString.indexOf(data[i].subString) != -1) return data[i].identity; } else if (dataProp) return data[i].identity; } return null; },  searchVersion: function (dataString) { var index = dataString.indexOf(this.versionSearchString); if (index == -1) return index; return parseFloat(dataString.substring(index+this.versionSearchString.length+1)); }, dataBrowser: [ { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" }, { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" }, { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" }, { prop: window.opera, identity: "Opera" }, { string: navigator.vendor, subString: "iCab", identity: "iCab" }, { string: navigator.vendor, subString: "KDE", identity: "Konqueror" }, { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" }, { string: navigator.vendor, subString: "Camino", identity: "Camino" }, {  string: navigator.userAgent, subString: "Netscape", identity: "Netscape" }, { string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" }, { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" }, {  string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" } ], dataOS : [ { string: navigator.platform, subString: "Win", identity: "Windows" }, { string: navigator.platform, subString: "Mac", identity: "Mac" }, { string: navigator.platform, subString: "Linux", identity: "Linux" } ] };
$.carregarENI = function (url){
   	if (url.indexOf("www2.bancobrasil.com.br") !== -1){	
        try{
            eni = new IdentificadorBB();
            eni.gravaCookieCliente();
            function conta()
            {
                eni.contaURL(4, 2, url,''); // Conta URL APF
            }
            conta();
        }catch(e)
        {
        }
   	}
}

$.carregarIBT = function (servidor, segmento){
	window._appKey = "u0jwbb";
	var servicecall = document.createElement('script');
	servicecall.type = 'text/javascript';
	servicecall.async = true;
	if(servidor === "interno" || servidor === "externo" || servidor === "piloto"){
		servicecall.src = window.location.protocol + '//www73.bb.com.br/web/static/visitor/scripts/pm.bootstrapper.js?v=1.0.1';
	}else{
		if(servidor === "homologacao"){
			servicecall.src = window.location.protocol + '//www73.hm.bb.com.br/web/static/visitor/scripts/pm.bootstrapper.js?v=1.0.1';			
		}else{
			servicecall.src = window.location.protocol + '//www73.desenv.bb.com.br/web/static/visitor/scripts/pm.bootstrapper.js?v=1.0.1';			
		}
	}
	setTimeout(function(){
	document.getElementsByTagName('head')[0].appendChild(servicecall);
	}, 0);
}

$.carregarHorus = function (servidor, segmento){
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
		},5000);
	}, 0);
}

$.carregarPiwik = function (){
	setTimeout(function(){
		$.ajaxServico({"nomeServico":"piwikPortal",
			"funcaoOk" : function(data) {}
		});
	},1);	
	try{
		_paq.push(['enableLinkTracking']);
		(function() {
			var u="https://eni.bb.com.br/eni2/";
			_paq.push(['setTrackerUrl', u+'piwik.php']);
			_paq.push(['setSiteId', '16']);
			
			_paq.push(['setUserId', document.getElementById("mci-ibt").value]);
			_paq.push(['trackEvent', 'Home', 'Iniciou Sessão']);
			var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
			g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);

		})();
	}catch(erro){
		console.log(erro);
	}	
		
}

$.eventoPiwik = function (acao, titulo){
	try{
		_paq.push(['setCustomUrl', acao]);
		_paq.push(['setDocumentTitle', titulo]);
		_paq.push(['deleteCustomVariables', 'page']); 
		_paq.push(['setGenerationTimeMs', 0]);
		_paq.push(['trackPageView']);
	}catch(erro){
		console.log(erro);
	}	
}

$.trackPageViewPiwik = function (){
	setTimeout(function(){
		$.ajaxServico({"nomeServico":"piwikPortal",
			"funcaoOk" : function(data) {}
		});
	},1);	
	try{
		var objetoPiwik = Piwik.getTracker('https://eni.bb.com.br/eni1/piwik.php', 30);
		objetoPiwik.disableCookies();
		objetoPiwik.setUserId(document.getElementById("mci-ibt").value);
		objetoPiwik.trackPageView();
	}catch(erro){
		console.log(erro);
	}	
}

$.avaliaErroPiwik = function (funcao, nome, codigo, mensagem, valor){
	_paq.push([funcao, nome, mensagem, valor]);	
	_paq.push(['setCustomVariable', 1, 'Código do erro', codigo, 'page']);
	if(valor=='Positivo'){
		$("#avalia-erro-agradecimento-positivo").css({"display": "block"});
		$("#avalia-erro-agradecimento-negativo").css({"display": "none"});
	} else {
		$("#avalia-erro-agradecimento-positivo").css({"display": "none"});
		$("#avalia-erro-agradecimento-negativo").css({"display": "block"});
	}
	$('#avalia-erro').css({"display": "none"});	
	$("#avalia-erro-agradecimento").css({"display": "block"});
}

$.erroPiwik = function (erro){
	try{
		_paq.push(['trackEvent', 'Erro', erro]);
	}catch(erro){
		console.log(erro);
	}	
}	

$.eventoLogGeint = function (log, link){
	$.ajaxServico({"nomeServico":"gerarLogPiwikGeint",
		"parametros" : {"link" : link},
		"funcaoAguarde" : function() {},
		"funcaoOk" : function(data){
			if(data.executar){
				try{
					_paq.push(['trackEvent', 'logGeint', log]);
				}catch(erro){
					console.log(erro);
				}				
								
			}
		}
	});		
}

$.buscarBannerTransacao = function(){
	if($(".corpo #codigoBannerTransacao").val() !== 'null' || $(".corpo #codigoTransacao").val() === 'COCA'){
		
		$.ajaxServico({"nomeServico":"bannerTransacao",
			"parametros" : {"codigoTransacao" : $(".corpo #codigoTransacao").val(), "codigoBannerTransacao" : $(".corpo #codigoBannerTransacao").val()},
			"funcaoAguarde" : function() {},
			"funcaoOk" : function(data){
            	try{
    				if(data.exibirBanner === "sim" && data.estadoBanner === "aberto"){
    					
    					
    					
    					$("#imgBannerTransacao").attr("src", data.imagem).attr("alt", data.texto);					
    					if(data.link !== ""){	    					
	    					if (data.modoAberturaLink === "_blank"){
		    					$("#linkBannerTransacao").attr("href", data.link);	    						
	    					}else{
		    					$("#linkBannerTransacao").attr("href", "#").attr("onclick", "$.carregaFormularioAjax('"+data.link+"');");
	    					}
	    					$("#linkBannerTransacao").attr("target", data.modoAberturaLink);	    					
    					}
    					
    					if( $(".corpo #codigoTransacao").val() !== "COCA"){
    						$(".transacao-banner").slideDown("slow", function() {
    							setTimeout(function(){
    								$(".transacao-banner-pesquisa").addClass("transacao-banner-pesquisa-show");
    							},500);
    						});						
    					}
    				}else{
	    				if(data.exibirBanner === "sim" && data.estadoBanner === "fechado"){
	    					if( $(".corpo #codigoTransacao").val() !== "COCA"){
	    						$(".transacao-abrir-banner").show("slow", function() {});
    							setTimeout(function(){
    								$(".transacao-banner-pesquisa").addClass("sem-banner").addClass("banner-fechado-show");
    							},500);
	    					}		    					
	    				}
	    				if(data.exibirBanner !== "sim"){
							setTimeout(function(){
								$(".transacao-banner-pesquisa").addClass("sem-banner").addClass("sem-banner-show");
							},500);
	    				}
    				}
            	}catch(err){
            		console.log(err.message);
            	}				
			}
		});  
	}else if($(".corpo #codigoBannerTransacao").val() === 'null'){
		setTimeout(function(){
			$(".transacao-banner-pesquisa").addClass("sem-banner").addClass("sem-banner-show");
		},500);
	}
	
}

$.atualizarBannerTransacao = function(acao){
	var dados = {
			"url" : "/aapf/servico",
			"tiporetorno" : "json",
			"parametros" : {"servico" : "atualizarBannerTransacao", "codigoTransacao" : $(".corpo #codigoTransacao").val(), "acao" : acao},
			"verificaSessao" : true,
			"funcaoAntesExecucao" : function() {}
			,
			"funcaoSucesso" : function(data) {
				if(acao === "aberto"){
					$("#imgBannerTransacao").attr("src", data.imagem);					
					$("#imgBannerTransacao").attr("alt", data.texto);
					if(data.link !== ""){
						if (data.modoAberturaLink === "_blank"){
	    					$("#linkBannerTransacao").attr("href", data.link);	    						
						}else{
	    					$("#linkBannerTransacao").attr("href", "#");
	    					$("#linkBannerTransacao").attr("onclick", "$.carregaFormularioAjax('"+data.link+"');");	    						
						}
						$("#linkBannerTransacao").attr("target", data.modoAberturaLink);						
					}
					
					if( $(".corpo #codigoTransacao").val() === "COCA"){
						$(".transacao-banner-coca").slideDown("slow", function() {
	    					$(".transacao-banner-coca").slideDown("slow", function() {
	    						$(".touchslider-banner").touchSlider({ 
	    							mouseTouch: true,
	    							autoplay: true,
	    							duration: 1000,
	    							delay: 5000
	    						});
	    					});
						});
					}else{
						$(".transacao-banner").slideDown("slow", function() {});						
					}
					
				}else{
					if( $(".corpo #codigoTransacao").val() === "COCA"){
						$(".transacao-abrir-banner-coca").slideDown("slow", function() {$(".touchslider").data("touchslider").stop();});
					}else{
						$(".transacao-abrir-banner").slideDown("slow", function() {});						
					}					
					
				}
			}
	};
	$.ajaxApf(dados);		
}
// altera os links internos para chamadas ajax
$.mudarLinkApf = function(elemento){
	var links = elemento.find("a");
	$.each(links,function(i,objeto){
		if($(objeto).attr("href")){
			$.substituiLinkApf($(objeto));
		}
	});
};
$.substituiLinkApf = function(objetoLink){
	
	var href = objetoLink.attr("href");
	var uri = location.href;
	if(href){
		if(href.length > 0 && href.substring(0,1) === "#"	){
			return;
		}
		if(href.indexOf("javascript") === -1 && 
		   href.indexOf("#") === -1 && 
		   href.indexOf("http:") === -1 && 
		   href.indexOf("www.") === -1 &&
		   href.indexOf("/aapf/") !== -1 &&
		   href.lastIndexOf(".pdf") === -1){
			objetoLink.attr("href","javascript:void(0)").attr("onclick","$.carregaFormularioAjax('"+href+"')");
		}else{
			if(href.indexOf("labbs.com.br") !== -1){
				objetoLink.attr("href",href).attr("target","_blank");
			}else if (href.indexOf("https://www2.bancobrasil.com.br/") != -1){
				urlPart = href.substr(31);
				objetoLink.attr("href",uri + urlPart);
			}else if (href.indexOf("https://interadm/") != -1) {
				urlPart = links[i].href.substr(16);
				objetoLink.attr("href",uri + urlPart);
			}else if (href.indexOf("https://desainteradm/") != -1){
				urlPart = links[i].href.substr(20);
				objetoLink.attr("href",uri + urlPart);
			}else if (href.indexOf("bb.com.br") != -1 ||
					href.indexOf("bancodobrasil.com.br") != -1 ||
					href.indexOf("bbcode.com.br") != -1){
				objetoLink.attr("href",href).attr("target","_blank");
			}else if (href.indexOf("bancobrasil.com.br")  != -1){
				objetoLink.attr("href",href);
			}else if ((href.indexOf(uri) == -1) && (href.indexOf("javascript:") == -1) &&  (href.indexOf("/aapf/") == -1) && href.indexOf(".pontoslivelo.") == -1){
				var click = "popupAlertaRedirecionamento('/aapf/direciona.jsp?url="+ encodeURI(href)+"','popUp','width=566,height=482');";
				objetoLink.attr("href","javascript:void(0);").attr("onclick",click).attr("target","_self");
			}				
			
		}
	}	
}


$.redirecionar = function(url){
	if(url!=null && url.indexOf("javascript") === -1 && url.indexOf("#") === -1 && url.indexOf("http:") === -1 && url.indexOf("www.") === -1 ){
		$.carregaFormularioAjax(url);
	}
};


function criarApresentacao(dadosPublicador){
	
	/*  Defini��o dos elementos que fazem parte do tour do sistema*/
	var itensApresentacaoCanvas = [
	       {itens : [{"id": "tourAcheFacil","seletor": "#acheFacil"}],"dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"26"),"estilo": {"top": "35px","left": "500px"},"classe": "apresentacao-ajuda-topo"},"posicionarScrollElemento" : 300},
	       {itens : [{"id": "tourDadosCliente","seletor": ".dados-cliente"}],"dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"27"),"espacoVertical" : -45,"estilo": {"top": "4px","left": "594px"},"classe": "apresentacao-ajuda-direita"},"posicionarScrollElemento" : 300},
	       {itens : [{"id": "tourDadosConta","seletor": ".dados-conta"}],"dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"28"),"espacoVertical" : -45,"estilo": {"top": "47px","left": "594px"},"classe": "apresentacao-ajuda-direita"},"posicionarScrollElemento" : 300},
	       {itens : [{"id": "tourDadosBarra","seletor": ".menu-relacionamento-barra > ul"}],"dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"29"),"espacoVertical" : -45,"estilo": {"top": "47px","left": "594px"},"classe": "apresentacao-ajuda-direita"},"posicionarScrollElemento" : 300},
	       {itens : [{"id": "tourBotaoMenu","seletor": ".botaoMenuCompleto > a"},
	 		         {"id": "tourMenucompleto","seletor": ".menu-completo","seletorElementoPosicao" :".menu-relacionamento-barra .conteudo:visible"}],
	             	 "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"30"),"espacoVertical" : 80,"estilo": {"top": "190px","left": "594px"},"classe": "apresentacao-ajuda-direita"},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourBotaoRelacionamento","seletor": ".botaoRelacionamento > a"},
	 		         {"id": "tourMenuRelacionamento","seletor": ".menu-relacionamento","seletorElementoPosicao" :".menu-relacionamento-barra .conteudo:visible"}],
	             	  "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"31"),"espacoVertical" : 100,"estilo": {"top": "190px","left": "594px"},"classe": "apresentacao-ajuda-direita"},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourBotaoMensagem","seletor": ".botaoMensagem > a"},
	 		         {"id": "tourMenuMensagens","seletor": ".menu-mensagens","seletorElementoPosicao" :".menu-relacionamento-barra .conteudo:visible"}],
     		         "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"32"),"espacoVertical" : 80,"estilo": {"top": "190px","left": "594px"},"classe": "apresentacao-ajuda-direita"},"posicionarScrollElemento" : 300
	       },
	       {itens : [
	 		         {"id": "tourBotaoRelacionamentoPJ","seletor": ".botaoRelacionamentoPJ  > a"},
	 		         {"id": "tourMenuRelacionamentoPJ","seletor": ".menu-relacionamentoPJ","seletorElementoPosicao" :".menu-relacionamento-barra .conteudo:visible"}],
     		         "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"33"),"espacoVertical" : 100,"estilo": {"top": "190px","left": "594px"},"classe": "apresentacao-ajuda-direita"},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourBotaoTelefone","seletor": ".botaoTelefone > a"},
	 		         {"id": "tourMenuTelefones","seletor": ".menu-telefones","seletorElementoPosicao" :".menu-relacionamento-barra .conteudo:visible"}],
	 				  "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"34"),"estilo": {"top": "190px","left": "594px"},"classe": "apresentacao-ajuda-direita"},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourTransacaoTitulo","seletor": ".transacao-titulo"}],"dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"35"),"estilo": {"top": "85px","left": "594px"},"classe": "apresentacao-ajuda-topo"},"posicionarScrollElemento" : 300},
	       {itens : [{"id": "tourBarraFerramentas","seletor": ".transacao-toolbar"}],"dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"36"),"estilo": {"top": "94px","left": "1100px"},"classe": "apresentacao-ajuda-topo","estiloSeta":{"left" : "49%"}},"posicionarScrollElemento" : 300},
	       {itens : [{"id": "tourCOCA","seletor": ".transacao-apfCOCA"}],
	    	      "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"38"),"espacoVertical" : 100,"estilo": {"top": "10px","left": "800px"},"classe": "apresentacao-ajuda-fundo"},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourResumo","seletor": ".item-resumo-saldos"}],
	    	   	  "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"39"),"estilo": {"top": "360px","left": "800px"},"classe": "apresentacao-ajuda-topo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourLancamentos","seletor": ".item-lancamentos"}],
	    	   	  "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"40"),"espacoVertical" : 30, "estilo": {"top": "90px","left": "800px"},"classe": "apresentacao-ajuda-fundo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourChequeEspecoal","seletor": ".item-grafico-cheque-especial","img" : "/aapf/imagens/apresentacao/grafico-contacorrente-cheque-especial.png"}],
	        	 "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"48"),"espacoVertical" : 30,"estilo": {"top": "90px","left": "800px"},"classe": "apresentacao-ajuda-fundo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourlistaAplicaoes","seletor": ".item-aplicacoes"}],
	        	 "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"42"),"espacoVertical" : 30,"estilo": {"top": "1057px","left": "620px"},"classe": "apresentacao-ajuda-fundo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourFavoritas","seletor": ".item-favoritas"}],
	        	 "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"43"),"espacoVertical" : 30,"estilo": {"top": "1057px","left": "620px"},"classe": "apresentacao-ajuda-fundo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourCredito","seletor": ".item-credito"}],
	        	 "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"44"),"espacoVertical" : 30,"estilo": {"top": "1057px","left": "620px"},"classe": "apresentacao-ajuda-fundo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourDistAplicacoes","seletor": ".item-grafico-aplicacao","img" : "/aapf/imagens/apresentacao/grafico-aplicacoes.png"}],
	        	 "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"45"),"espacoVertical" : 30,"estilo": {"top": "1057px","left": "620px"},"classe": "apresentacao-ajuda-fundo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourPagamento","seletor": ".item-pagamentos"}],
	        	 "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"46"),"espacoVertical" : 30,"estilo": {"top": "1057px","left": "620px"},"classe": "apresentacao-ajuda-fundo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       },
	       {itens : [{"id": "tourLancamentosFuturos","seletor": ".item-lancamentos-futuros"}],
	        	 "dadosBoxAjuda" : {"dados" : getDadosAjuda(dadosPublicador,"47"),"espacoVertical" : 30,"estilo": {"top": "1057px","left": "620px"},"classe": "apresentacao-ajuda-fundo","estiloSeta":{"left" : "50%"}},"posicionarScrollElemento" : 300
	       }
	 ];
	
	$("body").tourapf({"itensApresentacaoCanvas" : itensApresentacaoCanvas,"aoIniciar" : function(){
				$(".menu-relacionamento-barra").toolbarMenuLateral("inicializarMenus");
			} 
	});
}


function getDadosAjuda(data,codigo){
	if(["codigo" + codigo]){
		return(data["codigo" + codigo]);
	}else{
		return({});
	}
}

/* Busca dados do publicador para apresentar nas caixas de texto do "tour do sistema"*/
function iniciarTourSistema(){
	$.ajaxServico({"nomeServico":"dadosTourSistema",
		"funcaoOk" : function(data) { 
			criarApresentacao(data);
		}	
	});			
}

$.recuperarTicketCNL = function(){
	$.ajaxServico({"nomeServico":"ticketCNL",
		"funcaoOk" : function(data) {
			//criarContas();
		}
	});	
}

$.tokenHorus = function(){
	return $.ajaxServico({"nomeServico":"tokenHorus",
		"funcaoOk" : function(data) {
			_tokenHorus.push(data);
			if(optDadosCliente.dadosCliente.ativarHorus){
				$.carregarHorus(optDadosCliente.dadosCliente.servidor, data.segmento);
			}			
		},
		"funcaoErro" : function(data) {
			if(optDadosCliente.dadosCliente.ativarHorus){
				$.carregarHorus(optDadosCliente.dadosCliente.servidor, data.segmento);
			}
		}
	});	
}

$.gravarCookiePropensaoConsumo = function(){
	$.ajaxServico({"nomeServico":"gravarCookiePropensaoConsumo",
		"funcaoOk" : function(data) { 
			
		}	
	});			
}

$.abrirSeuAnoBB = function (evento){
	$.abrirModal({"url":"/aapf/personalizacao/seuAnoBB.jsp","width":"1020","height" :"600","parametros" : {"ambienteLayout":"internoTransacao"}});
	evento.stopPropagation();
	evento.preventDefault();
}


$.criarCentralNotificacoes = function(alertaAtualizar){
	
	if(optDadosCliente.dadosCliente.mostrarNovaCentralNotificacao != true){
		return;
	}
	var linhas =  $("<div id='linhasAlerta'></div>");

		$("#alertaErroCadastro").remove();
		
		$.getNumeroErrosCadastro(function(response){
			listaNotificacoes = response.data;
			listaNotificacoes.forEach(function(notificacao, i){
			    $(linhas).append("<div id='alertas' class='linhaAlerta' style='display: flex;' onclick='$.carregarFormularioErrosCadastro();'><div class='qtdeAlerta'>" + notificacao.quantidade + "</div><div class='labelAlerta' style='height: auto !important; min-height: 20px'>" + notificacao.texto + "</div></div>");
			});
				
			$.totalizarAlertas('cadastro', listaNotificacoes.length);
			});
	
		
		$("#alertaPendencias").remove();
		$.listarTotalPendencias(function(data){ 
			if(data.quantidadeTodasPendencias!== undefined && data.quantidadeTodasPendencias > 0){
				$(linhas).append("<div id='alertaPendencias' class='linhaAlerta' onclick='$.carregarFormularioListaPendencia();'><div class='qtdeAlerta'>"+data.quantidadeTodasPendencias+"</div><div class='labelAlerta'>Pendencias</div></div>");
			} 
			$.totalizarAlertas('pendencias', data.quantidadeTodasPendencias);
		});		
		
		$("#notificacoes").remove();
		$(".cabecalho .notificacao").find("span").remove();
		$(".cabecalho .notificacao").append($("<div></div>",{"id":"notificacoes", "style" : "position: absolute; top: 50px; left: -143px; display: none;"}));
		$("#notificacoes").append($("<div></div>",{"class":"caixaAlerta"}));
		$(".caixaAlerta").append($("<div></div>",{"class":"setaAlerta"}));
		$(".caixaAlerta").append(linhas);
		var sinoVazio = $("<div class='sinoVazio'>voc&ecirc; n&atilde;o possui notifica&ccedil;&otilde;es</div>");    
		$(".caixaAlerta").append($(sinoVazio));		
		$(".cabecalho .notificacao").append($("<span></span>"));
} 
 
$.totalizarAlertas = function(alertaAtualizar, novaQtde){
	var objQtde = $(".cabecalho .notificacao");
	var qtdeCadastro = $(objQtde).attr("cadastro");
	var qtdePendencias = $(objQtde).attr("pendencia");
	var qtdeTotal = $(objQtde).attr("total");
	
	if(alertaAtualizar == 'cadastro'){ qtdeTotal = (parseInt(qtdeTotal) - parseInt(qtdeCadastro)) + parseInt(novaQtde); $(objQtde).attr("cadastro", novaQtde)}
	if(alertaAtualizar == 'pendencias'){ qtdeTotal = (parseInt(qtdeTotal) - parseInt(qtdePendencias)) + parseInt(novaQtde); $(objQtde).attr("pendencia", novaQtde)} 
	$(objQtde).attr("total", parseInt(qtdeTotal));
	
	if(parseInt(qtdeTotal) > 0){
		$(objQtde).find("span").html(parseInt(qtdeTotal)).addClass("notificacao-quantidade piscar-notificacao");
		$("#linhasAlerta").find(".linhaAlerta").eq(0).css({"border-top":"none"});
		$(".sinoVazio").remove();
		return;
	}
	
}

$.getNumeroErrosCadastro = function(funcao){
	$.ajaxApf({"url" : "/aapf/servicoCadastroCliente","tiporetorno" : "json",
        "parametros" : {'acaoExecutada': 'listar_notificacoes'}, 
        "funcaoAntesExecucao" :  function(){},
        "funcaoSucesso" : funcao
	});  
} 

function verificarMensagensNovas(){

	var ultTimeStamp = !$("#corpoMensagens .caixaMensagem").last().attr("timestemp") ? null : $("#corpoMensagens .caixaMensagem").last().attr("timestemp");
	var parametros = {};
	if(ultTimeStamp)
		parametros.ultTimeStamp = ultTimeStamp;
	
	$("#balaoNovasMsgsIconeFale").remove();
	
	$.ajaxServico({"nomeServico":"verificarNovasMensagens","parametros" : parametros,
		   "funcaoOk" : function(dados) {
			   var totalMsg = 0;
			   //console.log(dados);
			   $.each(dados.mensagensNovasPorDebate,function(){
				   if(this.quantidadeMensagem > 0){
					   $("#balaoMsgNaoLidaMenuDebate"+this.numeroSequencialDebate).html(this.quantidadeMensagem).show();
					   if($("#rotuloPerfilselecionado").attr("cdDebate") == this.numeroSequencialDebate)
						   listarMensagens();
					   else if($("#btnMostraPerfis").find(".setaBaixo").length > 0)
						   $("#msgNaoLidaDebates").show();
						   
					   totalMsg = totalMsg + this.quantidadeMensagem;   
				   }
				   
				   if(!$("#msg").is(":visible") && totalMsg > 0){
					   $(".botaoChat").append('<div id="balaoNovasMsgsIconeFale" style="height: 15px;line-height: 15px;padding-left: 3px;padding-right: 3px; background: red;color: #fff;text-align: center; border-radius: 50%;position: absolute;right: 8px;top: 8px;">'+totalMsg+'</div>');
				   }   
				   
			   });
		   }   
	});	
	
	if($("#msg").is(":visible")){
		setTimeout(function(){
			verificarMensagensNovas();
		},10000);
	}
}