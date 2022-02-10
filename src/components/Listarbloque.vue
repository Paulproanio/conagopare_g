<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text"> Listado de Bloques</v-card-title>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="listarBloques()">
                            <v-icon right>list</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosBloques" :items="elementosBloques" dense>
                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{item.idBloque}}</td>
                                    <td>{{item.descripcionBloque}}</td>
                                    <td>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark v-bind="attrs" v-on="on" @click="eliminarBloque(item.idBloque)">
                                                    <v-icon color="error">delete</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Eliminar registro</span>
                                        </v-tooltip>
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
import VueSimpleAlert from "vue-simple-alert";
export default {
    name: 'ConagopareGListarbloque',

    data() {
        return {

            encabezadosBloques: [{
                    text: 'Id de Bloque',
                    value: 'idBloque'
                },
                {
                    text: 'Descripción Bloque',
                    value: 'descripcionBloque'
                },
                {
                    text: 'Acciones',
                    value: ''
                }

            ],
            elementosBloques: [{
                idBloque: '',
                descripcionBloque: '',

            }]
        };
    },

    mounted() {
        this.listarBloques();
    },

    methods: {
        listarBloques() {
            axios.get('http://45.236.105.178:9000/api/conagopare/bloque')
                .then(res => {
                    this.elementosBloques = res.data;
                    // console.log(res.data);
                    this.descripcionBloque = '';

                })
                .catch(err => {
                    console.error(err);
                })

        },
        eliminarBloque(idBloque) {
            axios.delete('http://45.236.105.178:9000/api/conagopare/bloque/' + idBloque)
                .then(res => {
                  
                    this.listarBloques();
                     this.$alert("Bloque eliminado correctamente.");
                })
                .catch(err => {
                    console.error(err);
                    this.$alert("Imposible eliminar este bloque, tiene una referencia hacia un nicho.");
                })
        }

    },
};
</script>
