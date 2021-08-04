<template>
<div>
    <v-container grid-list-lg>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text" >
                        <v-icon color="white" large left>maps_home_work</v-icon>  Registro Cementerio
                    </v-card-title>
                    <v-card-subtitle>Usuarios que van a usar el sistema dependiendo de su ubicación.</v-card-subtitle>
                    <v-card-text>
                        <v-text-field prepend-icon="mdi-home-city" label="Nombre cementerio.." outlined filled v-model="nombreCementerio"></v-text-field>
                        <v-text-field prepend-icon="roofing" label="Parroquia cementerio.." outlined filled v-model="parroquiaCementerio"></v-text-field>
                        <v-textarea prepend-icon="location_on" label="Direccion.." outlined filled v-model="direccionCementerio"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="registrarCementerio(nombreCementerio,parroquiaCementerio,direccionCementerio)">Guardar<v-icon right>save</v-icon>
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-flex>

        </v-layout>
    </v-container>

    <template>
        <div>
            <v-snackbar v-model="respuesta"  color="error" >
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
            nombreCementerio: '',
            parroquiaCementerio: '',
            direccionCementerio: '',
            textoRespuesta: '',
            respuesta: false,
           
            encabezadosCementerio: [{
                    text: 'Id',
                    value: 'idCementerio'
                },
                {
                    text: 'Nombre',
                    value: 'parroquiaCementerio'
                },
                {
                    text: 'Dirección',
                    value: 'direccionCementerio'
                }
            ],
            elementosCementerio: [{
                nombreCementerio: '',
                parroquiaCementerio: '',
                direccionCementerio: '',
            }]

        }
    },
    methods: {
        registrarCementerio(nombreCementerio, parroquiaCementerio, direccionCementerio) {

            if (nombreCementerio == '') {
                alert("Debes colocar un nombre de cementerio");

            } else if (parroquiaCementerio == '') {
                alert("Debes colocar una parroqui de cementerio");

            } else if (direccionCementerio == '') {
                alert("Debes colocar una dirección de cementerio");

            } else {
                let json = {
                    nombreCementerio: this.nombreCementerio,
                    parroquiaCementerio: this.parroquiaCementerio,
                    direccionCementerio: this.direccionCementerio
                }
                axios.post('http://45.236.105.179:9000/api/conagopare/cementerio/', json)
                    .then(res => {
                        this.nombreCementerio = '',
                            this.parroquiaCementerio = '',
                            this.direccionCementerio = '',
                            this.respuesta= true;
                            this.textoRespuesta='Cementerio creado correctamente.'

                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        }

    },
    components: {

    }
}
</script>
