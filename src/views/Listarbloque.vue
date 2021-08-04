<template>
<div>
    <v-container>
        <v-layout wrap>
            <v-flex sm8 mx-auto>
                <Listarbloquescomp></Listarbloquescomp>
            </v-flex>
        </v-layout>
    </v-container>

</div>
</template>

<script>
import Listarbloquescomp from '@/components/Listarbloquescomp.vue'
export default {
    data() {
        return {

        }
    },
    components: {

        Listarbloquescomp
    },
    methods: {

    }
}
</script>
