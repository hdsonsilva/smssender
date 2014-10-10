$(document).ready(function(){
        //Iniciando Lungo apos carregar a pagina toda 
         Lungo.init({});
         //Setando evento que busca o saldo de SMS toda vez que a pagina inicial ´e carregada
        Lungo.dom('#main-article').on('load', function(event){
            //atualizaSaldoSMS();   
        });
                //Carregando os dados do cliente
        $('#codigocliente').val(getCookie('codigocliente'));
        $('#usuario').val(getCookie('usuario'));
        $('#senha').val(getCookie('senha'));
        $('#assinat').val(getCookie('assinat'));

        //Exibe mensagem na pagina inicial se n~ao existirem dados setados para o usuario
        if(getCookie('codigocliente') =="" || getCookie('usuario') =="" | getCookie('senha')=="" || getCookie('assinatura'))
            $("#iniciomensagens").append("<li class='text small'><a href='#' data-view-article='configdados'>Seus dados nao estao configurados. Clique aqui e configure os seus dados.</a></li>");
        else
            $("#iniciomensagens").append("<li class='text small'><a href='#' data-view-article='enviarsms'>Clique aqui para enviar um SMS.</a></li>");

        //Evento para salvar os dados do usuario
        $('#salvardados').click(function(){
                setCookie('codigocliente',$('#codigocliente').val());
                setCookie('usuario',$('#usuario').val());
                setCookie('senha',$('#senha').val());
                setCookie('assinat',$('#assinat').val());
                atualizaSaldoSMS();
                alert('Dados configurados com sucesso.');

                Lungo.Router.article("principalsection", "main-article");
        });

        //Evento para enviar mensagens
        $('#enviar').click(function(){
            if($('#telefone').val().length != 10 && $('#telefone').val().length != 11){
                alert('Formato de telefone invalido.\nO numero celular deve conter 10 ou 11 digitos dependendo do seu estado.');
                return false ;
            }
            if($('#msg').val()== ''){
                alert('Coloque uma mensagem.');
                return false ;
            }
            //Habilita a mensagem carregando
            Lungo.Router.article("principalsection", "carregando");
            Lungo.Element.loading("#carregando",1);
            //Solicita o envio da mensagem
            $.ajax({
                url: 'http://www.softwareshd.com.br/system/sms/sms.sender.php',
                cache: false,
                data:{
                    login: getCookie('usuario'),
                    password: getCookie('senha'),
                    usercod: getCookie('codigocliente'),
                    service:'enviar',
                    telefone: $('#telefone').val(),
                    mensagem: $('#msg').val() + '\r\n' + 'De: ' + getCookie('assinat')
                }   
            }).success(function(a){
                //Desabilitando a mensagem carregando
                
                //Exibindo mensagem de envio realizado com sucesso
                if(a.substring(0,2) == 'ID'){
                    alert('Sua mensagem foi enviada com sucesso!');
                    $('#telefone').val('');
                    $('#msg').val('');
                }
                else{
                    alert('Ocorreu um erro ao enviar sua mensagem!\nTente novamente.');
                }
                
                Lungo.Router.article("principalsection", "enviarsms");
            });
             
        });
    });