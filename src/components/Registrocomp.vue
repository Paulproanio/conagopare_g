<template>
<div>
    <v-container>
        <v-layout>
            <v-flex mx-auto sm6>
                <v-card>
                    <v-card-title class="primary white--text">
                      <v-icon left color="white" large>person_add_alt</v-icon>  Registro de usuarios
                    </v-card-title>
                    <v-card-subtitle>
                        En este se segistran los usuarios del sistema.
                    </v-card-subtitle>
                    <v-card-text>

                       
                        <v-text-field prepend-icon="person_add_alt" label="Nombre.." outlined filled v-model="nombreUsuario">

                        </v-text-field>
                        <v-text-field prepend-icon="alternate_email" label="Correo.." outlined filled v-model="correoUsuario">

                        </v-text-field>
                        <v-text-field prepend-icon="tty" label="Teléfono.." outlined filled v-model="telefonoUsuario">

                        </v-text-field>
                        <v-text-field prepend-icon="lock" label="Contraseña.." outlined filled v-model="contraseniaUsuario">

                        </v-text-field>
                         <v-select prepend-icon="mdi-home-city"  outlined filled v-model="seleccionado" item-text="nombreCementerio" item-value="idCementerio" label="Cementerio.." :items="elementosCementerio"></v-select>

                        <v-select  prepend-icon="mdi-account-details-outline" outlined filled v-model="seleccionado2" item-text="descripcionTipoUsuario" item-value="idTipoUsuario" label="Tipo de usuario.." :items="elementosTipoUsuario"></v-select>


                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="registrarUsuario(),dialog = false " color="primary">Registrar <v-icon right>person_add</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <!-- /////////////   /////////////// -->
      <template>
        <div>
            <v-snackbar v-model="respuesta" color="error">
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
import axios from "axios";
import {
    json
} from 'body-parser';

export default {
    created() {

        let api1,api2;

        api1 = 'http://45.236.105.178:9000/api/conagopare/cementerio/';
        api2 = 'http://45.236.105.178:9000/api/conagopare/tipoUsuario/';

        const requestOne = axios.get(api1);
        const requestTwo = axios.get(api2);

        axios.all([requestOne,requestTwo])
        .then(axios.spread((res1, res2)=>{
             this.elementosCementerio = res1.data;
             this.elementosTipoUsuario = res2.data;
        }))

    },
    data() {
        return {
            idUsuario: '',
            idTipoUsuario: '',
            idCementerio: '',
            nombreUsuario: '',
            correoUsuario: '',
            contraseñaUsuario: '',
            telefonoUsuario: '',
            ////////
            respuesta:false,
            textoRespuesta:'',
            /////////////////
            seleccionado: '',
            seleccionado2: '',


            elementosCementerio: [{
                nombreCementerio: '',
                parroquiaCementerio: '',
                direccionCementerio: '',
            }],

            elementosTipoUsuario: [{
                idTipoUsuario: '',
                descripcionTipoUsuario: ''
            }]

        }
    },
    components: {

    },
    methods: {

        registrarUsuario() {

            if (this.nombreUsuario == '' || this.correoUsuario == '' || this.contraseñaUsuario == '' || this.telefonoUsuario == '') {
                alert("Ningún campo puede quedar vacio!");

            } else {
                let json = {

                    idUsuario: 0,
                    nombreUsuario: this.nombreUsuario,
                    correoUsuario: this.correoUsuario,
                    contraseniaUsuario: this.contraseniaUsuario,
                    telefonoUsuario: this.telefonoUsuario,

                    tipoUsuario: {
                        idTipoUsuario: this.seleccionado2,
                    },
                    cementerio: {
                        idCementerio: this.seleccionado,
                    },

                }
                axios.post('http://45.236.105.178:9000/api/conagopare/usuario/', json)
                    .then(res => {
                          this.nombreUsuario='',
                     this.correoUsuario='',
                     this.contraseniaUsuario='',
                     this.telefonoUsuario='',
                     this.seleccionado2='',
                     this.seleccionado=''
                     this.respuesta=true;
                     this.textoRespuesta='Registro guardado correctamante';

                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },
        listarCementerios() {
            axios.get('http://45.236.105.178:9000/api/conagopare/cementerio')
                .then(res => {
                    this.elementosCementerio = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        listarTipoUsuario() {
            axios.get('http://45.236.105.178:9000/api/conagopare/tipoUsuario')
                .then(res => {
                    this.elementosCementerio = res.data;
                })
                .catch(err => {
                    console.error(err);
                })

        }

    }
}
</script>
