
$(document).ready(function() {

  //Urls do sistema, por ambiente
  var urlLoginProducao             = 'http://senai.datasafer.com.br/gerenciamento/login';
  var urlLoginDesenvolvimento      = 'http://192.168.2.54/gerenciamento/login';

  var urlEstacoesProducao          = 'http://senai.datasafer.com.br/gerenciamento/usuario/estacoes';
  var urlEstacoesDesenvolvimento   = 'http://192.168.2.54/gerenciamento/usuario/estacoes';

  var urlEstacaoProducao           = 'http://senai.datasafer.com.br/gerenciamento/estacao/backups';
  var urlEstacaoDesenvolvimento    = 'http://192.168.2.54/gerenciamento/estacao/backups';

  var urlDetalheBkpProducao        = 'http://senai.datasafer.com.br/gerenciamento/backup/operacoes';
  var urlDetalheBkpDesenvolvimento = 'http://192.168.2.54/gerenciamento/estacao/backup/operacoes';

  // produção ou desenvolvimento
  var ambiente = 'producao';

  //Define as urls do ambiente
  var urlLogin      = (ambiente == 'producao') ? urlLoginProducao     : urlLoginDesenvolvimento;
  var urlEstacoes   = (ambiente == 'producao') ? urlEstacoesProducao  : urlEstacoesDesenvolvimento;
  var urlEstacao    = (ambiente == 'producao') ? urlEstacaoProducao   : urlEstacaoDesenvolvimento;
  var urlDetalheBkp = (ambiente == 'producao') ? urlDetalheBkp        : urlDetalheBkpDesenvolvimento;

  var token        = '';
  var estacoes     = [];
  var estacaoAtual = {};

  /*
   * Anexando os eventos aos componentes da página
   
    document.getElementById('logar').addEventListener('click', logar);
    document.getElementById('getEstacoes').addEventListener('click', retornaEstacoes);
    document.getElementById('montarEstacoes').addEventListener('click', montarEstacoes);
   
 */  
   $(document).delegate('.estacao','click', function(event){
    //event.preventDefault();
      estacaoEspecificacao( $(this).attr('nome') );     
   });

    logar();//deverá ser chamada no login

    






    //******************* Funções ajax para composição da página *********************

    function logar(){

        $.ajax({

          url: urlLogin,
          type : 'post',
          data :'{"login": "sheilab", "senha" : "sheilab"}',
          crossDomain : true,
          contentType: "application/json",
          success : function (data) {
            
            token = data.token;
            retornaEstacoes();

            console.log(token);
          },
          error : function(error){
            console.log(error);
          }
      });
    }

    function retornaEstacoes (){
      
      if(token.trim().length > 0){
        $.ajax({
          url: urlEstacoes,
          headers: { "Authorization": token},
          type : 'get',
          crossDomain : true,
          contentType: "application/json",
          dataType: 'json',
          
          success : function (data) {
            //console.log(data);
            if(data.length > 0){
              estacoes = data;
              
              montarEstacoes();
              //console.log(estacoes);

            }

          }
        });

      } else {
        console.log('Problemas no login, favor verificar com o programador!!');
      }
      
    }


   function montarEstacoes(){
      
      if( estacoes.length > 0 ){
        
        var maquinas = montaTemplateEstacoes(estacoes);
        document.getElementById('templateEstacoes').innerHTML = maquinas;
      }
   }


   function montaTemplateEstacoes(arrEstacoes){
    
    var template = "";

    if( arrEstacoes.length > 0  ){
      
      template += '<h5>Detalhes do Backup</h5>';
      template += '<table class="table table-responsive table-striped table-hover my">';
      template +=   '<tbody>';

      for(var i = 0; i < arrEstacoes.length; i++ ){
        
        template +=     '<tr>';
        template +=       '<td><a href="javascript:void(0);" class="estacao" nome="'+arrEstacoes[i].nome+'" >' +arrEstacoes[i].nome+ '</a></td>';
        template +=     '</tr>';  
      } 

      template +=   '</tbody>';
      template += '</table>';
    }

    return template;

  }

  //Pega as especificações de uma máquina específica

  function estacaoEspecificacao(nomeEstacao){

      $.ajax({

          url: urlEstacao,
          type : 'get',
          headers : { "Authorization" : token, "estacao" : nomeEstacao },
          crossDomain : true,
          success : function (data) {
            
            console.log(data);


          },
          error : function(error){
            console.log(error);
          }

      });
  }





  function montaTemplateEstacao(estacao){
    
    var template = "";

      template += '<tr>';
      template += '<td>Banco de Dados</td>';
      template += '<td>500GB</td>';
      template += '<td>27/10/2016</td>';
      template += '<td>Concluido</td>';
      template += '</tr>';


    return template;
  }


function detalhesBackup(){

var template = "";
    
    template +="<tr>"
    template +="<td>Caminho</td>"
    template +="<td>Tipo</td>"
    template +="<td>Tamanho</td>"
    template +="</tr>"

//.nome estacao
//.nome backup


return template


}



});//fim do ready()
