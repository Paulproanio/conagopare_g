<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex md8 mx-auto>
                <v-card>

                    <v-card-title class="primary white--text">
                        <v-icon left large color="white">supervisor_account</v-icon> Asignar
                    </v-card-title>
                    <v-card-title>
                        <v-btn class="primary" @click="crearrepresentantedialog=true">Representante <v-icon right size="25">people_alt</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-title class="primary white--text">
                        Fallecido
                    </v-card-title>
                    <v-card-text></v-card-text>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex class=" mt-1 sm10">
                                <v-text-field prepend-icon="pin" label="Cédula representante.." outlined filled v-model="cedulaRepresentanteFallecido">

                                </v-text-field>

                            </v-flex>
                            <v-flex class=" mt-1 sm2 mt-3">&nbsp;&nbsp;&nbsp;
                                <v-btn icon class="error">
                                    <v-icon color="white">check</v-icon>
                                </v-btn>
                            </v-flex>

                            <v-flex class=" mt-3 sm-12 sm12">
                                <v-text-field prepend-icon="person" type="text" label="Nombre fallecido.." outlined filled v-model="nombreFallecido"> </v-text-field>
                            </v-flex>

                            <v-flex class=" mt-3 sm-12 sm6">
                                <v-dialog ref="dialog" v-model="calendario" :return-value.sync="date" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field prepend-icon="event" outlined filled v-model="date" label="Fecha de fallecimiento" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" scrollable :first-day-of-week="1" locale="es">
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="calendario = false">
                                            Cancelar
                                        </v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)">
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>

                            </v-flex>
                            <v-flex class=" mt-3 sm-12 sm6">

                                <v-select prepend-icon="mdi-grave-stone" label="Número nicho.." outlined filled v-model="numnicho" item-text="idNicho" item-value="idNicho" :items="elementosNicho"></v-select>

                            </v-flex>
                        </v-layout>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-3" color="primary" @click="nuevoNichoFallecido">Asignar<v-icon right size="25" color="white">supervisor_account</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container>

        <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
        <form v-on:submit.prevent="nuevoRepresentante">
            <v-dialog v-model="crearrepresentantedialog" width="1200">

                <v-container>
                    <v-layout>
                        <v-flex sm8 mx-auto>
                            <v-card>
                                <v-card-title class="primary white--text">
                                    <v-icon left color="white" large>mdi-account-tie</v-icon>Representante
                                </v-card-title>
                                <v-card-subtitle>Todo fallecido debe ener un representante.</v-card-subtitle>
                                <v-card-text>
                                    <v-text-field prepend-icon="pin" label="Cédula identidad.." outlined filled v-model="cedulaRepresentante"></v-text-field>
                                    <v-text-field prepend-icon="assignment_ind" label="Nombre completo.." outlined filled v-model="nombreRepresentante"></v-text-field>
                                    <v-text-field prepend-icon="phone" label="Télefono fijo.." outlined filled v-model="telefonoFijoRepresentante"></v-text-field>
                                    <v-text-field prepend-icon="phone_in_talk" label="Télefono celular.." outlined filled v-model="telefonoCelRepresentante"></v-text-field>
                                    <v-textarea prepend-icon="import_contacts" outlined filled v-model="direccionRepresentante" name="input-7-4" label="Dirección.."></v-textarea>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="ml-3" color="primary" @click="nuevoRepresentante()">Guardar<v-icon right>save</v-icon>

                                    </v-btn>
                                    <v-btn class="ml-3" color="primary" @click="crearrepresentantedialog=false,cerrar()">Cancelar<v-icon right>clear</v-icon>

                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-flex>
                    </v-layout>
                </v-container>

            </v-dialog>

        </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR una ubicacion por qr-->
    </v-container>
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
import axios from 'axios'
export default {
    created() {
        axios.get('http://45.236.105.179:9000/api/conagopare/nicho')
            .then(res => {
                this.elementosNicho = res.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
    data() {
        return {
            numnicho: '',
            crearrepresentantedialog: false,
            textoRespuesta: '',
            respuesta: false,
            idRepresentante: '',
            cedulaRepresentante: '',
            nombreRepresentante: '',
            telefonoFijoRepresentante: '',
            telefonoCelRepresentante: '',
            direccionRepresentante: '',
            //////////////////////////
            cedulaRepresentanteFallecido: '',
            //////////////////////////////
            date: new Date().toISOString().substr(0, 10),
            calendario: false,
            fecha: '',
            ////////////////////////
            idFallecido: '',
            nombreFallecido: '',
            fechFallecimiento: this.date,

            idRepresentante: '',
            cedulaRepresentante: '',
            nombreRepresentante: '',
            telefonoFijoRepresentante: '',
            telefonoCelRepresentante: '',
            direccionRepresentante: '',

            idNicho: '',

            idBloque: '',
            descripcionBloque: '',

            idTipoNicho: '',
            descripcionTipoNicho: '',
            valorTipoNicho: '',

            idEstadoNicho: '',
            descripcionEstadoNicho: '',
            ////////////////////
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
    methods: {
        nuevoRepresentante() {

            if (this.cedulaRepresentante == '' || this.nombreRepresentante == '' || this.telefonoFijoRepresentante == '' || this.telefonoCelRepresentante == '' || this.direccionRepresentante == '') {

                alert("El campo no puede quedar vacío");
            } else {

                let json = {

                    idRepresentante: this.idRepresentante,
                    cedulaRepresentante: this.cedulaRepresentante,
                    nombreRepresentante: this.nombreRepresentante,
                    telefonoFijoRepresentante: this.telefonoFijoRepresentante,
                    telefonoCelRepresentante: this.telefonoCelRepresentante,
                    direccionRepresentante: this.direccionRepresentante,
                }
                axios.post('http://45.236.105.179:9000/api/conagopare/representante/', json)
                    .then(res => {
                        this.respuesta = true;
                        this.crearrepresentantedialog = false;
                        this.textoRespuesta = 'Representante guardado correctamante.';
                        this.cedulaRepresentanteFallecido = this.cedulaRepresentante;
                        this.idRepresentante = '';
                        this.cedulaRepresentante = '';
                        this.nombreRepresentante = '';
                        this.telefonoFijoRepresentante = '';
                        this.telefonoCelRepresentante = '';
                        this.direccionRepresentante = '';

                    })
                    .catch(err => {
                        console.error(err);
                    })

            }

        },
        cerrar() {
            this.idRepresentante = '';
            this.cedulaRepresentante = '';
            this.nombreRepresentante = '';
            this.telefonoFijoRepresentante = '';
            this.telefonoCelRepresentante = '';
            this.direccionRepresentante = '';
        },
        nuevoNichoFallecido() {

            let json = {

                idFallecido: '',
                nombreFallecido: this.nombreFallecido,
                fechFallecimiento: this.date,
                representante: {
                    idRepresentante: 1 ,
                    cedulaRepresentante: this.cedulaRepresentanteFallecido,
                    nombreRepresentante: '',
                    telefonoFijoRepresentante: '',
                    telefonoCelRepresentante: '',
                    direccionRepresentante: ''
                },
                nicho: {
                    idNicho: this.numnicho,
                    bloque: {
                        idBloque: '',
                        descripcionBloque: '',
                    },
                    tipoNicho: {
                        idTipoNicho: '',
                        descripcionTipoNicho: '',
                        valorTipoNicho: '',
                    },
                    estadoNicho: {
                        idEstadoNicho: '',
                        descripcionEstadoNicho: '',
                    }
                }

            }
          axios.post('http://45.236.105.179:9000/api/conagopare/fallecido/',json)
          .then(res => {
             
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
