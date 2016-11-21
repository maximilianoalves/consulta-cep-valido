$(document).ready(function (event){
	$('#cep').mask("99.999-999");
});

$('#consultar').click(function (event) {
	event.preventDefault();
	var cep = $("#cep").val();
	cep = cep.replace('.', '');
	cep = cep.replace('-', '');
	var urlConsulta = 'https://api.postmon.com.br/v1/cep/' + cep;
	$.ajax({
	  url: urlConsulta,
	  crossDomain: true,
	  dataType:'json',
	  //data: data,
	  success: function (data){
	  	//console.log(data);
	  	insertContentSuccess(data);
	  },
	  error: function () {
        insertContentError();
      }
	})
})

function clearInputCep(){
	$("#cep").val('');
}

function clearHtml(){
	$('#content').html('');
}

function insertContentSuccess(data){
	clearInputCep();
	clearHtml();
	$('#content').append('<ul>'
		+'<li>'+'Cep: '+data.cep+'</li>'
		+'<li>'+'Endereço: '+data.logradouro+'</li>'
		+'<li>'+'Bairro: '+data.bairro+'</li>'
		+'<li>'+'Cidade: '+data.cidade+'</li>'
		+'<li>'+'Estado: '+data.estado_info.nome+'</li>'
		+'</ul>');
}

function insertContentError(){
	clearInputCep();
	clearHtml();
	$('#content').append('<ul>'
		+'<li>'+'Cep não localizado em nossa base de dados.'+'</li>'
		+'</ul>'
	);
}
/*
{
	"bairro": "Dihel", 
	"cidade": "Sapucaia do Sul", 
	"cep": "93210220", 
	"logradouro": "Rua Rodrigues Alves", 
	"estado_info": {
		"area_km2": "281.731,445", 
		"codigo_ibge": "43", 
		"nome": "Rio Grande do Sul"
	}, 
	"cidade_info": {
		"area_km2": "58,309", 
		"codigo_ibge": "4320008"}, 
		"estado": "RS"
	}
*/