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
                                <v-text-field :disabled="!var_desabilitadora" prepend-icon="pin" label="Cédula representante.." outlined filled v-model="cedulaRepresentanteFallecido">

                                </v-text-field>

                            </v-flex>
                            <v-flex class=" mt-1 sm2 mt-3">&nbsp;&nbsp;&nbsp;

                                <v-btn icon class="primary" :disabled="interuptorboton">
                                    <v-icon :color="botoncolor" @click="revisarRepresentante(cedulaRepresentanteFallecido)">{{a}}</v-icon>
                                </v-btn>

                            </v-flex>
                            <v-layout wrap>
                                <v-flex sm12>
                                    <v-text-field disabled v-model="nombrederepresentante" prepend-icon="assignment_ind" outlined filled></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-flex class=" mt-3 sm-12 sm12">
                                <v-text-field prepend-icon="person" :disabled="var_desabilitadora" type="text" label="Nombre fallecido.." outlined filled v-model="nombreFallecido"> </v-text-field>
                            </v-flex>

                            <v-flex class=" mt-3 sm-12 sm12">
                                <v-dialog ref="dialog" v-model="calendario" :return-value.sync="date" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :disabled="var_desabilitadora" prepend-icon="event" outlined filled v-model="date" label="Fecha de fallecimiento" readonly v-bind="attrs" v-on="on"></v-text-field>
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
                            <v-flex class=" mt-3 sm-12 sm9">

                                <v-select :disabled="var_desabilitadora" prepend-icon="mdi-grave-stone" label="Bloque.." outlined filled v-model="numbloque" item-text="descripcionBloque" item-value="idBloque" :items="elementosBloque"></v-select>

                            </v-flex>
                            <v-flex sm3 mt-2>
                                <v-btn icon class="primary mt-3 ml-5" @click="mostrarNichosdebloque(numbloque)">
                                    <v-icon color="white">check</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex class=" mt-3 sm-12 sm12">

                                <v-select :disabled="var_desabilitadoraNicho" prepend-icon="mdi-grave-stone" label="Número nicho.." outlined filled v-model="numnicho" item-text="numeroNicho" item-value="numeroNicho" :items="elementosNicho2"></v-select>

                            </v-flex>
                        </v-layout>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn :disabled="var_desabilitadora" class="ml-3" color="primary" @click="nuevoNichoFallecido(nombreFallecido,date,numbloque,numnicho)">Asignar<v-icon right size="25" color="white">supervisor_account</v-icon>
                        </v-btn>
                        <v-btn :disabled="var_desabilitadora" class="ml-3" color="primary" @click="limpiarformulario">Limpiar <v-icon>cleaning_services</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container>

        <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
        <form v-on:submit.prevent="nuevoRepresentante">
            <v-dialog v-model="crearrepresentantedialog" width="800">

                <v-container>
                    <v-layout>
                        <v-flex sm10 mx-auto>
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
import VueSimpleAlert from "vue-simple-alert";
export default {
    created() {
        /*  axios.get('http://45.236.105.178:9000/api/conagopare/nicho/xidesnicho/2')
              .then(res => {
                  this.elementosNicho2 = res.data;
              })
              .catch(err => {
                  console.error(err);
              }),*/
        this.listarBloques();
    },
    data() {
        return {
            numnicho: '',
            numbloque: '',
            crearrepresentantedialog: false,
            textoRespuesta: '',
            respuesta: false,
            idRepresentante: '',
            cedulaRepresentante: '',
            nombreRepresentante: '',
            telefonoFijoRepresentante: '',
            telefonoCelRepresentante: '',
            direccionRepresentante: '',
            descBloqAux: '',
            idBloAux: '',
            //////////////////////////
            botoncolor: 'error',
            ///////////////////////
            interuptorboton: false,
            ///////////////////////
            a: 'remove_done',
            ///////////////////////
            cedulaRepresentanteFallecido: '',
            //////////////////////////////
            nombrederepresentante: '',
            /////////////////////////////////
            var_desabilitadora: true,
            var_desabilitadoraNicho: true,
            ////////////////////////////////
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
            }, ],
            elementosRepresentante: [{
                idRepresentante: '',
                cedulaRepresentante: '',
                nombreRepresentante: '',
                telefonoFijoRepresentante: '',
                telefonoCelRepresentante: '',
                direccionRepresentante: ''
            }],
            ////////////////////
            elementosNicho2: [{
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
                },
                cementerio: {
                    idCementerio: '',
                    nombreCementerio: '',
                    parroquiaCementerio: '',
                    direccionCementerio: ''
                },
                numeroNicho: '',
            }, ],
            elementosRepresentante: [{
                idRepresentante: '',
                cedulaRepresentante: '',
                nombreRepresentante: '',
                telefonoFijoRepresentante: '',
                telefonoCelRepresentante: '',
                direccionRepresentante: ''
            }],
            elementosBloque: [{
                idBloque: '',
                descripcionBloque: ''
            }],
            elementosNichoGuardar: [{
                "idNicho": '',
                "bloque": {
                    "idBloque": '',
                    "descripcionBloque": '',
                },
                "tipoNicho": {
                    "idTipoNicho": '',
                },
                "estadoNicho": {
                    "idEstadoNicho": '',

                },
                "cementerio": {
                    "idCementerio": '',
                },
                "numeroNicho": '',
            }]

        };
    },
    methods: {
        nuevoRepresentante() {

            if (this.cedulaRepresentante == '' || this.nombreRepresentante == '' || this.telefonoFijoRepresentante == '' || this.telefonoCelRepresentante == '' || this.direccionRepresentante == '') {

                alert("El campo no puede quedar vacío");
            } else {

                //    if (a == '') {
                //      alert("Campo no puede estar vacío.");
                // } else {
                axios.get('http://45.236.105.178:9000/api/conagopare/representante/findbycedulaRepresentante/' + this.cedulaRepresentante)
                    .then(res => {
                        //   console.log(res.data.length)
                        if (res.data.length > 0) {
                            this.$alert("Ya existe un representante con cédula " + this.cedulaRepresentante + " .");

                        } else {
                            let json = {

                                idRepresentante: this.idRepresentante,
                                cedulaRepresentante: this.cedulaRepresentante,
                                nombreRepresentante: this.nombreRepresentante,
                                telefonoFijoRepresentante: this.telefonoFijoRepresentante,
                                telefonoCelRepresentante: this.telefonoCelRepresentante,
                                direccionRepresentante: this.direccionRepresentante,
                            }
                            axios.post('http://45.236.105.178:9000/api/conagopare/representante/', json)
                                .then(res => {
                                    /// this.respuesta = true;
                                    this.crearrepresentantedialog = false;
                                    this.$alert('Representante guardado correctamante.');
                                    //   this.textoRespuesta = 'Representante guardado correctamante.';
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
                    })
                    .catch(err => {
                        console.error(err);
                    })
                //   }
                /////////////////////////////////////////////////////////////////////////////

                /*  */

            }

        },
        limpiarformulario() {
            this.cedulaRepresentanteFallecido = '';
            this.nombrederepresentante = '';
            this.botoncolor = 'error';
            this.a = 'remove_done';
            this.nombreFallecido = '';
            this.var_desabilitadora = true;
            this.numbloque = '';
            this.numnicho = '';
        },
        cerrar() {
            this.idRepresentante = '';
            this.cedulaRepresentante = '';
            this.nombreRepresentante = '';
            this.telefonoFijoRepresentante = '';
            this.telefonoCelRepresentante = '';
            this.direccionRepresentante = '';
            this.descBloqAux = '';
            this.idBloAux = '';
        },
        async nuevoNichoFallecido(a, b, d, c) {
            //   console.log(a);
            //   console.log(b);
            // console.log(d);
            // console.log(c);
            if (a == '' || b == '' || c == '' || d == '') {
                alert("Los campos no deben quedar vacíos.");

            } else {

                /*   let api1, api2;
                   api1 = 'http://45.236.105.178:9000/api/conagopare/bloque/' + d;
                   api2 = 'http://45.236.105.178:12590/api/conagopare/nicho/xnn/' + c;

                   const requestOne = await axios.get(api1);
                   const requestTwo = await axios.get(api2);

                   axios.all([requestOne, requestTwo])
                       .then(axios.spread((res1, res2) => {

                           this.descBloqAux = res1.data.descripcionBloque;
                           this.idBloAux = res1.data.idBloque;

                           for (let index = 0; index < res2.data.length; index++) {
                               if (res2.data[index].bloque.idBloque == this.idBloAux) {
                                   console.log(res2.data[index].idNicho);
                                   this.idNichoAux = res2.data[index].idNicho;
                               }

                           }

                       }))*/

                /////////////////////////////////////////////////////

                await axios.get('http://45.236.105.178:9000/api/conagopare/bloque/' + d)
                    .then(res => {
                        this.descBloqAux = res.data.descripcionBloque;
                        this.idBloAux = res.data.idBloque;
                    })
                    .catch(err => {
                        console.error(err);
                    })

                await axios.get('http://45.236.105.178:9000/api/conagopare/nicho/xnn/' + c)
                    .then(res => {

                        //  console.log(res.data);
                        for (let index = 0; index < res.data.length; index++) {

                            if (res.data[index].bloque.idBloque == this.idBloAux) {
                                //  console.log(res.data[index].idNicho);
                                this.idNichoAux = res.data[index].idNicho;
                            }

                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })

                // console.log(this.idNichoAux);

                let json = {

                    idFallecido: '',
                    nombreFallecido: this.nombreFallecido,
                    fechFallecimiento: this.date,
                    representante: {
                        idRepresentante: this.idRepresentante,
                        cedulaRepresentante: this.cedulaRepresentanteFallecido,
                        nombreRepresentante: '',
                        telefonoFijoRepresentante: '',
                        telefonoCelRepresentante: '',
                        direccionRepresentante: ''
                    },
                    codigoNicho: this.descBloqAux + c,
                    nicho: {
                        idNicho: this.idNichoAux,
                    }
                }
                console.log(json);
                await axios.post('http://45.236.105.178:9000/api/conagopare/fallecido/', json)
                    .then(res => {

                        //this.textoRespuesta = "Registro guardado correctamente."
                        //this.respuesta = true;
                        this.$alert('Registro guardado correctamante.');
                        this.ocuparnicho(c);
                        this.limpiarformulario();
                        this.actualizarnichos();
                        this.var_desabilitadoraNicho = true;
                    })
                    .catch(err => {
                        console.error(err);
                    })

                await axios.get('http://45.236.105.178:9000/api/conagopare/nicho/xnn/' + c)
                    .then(res => {
                        // console.log(res)
                        for (let index = 0; index < res.data.length; index++) {
                            if (res.data[index].bloque.idBloque == d) {
                                //  console.log(res.data[index])
                                //  res.data[index];

                                let json2 = {
                                    "idNicho": res.data[index].idNicho,
                                    "bloque": {
                                        "idBloque": res.data[index].bloque.idBloque,
                                    },
                                    "tipoNicho": {
                                        "idTipoNicho": res.data[index].tipoNicho.idTipoNicho,

                                    },
                                    "estadoNicho": {
                                        "idEstadoNicho": 1,
                                    },
                                    "cementerio": {
                                        "idCementerio": res.data[index].cementerio.idCementerio,
                                    },
                                    "numeroNicho": res.data[index].numeroNicho
                                }

                                axios.put('http://45.236.105.178:9000/api/conagopare/nicho/', json2)
                                    .then(res => {
                                        //   this.$alert('Ubicacion guardada correctamente.');
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    })

                            }

                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })

            }

        },
        actualizarnichos() {
            axios.get('http://45.236.105.178:9000/api/conagopare/nicho/xidesnicho/2')
                .then(res => {
                    this.elementosNicho2 = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        ocuparnicho(a) {

            if (a != '') {
                axios.get('http://45.236.105.178:9000/api/conagopare/nicho/' + a)
                    .then(res => {
                        this.elementosNicho = res.data;

                        let json = {
                            idNicho: this.elementosNicho.idNicho,
                            bloque: {
                                idBloque: this.elementosNicho.bloque.idBloque,
                                descripcionBloque: this.elementosNicho.bloque.descripcionBloque,
                            },
                            tipoNicho: {
                                idTipoNicho: this.elementosNicho.tipoNicho.idTipoNicho,
                                descripcionTipoNicho: this.elementosNicho.tipoNicho.descripcionTipoNicho,
                                valorTipoNicho: this.elementosNicho.tipoNicho.valorTipoNicho,
                            },
                            estadoNicho: {
                                idEstadoNicho: 1,
                            }
                        }
                        //  console.log(json);
                        axios.post('http://45.236.105.178:9000/api/conagopare/nicho/', json)
                            .then(res => {
                                // console.log(res)
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
        revisarRepresentante(a) {
            if (a == '') {
                alert("Campo no puede estar vacío.");
            } else {
                axios.get('http://45.236.105.178:9000/api/conagopare/representante/findbycedulaRepresentante/' + a)
                    .then(res => {
                        //   console.log(res.data.length)
                        if (res.data.length == 1) {
                            this.elementosRepresentante = res.data;
                            // console.log(res.data);
                            // console.log(res.data[0].cedulaRepresentante);
                            // console.log(res.data[0].nombreRepresentante);
                            // console.log(res.data[0].telefonoFijoRepresentante);
                            // console.log(res.data[0].telefonoCelRepresentante);
                            // console.log(res.data[0].direccionRepresentante);
                            this.idRepresentante = res.data[0].idRepresentante;
                            this.nombrederepresentante = res.data[0].nombreRepresentante;
                            this.var_desabilitadora = false;
                            this.botoncolor = 'white';
                            this.a = 'done_all';
                            // this.interuptorboton=true;
                            //  console.log(this.elementosRepresentante[0].cedulaRepresentante);

                        } else {
                            alert("El representante no existe.");
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },
        listarBloques() {
            axios.get('http://45.236.105.178:9000/api/conagopare/bloque')
                .then(res => {
                    this.elementosBloque = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        mostrarNichosdebloque(numbloque) {

            axios.get('http://45.236.105.178:9000/api/conagopare/nicho/lnxidb/' + numbloque)
                .then(res => {

                    if (res.data.length > 0) {
                        this.var_desabilitadoraNicho = false;
                        this.elementosNicho2 = res.data;
                    } else {
                        this.$alert("No existen nichos asociados a este bloque.");
                        this.var_desabilitadoraNicho = true;
                    }
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
