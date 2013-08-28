(function(){
	$.fn.criarContador = function(opt){
		var settings = {
			YEAR: '', // ANO
			MONTH: '', // MES
			DAY: '', // DIA
			HOUR: '', // HORA EM FORMATO 24H
			MIN: '' // MINUTOS
		}
		
		$.extend(settings, opt);

		var checkTime = function(YYYY,MM,DD,HH,MI,$main){
			var SS = 00; //Segundos
			var hoje = new Date(); //Dia
			var futuro = new Date(YYYY,MM-1,DD,HH,MI,SS); //Data limite do contador

			var ss = parseInt((futuro - hoje) / 1000); //Determina a quantidade total de segundos que faltam
			var mm = parseInt(ss / 60); //Determina a quantidade total de minutos que faltam
			var hh = parseInt(mm / 60); //Determina a quantidade total de horas que faltam
			var dd = parseInt(hh / 24); //Determina a quantidade total de dias que faltam
			 
			ss = ss - (mm * 60); //Determina a quantidade de segundos
			mm = mm - (hh * 60); //Determina a quantidade de minutos
			hh = hh - (dd * 24); //Determina a quantidade de horas
			
			//////////////////////////////////////////////////
			//    FUTURO BLOCO PARA FORMATAÇÃO DE RETORNO   //
			//     passando a formatação como parametro     //
			//////////////////////////////////////////////////

			var faltam = '';
			if (dd+hh+mm+ss > 0) {
				//O bloco abaixo descreve monta o que vai ser escrito na tela
				faltam += (dd && dd > 10)? dd+':' : '0'+dd+':';
				faltam += (hh>10) ? hh+':' : '0'+hh+':';
				faltam += (mm>10) ? mm+':' : '0'+mm+':';
				faltam += (ss< 10) ? '0'+ss: ss;
				
				
				setTimeout(function(){checkTime(YYYY,MM,DD,HH,MI,$main)},1000);//Reinicia a função a cada um segundo
			} else {
				setTimeout(function(){checkTime(YYYY,MM,DD,HH,MI,$main)},1000);
			}
			$main.html(faltam);
		};
		
		return this.each(function(){
			var $main = $(this);
			
			var YYYY = $main.data('year') || settings.YEAR;
			var MM = $main.data('month') || settings.MONTH;
			var DD = $main.data('day') || settings.DAY;
			var HH = $main.data('hour') || settings.HOUR;
			var MI = $main.data('min') || settings.MIN;
			
			checkTime(YYYY,MM,DD,HH,MI, $main);
		});
	};
})(jQuery)


$('.contador').criarContador({'YEAR': 2999, 'MONTH': 1, 'DAY': 1, 'HOUR': 12, 'MIN': 00});
//Chamar a funcão passando(ANO, MES, DIA, HORA, MINUTOS, 'ELEMENTO QUE IRÁ MOSTRAR')
//Esse é o dia futuro que irá colocar para a contagem regressiva!
