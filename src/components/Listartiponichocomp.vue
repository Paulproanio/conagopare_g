<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text">Listar tipo de nichos</v-card-title>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="listarTipoNicho()">Listar<v-icon right>list</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosTipoNicho" :items="elementosTipoNicho"></v-data-table>
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
            encabezadosTipoNicho: [{
                    text: 'Id',
                    value: 'idTipoNicho'
                },
                {
                    text: 'Descripción',
                    value: 'descripcionTipoNicho'
                },
                {
                    text: 'Costo $',
                    value: 'valorTipoNicho'
                },
            ],
            elementosTipoNicho: [{
                idTipoNicho: '',
                descripcionTipoNicho: '',
                valorTipoNicho: ''
            }]
        };
    },
    mounted(){
        this.listarTipoNicho();
    },
    methods: {
        listarTipoNicho() {
            axios.get('http://45.236.105.179:9000/api/conagopare/tipoNicho')
                .then(res => {
                    this.elementosTipoNicho = res.data;
                })
                .catch(err => {
                    console.error(err);
                })

        }
    }
}
</script>
