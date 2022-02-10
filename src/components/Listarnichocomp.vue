<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text">Listar nichos</v-card-title>
                    <v-card-actions>
                        <v-layout wrap>
                            <v-flex sm3>
                                <v-btn class="ml-3" color="primary" @click="listarNicho(seleccioncementerio)">Listar<v-icon right>list</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex sm4>
                                <v-select prepend-icon="maps_home_work" outlined filled v-model="seleccioncementerio" item-text="nombreCementerio" item-value="idCementerio" label="Cementerio.." :items="elementosCementerio"></v-select>
                            </v-flex>
                            <v-flex sm1></v-flex>
                            <v-flex sm4>
                                <v-text-field label="Buscar.." v-model="search" outlined class="ml-3" prepend-icon="search"></v-text-field>
                            </v-flex>
                        </v-layout>

                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosNicho" :items="elementosNicho" :search="search">
                            <template v-slot:item="{ item }">
                                <tr>

                                    <td>{{item.bloque.descripcionBloque}}</td>
                                    <td>{{item.numeroNicho}}</td>
                                    <td> {{item.tipoNicho.descripcionTipoNicho}} </td>

                                    <td v-if="item.estadoNicho.descripcionEstadoNicho== 'Ocupado'">
                                        <v-chip color="red" class="white--text">{{item.estadoNicho.descripcionEstadoNicho}}</v-chip>
                                    </td>
                                    <td v-else>
                                        <v-chip color="primary" class="white--text">{{item.estadoNicho.descripcionEstadoNicho}}</v-chip>
                                    </td>

                                    <td>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark v-bind="attrs" v-on="on" @click="eliminarNicho(item.idNicho,item.bloque.descripcionBloque,item.numeroNicho)">
                                                    <v-icon color="error">delete</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Eliminar nicho</span>
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
    data() {
        return {
            seleccioncementerio: '',
            search: null,
            encabezadosNicho: [{
                    text: 'Bloque',
                    value: 'bloque.descripcionBloque'
                }, {
                    text: 'Número de Nicho',
                    value: 'numeroNicho'
                },

                {
                    text: 'Tipo nicho',
                    value: 'tipoNicho.descripcionTipoNicho'
                },
                {
                    text: 'Estado nicho',
                    value: 'estadoNicho.descripcionEstadoNicho'
                },
                {
                    text: 'Acciones',
                    value: ''
                },
            ],
            elementosNicho: [{
                idNicho: '',
                numeroNicho: '',
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
        axios.get('http://45.236.105.178:9000/api/conagopare/cementerio/')
            .then(res => {
                this.elementosCementerio = res.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
    methods: {
        listarNicho(a) {
            if (a == '') {
                this.$alert("Debe seleccionar el cementerio!");
            } else {

                axios.get('http://45.236.105.178:9000/api/conagopare/nicho/xidcem/' + a)
                    .then(res => {
                        // console.log(res)
                        this.elementosNicho = res.data;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
            //  console.log(a);

        },
        eliminarNicho(idNicho, descripcionBloque, numeroNicho) {

            //   console.log(descripcionBloque+ numeroNicho);
            let auxdescnicho = descripcionBloque + numeroNicho;
            axios.get('http://45.236.105.178:9000/api/conagopare/fallecido/bfxcn/' + auxdescnicho)
                .then(res => {
                  //  console.log()
                    if (res.data.length > 0) {
                       // console.log(res.data);
                        this.$alert("Este nicho esta ocupado por " + res.data[0].nombreFallecido);
                    } else {
                        axios.delete('http://45.236.105.178:9000/api/conagopare/nicho/' + idNicho)
                            .then(res => {
                                //console.log(res)
                                this.listarNicho();
                                this.$alert("Nicho eliminado con éxito!");

                            })
                            .catch(err => {
                                console.error(err);
                                this.$alert("Imposible eliminar este nicho.");
                            })
                    }
                })
                .catch(err => {
                    console.error(err);
                })

        }

    }
}
</script>
