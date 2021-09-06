<template>
<div>
    <v-container>
        <v-layout>
            <v-flex sm10 mx-auto>
                <v-card>
                    <v-card-title class="primary white--text">Listado de Fallecidos</v-card-title>
                    <v-card-text></v-card-text>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex sm2>

                            </v-flex>
                            <v-flex sm4>
                                <v-btn class="ml-3 mt-5" color="primary" @click="listaFallecimientos()"> Listar<v-icon right size="25">list_alt</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex sm5>
                                <v-text-field class="mt-3" v-model="search" append-icon="mdi-magnify" label="Buscar.." outlined filled></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-text>
                        <v-data-table :headers="encabezadosFallecido" :items="elementosFallecido" :search="search"></v-data-table>
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
            search: '',
            encabezadosFallecido: [{
                    text: 'Id Fallecido',
                    value: 'idFallecido'
                }, {
                    text: 'Representante',
                    value: 'representante.nombreRepresentante'
                }, {
                    text: 'Nombre',
                    value: 'nombreFallecido'
                }, {
                    text: 'Nicho',
                    value: 'nicho.idNicho'
                },
                {
                    text: 'Fecha Fallecimiento',
                    value: 'fechFallecimiento'
                }
            ],
            elementosFallecido: [{
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
                },
                nicho: {
                    idNicho: '',
                }
            }]

        };
    },
    methods: {
        listaFallecimientos() {
            axios.get('http://45.236.105.178:9000/api/conagopare/fallecido')
                .then(res => {
                    this.elementosFallecido = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
}
</script>
