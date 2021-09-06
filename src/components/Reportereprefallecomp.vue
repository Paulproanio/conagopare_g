<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text">Listar los nichos de un representante.</v-card-title>
                    <v-card-actions>
                        <v-layout wrap>
                            <v-flex sm3>
                            </v-flex>
                            <v-flex sm3>
                                <v-btn class="ml-3 mt-5" color="primary" @click="listarRepNicho(valor),fechas()">Revisar<v-icon right>grading</v-icon>
                                </v-btn>

                            </v-flex>
                            <v-flex sm5>
                                <v-text-field class="mt-3" label="Buscar.." append-icon="mdi-magnify" v-model="valor" outlined filled></v-text-field>
                            </v-flex>
                        </v-layout>

                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosNichosdeRepresentante" :items="elementosNichosdeRepresentante">

                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{item.fechFallecimiento}}</td>
                                    <td>{{item.representante.nombreRepresentante}}</td>
                                    <td>{{item.nombreFallecido}}</td>
                                    <td>{{ }}</td>
                                    <td>
                                        <div v-if="item.fechFallecimiento.length > 0">
                                            <v-btn icon>
                                                <v-icon>yard</v-icon>
                                            </v-btn>
                                            <v-btn icon>
                                                <v-icon>pin</v-icon>
                                            </v-btn>

                                        </div>

                                    </td>

                                </tr>
                            </template>

                        </v-data-table>
                        <!-- 

                <v-data-table :headers="titulosVentas" :items="elementosVentas" class="elevation-20 title" hide-default-footer>

                    <template v-slot:item="{ item }">
                        <tr>
                            <td>
                                <div v-if="item.marca == 'COMPLETO'">
                                    Normal
                                </div>
                                <div v-if="item.marca == 'COMPLETO of'">
                                    Fija &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </td>

                            <td>{{item.nombreVend}}</td>
                            <td align="right" class="text-endtext-lg-right">{{item.dolares}}</td>
                            <td align="right">{{item.tallos}}</td>
                            <td align="right" v-if=" ((item.dolares)/(item.tallos))> 0 ">{{((item.dolares)/(item.tallos)).toFixed(2)}}</td>
                            <td v-else class="text-endtext-lg-right"></td>

                        </tr>
                    </template>

                    <template slot="body.append">
                        <tr>
                            <td class="primary--text title">Totales</td>
                            <td class="title" align="right"></td>
                            <td class="title" align="right">$ {{sumaDeTotales('dolares').toFixed(2) }}</td>
                            <td class="title" align="right">T {{sumaDeTotales('tallos')}}</td>
                            <td align="right" class="title" v-if=" (sumaDeTotales('dolares')/sumaDeTotales('tallos')) > 0 ">$ {{(sumaDeTotales('dolares')/sumaDeTotales('tallos')).toFixed(2)}} </td>
                            <td v-else class="title">$ 0</td>

                        </tr>
                    </template>
                </v-data-table>
                        -->
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
            valor: '',
            verde: '',

            encabezadosNichosdeRepresentante: [{
                    text: 'Fecha fallecimiento',
                    value: 'fechFallecimiento'
                },
                {
                    text: 'Representante',
                    value: 'representante.nombreRepresentante'
                },
                {
                    text: 'Fallecido',
                    value: 'nombreFallecido'
                },
                {
                    text: 'Días',
                    value: ''
                },
                {
                    text: 'Acciones',
                    value: ''
                },

            ],

            elementosNichosdeRepresentante: [{
                idFallecido: '',
                nombreFallecido: '',
                fechFallecimiento: '',
                representante: {
                    idRepresentante: '',
                    cedulaRepresentante: '',
                    nombreRepresentante: '',
                    telefonoFijoRepresentante: '',
                    telefonoCelRepresentante: '',
                    direccionRepresentante: '',
                }
            }]

        };
    },
    methods: {
        listarRepNicho(a) {
            if (a == '') {
                alert("El campo no puede quedar vacío.");
            } else {
                axios.get('http://45.236.105.178:9000/api/conagopare/fallecido/nicdeunrep/' + a)
                    .then(res => {
                        if (res.data.length == 0) {
                            this.valor = '';
                            alert("Representante no tiene ningún fallecido registrado.");
                        } else {
                            this.elementosNichosdeRepresentante = res.data;
                        }

                    })
                    .catch(err => {
                        console.error(err);
                    })

            }

        },
        fechas() {
            var day1 = new Date("08/25/2020");
            var day2 = new Date("12/25/2021");

            var difference = day2.getTime() - day1.getTime();

            difference = this.verde;

        }
    }
}
</script>
