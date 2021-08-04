<template>
<div class="about">
    
    <Registrocomp> </Registrocomp>
     <Footercomp> </Footercomp>
   
</div>
</template>

<script>
import Registrocomp from '@/components/Registrocomp.vue'
import Footercomp from '@/components/Principal/Footercomp.vue'
export default {
    name: 'Registro',
    components: {
        Registrocomp,
        Footercomp
    },

    data() {
        return {

        }
    },
}
</script>
