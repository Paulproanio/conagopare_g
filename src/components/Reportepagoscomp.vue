<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex sm12>
                <v-card>
                    <v-card-title class="primary white--text">
                        <v-icon left large color="white">summarize</v-icon> Reporte de Pagos de un Representante
                    </v-card-title>
                    <v-card-title>
                        <v-layout>
                            <v-flex sm4>

                            </v-flex>
                            <v-flex>
                                <v-text-field outlined filled label="Cédula representante.." type="text" v-model="cedula">
                                </v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-btn class="primary ml-3 mt-3" @click="revisarRepresentante(cedula)">Buscar <v-icon right size="25">search</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex sm3>

                            </v-flex>
                        </v-layout>

                    </v-card-title>
                    <v-card-title class="primary white--text">
                        Reporte
                    </v-card-title>
                    <v-card-text></v-card-text>
                    <v-card-text>
                        <v-data-table :items="elementosPagoFallecidoNicho" :headers="encabezadosPagoFallecidoNicho">

                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{item.idPago}}</td>
                                    <td>{{item.fechaValidez}}</td>
                                    <td>
                                        <div v-if="item.idPago!= 0">
                                            <v-chip color="yellow" label="">
                                                {{item.nicho.idNicho}}
                                            </v-chip>
                                        </div>

                                    </td>
                                    <td>{{item.valorPago}}</td>
                                    <td>
                                        <div v-if="item.estadoPago.idEstadoPago == 1">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip label color="primary">
                                                        <v-icon v-bind="attrs" v-on="on" size="25">done</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span>Pago Activo</span>
                                            </v-tooltip>
                                        </div>
                                        <div v-if="item.estadoPago.idEstadoPago == 2">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip label color="warning">
                                                        <v-icon v-bind="attrs" v-on="on" size="25">done_all</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span>Pago Caducado</span>
                                            </v-tooltip>
                                        </div>
                                    </td>

                                </tr>
                            </template>

                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            cedula: '',
            idPago: '',
            fechaValidez: '',
            valorPago: '',
            idNicho: '',
            idEstadoPago: '',
            ////////////////////////

            encabezadosPagoFallecidoNicho: [{
                    text: 'Id Pago',
                    value: 'idPago'
                },
                {
                    text: 'Fecha de validez',
                    value: 'fechaValidez'
                },
                {
                    text: 'Nicho',
                    value: 'nicho.idNicho'
                },
                {
                    text: 'Valor pago',
                    value: 'valorPago'
                },
                {
                    text: 'Estado',
                    value: 'estadoPago.idEstadoPago'
                }
            ],
            elementosPagoFallecidoNicho: [{
                idPago: '',
                fechaValidez: '',
                valorPago: '',
                nicho: {
                    idNicho: '',
                },
                estadoPago: {
                    idEstadoPago: '',

                },

            }],

        };
    },
    methods: {
        revisarRepresentante(a) {
            if (a == '') {
                alert("Campo no puede estar vacío.");
            } else {
                axios.get('http://45.236.105.178:9000/api/conagopare/representante/findbycedulaRepresentante/' + a)
                    .then(res => {
                        //  console.log(res.data)
                        if (res.data.length == 1) {
                            //  this.elementosPagoFallecidoNicho = res.data;
                            // console.log(res.data);
                            // console.log(res.data[0].cedulaRepresentante);
                            // console.log(res.data[0].nombreRepresentante);
                            // console.log(res.data[0].telefonoFijoRepresentante);
                            // console.log(res.data[0].telefonoCelRepresentante);
                            // console.log(res.data[0].direccionRepresentante);
                            //   this.idRepresentante = res.data[0].idRepresentante;
                            //  this.cedulaRepresentante = res.data[0].cedulaRepresentante;
                            //   this.nombreRepresentante = res.data[0].nombreRepresentante;
                            //  this.telefonoCelRepresentante = res.data[0].telefonoCelRepresentante;
                            this.reportegeneral(a);

                        } else {
                            alert("El representante no existe.");
                        }
                    })
                    .catch(err => {
                        console.error(err);

                    })
            }

        },

        reportegeneral(a) {
            axios.get('http://45.236.105.178:9000/api/conagopare/pago/rep/' + a)
                .then(res => {
                    //  console.log(res.data)
                    this.elementosPagoFallecidoNicho = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        }

    }
}
</script>
