<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex sm6 mx-auto>
                <v-card>
                    <v-card-title class="primary white--text" > <v-icon large color="white" left>mdi-account-details-outline</v-icon> Crear tipo usuario</v-card-title>
                    <v-card-subtitle>Crea tipos de usuario para ingreso al sistema.</v-card-subtitle>
                    <v-card-text>

                        <v-text-field prepend-icon="mdi-account-details-outline" label="Nombre tipo usuario.." outlined filled v-model="descripcionTipoUsuario"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                     

                        <v-btn color="primary" @click="crearTipoUsuario(descripcionTipoUsuario)">guardar<v-icon>save</v-icon>
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
            descripcionTipoUsuario: '',
            respuesta: false,
            textoRespuesta: '',

        }
    },
    methods: {
        crearTipoUsuario(descripcionTipoUsuario) {

            if (descripcionTipoUsuario == '') {
                alert('El nombre no puede quedar vacio');

            } else {
                let json = {
                    descripcionTipoUsuario: this.descripcionTipoUsuario

                }
                axios.post('http://45.236.105.178:9000/api/conagopare/tipoUsuario/', json)
                    .then(res => {
                        this.descripcionTipoUsuario = '',
                            this.respuesta = true,
                            this.textoRespuesta = 'Tipo usuario guardado correctamente.'

                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        }

    },
}
</script>
