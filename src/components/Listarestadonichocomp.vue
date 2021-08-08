<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="info white--text">Listado estado de nichos</v-card-title>
                    <v-card-actions>
                        <v-btn class="ml-3" color="info" @click="listarEstadoNicho()">Listar<v-icon right>list</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosEstadoNicho" :items="elementosEstadoNicho"></v-data-table>
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
            encabezadosEstadoNicho: [{
                    text: 'Id',
                    value: 'idEstadoNicho'
                },
                {
                    text: 'Descripción',
                    value: 'descripcionEstadoNicho'
                }
            ],
            elementosEstadoNicho: [{
                idEstadoNicho: '',
                descripcionEstadoNicho: ''
            }]
        };
    },
    mounted() {
        this.listarEstadoNicho();
    },
    methods: {
        listarEstadoNicho() {
            axios.get('http://45.236.105.179:9000/api/conagopare/estadoNicho')
                .then(res => {
                    this.elementosEstadoNicho = res.data;
                })
                .catch(err => {
                    console.error(err);
                })

        }
    }
}
</script>
