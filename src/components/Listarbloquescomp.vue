<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text" > Listado de Bloques</v-card-title>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="listarBloques()"> Listar<v-icon right>list</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosBloques" :items="elementosBloques"></v-data-table>
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
            encabezadosBloques: [{
                    text: 'Id de Bloque',
                    value: 'idBloque'
                },
                {
                    text: 'Descripción Bloque',
                    value: 'descripcionBloque'
                }
                
            ],
            elementosBloques: [{
                idBloque: '',
                descripcionBloque: '',
               
            }]

        }
    },
    methods: {
        listarBloques() {
            axios.get('http://45.236.105.179:9000/api/conagopare/bloque')
            .then(res => {
                this.elementosBloques= res.data;
               // console.log(res.data);
               this.descripcionBloque = '';
               
            })
            .catch(err => {
                console.error(err); 
            })

        },
    },

}
</script>
