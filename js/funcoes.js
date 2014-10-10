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
    Lungo.Element.loading("#carregando",1);
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

            var pull_example = new Lungo.Element.Pull('#main-article', {
                onPull: "Pull down to refresh",      //Text on pulling
                onRelease: "Release to get new data",//Text on releasing
                onRefresh: "Refreshing...",          //Text on refreshing
                callback: function() {               //Action on refresh
                    alert("Pull & Refresh completed!");
                    pull_example.hide();
                }
            });
            
        });

}