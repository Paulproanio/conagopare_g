<template>
<div>
    <v-container>
        <v-layout>
            <v-flex sm8 mx-auto>
                <v-card>
                    <v-card-title class="primary white--text"> Listado de Cementerios</v-card-title>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="listarCementerios()">Listar<v-icon right>list</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosCementerio" :items="elementosCementerio"></v-data-table>
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
            nombreCementerio: '',
            parroquiaCementerio: '',
            direccionCementerio: '',

            encabezadosCementerio: [{
                    text: 'Id',
                    value: 'idCementerio'
                },
                {
                    text: 'Nombre',
                    value: 'nombreCementerio'
                },
                {
                    text: 'Parroquia',
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
    mounted() {
        this.listarCementerios();
    },
    methods: {

        listarCementerios() {
            axios.get('http://45.236.105.178:9000/api/conagopare/cementerio/')
                .then(res => {
                    this.elementosCementerio = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    components: {

    }
}
</script>
