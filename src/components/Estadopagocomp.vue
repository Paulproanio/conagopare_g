<template>
<div>
    <v-container>
        <v-layout>
            <v-flex sm8 mx-auto>
                <v-card>
                    <v-card-title class="primary white--text">
                        <v-icon left color="white" large>price_change </v-icon> Estado de Pago
                    </v-card-title>
                    <v-card-subtitle>Un pago puede tener un estado.</v-card-subtitle>
                    <v-card-text>
                        <v-text-field prepend-icon="price_change" label="Estado de Pago.." outlined filled v-model="nombreestado"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="nuevoEstadoPago(nombreestado)">Guardar<v-icon right>save</v-icon>
                        </v-btn>
                    </v-card-actions>

                </v-card>
                <v-card-text></v-card-text>
                <v-card>
                    <v-data-table :headers="titulosEstadopago" :items="elementosEstadoPago"></v-data-table>
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
            alert: false,
            respuesta: false,
            textoRespuesta: '',
            nombreestado: '',
            titulosEstadopago: [{
                text: 'Id',
                value: 'idEstadoPago'
            }, {
                text: 'Nombre',
                value: 'nombreEstadoPago'
            }, ],
            elementosEstadoPago: [{
                idEstadoPago: '',
                nombreEstadoPago: '',

            }]

        };
    },
    methods: {
        nuevoEstadoPago(nombreestado) {

            if (nombreestado == '' || nombreestado.length < 4) {
                this.nombreestado = '';
                alert("Valor no válido");
            } else {
                let json = {
                    idEstadoPago: '',
                    nombreEstadoPago: nombreestado,
                }
                axios.post('http://45.236.105.178:9000/api/conagopare/estadoPago/', json)
                    .then(res => {

                        this.listarEstadoPago();
                        this.nombreestado='';
                        this.textoRespuesta = 'Tipo pago guardado';
                        this.respuesta = true;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },
        listarEstadoPago() {
            axios.get('http://45.236.105.178:9000/api/conagopare/estadoPago/')
                .then(res => {
                    this.elementosEstadoPago = res.data;

                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    mounted(){
        this.listarEstadoPago();
    }
}
</script>
