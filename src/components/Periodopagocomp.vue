<template>
<div>
    <v-container>
        <v-layout>
            <v-flex sm8 mx-auto>
                <v-card>
                    <v-card-title class="primary white--text">
                        <v-icon left color="white" large>hourglass_bottom </v-icon> Periodo de pago
                    </v-card-title>
                    <v-card-subtitle>Espacio de tiempo que estará vigente un pago.</v-card-subtitle>
                    <v-card-text>
                        <v-text-field prepend-icon="pending_actions" label="Nombre periodo.." outlined filled v-model="nombreperiodo"></v-text-field>
                        <v-text-field type="number" prepend-icon="timelapse" label="Periodo.." outlined filled v-model="periodo"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="nuevoPeriodoPago(nombreperiodo,periodo)">Guardar<v-icon right>save</v-icon>
                        </v-btn>
                    </v-card-actions>

                </v-card>
                <v-card-text></v-card-text>
                <v-card>
                    <v-data-table :headers="titulosPeriodoPago" :items="elementosPeriodoPago"></v-data-table>
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
            nombreperiodo: '',
            periodo: '',
            titulosPeriodoPago: [{
                    text: 'Id',
                    value: 'idPeriodoPago'
                },
                {
                    text: 'Nombre',
                    value: 'nombrePeriodoPago'
                },
                {
                    text: 'Periodo (Días)',
                    value: 'periodoPago'
                },
            ],
            elementosPeriodoPago: [{
                idPeriodoPago: '',
                nombrePeriodoPago: '',
                periodoPago: '',

            }]

        };
    },
    methods: {
        nuevoPeriodoPago(nombreperiodo, periodo) {

            if (nombreperiodo == '' || nombreperiodo.length < 4 || periodo == '') {
                this.nombreperiodo = '';
                alert("Valor no válido");
            } else {
                let json = {
                    idPeriodoPago: '',
                    nombrePeriodoPago: nombreperiodo,
                    periodoPago: periodo,
                }
              //  console.log(json);
                axios.post('http://45.236.105.178:9000/api/conagopare/periodoPago/', json)
                    .then(res => {

                        this.listarPeriodoPago();
                        this.nombrePeriodoPago = '';
                        this.periodoPago = '';
                        this.textoRespuesta = 'Periodo de pago guardado';
                        this.respuesta = true;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },
        listarPeriodoPago() {
            axios.get('http://45.236.105.178:9000/api/conagopare/periodoPago/')
                .then(res => {
                    this.elementosPeriodoPago = res.data;

                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
        mounted(){
            this.listarPeriodoPago();
        }
}
</script>
