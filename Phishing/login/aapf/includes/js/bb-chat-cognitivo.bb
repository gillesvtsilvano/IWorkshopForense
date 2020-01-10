/**
 * BB Chat Cognitivo
 */
;
(function (window) {
  'use strict';
  var window_h = 230;
  /**
	 * BBChatCognitivo
	 *
	 * @param {Object}
	 *            options - Op��es que ser� usada no parametro do objeto
	 */
  function BBChatCognitivo(options) {
    this.options = extend({
    }, this.options);
    extend(this.options, options);
    this._init();
  }




  /**
	 * Trata as op��es informadas ao instanciar o objeto
	 */

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }
  /**
	 * BBChatCognitivo options Object
	 *
	 * @param {string}
	 *            titulo - titulo do chat
	 * @param {string}
	 *            inputPlaceholder - place holder do text area.
	 * @param {string}
	 *            tipo - tipo de conversacao que ser� tilizada.
	 * @param {String}
	 * 			  tipoAcesso - 'P' - Publico, 'IP' - intranet publico, 'IA' - intranet privado
	 */

  BBChatCognitivo.prototype.options = {
    titulo: 'Cognitivo',
    inputPlaceholder: 'Informe a pergunta desejada ...',
    tipo: '',
    feedback: false,
    cssFeedbackPositivo: 'icon icon-thumbs-o-up',
    cssFeedbackNegativo: 'icon icon-thumbs-o-down',
    tipoAcesso: 'IA',
    host: 'nia.intranet.bb.com.br',
    resize: false,
    mover: {
      x: 5,
      y: 5
    }
  }

  var apiKeyZup = "bbd0c730b3f901347f8a005056b925b3";

  /**
	 * BBChatCognitivo _init
	 *
	 * Cria a estrutura do chat, montando o html padr�o
	 */


  BBChatCognitivo.prototype._init = function () {
    // criar div chat
    this.sa = document.createElement('div');
    this.sa.className = 'chat-window chatBox'
    this.sa.id = 'horus-chatBox';
    this.options.titulo = '<span class="titulo-chat">' + this.options.titulo + '</span>';
    // criar corpo do chat
    var topBar = '<div class="top-bar hcb-header"> ' +
      '<img src="https://www100.bb.com.br/assets/images/logo_BB.png">' +
      '   ' + this.options.titulo +
      '   <div class="bar_buttons">' +
      '<div class="button-move" title="Mover chat">' +
      '<img src="https://www100.bb.com.br/assets/images/move.png">' +
      '</div>' +
      '<div class="button-minimize icon_minim" title="Minimizar / Maximizar">' +
      '<img src="https://www100.bb.com.br/assets/images/minus.png">' +
      '</div>' +
      '</div>' +
      '   <div class="top-bar-button" style="display:none">' +
      '      <span id="minim_chat_window" class="icon_minim"></span>' +
      '      <span style="padding-left:10px;"></span>' +
      '      <span id="close_chat_window" class="icon_close"></span>' +
      '   </div>' +
      ' </div>' +
        '<div class="hcb-sub_header">' +
          '<button class="hcb-close"">Encerrar</button>' +
          '<div class="hcb-protocol"><!--<b>BOT Especialista</b>--></div>' +
          '<div class="hcb-timmer">Tempo total do atendimento: <span class="min">00</span>:<span class="seg">00</span> ' +
          '</div>' +
      '</div>';
    var corpoMsg = '<div id="chatTxt" class="chatTxt-base text_area_msgs"></div>';
    var inputEnviar = '<div class="panel-footer-enviar hcb-footer"> ' +

      '<textarea class="chat-form-control chat_input text_area_send_msg" placeholder="' + this.options.inputPlaceholder + '" style="max-width: 270px; max-height: 50px; width:270px !important; height:50px !important" maxlength="500"></textarea>' +

      '       <button class="chat-btn chat-btn-primary chat-btn-sm btn-chat  seta btnSend horus-button">Enviar</button> ' +

      '<div class="hcb-countChars" style="margin: -8px 10px !important;"><i>500</i> caracteres restantes</div>' +
      '</div> ';
    var dimesionar = ''
    if (this.options.resize) {
      dimesionar = '<div class="chat-resizer"></div>';
    }
    var chat = topBar + corpoMsg + inputEnviar + dimesionar;
    this.sa.innerHTML = chat;
    if (this.options.mover) {
      var xChat = this.options.mover.x;
      var yChat = this.options.mover.y;
      setTimeout(function () {
        var element = document.getElementById('horus-chatBox');
        if (xChat > 0) {
          element.style.right = xChat + 'px';
        }
        if (yChat > 0) {
          element.style.bottom = (yChat) + 'px'
        }
      }, 100)
    }



    // adicionando evento

    this._events();
    timeInChat();
    //charCounter();

  };



  /**
  * ChatTimer
  */

  var timmerInChat;

  function timeInChat() {

    var i = 0, i2 = 0, segs, mins;
    var max = 20;

    clearInterval(timmerInChat);

    timmerInChat = setInterval(function () {

      segs = (i < 10) ? "0" + i : i;

      $('#horus-chatBox .hcb-timmer span.seg').text(segs);

      if (i == 0) {
        mins = (i2 < 10) ? "0" + i2 : i2;
        $('#horus-chatBox .hcb-timmer span.min').text(mins);
      }

      if (i == 59) {
        i = -1;
        i2++;
      }

      i++;

      //conta e limita caracteres da mensagem
      $('#horus-chatBox').on("keypress keyup", '.text_area_send_msg', function () {
        $("#horus-chatBox .hcb-countChars i").text(
          (500 - $(this).val().length)
        );

        //return !($(this).val().length >= 500);*/
      });

    }, 1000);




  }


  /**
	 * BBChatCognitivo _events
	 *
	 * Declara��o dos evento disparados na janela do chat
	 */
  BBChatCognitivo.prototype._events = function () {
    // minimizar
    var minimizar = this.sa.querySelector('.icon_minim'),
      self = this;
    minimizar.addEventListener('click', function (e) {
      e.preventDefault();
      self.minimizar();
    });
    // fechar
    var fechar = this.sa.querySelector('.icon_close');
    fechar.addEventListener('click', function (e) {
      e.preventDefault();
      self.fechar();
    });
    // enviar
    var btnEnviar = this.sa.querySelector('.btn-chat')
    btnEnviar.addEventListener('click', function (e) {
      e.preventDefault();
      self.enviarPergunta();
    });
    // textarea
    var textarea = this.sa.querySelector('.chat_input')
    textarea.addEventListener('keyup', function (e) {
      e.preventDefault();
      if (e.keyCode == 13 && textarea.value.length > 1) {
        self.enviarPergunta();
      }
    });
    // dimensonar tamanho da tela
    var resizer = this.sa.querySelector('.chat-resizer')
    if (resizer) {
      resizer.addEventListener('mousedown', function (e) {
        var element = document.getElementById('horus-chatBox');
        element.className = 'chat-window chat-window-select';
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
      });
    }
    // dimensonar tamanho da tela

    var mover = this.sa.querySelector('.top-bar-title')
    if (mover) {
      mover.addEventListener('mousedown', function (e) {
        var element = document.getElementById('horus-chatBox');
        element.className = 'chat-window chat-window-select';
        window.addEventListener('mousemove', moverTela, false);
        window.addEventListener('mouseup', stopMover, false);
      });
    }
    var close = this.sa.querySelector('.hcb-close');
    if (close) {
      close.addEventListener('click', chatCloseAlert)
    }
    var minChat = this.sa.querySelector('.minimizeChat');
    if(minChat){
      minChat.addEventListener('click', function (e) {
        e.preventDefault();
        minimizeChat();
      });
    }

  }

  /**
	 * BBChatCognitivo Fechar
	 * Permite que o usu�rio feche a tela
	 */
  function chatCloseAlert() {
    $("#horus-chatBox").prepend(chatBoxClose());
  }

  function minimizeChat() {
    $("#horus-chatBox").removeAttr("style");
    $("#horus-chatBox").toggleClass('minimizeChat');
  }

  function chatBoxClose() {

    var html = '<div class="hcb-div-hoverlayer">';
    html += '<div class="hcb-alert">';
    html += '<div class="hcb-alert-text">Deseja realmente encerrar o chat?</div>';
    html += '<div class="hcb-alert-buttons">';
    html += '<button onclick="$(\'#horus-chatBox\').remove()">Sim</button> <button onclick="$(\'.hcb-div-hoverlayer\').remove()">N&atilde;o</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    return html;
  }

  BBChatCognitivo.prototype.closeChatBox = function(){
    $('#horus-chatBox').remove();
  }
  /**
	 * BBChatCognitivo Mover
	 * Permite que o usu�rio movimente a tela
	 */

  function moverTela(e) {
    var element = document.getElementById('horus-chatBox');
    var container = document.getElementById('chatTxt');
    document.body.style.cursor = 'move';
    // ajusta a largura
    var right = window.innerWidth - e.clientX;
    if ((right + element.offsetWidth) < window.innerWidth && right > 0) {
      element.style.right = right + 'px';
    }
    // ajusta a altura do corpo onde fica o scroll

    var height = window.innerHeight - e.clientY;
    if ((height + 200) < window.innerHeight && height > 0) {
      element.style.bottom = height + 'px';
    }
  }
  /**
	 * BBChatCognitivo stopResize
	 * Remove os evento de movimento para dimencionamento da janela do chat
	 *
	 */

  function stopMover(e) {
    var element = document.getElementById('horus-chatBox');
    element.className = 'chat-window';
    document.body.style.cursor = 'default';
    window.removeEventListener('mousemove', moverTela, false);
    window.removeEventListener('mouseup', stopMover, false);
  }
  /**
	 * BBChatCognitivo resize
	 * Ajusta p tamanho da tela de acordo com o movimento do mouse
	 */

  function resize(e) {
    var element = document.getElementById('horus-chatBox');
    var container = document.getElementById('chatTxt');
    // ajusta a largura
    var width = element.offsetWidth + (element.offsetLeft - e.clientX);
    if (width < 316) {
      width = 316;
    }
    if (width > (window.innerWidth - 20)) {
      width = window.innerWidth - 20;
    }
    element.style.width = width + 'px';
    // ajusta a altura do corpo onde fica o scroll
    var heightContainer = ((element.offsetHeight + (element.offsetTop - e.clientY))) - 130;
    if (heightContainer < 100) {
      heightContainer = 100;
    }
    if ((heightContainer + 130) > window.innerHeight) {
      heightContainer = window.innerHeight - 148;
    }
    container.style.maxHeight = heightContainer + 'px';
    container.style.height = heightContainer + 'px';
    container.scrollTop = container.scrollHeight;
    //ajusta a altura
    var height = ((element.offsetHeight + (element.offsetTop - e.clientY)));
    if (height < 230) {
      height = 230;
    }
    if (height > window.innerHeight) {
      height = window.innerHeight - 13;
    }
    element.style.height = height + 'px';
  }
  /**
	 * BBChatCognitivo stopResize
	 * Remove os evento de movimento para dimencionamento da janela do chat
	 *
	 */

  function stopResize(e) {
    var element = document.getElementById('horus-chatBox');
    element.className = 'chat-window';
    window.removeEventListener('mousemove', resize, false);
    window.removeEventListener('mouseup', stopResize, false);
  }
    /**
     * BBChatCognitivo enviar pergunta
     *
     * Evento disparado ao clicar no botão ou 'Enter' no text area. Envia a
     * pergunta ao cognitivo
     */
    BBChatCognitivo.prototype.enviarPergunta = function () {
      var self = this;
      var chatInput = self.sa.querySelector('.chat_input');
      chatInput.value = self.filtroCrossSiteScript(chatInput.value);
      if (chatInput.value != null && chatInput.value != '') {
        addMsg(self, chatInput.value, true);
        consultarCognitivo(self, chatInput.value);
        chatInput.value = '';
      }
    }
    
    /**
     * Filtro para Cross Site Script (XSS)
     * Remove tags HTMLS e o caracter especial \n (quebra de linha)
     * 
     */
    BBChatCognitivo.prototype.filtroCrossSiteScript = function (pergunta){
        
        return pergunta.replace(/(<([^>]+)>)/ig, "").replace(/\n/ig, "");
        
    }
  /**
	 * BBChatCognitivo show
	 *
	 * inicializa e apresenta o chat na tela
	 */

  BBChatCognitivo.prototype.iniciar = function () {
    var self = this;
    self.minimizar(true);
    consultarCognitivo(self, '');
    document.body.appendChild(this.sa);

    $("#horus-chatBox .button-move").mouseover(function () {
      $("#horus-chatBox").draggable({ disabled: false });
    });

    $("#horus-chatBox").draggable({ disabled: true, containment: "window" });
    $("#horus-chatBox").removeClass("ui-draggable ui-draggable-handle");

    $("#horus-chatBox .button-move").mouseleave(function () {
      //$("#horus-chatBox").draggable({ disabled: true });
      //$("#horus-chatBox").removeClass("ui-draggable-disabled");
    });


    $('#horus-chatBox .text_area_send_msg').bind('copy paste', function (e) {

      //e.preventDefault();
    });


  }
  /**
	 * BBChatCognitivo minimizar
	 *
	 * minima ou maximizar a janela do chat na tela
	 * window_h = variaver para guadar o tamanho da janela depois quando ela m�ninimizada
	 */

  BBChatCognitivo.prototype.minimizar = function (min) {
    var divMensagens = this.sa.querySelector('.chatTxt-base')
    var divEnviar = this.sa.querySelector('.panel-footer-enviar')
    var minimizar = this.sa.querySelector('#minim_chat_window');
    var element = document.getElementById('horus-chatBox');
    var container = document.getElementById('chatTxt');
    var resizer = this.sa.querySelector('.chat-resizer');
    if (min === undefined) {
      min = divMensagens.style.display === '';
      if (container && element && resizer) {
        if (!min) {
          resizer.style.display = '';
          container.style.maxHeight = (window_h - 195) + 'px';
          container.style.height = (window_h - 195) + 'px';
          element.style.height = window_h + 'px';
        } else {
          resizer.style.display = 'none';
          window_h = element.offsetHeight;
          container.style.maxHeight = '45px';
          container.style.height = '45px';
          element.style.height = '45px';
        }
      }
    }
    if (!min) {
      minimizar.className = 'icon_minim'
      divMensagens.style.display = '';
      divEnviar.style.display = '';
    } else {
      minimizar.className = 'icon_max'
      divMensagens.style.display = 'none';
      divEnviar.style.display = 'none';
    }
  };
  /**
	 * BBChatCognitivo minimizar
	 *
	 * fechar janela do chat
	 */
  BBChatCognitivo.prototype.fechar = function () {
    var chat = document.querySelector('.chat-window');
    if (chat != undefined && chat != null) {
      chat.parentNode.removeChild(chat);
    }
  };
  /**
	 * Enviar requisi��o para o cognitivo
	 *
	 * @param {object}
	 *            self - componente 'this'.
	 * @param {string}
	 *            pergunta - "pergunta enviada ao cognitivo".
	 */
  function consultarCognitivo(self, pergunta) {
    pergunta = pergunta.replace(/(\r\n|\n|\r)/gm, '');
    var url = getHost(self) + 'dialogo';
    var params = {
      tipo: self.options.tipo,
      input: pergunta
    };
    if (self.conversation !== undefined && self.conversation !== null && self.conversation.context != undefined) {
      params.context = JSON.stringify(self.conversation.context);
    }
    //console.log(params);

    params = JSON.stringify(params);
    var xmlHttp = new XMLHttpRequest();
    if (self.options.tipoAcesso == 'P') {
      xmlHttp.open('POST', url + '?gw-app-key=' + apiKeyZup);
      xmlHttp.setRequestHeader('X-Application-Key', apiKeyZup);
    } else {
      xmlHttp.open('POST', url);
    }
    xmlHttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlHttp.setRequestHeader('Content-length', params.length);
    xmlHttp.setRequestHeader('Connection', 'close');
    xmlHttp.withCredentials = true;
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          var response = JSON.parse(xmlHttp.response);
          console.log(response);
          var resposta = response.data;
          //console.log(JSON.stringify(resposta));
          self.conversation = resposta;
          if (resposta != undefined && resposta.text != undefined) {
            //console.log(resposta.text);
            var texto = '';
            if (typeof resposta.text === 'string') {
              texto = resposta.text
            } else {
              for (var t = 0; t < resposta.text.length; t++) {
                texto = resposta.text[t];
                if (texto != null && texto.length > 0) {
                  break;
                }
              }
              if ((texto.indexOf('texto_escrito') !== - 1)) {
                var obj_resp = JSON.parse(texto);
                texto = obj_resp.texto_escrito;
              }
            }

            if (texto) {
              texto = texto.replace('NOME_USUARIO', 'Caro cliente')
                .replace('CONDICAO_ANYTHING_ELSE', '');
            }

            addMsg(self, texto, false);
          } else {
            var msg = '</br>';
            if (response.messages != undefined && response.messages.length > 0) {
              for (var t = 0; t < response.messages.length; t++) {
                msg += '<p>' + response.messages[t].text + '</p>';
              }
            }
            if (msg === '') {
              msg = '<p>Desculpe, Ocorreu um problema no tratamento da resposta. Resposta nula</p>';
            }
            addMsgAlerta(self, msg);
          }
        } else {
          var msgAlerta = '<p>Favor seguir os passos abaixo:</p>' +
            '<p>1 - Verificar e, caso necess�rio, instalar a cadeia de certificados do Banco do Brasil. Para isso, clique <a href="http://pki.bb.com.br/Tutorial-FF.html" target="_blank" style="text-decoration: underline; color: blue;">aqui</a> e siga o roteiro apresentado.</p>' +
            '<p>2 - Caso a solu��o acima n�o resolva o problema, sugerimos limpar o cache do navegador pressionando as teclas (Ctrl + Shift + Del). Certifique-se de que a op��o Cache esteja marcada e confirme.</p>';
          addMsgAlerta(self, msgAlerta);
        }
        self.minimizar(false);
      }
    }
    xmlHttp.send(params);
  }
  function getHost(self) {
    self.options.host = self.options.host.replace('http://', '').replace('https://', '');
    var endereco = '';
    //tipoAcesso - 'P' - Publico, 'IP' - intranet publico, 'IA' - intranet privado
    if (self.options.tipoAcesso == 'P') {
      endereco = 'https://mobile.api.bb.com.br/chatbot-ia/v1/';
    } else {
      endereco = '/nia-cognitivo-infra/manager/rest/';
      if (self.options.tipoAcesso == 'IP') {
        endereco += 'public/';
      }
      endereco += 'conversationRestService/v1/';
      endereco = 'https://' + self.options.host + endereco;
    }
    return endereco;
  }
  function addMsgAlerta(self, msg) {
    var msgAlerta = '<div class="msg-warning" >' +
      '<div class="msw-left"><i class="icon-exclamation-triangle" aria-hidden="true"></i></div>' +
      '<div class="msw-right">N�o foi poss�vel conectar-se ao chat.</div>' +
      '<div class="clear"></div></div>' + msg;
    var feedback = self.options.feedback;
    self.options.feedback = false;
    addMsg(self, msgAlerta, false);
    self.options.feedback = feedback;
  }
  /**
	 * Incluir mensagem a ser exibida no chat
	 *
	 * @param {object}
	 *            self - componente 'this'.
	 * @param {string}
	 *            texto - "pergunta enviada ao cognitivo".
	 * @param {boolean}
	 *            pergunta - "true=pergunta, false=resposta".
	 */

  function addMsg(self, texto, pergunta) {
    var divMensagens = self.sa.querySelector('.chatTxt-base');
    var avatar = '<div class="avatar"> </div>';
    var msg = '<div class="msg_container messageDiv '
      + (pergunta ? 'base_sent' : 'base_receive operator-div') + '">';
    if (!pergunta) {
      msg += avatar;
    }
    var data = new Date();
    var mes = data.getMonth() < 9 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    var dia = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    var hora = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
    var min = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
    var str_data = dia + '/' + mes + '/' + data.getFullYear();
    var str_hora = hora + ':' + min;
    var id_feed = data.getTime();
    /* 	if (!pergunta) {
        msg += '<span class="message operator-span">';
      }
      else {
        msg += '<span class="message clientMessage-notSent">';
      } */
    msg += '<span class="message ' + (pergunta ? 'clientMessage-notSent' : 'operator-span') + '" style="' + (pergunta ? 'text-align: left;' : '') + '">';
    + ' <div class="messages msg_sent">';
    msg += texto + '<br>';
    var isAddFeed = false;
    if (self.conversation !== undefined && self.conversation !== null && self.conversation.context != undefined) {
      var dialog_stack = self.conversation.context.system.dialog_stack[0];
      var intents = self.conversation.intents;
      if (dialog_stack !== undefined && dialog_stack !== null && dialog_stack.dialog_node !== undefined && dialog_stack.dialog_node === 'root' &&
        intents !== undefined && intents !== null && intents.length > 0) {
        isAddFeed = true;
      }
    }
    if (!pergunta && self.options.feedback && isAddFeed) {
      msg += '<p class="chat-feedback" id="fb' + id_feed + '">Essa resposta ajudou?'
        + ' <i class="' + self.options.cssFeedbackPositivo + ' btn-chatFP" aria-hidden="true" title="Positivo" id="fbp' + id_feed + '" ></i>'
        + ' <i class="' + self.options.cssFeedbackNegativo + ' btn-chatFN" aria-hidden="true" title="Negativo" id="fbn' + id_feed + '" ></i> </p>'
    }
    msg += '   <time style="' + (pergunta ? 'float: right;' : 'float: left;') + '">' + str_data + ' &agrave;s ' + str_hora + '</time>'
      + ' </div>'
      + '</span>';
    if (pergunta) {
      msg += avatar;
    }
    msg += '</div>';
    divMensagens.innerHTML += msg;
    // mantem o scroll da div na ultima mensagem enviada
    divMensagens.scrollTop = divMensagens.scrollHeight;
    if (!pergunta && self.options.feedback && isAddFeed) {
      // feedPositivo
      document.getElementById('fbp' + id_feed).addEventListener('click', function (e) {
        self.envFeedPosi('#fb' + id_feed);
      });
      // feedNegativo
      document.getElementById('fbn' + id_feed).addEventListener('click', function (e) {
        self.envFeedNeg('#fb' + id_feed);
      });
    }
  }
  /**
	 * BBChatCognitivo enviar feedback
	 *
	 * Evento disparado para enviar feedback da respota do cognitivo
	 */

  BBChatCognitivo.prototype.envFeedPosi = function (idFb) {
    self = this;
    enviarFeedback(self, true, false);
    var chatFeed = self.sa.querySelector(idFb);
    var msg = 'Obrigado pelo feedback!!! <i class="fa fa-smile-o fa-lg chat-simile" aria-hidden="true" ></i>';
    chatFeed.innerHTML = msg;
    setTimeout(function () {
      var chatFeed = self.sa.querySelector(idFb)
      chatFeed.parentNode.removeChild(chatFeed);
    }, 3000);
  }
  /**
	 * BBChatCognitivo enviar feedback
	 *
	 * Evento disparado para enviar feedback da respota do cognitivo
	 */

  BBChatCognitivo.prototype.envFeedNeg = function (idFb) {
    self = this;
    enviarFeedback(self, false, false);
    var chatFeed = self.sa.querySelector(idFb);
    var id_sim = 'gesS' + idFb.replace('#fb', '');
    var id_nao = 'gesN' + idFb.replace('#fb', '');
    var msg = 'Obrigado pelo feedback!!! <i class="fa fa-smile-o fa-lg chat-simile" aria-hidden="true" ></i><br>';
    console.log('tipoAcesso: ' + self.options.tipoAcesso);
    if (self.options.tipoAcesso === 'IA') {
      msg += 'Deseja encaminhar sua d�vida para o gestor?\t<span class="btn-chatFP" id="' + id_sim + '">Sim</span> <span  id="' + id_nao + '" class="btn-chatFN" >N�o</span>';
    }

    chatFeed.innerHTML = msg;


    // encaminhar duvidade
    document.getElementById(id_sim).addEventListener('click', function (e) {
      self.envGestor(true, idFb);
    });
    // n�o encaminha duvida
    document.getElementById(id_nao).addEventListener('click', function (e) {
      self.envGestor(false, idFb);
    });
  }
  /**
	 * BBChatCognitivo enviar feedback
	 *
	 * Evento disparado para enviar feedback para o gestor
	 */

  BBChatCognitivo.prototype.envGestor = function (enviar, idFb) {
    self = this;
    var chatFeed = self.sa.querySelector(idFb);
    if (enviar) {
      enviarFeedback(self, false, true);
      chatFeed.parentNode.removeChild(chatFeed);
      var msg = 'Pronto!<br><br>' +
        'Assim que sua pergunta for respondida pela equipe de especialistas, voc� ser� avisado por e-mail.<br><br>' +
        'Obrigado por utilizar o canal.<br><br>' +
        'Posso te ajudar em mais alguma coisa?'
      self.options.feedback = false;
      addMsg(self, msg, false);
      self.options.feedback = true;
    } else {
      chatFeed.parentNode.removeChild(chatFeed);
    }
  }
  /**
	 * Enviar feedback
	 *
	 * @param {object} self - componente 'this'.
	 * @param {string} idFb - id do elemento em que consta o feedback.
	 * @param {boolean} envGestor - se o usu�rio deseja enviar a pergunta para prioridade do gestor.
	 */

  function enviarFeedback(self, positivo, envGestor) {
    var url = getHost(self) + 'feedback';
    var params = {
      tipo: self.options.tipo,
      feedback: positivo,
      gestor: envGestor
    };
    if (self.conversation !== undefined) {
      params.conversation = JSON.stringify(self.conversation);
    }
    params = JSON.stringify(params);
    var xmlHttp = new XMLHttpRequest();
    if (self.options.tipoAcesso == 'P') {
      xmlHttp.open('POST', url + '?gw-app-key=' + apiKeyZup);
      xmlHttp.setRequestHeader('X-Application-Key', apiKeyZup);
    } else {
      xmlHttp.open('POST', url);
    }
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.setRequestHeader('Content-length', params.length);
    xmlHttp.setRequestHeader('Connection', 'close');
    xmlHttp.withCredentials = true;
    xmlHttp.onreadystatechange = function () {
    }
    xmlHttp.send(params);
  }
  /**
	 * adiciona o BBChatCognitivo ao namespace global
	 */

  window.BBChatCognitivo = BBChatCognitivo;
})(window);
