var Calculadora = {
  operador : "",

  //Trunca la pantalla a solo 8 digitos
  truncaCadena: function(cadena){
    if(cadena.length > 8){
      retorno = cadena.substring(0,8);
    }else{
      retorno = cadena;
    }
    return retorno;
  },

  //Cambia el signo del valor en pantalla
  signo: function(cadena){
    retorno = parseFloat(cadena) * -1
    Calculadora.imprimePantalla(retorno.toString())
  },

  //Imprime el resultado en la pantalla
  imprimePantalla: function(elemento){
      var pantalla = document.getElementById('display')
      if(pantalla.innerText.indexOf("0") === 0 && elemento === "0" && pantalla.innerText.indexOf(".") != 1){
        pantalla.innerText = "0";
      }else if(pantalla.innerText.indexOf("0") === 0 && elemento ==="." && pantalla.innerText.indexOf(".") != 1){
        pantalla.innerText = Calculadora.truncaCadena(pantalla.innerText + elemento);
      }else if(pantalla.innerText.indexOf("0") === 0 && pantalla.innerText.indexOf(".") != 1){
        pantalla.innerText = elemento;
      }else if(pantalla.innerText.indexOf(".") >= 0 && elemento === "."){
        pantalla.innerText = pantalla.innerText;
      }else{
        pantalla.innerText = Calculadora.truncaCadena(pantalla.innerText + elemento);
      }

//      document.getElementById('display').innerText = document.getElementById('display').innerText + elemento
  },
  //Funcion asigna eventos a la teclas
  asignaEventos: function(){
    //Crea animacion al pulsar cada tecla.
    var teclas = document.querySelectorAll(".tecla");
    for (var tecla of teclas) {
      tecla.addEventListener("mousedown", function(evt){
        var tecla = evt.target;
        tecla.style.transform = "scale(0.9)";
      });
      tecla.addEventListener("mouseup", function(evt){
        var tecla = evt.target;
        tecla.style.transform = "scale(1.0)";
      });
    }

    //Asigna evento click al teclado numerico 0-9
    var num = [];
    for(var x = 0; x < 10; x++){
      num[x] = document.getElementById(x)
      num[x].addEventListener('click', function(evt){
      Calculadora.imprimePantalla(num[evt.target.id].id)
      })
    }

    //Asigna evento a la tecla ON/C
    document.getElementById('on').addEventListener('click', function(){
      document.getElementById('display').innerText = "0";
    })

    //Asigna evento a la tecla PUNTO(.)
    document.getElementById('punto').addEventListener('click', function(){
      Calculadora.imprimePantalla(".")
    })

    //Asigno evento a la tecla(+/-)
    document.getElementById("sign").addEventListener('click', Calculadora.signo(document.getElementById("display").innerText))
  },

  ini : function(){
    this.asignaEventos();
  }

} //fin calculadora

Calculadora.ini()
