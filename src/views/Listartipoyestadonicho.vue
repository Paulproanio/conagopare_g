<template>
<div>
    <v-container>

        <v-layout wrap>
            <v-flex sm6>
                <Listartiponichocomp></Listartiponichocomp>
            </v-flex>
             <v-flex sm6>
                <Listarestadonichocomp></Listarestadonichocomp>
            </v-flex>
        </v-layout>

    </v-container>

</div>
</template>

<script>
import Listartiponichocomp from '@/components/Listartiponichocomp.vue'
import Listarestadonichocomp from '@/components/Listarestadonichocomp.vue'
export default {
    data() {
        return {

        };
    },
    components: {
        Listartiponichocomp,
        Listarestadonichocomp
    }
}
</script>
