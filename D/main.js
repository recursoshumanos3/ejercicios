function comenzar(){
    let entrada = document.querySelector("textarea");
    let salida = document.querySelector("textarea:last-of-type");
    salida.innerHTML = "";
    cuerpo(entrada,salida);
}

function cuerpo(e,s){
    let listado = new Array;
    let registro = new Array;
    listado = traducir(listado,e);
    listado = validacion(listado);
    resolucion(listado,registro,s);   
}

function traducir(listado,e){
    listado = e.value.split("\nFIN\n")
                .map(el => el.split("\n"));
    //esto de aqui sera retocado cuando arreglemos lo siguiente
  /* listado.map(el => {
       el.map(el2 => el2.split(" "))
   })  */          
  //  console.log(listado);

    for (let x = 0; x < listado.length; x++) {
        for (let y = 0; y < listado[x].length; y++) {
            y!=0 ? listado[x][y] = listado[x][y].split(" "):"";            
        }
    }
   // console.log(listado);
    return listado;
}

function validacion(listado){
    //substring
    for (let x = 0; x < listado.length; x++) {
        for (let y = 0; y < listado[x].length; y++) {
            for (let z = 0; z < listado[x][y].length; z++) {
                if(listado[x][y][z].length > 16){
                    listado[x][y][z] = "";
                }
            }            
        }        
    }
    console.log(listado);
    return listado; 
}

function organizar(listado,registro,x){    
    let equipos = new Array;
    registro = new Array;
    listado[x].map(function(el,ind){
        if(ind!==0){Array.prototype.push.apply(equipos, el.filter(word => word.length > 2));}
    });
    equipos.sort();
    equipos.map(function(el,ind){
        if(el!==equipos[ind+1]){registro.push(el);}
    });
    console.log(registro);
    return registro;
}

function calcular(equipo,listado){
    let resultado = 0;
    for (let x = 0; x < listado.length-1; x++) {
        for (let y = 1; y < listado[x].length; y++) {
            if(listado[x][y][0] === equipo || listado[x][y][2] === equipo){
                if(listado[x][y][1] > listado[x][y][3]){
                    listado[x][y][0] === equipo ? resultado+=2:resultado+=1;
                }else{
                    listado[x][y][2] === equipo ? resultado+=2:resultado+=1;
                }   
            }
        }      
    }
    return resultado;
}

function resolucion(listado,registro,s){
    let sal = "";
    for (let t = 0; t < listado.length - 1; t++) {
        let valor = new Array;
        registro = organizar(listado,registro,t);
        for (let i = 0; i < registro.length; i++) {
            valor.push(calcular(registro[i],listado));
        }
        console.log(valor);
        let maximo = Math.max(...valor);
        let q =0;
        
        for (let i = 0; i < valor.length; i++) {maximo == valor[i] ? q++:"";}
        if(q > 1){sal = "EMPATE " + maximo + "\n";}
        else{sal = registro[valor.indexOf(maximo)] + " " + maximo + "\n";}
        s.innerHTML += sal;
    }
}