<template>
<div>
    <v-container grid-list-lg>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title class="primary white--text"  >
                      <v-icon color="white" large left>grid_view</v-icon>   Registro de Bloque
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
          

        }
    },
    methods: {

        nuevoBloque(descripcionBloque) {

            if (descripcionBloque == '' ) {
                alert("Registro no válido");
                this.descripcionBloque = '';
            } else {
                let json = {
                    idBloque: this.idBloque,
                    descripcionBloque: this.descripcionBloque,
                    

                }

                //    console.log(json);

                axios.post('http://45.236.105.178:9000/api/conagopare/bloque/', json)
                    .then(res => {
                        //  console.log(res);
                        this.respuesta = true;
                        this.textoRespuesta = 'Bloque guardado correctamante';
                        this.descripcionBloque = '';
                        this.seleccionado= '';
                        

                    })
                    .catch(err => {
                        console.error(err);
                    })

            }

        }

    }
}
</script>
