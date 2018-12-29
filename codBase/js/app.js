var Calculadora = {
  operador : "",
  valorA : 0.00,
  valorB : 0.00,
  finOperacion : false,

  //inicializa la calculadora
  inicializar : function(){
    Calculadora.valorA = 0.00;
    Calculadora.valorB = 0.00;
    Calculadora.operador = "";
    Calculadora.finOperacion = false
  },

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
    if(cadena != "0"){
      console.log(cadena)
      retorno = parseFloat(cadena) * -1
      console.log(retorno)
      document.getElementById('display').innerText = retorno
    }
  },

  //Imprime el resultado en la pantalla
  imprimeDigito: function(elemento){
      var pantalla = document.getElementById('display')
      if(Calculadora.finOperacion === true){
        pantalla.innerText = elemento;
        Calculadora.inicializar();
      }else if(pantalla.innerText.indexOf("0") === 0 && elemento === "0" && pantalla.innerText.indexOf(".") != 1){
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
  },

  calculaOperacion : function(operador){
    Calculadora.valorB = document.getElementById('display').innerText;
    var resultado
    switch (operador) {
      case "+":
        resultado = parseFloat(Calculadora.valorA) + parseFloat(Calculadora.valorB);
        break;
      case "-":
        resultado = parseFloat(Calculadora.valorA) - parseFloat(Calculadora.valorB);
        break;
      case "*":
        resultado = parseFloat(Calculadora.valorA) * parseFloat(Calculadora.valorB);
        break;
      case "/":
          if(parseFloat(Calculadora.valorB) == 0){
            resultado = "ERROR";
            break;
          }else{
            resultado = parseFloat(Calculadora.valorA) / parseFloat(Calculadora.valorB);
            break;
          }
    }
    document.getElementById('display').innerText = Calculadora.truncaCadena(resultado.toString())
  },


  //Funcion asigna eventos a la teclas
  ini: function(){
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
      Calculadora.imprimeDigito(num[evt.target.id].id)
      })
    }

    //Asigna evento a la tecla ON/C
    document.getElementById('on').addEventListener('click', function(){
      document.getElementById('display').innerText = "0";
      Calculadora.inicializar();
    })

    //Asigna evento a la tecla PUNTO(.)
    document.getElementById('punto').addEventListener('click', function(){
      Calculadora.imprimeDigito(".")
    })

    //Asigno evento a la tecla(+/-)
    document.getElementById("sign").addEventListener('click', function() {
      Calculadora.signo(document.getElementById("display").innerText)
    })

    //Asigna evento a la tecla Suma(+)
    document.getElementById("mas").addEventListener('click', function() {
      Calculadora.valorA = document.getElementById("display").innerText;
      console.log(Calculadora.valorA)
      Calculadora.operador = "+";
      document.getElementById("display").innerText = "";
    })

    //Asigna evento a la tecla Resta(-)
    document.getElementById("menos").addEventListener('click', function() {
      Calculadora.valorA = document.getElementById("display").innerText;
      Calculadora.operador = "-";
      document.getElementById("display").innerText = "";
    })

    //Asigna evento a la tecla Multiplicacion](*)
    document.getElementById("por").addEventListener('click', function() {
      Calculadora.valorA = document.getElementById("display").innerText;
      Calculadora.operador = "*";
      document.getElementById("display").innerText = "";
    })

    //Asigna evento a la tecla Divicion(/)
    document.getElementById("dividido").addEventListener('click', function() {
      Calculadora.valorA = document.getElementById("display").innerText;
      Calculadora.operador = "/";
      document.getElementById("display").innerText = "";
    })

    document.getElementById("igual").addEventListener('click', function(){
      Calculadora.calculaOperacion(Calculadora.operador);
      Calculadora.finOperacion = true;
    })
  }

} //fin calculadora

Calculadora.ini()
