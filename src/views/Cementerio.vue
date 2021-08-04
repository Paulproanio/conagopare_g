<template>
<div>

    <v-container >
        <v-layout wrap>
            <v-flex sm8 mx-auto>
                <Cementeriocomp></Cementeriocomp>
            </v-flex>
          
        </v-layout>
    </v-container>
 <Footercomp></Footercomp>
</div>
</template>

<script>
import Footercomp from '@/components/Principal/Footercomp.vue'
import Cementeriocomp from '@/components/Cementeriocomp.vue'
import Listarcementeriocomp from '../components/Listarcementeriocomp.vue'
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        Cementeriocomp,
        Listarcementeriocomp,
        Footercomp
    }
}
</script>