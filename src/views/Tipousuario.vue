<template>
<div>

    <v-card height="600">
        <Tipousuariocomp></Tipousuariocomp>
    </v-card>
    <Footercomp></Footercomp>
</div>
</template>

<script>
import Footercomp from '@/components/Principal/Footercomp.vue'
import Tipousuariocomp from '@/components/Tipousuariocomp'
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        Tipousuariocomp,
        Footercomp
    }
}
</script>
