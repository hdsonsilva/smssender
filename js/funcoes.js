function getCookie(cookieSeuNome){
    var tmp = localStorage.getItem(cookieSeuNome);
    if(tmp == null)
      return '' ;
    else
      return localStorage.getItem(cookieSeuNome);
}
function setCookie(name,value){    //função universal para criar cookie

    localStorage.setItem(name, value);  
}

function atualizaSaldoSMS(){
    //Habilita a mensagem carregando
    Lungo.Router.article("principalsection", "carregando");
    Lungo.Element.loading("#carregando",2);
    //Solicita Saldo
    $.ajax({
            url: 'http://www.softwareshd.com.br/system/sms/sms.sender.php',
            cache: false,
            data:{
                login: getCookie('usuario'),
                password: getCookie('senha'),
                usercod: getCookie('codigocliente'),
                service:'saldo'
            }   
        }).success(function(e){
            //Atualizando saldo de sms
            $('#divexibesaldo').html('Saldo Torpedos: '+e);
            Lungo.Router.article("principalsection", "main-article");
            
        });
}