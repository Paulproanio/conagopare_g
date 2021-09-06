<template>
<div>
    <v-container grid-list-lg>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text">
                     <v-icon large left color="white">mdi-state-machine</v-icon>   Registro de Tipo de Nicho
                    </v-card-title>
                    <v-card-subtitle>Un nicho puede ser de varios tipos y esto puede influir en su costo.</v-card-subtitle>
                    <v-card-text>
                        <v-text-field prepend-icon="mdi-state-machine" label="Tipo de nicho.." outlined filled v-model="descripcionTipoNicho"></v-text-field>
                        <v-text-field type="number" prepend-icon="mdi-currency-usd " label="Valor del tipo de nicho...." outlined filled v-model="valorTipoNicho"></v-text-field>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="nuevoNicho(descripcionTipoNicho,valorTipoNicho)">Guardar<v-icon right>save</v-icon>
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
    data() {
        return {

            descripcionTipoNicho: '',
            valorTipoNicho: '',
            respuesta: false,
            textoRespuesta: '',

        };
    },
    methods: {
        nuevoNicho(descripcionTipoNicho, valorTipoNicho) {
            let json = {
                descripcionTipoNicho: descripcionTipoNicho,
                valorTipoNicho: valorTipoNicho

            }
            axios.post('http://45.236.105.178:9000/api/conagopare/tipoNicho/', json)
                .then(res => {
                    //  console.log(res)
                    this.descripcionTipoNicho = '';
                    this.valorTipoNicho = '';
                    this.respuesta = true;
                    this.textoRespuesta = 'Tipo de nicho guardado correctamente.';
                })
                .catch(err => {
                    console.error(err);
                })

        }
    }
}
</script>
