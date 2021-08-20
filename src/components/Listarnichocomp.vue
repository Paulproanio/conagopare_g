<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text">Listar nichos</v-card-title>
                    <v-card-actions>
                        <v-layout wrap>
                            <v-flex sm2>

                            </v-flex>
                            <v-flex sm4>
                                <v-btn class="ml-3" color="primary" @click="listarNicho(seleccioncementerio)">Listar<v-icon right>list</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex sm4>
                                <v-select prepend-icon="maps_home_work" outlined filled v-model="seleccioncementerio" item-text="nombreCementerio" item-value="idCementerio" label="Cementerio.." :items="elementosCementerio"></v-select>
                            </v-flex>
                            <v-flex sm2>

                            </v-flex>
                        </v-layout>

                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosNicho" :items="elementosNicho"></v-data-table>
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
            seleccioncementerio:'',
            encabezadosNicho: [{
                    text: 'Número de Nicho',
                    value: 'idNicho'
                },
                {
                    text: 'Bloque',
                    value: 'bloque.descripcionBloque'
                },
                {
                    text: 'Tipo nicho',
                    value: 'tipoNicho.descripcionTipoNicho'
                },
                {
                    text: 'Estado nicho',
                    value: 'estadoNicho.descripcionEstadoNicho'
                },
            ],
            elementosNicho: [{
                idNicho: '',
                bloque: {
                    idBloque: '',
                    descripcionBloque: ''
                },
                tipoNicho: {
                    idTipoNicho: '',
                    descripcionTipoNicho: '',
                    valorTipoNicho: ''
                },
                estadoNicho: {
                    idEstadoNicho: '',
                    descripcionEstadoNicho: ''
                }
            }, ],

            elementosCementerio: [{
                idCementerio: '',
                nombreCementerio: '',
                parroquiaCementerio: '',
                direccionCementerio: '',
            }]

        };
    },
    mounted() {
        // this.listarNicho();
        axios.get('http://45.236.105.179:9000/api/conagopare/cementerio/')
            .then(res => {
this.elementosCementerio = res.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
    methods: {
        listarNicho(a) {
          //  console.log(a);
            axios.get('http://45.236.105.179:9000/api/conagopare/nicho/xidcem/'+a)
                .then(res => {
                    // console.log(res)
                    this.elementosNicho = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        }

    }
}
</script>
