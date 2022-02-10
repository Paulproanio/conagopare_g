<template>
<div>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text">
                        <v-icon left large color="white">payments</v-icon> Pagar
                    </v-card-title>
                    <v-card-title>
                        <v-layout>
                            <v-flex sm4>

                            </v-flex>
                            <v-flex>
                                <v-text-field outlined filled label="Cédula representante.." type="text" v-model="cedula">
                                </v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-btn class="primary ml-3 mt-3" @click="revisarRepresentante(cedula)">Buscar <v-icon right size="25">people_alt</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex sm3>

                            </v-flex>
                        </v-layout>

                    </v-card-title>
                    <v-card-title class="primary white--text">
                        Datos
                    </v-card-title>
                    <v-card-text></v-card-text>
                    <v-card-text>
                        <v-layout wrap>

                            <v-flex sm4>
                                <v-text-field outlined filled label="Cédula.." class="mr-5" disabled v-model="cedulaRepresentante"></v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field outlined filled label="Nombre representante.." class="mr-5" disabled v-model="nombreRepresentante"></v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field outlined filled label="Tel. celular.." class="mr-5" disabled v-model="telefonoCelRepresentante"></v-text-field>
                            </v-flex>
                        </v-layout>

                    </v-card-text>
                    <v-divider class="primary"></v-divider>
                    <v-card-text>
                        <v-data-table hide-default-footer :items="elementosFallecido" :headers="encabezadosFallecido">
                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{item.fechFallecimiento}}</td>
                                    <td>{{item.representante.nombreRepresentante}}</td>
                                    <td>{{item.nombreFallecido}}</td>
                                    <td>
                                        <div v-if="item.idFallecido != 0">
                                            <v-chip label color="yellow">{{item.codigoNicho}} </v-chip>
                                        </div>
                                    </td>
                                    <th>
                                        <div v-if="item.idFallecido != 0">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <!--<v-btn icon @click="pagonuevodialogo=true,obtenernumerodenicho(item.nicho.idNicho)">-->
                                                    <v-btn icon @click="revisarpago(item.codigoNicho),obtenernumerodenicho(item.codigoNicho)">
                                                        <v-icon size="30" color="success" v-bind="attrs" v-on="on">local_atm</v-icon>
                                                    </v-btn>

                                                </template>
                                                <span>Gestionar pago</span>
                                            </v-tooltip>

                                        </div>

                                    </th>
                                </tr>
                            </template>

                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container>

        <!-- PANTALLAS EMERGENTES DE DIALOGOS Y ENVIOS -->
        <form v-on:submit.prevent="pagonuevo">
            <v-dialog v-model="pagonuevodialogo" width="800">
                <v-container>
                    <v-layout>
                        <v-flex mx-auto>
                            <v-card>
                                <v-card-title class="primary white--text">
                                    <v-icon left color="white" large>mdi-account-tie</v-icon>Pago de Nicho
                                </v-card-title>
                                <v-card-subtitle>Valor que se va a pagar por el nicho.</v-card-subtitle>
                                <!--  <v-card-text>
                                    <v-text-field prepend-icon="pin" label="Cédula identidad.." outlined filled v-model="cedulaRepresentante"></v-text-field>
                                    <v-text-field prepend-icon="assignment_ind" label="Nombre completo.." outlined filled v-model="nombreRepresentante"></v-text-field>
                                    <v-text-field prepend-icon="phone" label="Télefono fijo.." outlined filled v-model="telefonoFijoRepresentante"></v-text-field>
                                    <v-text-field prepend-icon="phone_in_talk" label="Télefono celular.." outlined filled v-model="telefonoCelRepresentante"></v-text-field>
                                    <v-textarea prepend-icon="import_contacts" outlined filled v-model="direccionRepresentante" name="input-7-4" label="Dirección.."></v-textarea>
                                </v-card-text>-->
                                <!--  <v-card-text>
                                    <template>
                                        <v-layout wrap>

                                            <v-flex sm4 mx-auto>
                                                <v-text-field v-model="dateRangeText" label="Rango de fechas" prepend-icon="mdi-calendar" readonly></v-text-field>
                                            </v-flex>
                                            <v-flex sm12 class="mx-auto">
                                                <v-date-picker v-model="dates" range></v-date-picker>
                                            </v-flex>
                                        </v-layout>

                                    </template>

                                </v-card-text>-->
                                <v-card-text>
                                    <v-layout wrap>
                                        <v-flex sm2>

                                        </v-flex>

                                        <v-flex sm4>
                                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field outlined filled v-model="dateRangeText" label="Rango de fechas" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="dates" scrollable :first-day-of-week="1" locale="es" range>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="modal = false">
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn text color="primary" @click="$refs.dialog.save(date)">
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-flex>
                                        <v-flex sm4>
                                            <v-text-field v-model="valor" type="number" prepend-icon="attach_money" label="Valor.." outlined filled>

                                            </v-text-field>
                                        </v-flex>
                                        <v-flex sm2>

                                        </v-flex>
                                    </v-layout>

                                </v-card-text>

                                <v-card-actions>
                                    <v-btn @click="ss(dates)">FF</v-btn>
                                    <v-btn class="ml-3" color="primary" @click="realizarPago(dateRangeText,valor)">Pagar<v-icon right>save</v-icon>

                                    </v-btn>
                                    <v-btn class="ml-3" color="primary" @click="mostrardialogo(2),cancelareldialogo()">Cancelar<v-icon right>clear</v-icon>

                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-flex>
                    </v-layout>
                </v-container>
            </v-dialog>
        </form><!-- FIN PANTALLA EMERGENETE PARA INGRESAR una ubicacion por qr-->
    </v-container>
    <v-container>
        <v-snackbar v-model="confirmacion">
            {{ mensajedeconfirmacion }}

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = confirmacion">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            cedula: '',
            cedulaRepresentante: '',
            nombreRepresentante: '',
            telefonoFijoRepresentante: '',
            telefonoCelRepresentante: '',
            direccionRepresentante: '',
            pagonuevodialogo: false,
            auxCodNicho: '',
            /////////////////////////////
            numerodenicho: false,
            mensajedeconfirmacion: '',
            /////////////////////////////
            confirmacion: '',
            /////////////////////////////
            date: new Date().toISOString().substr(0, 10),
            modal: false,
            ////////////////////////////
            dates: [],
            /////////////////////////////
            valor: '',
            ////////////////////////
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
                }
            ],
            elementosRepresentante: [{
                idRepresentante: '',
                cedulaRepresentante: '',
                nombreRepresentante: '',
                telefonoFijoRepresentante: '',
                telefonoCelRepresentante: '',
                direccionRepresentante: '',
            }],
            encabezadosFallecido: [{
                    text: 'Fecha Fallecimiento',
                    value: 'fechFallecimiento'
                },
                {
                    text: 'Representante',
                    value: 'representante.nombreRepresentante'
                },
                {
                    text: 'Fallecido',
                    value: 'nombreFallecido'
                },
                {
                    text: 'N° nicho.',
                    value: 'nicho.idNicho'
                },
                {
                    text: 'Acciones',
                    value: '/'
                },

            ],
            elementosFallecido: [{
                idFallecido: '',
                nombreFallecido: '',
                fechFallecimiento: '',
                representante: {
                    idRepresentante: '',
                    cedulaRepresentante: '',
                    nombreRepresentante: '',
                    telefonoFijoRepresentante: '',
                    telefonoCelRepresentante: '',
                    direccionRepresentante: '',
                },
                codigoNicho: '',

            }]

        };
    },
    methods: {
        revisarRepresentante(a) {
            if (a == '') {

                this.$alert("Campo no puede estar vacío.");
            } else {
                axios.get('http://45.236.105.178:9000/api/conagopare/representante/findbycedulaRepresentante/' + a)
                    .then(res => {
                        // console.log(res.data.length)
                        if (res.data.length == 1) {
                            this.elementosRepresentante = res.data;
                            // console.log(res.data);
                            // console.log(res.data[0].cedulaRepresentante);
                            // console.log(res.data[0].nombreRepresentante);
                            // console.log(res.data[0].telefonoFijoRepresentante);
                            // console.log(res.data[0].telefonoCelRepresentante);
                            // console.log(res.data[0].direccionRepresentante);
                            this.idRepresentante = res.data[0].idRepresentante;
                            this.cedulaRepresentante = res.data[0].cedulaRepresentante;
                            this.nombreRepresentante = res.data[0].nombreRepresentante;
                            this.telefonoCelRepresentante = res.data[0].telefonoCelRepresentante;
                            this.listaFallecimientos(a);

                        } else {
                            alert("El representante no existe.");
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },
        listaFallecimientos(a) {
            axios.get('http://45.236.105.178:9000/api/conagopare/fallecido/nicdeunrep/' + a)
                .then(res => {
                    // console.log(res.data);
                    this.elementosFallecido = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        ss(a) {
            console.log(a);
        },
        cancelareldialogo() {
            this.dates = [];
            this.valor = '';
        },
        mostrardialogo(a) {
            if (a == 1) {
                this.pagonuevodialogo = true;
            }
            if (a == 2) {
                this.pagonuevodialogo = false;
            }

        },
        revisarpago(a) {
            // console.log(a); //A3

            axios.get('http://45.236.105.178:9000/api/conagopare/nicho')
                .then(res => {

                    let bandera = false;
                    let contador = 0;
                    while (bandera != true) {
                        let auxNicho = res.data[contador].bloque.descripcionBloque + res.data[contador].numeroNicho;
                        if (auxNicho == a) {
                            // console.log("Existe");
                            //  this.mostrardialogo(1);
                            //  console.log(res.data[contador].idNicho);
                            this.auxCodNicho = res.data[contador].idNicho;
                            bandera = true;
                            //   console.log(contador);
                        }

                        contador++;
                    }

                    if (bandera) {
                        axios.get('http://45.236.105.178:9000/api/conagopare/pago/xidnic/' + this.auxCodNicho)
                            .then(res => {

                                // console.log(res.data);
                                if (res.data.length == 0) {
                                    //  this.obtenernumerodenicho();
                                    this.mostrardialogo(1);
                                }
                                if (res.data.length > 0) {
                                    this.$alert("Ya existe un pago sobre este nicho.");
                                }
                            })
                            .catch(err => {
                                if (err) {
                                    this.$alert("Ya existe un pago sobre este nicho.");
                                }
                            })
                    }
                    /*  for (let index = 0; index < res.data.length; index++) {
                       //   console.log(res.data[index].bloque.descripcionBloque + res.data[index].numeroNicho);
                          let auxNicho = res.data[index].bloque.descripcionBloque + res.data[index].numeroNicho;
                          if (auxNicho == a) {
                             // console.log("Existe");
                              //  this.mostrardialogo(1);
                                console.log(res.data[index].idNicho);
                          }

                      }*/
                })
                .catch(err => {
                    console.error(err);
                })

            /*  axios.get('http://45.236.105.178:9000/api/conagopare/pago/xidnic/' + a)
                  .then(res => {

                      // console.log(res.data);
                      if (res.data.length == 0) {
                          //  this.obtenernumerodenicho();

                          this.mostrardialogo(1);

                      }

                      if (res.data.length > 0) {
                          alert("Ya existe un pago sobre este nicho.");

                      }
                  })
                  .catch(err => {
                      if (err) {
                          alert("Ya existe un pago sobre este nicho.");

                      }
                  })*/

        },

        realizarPago(a, b) {
            let u = (a.substring(0, 10));
            let v = (a.substring(13, 23));

            // console.log(u);
            // console.log(v);
            console.log(b);
            //   console.log(this.numerodenicho);
            let json = {
                idPago: '',
                valorPago: b,
                fechaPago: u,
                fechaValidez: v,
                nicho: {
                    idNicho: this.auxCodNicho,
                },
                estadoPago: {
                    idEstadoPago: 1,
                },
                idTipoRegistroPago: '',

            }
            //  console.log(json);
            axios.post('http://45.236.105.178:9000/api/conagopare/pago/', json)
                .then(res => {
                    //  console.log(res)
                    this.mostrardialogo(2);
                    // this.mensajedeconfirmacion = "Pago guardado correctamante";
                    // this.confirmacion = true;
                    this.$alert("Pago guardado correctamante");

                })
                .catch(err => {
                    console.error(err);
                })

        },
        obtenernumerodenicho(n) {
            this.numerodenicho = n;
            // console.log(this.numerodenicho);
        }

    },
    computed: {
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
    },

}
</script>
