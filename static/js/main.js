    $('#aplicacion').css('visibility', 'hidden');
    $('#experimento').css('visibility', 'hidden');
    $('#experimento_2').css('visibility', 'hidden');
    $('#experimento_3').css('visibility', 'hidden');
    $('#formula').css('visibility', 'hidden');




    $(".btn-inicio").click(function() {
        inicio();
    })
    $(".btn-exp").click(function() {
        generacion_experimento();
    })
    const inicio = () => {
        $(".datos").remove();
        $("h1").css("font-size", "15px");
        $("h1").css("margin-left", "-35%");
        $(".logo-unam").css("width", "10%");
        $(".logo-unam").css("height", "10%");
        $(".logo-unam").css("position", "relative");
        $(".logo-unam").css("left", "-420px");
        $(".logo-unam").css("top", "-90px");
        $('#aplicacion').css('visibility', 'visible');
    }
    const generacion_experimento = () => {
        let input_dados = $(".n-dados")[0].value;
        if (input_dados == "") {
            alert("Debes ingresar un número de dados")
        } else {
            let diccionario_datos = [];
            let inter = [];
            let n_dados = parseInt(input_dados);
            let dados_opciones = [1, 2, 3, 4, 5, 6]
            let texto = `Microestado (Estados Equiprobables) de cada uno de los ${n_dados} dados`;
            $('#experimento').css('visibility', 'visible');
            $(".numero_dados_experimento_1")[0].innerText = texto;
            $('#experimento_2').css('visibility', 'visible');
            $('#experimento_3').css('visibility', 'visible');
            $('#formula').css('visibility', 'visible');


            for (let index = 0; index < n_dados; index++) {
                diccionario_datos.push(dados_opciones)
            }
            let macroestados = cartesianProduct(diccionario_datos);
            let resultados = [];
            for (const macro in macroestados) {
                let sum_macroestados = 0;
                for (let index = 0; index < n_dados; index++) {
                    sum_macroestados += macroestados[macro][index];
                }
                resultados.push(sum_macroestados);
            }
            let dict = [];
            let dict_final = [];
            let dict_final_2 = {};
            for (const macro2 in macroestados) {
                dict.push([macroestados[macro2], resultados[macro2]]);
            }


            for (let index = 0; index < dict.length; index++) {
                if (dict_final.includes(dict[index][1])) {
                    console.log("element in array")
                } else {
                    dict_final.push(dict[index][1])
                }

            }


            for (const key in dict_final) {
                llave = dict_final[key];
                dict_final_2[llave] = 0;
            }

            const llaves_2 = Object.keys(dict_final_2)

            for (const b in llaves_2) {
                let h = document.createElement("p");
                let text = "Macroestado: E = " + String(llaves_2[b]);
                let t = document.createTextNode(text);
                h.appendChild(t);
                document.getElementsByClassName("experimento_2")[0].appendChild(h);
                var suma = 0;
                var suma2 = 0;

                for (let index = 0; index < dict.length; index++) {
                    suma2++;
                    if (llaves_2[b] == dict[index][1]) {
                        suma++;
                        let h = document.createElement("p");
                        let text = "(" + String(dict[index][0]) + ")";
                        let t = document.createTextNode(text);
                        h.appendChild(t);
                        document.getElementsByClassName("experimento_2")[0].appendChild(h);
                        dict_final_2[llaves_2[b]] += 1;
                    }

                }
                let h2 = document.createElement("p");
                let text2 = "Probabilidad: " + String(suma) + "/" + String(suma2);
                let t2 = document.createTextNode(text2);
                h2.appendChild(t2);
                document.getElementsByClassName("experimento_2")[0].appendChild(h2);

            }
            const llaves_3 = Object.keys(dict_final_2);
            const valores_3 = Object.values(dict_final_2);
            var data = [{
                x: llaves_3,
                y: valores_3,
                type: 'bar'
            }];
            var layout = {
                width: 600,
                height: 600,
                title: 'Histograma',
                font: {
                    family: 'Raleway, sans-serif'
                },
                showlegend: false,
                xaxis: {
                    tickangle: -45
                },
                yaxis: {
                    zeroline: false,
                    gridwidth: 2
                },
                bargap: 0.05
            };
            Plotly.newPlot('experimento_3', data, layout);



        }
    }

    const cartesianProduct = (arr) => {
        return arr.reduce(function(a, b) {
            return a.map(function(x) {
                return b.map(function(y) {
                    return x.concat([y]);
                })
            }).reduce(function(a, b) {
                return a.concat(b)
            }, [])
        }, [
            []
        ])
    }