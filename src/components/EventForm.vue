<template>
    <div class="home">
        <form v-on:submit.prevent="onSubmit">
            <div class="header">
                <span class="title">New Event</span>
                <button type="submit" class="warning" v-if="updating">Update</button>
                <button type="submit" class="primary" v-else>Add</button>
                <button type="button" class="danger" @click="$emit('done')">Cancel</button>
            </div>
            <div class="form-group">
                <input name="title" type="text" placeholder="Title" v-model="event.name" class="form-control" required />
            </div>
            <div class="form-group">
                <textarea name="desc" placeholder="Description" v-model="event.desc" class="form-control" required>
                </textarea>
            </div>
            <div class="form-group">
                <input name="loc" type="text" placeholder="Location" v-model="event.loc" class="form-control" required />
            </div>
            <h3>Start</h3>
            <div class="row">
                <div class="col-xs-6">
                    <div class="form-group">
                        <label for="start_date">Date</label>
                        <input name="start_date" type="date" class="form-control"
                               id="start_date" :min="min_date" v-model="event.start_date" required />
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="form-group">
                        <label for="start_date">Time</label>
                        <input name="start_date" type="time" class="form-control"
                               id="start_date" :min="min_date" v-model="event.start_date" required />
                    </div>
                </div>
            </div>
            <h3>End</h3>
            <div class="form-group">
                <label for="end_date">End Date</label>
                <input name="end_date" type="datetime-local" class="form-control"
                       id="end_date" :min="event.start_date" v-model="event.end_date" required />
            </div>
            <h3>Participants</h3>
            <div class="participants-box" v-for="u in users">
                <label>
                    <input type="checkbox" :value="u"
                           v-model="event.participants" />
                    {{u}}
                </label>
            </div>
        </form>        
    </div>
</template>

<script>

 
 let tzOffset = (new Date()).getTimezoneOffset() * 60000,
     setupEvent = (user) => {
         return {name: '', desc: '', loc: '',
                 start_date: '', end_date: '', participants: [user],
                 tzOffset: tzOffset};
     };
 
 export default {
     name: 'event-form',
     props: ['events', 'users', 'user'],
     data () {
         let min_date = new Date(),
             time_string = min_date.toTimeString();
         time_string = time_string.slice(0, time_string.lastIndexOf(':'));
         min_date = min_date.toISOString().split('T')[0] + 'T' + time_string;
         
         return {
             event: setupEvent(this.user),
             min_date: min_date,
             updating: false,
         }
     },
     methods: {
         onSubmit(){
             if (this.updating){
                 this.onUpdate();
                 return;
             }
             this.events.push(this.event);
             this.event = setupEvent(this.user);
             this.$emit('done');
         },
         onEdit(index) {
             this.updating = true;
             this.updateIndex = index;
             this.event = this.events[index];
         },
         onUpdate(index) {
             this.updating = false;
             this.events[this.updateIndex] = this.event;
             this.event = setupEvent(this.user);
             this.$emit('done');
         },
         onDelete(index) {
             this.events.splice(index, 1);
         }
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import "../custom-style.scss"; 
 @import "../../node_modules/bootstrap/scss/bootstrap.scss";

 button {@extend .btn;}

 .primary {
     @extend .btn-primary;
 }

 .danger {
     @extend .btn-danger;
 }

 .success {
     @extend .btn-success;
 }

 .warning {
     @extend .btn-warning;
 }
 
 .home {
     margin: 5%;
 }

 .header {
     text-align: left;
 }
 
 .header .title {
     font-size: 36px;
 }
 
 .header button {
     float: right;
 }
 
 h1, h2 {
     font-weight: normal;
 }

 ul {
     list-style-type: none;
     padding: 0;
 }
 
 li {
     display: inline-block;
     margin: 0 10px;
 }
 
 a {
     color: #42b983;
 }

 .event .desc {
     text-align: left;
 }

 .participants-box{
     @extend .form-check;
     @extend .form-check-inline;
 }

 .participants-box label {
     @extend .form-check-label;
 }

 .participants-box input {
     @extend .form-check-input;
 }
</style>
