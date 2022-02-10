<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex sm8 mx-auto>
                <Listarbloque></Listarbloque>
            </v-flex>
        </v-layout>
    </v-container>

</div>
</template>

<script>
import Listarbloque from '@/components/Listarbloque.vue'
export default {
    data() {
        return {

        }
    },
    components: {

        Listarbloque
    },
    methods: {

    }
}
</script>
