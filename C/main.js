const reductor = (total, valoractual) => total + valoractual;

function comenzar(){
    let Entrada = document.querySelector("textarea");
    let Salida = document.querySelector("textarea:last-of-type");
    Salida.value="";
    clasificar(Entrada);
}

function clasificar(E){
    let listado = E.value
                    .substring(0,E.value.indexOf("\nE 0"))
                    .split("\nN 0\n")
                    .map(item => item.split("\n"));
    proceso(listado);
}

function proceso(listado){
    let inventario = new Array;
    let registro = new Array;
    let registroB = new Array;
    let listLtra = new Array;
    let listNumb = new Array;
    let lista = new Array;
    listado = listado.map(item =>{
        item.map(subitem =>{
            let letra = subitem.substring(0,1);
            let numero = parseFloat(subitem.substring(2,subitem.length));
           //recuerda que lista sustituira a listLtra y listNumb
            resolucion(letra,numero,listLtra,listNumb,lista);
           // console.log(listLtra);
           // console.log(listNumb);
            
            registro.push(numero);

            registroB.push(numero);
        })
        recogida(listLtra,listNumb);
        inventario.push(registro);
       // console.log(listLtra);
        console.log("d-"+registro,"d2-"+registroB);
        registro = new Array;
        listLtra = new Array;
        listNumb = new Array;
   
        });
    console.log("d3---"+inventario);
    medias(inventario,registroB);
}

function resolucion(letra,numero,listLtra,listNumb,lista){
    //--V.0 lista.map(function(ele,ind){ind % 2 == 0 && letra === ele ? lista[ind+1] += numero:"";})
    let existe = false;
    listLtra.map(function(ele,ind){
        if (letra===ele) {
            listNumb[ind] += numero;
            existe = true;
        }
    })
    if(existe){
        existe = false;
    }else{
        listLtra.push(letra);
        listNumb.push(numero);
    }

    
}

function recogida(listLtra,listNumb){
    let Salida = document.querySelector("textarea:last-of-type");
    
    let v = [listNumb
                .indexOf(Math
                    .max(...listNumb)),
            Math
                .min(...listNumb),
            listNumb
                .indexOf(Math
                    .min(...listNumb))
            ];

    calcular_maximo(listLtra,v[0],Salida);
    calcular_minimo(listNumb,listLtra,v[2],Salida,v[1]);
    Salida.value += "\n"; 
}
function calcular_maximo(listLtra,inmax,Salida) {
    let maximo = listLtra[inmax];
    switch (maximo) {
        case "D":
        Salida.value += "Desayuno#";
        break;
        case "A":
        Salida.value += "Comidas#";
        break;
        case "M":
        Salida.value += "Meriendas#";
        break;
        case "I":
        Salida.value += "Cenas#";
        break;
        case "C":
        Salida.value += "Copas#";
        break;
        default:
        Salida.value += "Desconocido#";
        break;
    }    
}

function calcular_minimo(listNumb,listLtra,inmin,Salida,valmin){
    let minimo = listLtra[inmin];
    const listacompleta = new Array("A","C","D","I","M");
    listLtra = listLtra.sort();
    if(listLtra.length < 4 || (listLtra.length == 4 && valmin == 0)){
        minimo = "Empate";
    }else if(listLtra.length == 4 && valmin > 0){
        for(let v = 0;v < listNumb.length;v++){
            if(listNumb[v]==valmin && v != inmin){
                minimo = "Empate";
                break;
            }else{
                for(let u = 0;u < listacompleta.length;u++){
                    if(listacompleta[u]!=listLtra[u]){
                        minimo = listacompleta[u];
                        break;
                    }
                }
            }
        }
    }
    minimo_resultado(minimo,Salida);
}

function minimo_resultado(minimo,Salida){
    switch (minimo){
        case "D":
            Salida.value += "Desayuno#";
            break;
        case "A":
            Salida.value += "Comidas#";
            break;
        case "M":
            Salida.value += "Meriendas#";
            break;
        case "I":
            Salida.value += "Cenas#";
            break;
        case "C":
            Salida.value += "Copas#";
            break;
        case "Empate":
            Salida.value += "Empate#";
            break;
        default:
        Salida.value += "Desconocido#";
        break;
    }
}

function medias(inventario,registroB){
    let Salida = document.querySelector("textarea:last-of-type");
    let media_total = registroB.reduce(reductor) / registroB.length;
    inventario.map(el =>  {
        let media_dia = el.reduce(reductor) / el.length;
        media_dia > media_total ? Salida.value = Salida.value.replace(/(#)\n/, '#SI\n'):
        Salida.value = Salida.value.replace(/(#)\n/, '#NO\n'); 
    });
}