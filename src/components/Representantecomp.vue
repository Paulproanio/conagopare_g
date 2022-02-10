<template>
<div>
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
                    </v-card-actions>
                </v-card>

            </v-flex>
        </v-layout>
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
    data() {
        return {
            textoRespuesta: '',
            respuesta: false,
            idRepresentante: '',
            cedulaRepresentante: '',
            nombreRepresentante: '',
            telefonoFijoRepresentante: '',
            telefonoCelRepresentante: '',
            direccionRepresentante: '',

        };
    },
    methods: {
        nuevoRepresentante() {

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
                                //  this.respuesta = true;
                                //  this.textoRespuesta = 'Representante guardado correctamante.';
                                this.$alert('Representante guardado correctamante.');
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

            /*   */
        }

    }
}
</script>
