<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text">
                        <v-icon color="white" large left>grid_view</v-icon> Registro de Bloque
                    </v-card-title>
                    <v-card-subtitle>Sectores en los que se divide el cementerio.</v-card-subtitle>
                    <v-card-text>
                        <v-text-field prepend-icon="grid_view" label="Descripcion bloque.." outlined filled v-model="descripcionBloque"></v-text-field>
                        <!--  <v-select prepend-icon="mdi-home-city" outlined filled v-model="seleccionado" item-text="nombreCementerio" item-value="idCementerio" label="Cementerio.." :items="elementosCementerio"></v-select>-->
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="nuevoBloque(descripcionBloque)">Guardar<v-icon right>save</v-icon>
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <!-- <v-container>
        <v-layout wrap>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text" > Listado de Bloques</v-card-title>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="listarBloques()"> <v-icon right>list</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosBloques" :items="elementosBloques" dense></v-data-table>
                    </v-card-text>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>-->

    <template>
        <div>
            <v-snackbar v-model="respuesta" color="primary">
                {{ textoRespuesta }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="white" text v-bind="attrs" @click="respuesta = false">
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </template>
</div>
</template>

<script>
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert";
export default {
    created() {

    },
    data() {
        return {
            idBloque: '',
            descripcionBloque: '',
            respuesta: false,
            textoRespuesta: '',

            encabezadosBloque: [{
                    text: 'Id',
                    value: 'idBloque'
                },
                {
                    text: 'Nombre',
                    value: 'nombreBloque'
                }

            ],
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

        nuevoBloque(descripcionBloque) {

            if (descripcionBloque == '') {
                alert("Registro no válido");
                this.descripcionBloque = '';
            } else {

                axios.get('http://45.236.105.178:9000/api/conagopare/bloque/lbxdescb/' + descripcionBloque.toUpperCase())
                    .then(res => {
                        //console.log(res.data);
                        if (res.data.length > 0) {

                            this.$alert("El bloque " + descripcionBloque.toUpperCase() + " ya existe!");

                        } else {

                            let json = {
                                idBloque: this.idBloque,
                                descripcionBloque: this.descripcionBloque.toUpperCase(),

                            }

                            //     console.log(json);

                            axios.post('http://45.236.105.178:9000/api/conagopare/bloque/', json)
                                .then(res => {
                                    //  console.log(res);
                                    // this.respuesta = true;
                                    // this.textoRespuesta = 'Bloque guardado correctamante';
                                    this.descripcionBloque = '';
                                    this.seleccionado = '';
                                    this.$alert("Bloque guardado con éxito!");
                                    // this.listarBloques();

                                })
                                .catch(err => {
                                    console.error(err);
                                })
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })

            }

        },
        /*  listarBloques() {
            axios.get('http://45.236.105.178:9000/api/conagopare/bloque')
            .then(res => {
                this.elementosBloques= res.data;
               // console.log(res.data);
               this.descripcionBloque = '';

            })
            .catch(err => {
                console.error(err); 
            })

        },*/

    },

}
</script>
