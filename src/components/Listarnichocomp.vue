<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text">Listar nichos</v-card-title>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="listarNicho()">Listar<v-icon right>list</v-icon>
                        </v-btn>
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
            }, ]

        };
    },
    mounted() {
        this.listarNicho();
    },
    methods: {
        listarNicho() {
            axios.get('http://45.236.105.179:9000/api/conagopare/nicho')
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
