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
                        <v-text-field prepend-icon="mdi-grave-stone" label="Identificador de nicho.." outlined filled v-model="idNicho"></v-text-field>
                        <v-select prepend-icon="grid_view" outlined filled v-model="seleccionbloque" item-text="descripcionBloque" item-value="idBloque" label="Bloque.." :items="elementosBloque"></v-select>
                        <v-select prepend-icon="mdi-state-machine" outlined filled v-model="selecciontiponicho" item-text="descripcionTipoNicho" item-value="idTipoNicho" label="Tipo de nicho.." :items="elementosTipoNicho"></v-select>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="nuevoNicho(descripcionBloque)">Guardar<v-icon right>save</v-icon>
                        </v-btn>
                    </v-card-actions>

                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
    <template>
        <div>
            <v-snackbar v-model="respuesta" color="error">
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
export default {
    created() {
        let api1, api2, api3;

        api1 = 'http://45.236.105.179:9000/api/conagopare/bloque/';
        api2 = 'http://45.236.105.179:9000/api/conagopare/tipoNicho/';
        api3 = 'http://45.236.105.179:9000/api/conagopare/estadoNicho/';

        const requestOne = axios.get(api1);
        const requestTwo = axios.get(api2);
        const requestThree = axios.get(api3);

        axios.all([requestOne, requestTwo, requestThree])
            .then(axios.spread((res1, res2, res3) => {
                this.elementosBloque = res1.data;
                this.elementosTipoNicho = res2.data;
                this.elementosEstadoNicho = res3.data;

                //   console.log(res1);
                //   console.log(res2);
                //   console.log(res3);

            }))

    },
    data() {
        return {
            idNicho: '',
            respuesta: false,
            textoRespuesta: '',
            /////////////////////
            seleccionbloque: '',
            selecciontiponicho: '',
            seleccionestadonicho: '',
            ///////////////////////
            idEstadoNicho: '',
            descripcionEstadoNicho: '',
            descripcionBloque: '',
            ///////////////////

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
            }]

        }
    },
    methods: {
        nuevoNicho() {
            let json = {
                idNicho: this.idNicho,
                bloque: {
                    idBloque: this.seleccionbloque,

                },
                tipoNicho: {
                    idTipoNicho: this.selecciontiponicho,

                },
                estadoNicho: {
                    idEstadoNicho: 2,

                }

            }
            axios.post('http://45.236.105.179:9000/api/conagopare/nicho/', json)
                .then(res => {
                    this.respuesta = true;
                        this.textoRespuesta = 'Nicho Guardado correctamante';
                        this.idNicho='';
                        this.seleccionbloque='';
                        this.selecciontiponicho='';
                        this.idEstadoNicho='';

                })
                .catch(err => {
                    console.error(err);
                })

        }

    },
    components: {

    }
}
</script>
