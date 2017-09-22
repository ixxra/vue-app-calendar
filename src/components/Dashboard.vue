<template>
    <div>
        <button class="btn btn-primary" @click="showModal=true">Agregar Evento</button>
        <calendar :users="users" :events="events"></calendar>
        <event-modal v-if="showModal" @close="showModal=false"
                     :users="users" :events="events" :user="user">
            
        </event-modal>
    </div>
</template>

<script>
 import Calendar from '@/components/Calendar'
 import EventModal from '@/components/EventModal'
 
 export default {
     name: 'dashboard',
     components: {Calendar, EventModal},
     props: ['users', 'events', 'user'],
     data () {
         return {
             showModal: false
         };
     }
 }
</script>

<style scoped lang="scss">
 
</style>
