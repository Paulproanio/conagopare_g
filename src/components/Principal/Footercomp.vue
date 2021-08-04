<template>
    <div>
        <v-container fluid >
             <template >
            <v-footer dark padless  >
                <v-card class="flex info" flat tile>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md8>
                            <v-card-title class="light-blue darken-4">
                                <strong class="subheading">Gobiernos Rurales!</strong>
                            </v-card-title>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs12 sm12 md4 light-blue darken-4>
                            <v-btn v-for="icon in icons" :key="icon" class="mx-4 " dark icon>
                                <v-icon size="24px">
                                    {{ icon }}
                                </v-icon>
                            </v-btn>
                        </v-flex>

                    </v-layout>

                    <v-card-text class="py-2 white--text text-center">
                        {{ new Date().getFullYear() }} — <strong>Conagopare Chimborazo &copy;</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </template>
        </v-container>
        
        
    </div>
</template>
<script>
export default {
    data() {
        return {
             icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }
    },
}
</script>