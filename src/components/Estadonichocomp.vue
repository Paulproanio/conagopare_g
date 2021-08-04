<template>
<div>
    <v-container>
        <v-layout>
            <v-flex sm8 mx-auto>
                <v-card>
                    <v-card-title class="primary white--text">
                      <v-icon left color="white" large>mdi-chemical-weapon </v-icon>  Estado de Nicho
                    </v-card-title>
                    <v-card-subtitle>Unn nicho puede tener eados como ocupado o vacio u otro.</v-card-subtitle>
                    <v-card-text>
                        <v-text-field prepend-icon="mdi-chemical-weapon " label="Estado de Nicho.." outlined filled v-model="descripcionEstadoNicho"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="nuevoEstadoNicho(descripcionEstadoNicho)">Guardar<v-icon right>save</v-icon>
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
            idEstadoNicho: '',
            descripcionEstadoNicho: '',
            respuesta: false,
            textoRespuesta: ''

        };
    },
    methods: {
        nuevoEstadoNicho(descripcionEstadoNicho) {
            if (descripcionEstadoNicho == '') {
                alert("Valor no válido para un estado.");
            } else {
                let json = {

                    descripcionEstadoNicho,

                }
                axios.post('http://45.236.105.179:9000/api/conagopare/estadoNicho/', json)
                    .then(res => {
                        // console.log(res)
                        this.respuesta = true;
                        this.textoRespuesta = 'Estado guardado corrextamante.';
                        this.descripcionEstadoNicho='';
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        }
    }
}
</script>
