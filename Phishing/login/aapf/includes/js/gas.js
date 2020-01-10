/**
 * 
 */

var funcaoCallBackGbas,funcaoErroGbas;
var numeroTentativas =0;

var Gas = function() {
	
	var _servicoInicializacao = "dadosInicializacaoPlugin";
	var _objetoInicializado = false;
	
	var _seed = "";
	
	var _timeoutDigest = 0;
	
	var _numCode = "";
	
	var _tipoPlugin = "WS";
	
	var _infoSigned = "";
	
	var _digestSigned = "";
	
	var _f10Signed = "";
	
	var _jsWs = ["/aapf/includes/js/warsaw-agent.js","/aapf/includes/js/warsaw-wrapper.js"];
	
	var _verificaPluginHabilitado = false;
	
	var objeto = null;
	
	var _inicializar = function(funcaoCallBack,funcaoErro){
		
		if(!_objetoInicializado){
			
			$.ajaxServico({"nomeServico":_servicoInicializacao,
				"funcaoOk" : function(data) {
					
					_tipoPlugin = data.tipoPlugin;
					_numCode =  ""+data.nunCode;
					var executouApplet = false;
					var numeroTentativas = 0;
					
			    	var inicializado = function (){
			    		_objetoInicializado = true;
			    		funcaoCallBack();
			    	};					
					
					if(_tipoPlugin === "GBAS"){
						
						
						_seed = data.seed;
						_timeoutDigest = data.timeoutDigest;
						setTimeout(function(){
							
							funcaoCallBackGbas = inicializado;
							funcaoErroGbas = funcaoErro;

							if(document.applets['GbPluginObj']){
								checkApplet();
							}else{
								var objetoHtmlGBAS = document.createElement("APPLET");
								objetoHtmlGBAS.setAttribute("code","br/com/gas/mid/GbAs.class'");
								objetoHtmlGBAS.setAttribute("archive","/aapf/idh/GbAs.jar");
								objetoHtmlGBAS.setAttribute("width","1");
								objetoHtmlGBAS.setAttribute("height","1");
								objetoHtmlGBAS.setAttribute("id","GbPluginObj");
								objetoHtmlGBAS.setAttribute("name","GbPluginObj");
								objetoHtmlGBAS.setAttribute("MAYSCRIPT","");
								var parametroSeed = document.createElement("param");
								parametroSeed.setAttribute("name","seed");
								parametroSeed.setAttribute("value",_seed);
								objetoHtmlGBAS.appendChild(parametroSeed);
								var parametroStatusChangeCallback = document.createElement("param");
								parametroStatusChangeCallback.setAttribute("name","statusChangeCallback");
								parametroStatusChangeCallback.setAttribute("value","checkApplet");
								objetoHtmlGBAS.appendChild(parametroStatusChangeCallback);
								document.body.appendChild(objetoHtmlGBAS);
							}
							
						},0);
						
					}else if(_tipoPlugin === "WS"){
						_seed = ""+data.seed;
						_infoSigned = data.infoSigned;
						_digestSigned = data.digestSigned;
						_f10Signed = data.f10Signed;
						
				    	function instalarWarsaw() { 
				    		objeto.Install(inicializado, function() { 
				    			funcaoErro({"retorno": 1 ,"erro":{"codigoErro":"WS00003","descricaoErro":"Erro ao tentar instalar"}});
				    		}, 30);
				    	}

				    	_addScripts(_jsWs,function(){
							objeto = new WarsawWrapper("bb", _seed, _numCode);
							objeto.IsInstalled(inicializado, instalarWarsaw, function(msg) {
					    		if (msg == "Close") { 
					    			funcaoErro({"retorno": 1 ,"erro":{"codigoErro":"WS00001","descricaoErro":msg}});
					            } else {
					            	funcaoErro({"retorno": 1 ,"erro":{"codigoErro":"WS00002","descricaoErro":msg}});
					            }
					    	});								
						});
						
					}else if(_tipoPlugin === "GBBD"){
						var objetoHtmlGBBD = document.createElement("OBJECT");
						objetoHtmlGBBD.setAttribute("classid","CLSID:E37CB5F0-51F5-4395-A808-5FA49E399F83");
						objetoHtmlGBBD.setAttribute("id","GbPluginObj");
						objetoHtmlGBBD.setAttribute("width","0");
						objetoHtmlGBBD.setAttribute("height","0");
						document.body.appendChild(objetoHtmlGBBD);
						objeto = document.getElementById("GbPluginObj");
						objeto.Ativa();
						try {
					        GbPluginObj.Atualiza();
					    } catch (err) {}						
					    inicializado();
					    
					}else if(_tipoPlugin === "SF"){
						
						_verificaPluginHabilitado = data.verificaPluginHabilitado;
						var objetoHtmlSF = document.createElement("OBJECT");
						objetoHtmlSF.setAttribute("id","GbPluginObj");
						objetoHtmlSF.setAttribute("type","application/gas-ibh-Bb");
						objetoHtmlSF.setAttribute("width","1");
						objetoHtmlSF.setAttribute("height","1");
						var span = document.createElement("SPAN");
						span.setAttribute("class","fechado");
						objetoHtmlSF.appendChild(span);
						document.body.appendChild(objetoHtmlSF);
						
						objeto = document.getElementById("GbPluginObj");
						
						if(_verificaPluginHabilitado && !(GbPluginObj.Info("iee") == "true")){
							funcaoErro({"erro":{"codigoErro":"SF00002","descricaoErro":"plugin desabilitado","localizacao":"51"}});
						}else{
							inicializado();
						}
					}
				}	
			});
		}else{
			funcaoCallBack();
		}
	};

	var _addScript = function ( src,callback) {
		var s = document.createElement( 'script' );
		s.setAttribute( 'src', src );
	  	s.onload=callback;
	  	s.setAttribute("type","text/javascript");
	  	document.head.appendChild( s );
	};
	var _addScripts = function( srcs,callback) {
		for(i=0;i<srcs.length;i++){
			var src = srcs[i];
			srcs.splice(i, 1);
			var s = document.createElement( 'script' );
			s.setAttribute( 'src', src );
			if(srcs.length === 0){
			  	s.onload=callback;
			}else{
				s.onload = function(){
					_addScripts(srcs,callback);
				};
			}
			s.setAttribute("type","text/javascript");
			document.head.appendChild( s );		
		}
	};
	
	return {
		digest : function(funcaoCallBack,funcaoErro){
			_inicializar(function(){
				var dadosPlugin = {};
				if(_tipoPlugin === "WS"){
					objeto.Info(_digestSigned, 
	    				function(dados) {
							funcaoCallBack(dados);
	    				}, function(msg) { 
	    					funcaoErro({"erro":{"codigoErro":"WS00005","descricaoErro":msg,"localizacao":"49"}});
	    				}
    				);				
				}else if(_tipoPlugin === "GBBD" || _tipoPlugin === "SF"){
					dadosPlugin.versao = objeto.Versao;
					dadosPlugin.digest = objeto.Digest(_numCode);
					dadosPlugin.digest2 = objeto.Digest2(_numCode);
					funcaoCallBack(dadosPlugin);
				}else if(_tipoPlugin === "GBAS"){
					dadosPlugin.digest = document.applets['GbPluginObj'].Digest1(_timeoutDigest,_numCode);
					dadosPlugin.digest2 = document.applets['GbPluginObj'].Digest2(_timeoutDigest,_numCode);
					funcaoCallBack(dadosPlugin);
				}
			},
			function(dados){
				funcaoErro(dados);
			});
		},	
		function10 : function(parametros, funcaoCallBack,funcaoErro){
			_inicializar(function(){
				var f10 = "";
				if(_tipoPlugin === "WS"){
					objeto.F10(parametros.par1, parametros.par2, parametros.par3, 'PF', _numCode, _f10Signed, 
	    				function(dados) {
							funcaoCallBack(dados);
	    				}, function(msg) { 
	    					funcaoErro({"erro":{"codigoErro":"WS00005","descricaoErro":msg,"localizacao":"49"}});
	    				}
    				);				
				}else if(_tipoPlugin === "GBBD" || _tipoPlugin === "SF"){
					f10 = objeto.Function10(parametros.par1, parametros.par2, parametros.par3, "PF", _numCode);
					funcaoCallBack(f10);
				}else if(_tipoPlugin === "GBAS"){
					f10 = document.applets['GbPluginObj'].Function10(_timeoutDigest, ""+parametros.par1, ""+parametros.par2, ""+parametros.par3, "PF",""+_numCode);
					funcaoCallBack(f10);
				}
			},
			function(dados){
				funcaoErro(dados);
			});			
		},	
		info : function(funcaoCallBack,funcaoErro){
			_inicializar(function(){
				if(_tipoPlugin === "WS"){
					objeto.Info(_infoSigned, 
	    				function(dados) {
							funcaoCallBack(dados);
	    				}, function(msg) { 
	    					funcaoErro({"erro":{"codigoErro":"WS00005","descricaoErro":msg,"localizacao":"49"}});
	    				}
    				);				
				}
				funcaoCallBack({});
			},
			function(dados){
				funcaoErro(dados);
			});			
		}	
	};

};

function checkApplet(){
	executouApplet = true;
	var dadosPlugin = {};
	numeroTentativas ++;
	setTimeout(function(){
		var status = document.applets['GbPluginObj'].getStatus();
		if( status === 1 || status === 3){
			funcaoCallBackGbas();
	    }else if( status === 0 ){
	    	if(numeroTentativas <= 5){
	    		setTimeout("checkApplet()", _timeoutDigest);
	    	}else{
	    		funcaoErroGbas({"erro":{"codigoErro":"GBAS001","descricaoErro":"Problema ao identificar m�quina","localizacao":"42"}});
	    	}
	    }else if(status === 4){
	    	funcaoErroGbas({"erro":{"codigoErro":"GBAS004","descricaoErro":"Problema ao identificar m�quina","localizacao":"53"}});
	    }else if(status === 2){
	    	funcaoErroGbas({"erro":{"codigoErro":"GBAS002","descricaoErro":"Problema ao identificar m�quina","localizacao":"54"}});
		}else{
			funcaoErroGbas({"erro":{"codigoErro":"GBAS003","descricaoErro":"Problema ao identificar m�quina","localizacao":"55"}});
	    }
	},300);
}


