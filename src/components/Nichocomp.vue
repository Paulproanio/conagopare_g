<template>
<div>
    <v-container>
        <v-layout>
            <v-flex sm8 mx-auto>
                <v-card>
                    <v-card-title class="primary white--text">
                        <v-icon left large color="white">mdi-grave-stone</v-icon> Registro de Nicho
                    </v-card-title>
                    <v-card-subtitle>Ubicación en la que descansa un fallecido.</v-card-subtitle>
                    <v-card-text>
                        <v-text-field prepend-icon="mdi-grave-stone" label="Número de nicho.." outlined filled v-model="numeroNicho"></v-text-field>
                        <v-select prepend-icon="grid_view" outlined filled v-model="seleccionbloque" item-text="descripcionBloque" item-value="idBloque" label="Bloque.." :items="elementosBloque"></v-select>
                        <v-select prepend-icon="mdi-state-machine" outlined filled v-model="selecciontiponicho" item-text="descripcionTipoNicho" item-value="idTipoNicho" label="Tipo de nicho.." :items="elementosTipoNicho"></v-select>
                        <v-select prepend-icon="maps_home_work" outlined filled v-model="seleccioncementerio" item-text="nombreCementerio" item-value="idCementerio" label="Cementerio.." :items="elementosCementerio"></v-select>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="nuevoNicho(numeroNicho,seleccionbloque,selecciontiponicho,seleccioncementerio,descripcionBloque)">Guardar<v-icon right>save</v-icon>
                        </v-btn>
                    </v-card-actions>

                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
    <template>
        <div>
            <v-snackbar v-model="respuesta" color="primary">
                {{ textoRespuesta }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="white" text v-bind="attrs" @click="respuesta = false">
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </template>
</div>
</template>

<script>
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert";
export default {
    created() {
        let api1, api2, api3, api4;

        api1 = 'http://45.236.105.178:9000/api/conagopare/bloque/';
        api2 = 'http://45.236.105.178:9000/api/conagopare/tipoNicho/';
        api3 = 'http://45.236.105.178:9000/api/conagopare/estadoNicho/';
        api4 = 'http://45.236.105.178:9000/api/conagopare/cementerio/';

        const requestOne = axios.get(api1);
        const requestTwo = axios.get(api2);
        const requestThree = axios.get(api3);
        const requestFour = axios.get(api4);

        axios.all([requestOne, requestTwo, requestThree, requestFour])
            .then(axios.spread((res1, res2, res3, res4) => {
                this.elementosBloque = res1.data;
                this.elementosTipoNicho = res2.data;
                this.elementosEstadoNicho = res3.data;
                this.elementosCementerio = res4.data;

                //   console.log(res1);
                //   console.log(res2);
                //   console.log(res3);

            }))

    },
    data() {
        return {
            idNicho: '',
            numeroNicho: '',
            descBloq:'',
            respuesta: false,
            textoRespuesta: '',
            /////////////////////
            seleccionbloque: '',
            selecciontiponicho: '',
            seleccionestadonicho: '',
            seleccioncementerio: '',
            ///////////////////////
            idEstadoNicho: '',
            descripcionEstadoNicho: '',
            descripcionBloque: '',
            ///////////////////
            nombreCementerio: '',
            parroquiaCementerio: '',
            direccionCementerio: '',
            ///////////////////
            bandera1: false,
            bandera2: false,
            //////////////////
            elementosBloque: [{
                idBloque: '',
                descripcionBloque: ''
            }],
            elementosTipoNicho: [{
                idTipoNicho: '',
                descripcionTipoNicho: '',
                valorTipoNicho: ''
            }],
            elementosEstadoNicho: [{
                idEstadoNicho: '',
                descripcionEstadoNicho: ''
            }],
            elementosCementerio: [{
                idCementerio: '',
                nombreCementerio: '',
                parroquiaCementerio: '',
                direccionCementerio: '',
            }]

        }
    },
    methods: {

        limpiarDatos() {
            this.numeroNicho = '';
            this.seleccionbloque = '';
            this.selecciontiponicho = '';
            this.seleccioncementerio = '';
            this.bandera1= false;
        },

        async nuevoNicho(numeroNicho, seleccionbloque, selecciontiponicho, seleccioncementerio, descripcionBloque) {

            //  console.log(numeroNicho);
            //    console.log(seleccionbloque);
            //    console.log(selecciontiponicho);
             //   console.log(seleccioncementerio);
            //   console.log(descripcionBloque);

            if (numeroNicho =='' && seleccionbloque=='' && selecciontiponicho=='' && seleccioncementerio=='' && descripcionBloque =='') {

                this.$alert("Los datos no pueden quedar vacíos!");
                
            }else{

            let api1, api2, api3;
            api1 = 'http://45.236.105.178:9000/api/conagopare/nicho/xnn/' + numeroNicho;
            api2 = 'http://45.236.105.178:9000/api/conagopare/nicho/xidb/' + seleccionbloque;
            api3 = 'http://45.236.105.178:9000/api/conagopare/bloque/' + seleccionbloque;

            const requestOne = await axios.get(api1);
            const requestTwo = await axios.get(api2);
            const requestThree = await axios.get(api3);

            axios.all([requestOne, requestTwo, requestThree])
                .then(axios.spread((res1, res2, res3) => {

                    //   let rev = res1.data[0].numeroNicho + res1.data[0].bloque.descripcionBloque;
                    //  let rev2 = numeroNicho + res3.data.descripcionBloque;

                    //     console.log(rev);
                   // console.log(res2.data.length);
               //    console.log(res3.data.descripcionBloque);
                   this.descBloq =res3.data.descripcionBloque;
                    if (res2.data.length == 0) {

                        let json = {
                            idNicho: '',
                            numeroNicho: this.numeroNicho,
                            bloque: {
                                idBloque: this.seleccionbloque,

                            },
                            tipoNicho: {
                                idTipoNicho: this.selecciontiponicho,

                            },
                            estadoNicho: {
                                idEstadoNicho: 2,

                            },
                            cementerio: {
                                idCementerio: this.seleccioncementerio,
                            }

                        }
                        //console.log(json); 
                        axios.post('http://45.236.105.178:9000/api/conagopare/nicho/', json)
                            .then(res => {
                              //  this.respuesta = true;
                              //  this.textoRespuesta = 'Nicho Guardado correctamante';
                                this.$alert('Nicho Guardado correctamante');
                                this.idNicho = '';
                                this.seleccionbloque = '';
                                this.selecciontiponicho = '';
                                this.idEstadoNicho = '';
                                 this.limpiarDatos();

                            })
                            .catch(err => {
                                console.error(err);
                            })

                    } else {

                        for (let index = 0; index < res2.data.length; index++) {

                           // console.log(res2.data[index].numeroNicho);
                          //  console.log(numeroNicho);

                            if (res2.data[index].numeroNicho == numeroNicho) {
                                this.bandera1 = true;

                            }

                        }

                        if (!this.bandera1) {
                            let json = {
                                idNicho: '',
                                numeroNicho: this.numeroNicho,
                                bloque: {
                                    idBloque: this.seleccionbloque,

                                },
                                tipoNicho: {
                                    idTipoNicho: this.selecciontiponicho,

                                },
                                estadoNicho: {
                                    idEstadoNicho: 2,

                                },
                                cementerio: {
                                    idCementerio: this.seleccioncementerio,
                                }

                            }
                            //console.log(json);
                            axios.post('http://45.236.105.178:9000/api/conagopare/nicho/', json)
                                .then(res => {
                                   // this.respuesta = true;
                                  //  this.textoRespuesta = 'Nicho Guardado correctamante';
                                  this.$alert('Nicho Guardado correctamante');
                                    this.idNicho = '';
                                    this.seleccionbloque = '';
                                    this.selecciontiponicho = '';
                                    this.idEstadoNicho = '';
                                    this.limpiarDatos();

                                })
                                .catch(err => {
                                    console.error(err);
                                })
                        } else {
                           // alert("ya existe");
                            this.$alert("El registro \" "+  this.descBloq+numeroNicho+" \" ya existe.");
                             this.limpiarDatos();
                        }
                    }

                }))
            }


            /* let json = {
                 idNicho:'',
                 numeroNicho: this.numeroNicho,
                 bloque: {
                     idBloque: this.seleccionbloque,

                 },
                 tipoNicho: {
                     idTipoNicho: this.selecciontiponicho,

                 },
                 estadoNicho: {
                     idEstadoNicho: 2,

                 },
                 cementerio: {
                     idCementerio: this.seleccioncementerio,
                 }

             }
             //console.log(json);
             axios.post('http://45.236.105.178:9000/api/conagopare/nicho/', json)
                 .then(res => {
                     this.respuesta = true;
                     this.textoRespuesta = 'Nicho Guardado correctamante';
                     this.idNicho = '';
                     this.seleccionbloque = '';
                     this.selecciontiponicho = '';
                     this.idEstadoNicho = '';

                 })
                 .catch(err => {
                     console.error(err);
                 })*/

        }

    },
    components: {

    }
}
</script>
