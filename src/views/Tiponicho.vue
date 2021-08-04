<template>
    <div>
      <v-container grid-list-lg> 
          <v-layout>
              <v-flex sm8 mx-auto>
                 <Tiponichocomp></Tiponichocomp> 
              </v-flex>
          </v-layout>
      </v-container>
    </div>
</template>

<script>
import Tiponichocomp from '@/components/Tiponichocomp.vue'
export default {
    data() {
        return {
            
        };
    },components:{
        Tiponichocomp
    }
}
</script>