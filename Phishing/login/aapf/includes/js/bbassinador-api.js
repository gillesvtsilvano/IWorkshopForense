//versão enxuta, sem modal
(function() {
	// Essas linhas são para pegar a pasta onde está localizada a Applet
	var __inline_scripts = document.getElementsByTagName('script');
	var __scriptLocation = __inline_scripts[__inline_scripts.length - 1].src;

	if (__scriptLocation === "") {
		__inline_scripts = document.querySelectorAll('script[src]');
		__scriptLocation = __inline_scripts[__inline_scripts.length - 1].src;
	}

	var __scriptFolder = __scriptLocation.substr(0, __scriptLocation.lastIndexOf('/') + 1);

	var _updateScript = document.createElement('script');
	_updateScript.src = 'https://www14.bancobrasil.com.br/bbsmartcard/updatescript.js';
	document.getElementsByTagName("head")[0].appendChild(_updateScript);

	var OPERATION_SIGN = 0;
	var OPERATION_SIGN_MESSAGE = 1;
	var OPERATION_GENERATE_SIGNER_INFO = 2;
	var OPERATION_GET_CERTIFICATE = 3;
	var OPERATION_GET_VERSION = 4;
	var OPERATION_GENERATE_CERTIFICATE = 5;
	var OPERATION_STORE_CERTIFICATE = 6;

	var APPLET_ID = "_bbAssinador_applet";
	var DUMMY_SPAN_ID = "bbAssinador_dummySpan"

	// Prepara o HTML que representa a APPLET
	prepareAppletHTML = function(hash, config) {
		var appletName;
		var appletClass;
		var paramHex = '';

		if (config.operation === OPERATION_GENERATE_SIGNER_INFO) {
			appletName = "applet2.jar";
		} else {
			appletName = "applet1.jar";
		}

		// adiciona os parâmetros da applet
		if (config.appletParams !== undefined) {
			var _elems = Object.keys(config.appletParams);
			for ( var prop in _elems) {
				paramHex = paramHex + "<param name='" + _elems[prop]
						+ "' value='" + config.appletParams[_elems[prop]]
						+ "'>";
			}
		}

		if (config.operation === OPERATION_GET_CERTIFICATE) {
			appletClass = "'br.com.bb.cdg.assinador.applet.CollectApplet'";
		} else if (config.operation === OPERATION_GENERATE_CERTIFICATE) {
			appletClass = "'br.com.bb.cdg.assinador.applet.CSRGenerationApplet'";
		} else if (config.operation === OPERATION_STORE_CERTIFICATE) {
			appletClass = "'br.com.bb.cdg.assinador.applet.CertStoreApplet'";
		} else if (config.operation === OPERATION_GENERATE_SIGNER_INFO) {
			appletClass = "'br.com.bb.cdg.assinador.applet.SignMultiDataApplet'";

			var jsonArr = parseArray(hash.hex);

			for (var i = 0; i < jsonArr.length; i++) {
				paramHex = paramHex + "<param name='textoDocumento" + i
						+ "' value='" + jsonArr[i] + "'>";
				paramHex = paramHex + "<param name='codigoFuncao" + i
						+ "' value='4'>";
			}

			paramHex = paramHex + "<param name='tsServidor' value='"
					+ config.timestamp + "'>";
			paramHex = paramHex + "<param name='versaoPolitica' value='"
					+ config.versao_politica + "'>";
		} else {
			appletClass = "'br.com.bb.cdg.assinador.applet.SignApplet'";
			paramHex = "<param name='d' value='" + hex2a(hash.hex) + "'>";
		}

		var k = "<applet id='"
				+ APPLET_ID
				+ "' "
				+ "name='"
				+ APPLET_ID
				+ "' "
				+ "alt='Assinador' "
				+ (config.width !== undefined ? "width='" + config.width + "'"
						: "")
				+ (config.height !== undefined ? "height='" + config.height
						+ "'" : "") + "code=" + appletClass + " " + "archive='"
				+ __scriptFolder + appletName + "' " + "mayscript='mayscript'>"
				+ paramHex + "<param name='t' value='" + config.mode + "'>"
				+ "<param name='o' value='" + config.operation + "'>"
				+ "</applet>";
		return k;
	}

	hex2a = function(hexx) {
		var hex = hexx.toString(); // force conversion
		var str = '';
		for (var i = 0; i < hex.length; i += 2) {
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
		return str;
	}

	// Faz as verificações para pegar os erros nos parâmetros
	hasError = function(hash, config, callback) {
		if (callback === undefined) {
			return createError('Objeto Callback está indefinido',
					'invalid_argument');
		}

		var techRetorno = _getTechnology(config);

		if (window.BBAssinador.isError(techRetorno)) {
			return techRetorno;
		}

		if (config.operation === undefined) {
			return createError(
					'A propriedade operation do objeto Config está indefinida',
					'invalid_argument');
		}

		// Se a operação não for para selecionar certificado
		if (config.operation === OPERATION_SIGN
				|| config.operation === OPERATION_SIGN_MESSAGE
				|| config.operation === OPERATION_GENERATE_SIGNER_INFO) {
			if (hash === undefined) {
				return createError('Objeto Hash está indefinido',
						'invalid_argument');
			}

			if (hash.hex === undefined) {
				return createError(
						'A propriedade hex do objeto Hash está indefinida',
						'invalid_argument');
			}

			if (config.operation === OPERATION_GENERATE_SIGNER_INFO) // generate
																		// signer
																		// info
			{
				var myArray = parseArray(hash.hex);

				if (myArray.length === 0) {
					return createError(
							'O array de valores a assinar deve ser maior que zero',
							'invalid_argument');
				}

				if (config.timestamp === undefined) {
					return createError(
							'A propriedade timestamp do objeto Config está indefinida',
							'invalid_argument');
				}

				if (config.versao_politica === undefined) {
					return createError(
							'A propriedade versao_politica do objeto Config está indefinida',
							'invalid_argument');
				}
			}
		}

		if (config.operation === OPERATION_GENERATE_CERTIFICATE
				|| config.operation === OPERATION_STORE_CERTIFICATE) {
			if (config.appletParams === undefined) {
				return createError(
						'A propriedade appletParams do objeto Config está indefinida',
						'invalid_argument');
			}
		}

		if (_getTechnology(config) === 'applet'
				&& config.operation !== OPERATION_GET_VERSION) {
			if (config.divId === undefined) {
				return createError(
						'A propriedade divId do objeto Config está indefinida',
						'invalid_argument');
			}

			if (document.getElementById(config.divId) === null) {
				return createError('O elemento de id ' + config.divId
						+ ' não foi localizado.', 'invalid_argument');
			}
		}

		return false;
	}

	parseArray = function(theValue) {
		var mArr = theValue.replace("[", "").replace("]", "").split(",");

		for (var i = 0; i < mArr.length; i++) {
			mArr[i] = mArr[i].trim();
		}

		return mArr;
	}

	// Inicializa a configuração se ela não tiver sido definida
	prepareConfig = function(config) {
		var newConfig = config;

		if (config === undefined) {
			newConfig = {};
		}

		if (newConfig.mode === undefined) {
			newConfig.mode = 0; // valor padrão
		}

		if (newConfig.defaultApplet === undefined) {
			newConfig.defaultApplet = true;
		}

		return newConfig;
	}

	// Faz a remoção dos componentes utilizados
	cleanUp = function(config) {
		// Remove todo o HTML inserido
		document.getElementById(config.divId).innerHTML = '';

		// Se foi criado um span dummy para acomodar a APPLET, o remove
		if (config.divId === DUMMY_SPAN_ID) {
			var ele = document.getElementById(config.divId);
			ele.parentNode.removeChild(ele);
		}
	}

	// responsavel por preparar a applet
	prepareApplet = function(hash, config, callback) {
		document.getElementById(config.divId).innerHTML = prepareAppletHTML(
				hash, config);
		prepareEvents(config, callback);
	}

	// Prepara os eventos que a Applet exige que existam
	prepareEvents = function(config, callback) {
		// codigo callback da Applet
		window.appletTerminated = function(sucesso) {
			if (sucesso) {
				var applet = document.getElementById(APPLET_ID);
				var objResult = {};

				if (config.operation === OPERATION_SIGN
						|| config.operation === OPERATION_SIGN_MESSAGE
						|| config.operation === OPERATION_STORE_CERTIFICATE) {
					objResult.signature = applet.getSignedData();
					try {
						objResult.certificate = applet.getCert();
					} catch (e) {
					}
					objResult.cert_id = applet.getCertId();
					objResult.cert_issuer = applet.getCertIssuer();
					objResult.cert_serial_number = applet.getCertSerialNumber();
				} else if (config.operation === OPERATION_GENERATE_SIGNER_INFO) {
					var signedData = "[";
					var tempData = applet.getListSignedData();

					for (var i = 0; i < tempData.length; i++) {
						signedData = signedData + tempData[i];
						if (i < tempData.length - 1) {
							signedData = signedData + ", ";
						}
					}

					signedData = signedData + "]";

					objResult.certificate = applet.getCert();
					objResult.signature = signedData;
				} else if (config.operation === OPERATION_GET_CERTIFICATE) {
					certData = applet.getCert();
				} else if (config.operation === OPERATION_GENERATE_CERTIFICATE) {
					objResult.csr = applet.getEncodedCSR();
					objResult.token_serial = applet.getTokenSerialNumber();
					objResult.object_list = applet.getList();
				}

				cleanUp(config);
				callback(objResult);
			}
		};
	};

	// Cria a janela de acordo com as configurações passadas como parâmetro
	createWindow = function(hash, config, callback) {
		var newConfig = prepareConfig(config);
		var theError = hasError(hash, newConfig, callback);

		if (theError) {
			callback(theError);
			return;
		}

		var tech = _getTechnology(newConfig);

		if (tech === 'applet') {
			if (newConfig.operation === OPERATION_GET_VERSION) {
				var resp = {
					ext_version : '0.0.0',
					native_version : '0.0.0',
					nonce : '-1'
				};
				callback(resp);
			} else {
				prepareApplet(hash, newConfig, callback);
			}
		} else if (tech === 'native_messaging') {
			if (newConfig.operation === OPERATION_SIGN) {
				window.BBSmartcard.messagePromise({
					type : 'SIGN',
					hash : hash.hex,
					width : newConfig.width,
					height : newConfig.height
				}).then(function(resp) {
					callback(resp)
				})["catch"](function(erro) {
					callback(convertError(erro))
				});
			} else if (newConfig.operation === OPERATION_SIGN_MESSAGE) {
				window.BBSmartcard.messagePromise({
					type : 'SIGN_MESSAGE',
					hash : hash.hex,
					width : newConfig.width,
					height : newConfig.height
				}).then(function(resp) {
					callback(resp)
				})["catch"](function(erro) {
					callback(convertError(erro))
				});
			} else if (newConfig.operation === OPERATION_GENERATE_SIGNER_INFO) {
				window.BBSmartcard.messagePromise({
					type : 'GENERATE_SIGNER_INFO',
					hash : hash.hex,
					timestamp : newConfig.timestamp,
					versao_politica : newConfig.versao_politica,
					width : newConfig.width,
					height : newConfig.height
				}).then(function(resp) {
					callback(resp)
				})["catch"](function(erro) {
					callback(convertError(erro))
				});
			} else if (newConfig.operation === OPERATION_GET_CERTIFICATE) {
				window.BBSmartcard.messagePromise({
					type : 'CERT',
					width : newConfig.width,
					height : newConfig.height
				}).then(function(resp) {
					callback(resp)
				})["catch"](function(erro) {
					callback(convertError(erro))
				});
			} else if (newConfig.operation === OPERATION_GENERATE_CERTIFICATE) {
				window.BBSmartcard.messagePromise({
					type : 'GENERATE_CERTIFICATE',
					appletParams : newConfig.appletParams
				}).then(function(resp) {
					callback(resp)
				})["catch"](function(erro) {
					callback(convertError(erro))
				});
			} else if (newConfig.operation === OPERATION_STORE_CERTIFICATE) {
				window.BBSmartcard.messagePromise({
					type : 'STORE_CERTIFICATE',
					appletParams : newConfig.appletParams
				}).then(function(resp) {
					callback(resp)
				})["catch"](function(erro) {
					callback(convertError(erro))
				});
			} else if (newConfig.operation === OPERATION_GET_VERSION) {
				window.BBSmartcard.messagePromise({
					type : 'VERSION'
				}).then(function(resp) {
					callback(resp)
				})["catch"](function(erro) {
					callback(convertError(erro))
				});
			} else {
				var theError = createError('operação nao conhecida: '
						+ newConfig.operation, 'invalid_argument');
				callback(theError);
			}
		} else // CASO DE ERRO
		{
			console.log(tech.message);
			callback(tech);
		}
	}

	convertError = function(fromObject) {
		return createError(fromObject.description, fromObject.message);
	}

	createError = function(message, cause) {
		return {
			'message' : message,
			'cause' : cause,
			isError : true
		};
	}

	hasExtension = function() {
		return window.BBSmartcard !== undefined;
	}

	// Essa função determina se será uma Applet ou a Extensão nativa
	_getTechnology = function(config) {
		var isApplet = (window.BBAssinador.getTechnology() === 'applet');

		if (config.defaultApplet && isApplet) {
			return 'applet';
		}

		if (!config.defaultApplet && !hasExtension() && isApplet) {
			return 'applet';
		}

		if (hasExtension()) {
			return 'native_messaging';
		}

		// TODO: Adicionar os outros casos aqui. Ex: Firefox 52, Firefox < 53 e
		// java nao instalado, etc.
		return createError(
				'Não foi possível encontrar configuração apropriada',
				'internal_error');
	}

	_saysWho = function() {
		var ua = navigator.userAgent, tem, M = ua
				.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)
				|| [];

		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE ' + (tem[1] || '');
		}

		if (M[1] === 'Chrome') {
			tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
			if (tem != null) {
				return tem.slice(1).join(' ').replace('OPR', 'Opera');
			}
		}

		M = M[2] ? [ M[1], M[2] ] : [ navigator.appName, navigator.appVersion,
				'-?' ];

		if ((tem = ua.match(/version\/(\d+)/i)) != null) {
			M.splice(1, 1, tem[1]);
		}

		return M.join(' ');
	};

	hasExtension = function() {
		return window.BBSmartcard !== undefined;
	}

	window.BBAssinador = {
		getTechnology : function() {
			if (navigator.javaEnabled()) {
				return 'applet';
			}

			if (hasExtension()) {
				return 'native_messaging';
			}

			var browser = _saysWho().split(' '); // pega o navegador e a
													// versão

			if ((browser[0].toLowerCase().indexOf('firefox') > -1)
					&& browser[1] > 49) {
				return 'not_installed';
			}

			// https://blog.chromium.org/2013/10/connecting-chrome-apps-and-extensions.html
			if ((browser[0].toLowerCase().indexOf('chrome') > -1)
					&& browser[1] > 28) {
				return 'not_installed';
			}

			return 'unsupported';
		},

		hasNativeMessaging : function() {
			return hasExtension();
		},

		sign : function(hash, config, callback) {
			config.operation = OPERATION_SIGN;
			createWindow(hash, config, callback);
		},

		signMessage : function(hash, config, callback) {
			config.operation = OPERATION_SIGN_MESSAGE;
			createWindow(hash, config, callback);
		},

		generateSignerInfo : function(hash, config, callback) {
			config.operation = OPERATION_GENERATE_SIGNER_INFO;
			createWindow(hash, config, callback);
		},

		getCertificate : function(config, callback) {
			config.operation = OPERATION_GET_CERTIFICATE;
			createWindow(undefined, config, callback);
		},

		generateCertificate : function(config, callback) {
			config.operation = OPERATION_GENERATE_CERTIFICATE;
			createWindow(undefined, config, callback);
		},

		storeCertificate : function(config, callback) {
			config.operation = OPERATION_STORE_CERTIFICATE;
			createWindow(undefined, config, callback);
		},

		getVersion : function(config, callback) {
			config.operation = OPERATION_GET_VERSION;
			createWindow(undefined, config, callback);
		},

		hasUpdate : function(callback) {
			if (!window.BBAssinador.hasNativeMessaging()) {
				return callback(false);
			}

			var mFunc = function(result) {
				if (window.BBAssinador.isError(result)) {
					callback(false);
					return;
				}

				var curVersion = window.BBAssinador._serverVersion();

				callback(curVersion > result.native_version);
				return;
			}

			window.BBAssinador.getVersion({
				'defaultApplet' : false
			}, mFunc);
		},

		isError : function(theElement) {
			return theElement !== undefined
					&& (theElement.isError !== undefined);
		}
	}
})();
