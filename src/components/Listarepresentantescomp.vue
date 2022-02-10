<template>
<div>
    <v-container>
        <v-layout>
            <v-flex sm10 mx-auto>
                <v-card>
                    <v-card-title class="primary white--text">Listado de Representantes</v-card-title>
                    <v-card-actions>
                        <v-layout wrap>
                            <v-flex sm2>

                            </v-flex>
                            <v-flex sm4>
                                <v-btn class="ml-3 mt-5" color="primary" @click="listarRepresentantes()">Listar<v-icon right>list_alt</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex sm5>
                                <v-text-field v-model="search" class="mt-5" append-icon="mdi-magnify" label="Buscar.." outlined filled ></v-text-field>
                            </v-flex>
                        </v-layout>

                    </v-card-actions>
                    <v-card-text>
                        <v-data-table :headers="encabezadosRepresentantes" :items="elementosRepresentantes" :search="search"></v-data-table>
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
            encabezadosRepresentantes: [{
                    text: 'Cédula',
                    value: 'cedulaRepresentante',
                    align: 'start',
                    sortable: false,
                },
                {
                    text: 'Nombre',
                    value: 'nombreRepresentante'
                },
                {
                    text: 'Teléfono Fijo',
                    value: 'telefonoFijoRepresentante'
                },
                {
                    text: 'Teléfono Celular',
                    value: 'telefonoCelRepresentante'
                },
                 {
                    text: 'Dirección',
                    value: 'direccionRepresentante'
                }
            ],
            elementosRepresentantes: [{
                idRepresentante: '',
                cedulaRepresentante: '',
                nombreRepresentante: '',
                telefonoFijoRepresentante: '',
                telefonoCelRepresentante: '',
                direccionRepresentante: '',
            }]
        }
    },
    methods: {
        listarRepresentantes() {
            axios.get('http://45.236.105.178:9000/api/conagopare/representante')
                .then(res => {
                    this.elementosRepresentantes = res.data;
                })
                .catch(err => {
                    console.error(err);
                })

        }
    }
}
</script>
