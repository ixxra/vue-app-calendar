<template>
    <div>
        <div class="month"> 
            <ul>
                <li class="prev"><button v-on:click="prevMonth">&#10094;</button></li>
                <li class="next"><button v-on:click="nextMonth">&#10095;</button></li>
                <li>
                    {{month}}<br>
                    <span style="font-size:18px">{{year}}</span>
                </li>
            </ul>
        </div>

        <ul class="weekdays cal-view">
            <li></li>
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
            <li>Su</li>
        </ul>

        <ul class="days cal-view">
            <template v-for="w in weeks">
                <li></li>
                <li v-for="d in w.days" v-bind:class="{innactive: d.isInnactive}" class="week-header">
                    {{d.date}}
                </li>
                <template v-for="u in w.users">
                    <li>{{u.name}}</li>
                    <li v-for="ev in u.events"></li>
                </template>
            </template>
        </ul>
    </div>
</template>

<script>
 let getCal =  (date, users, events) => {
     let d = new Date(date),
         locale = "en-us",
         month = d.toLocaleString(locale, { month: "long" }),
         year = d.getFullYear();

     let    m = d.getMonth(),
            days = [],
            weeks = [];
            //users = ["A", "B", "C"];

     d.setDate(1);
     let when = d.getDay() - 1;
     if (when < 0){
         when = when + 7;
     }
     d.setDate(1 - when);

     let count = 0;
     while(d.getMonth() !== (m + 1) % 12 || d.getDay() !== 1){
         if (count % 7 === 0){
             days = [];
             weeks.push({days: days});
         }
         days.push({date: d.getDate(), isInnactive: d.getMonth() !== m});
         d.setDate(d.getDate() + 1);
         count++;
     }

     weeks.forEach(w => {
         w.users = [];
         users.forEach(u => {
             let u_events = Array(7).fill(u);
             w.users.push({name: u, events: u_events});
         });
     });
     
     return {
         month: month,
         year: year,
         weeks: weeks
     }
 }
 
 export default {
     name: 'calendar',
     props: ['users', 'events'],
     data () {
         let d = new Date(),
             cal = getCal(d, this.users);

         return {
             state: d,
             month: cal.month,
             year: cal.year,
             weeks: cal.weeks
         }
     },

     methods: {
         prevMonth: function () {
             this.state.setMonth(this.state.getMonth() - 1);
             let cal = getCal(this.state, this.users, this.events);
             this.month = cal.month;
             this.year = cal.year;
             this.weeks = cal.weeks;
         },
         
         nextMonth: function () {
             this.state.setMonth(this.state.getMonth() + 1);
             let cal = getCal(this.state, this.users, this.events);
             this.month = cal.month;
             this.year = cal.year;
             this.weeks = cal.weeks;
         }
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 $header-background-color: #1abc9c;
 $cal-column-widht: 11.5%;
 
 ul {list-style-type: none;}
 body {font-family: Verdana, sans-serif;}

 .users-col{
     float:left;
 }

 .cal-view{

 }
 
 /* Month header */
 .month {
     padding: 70px 25px;
     width: 100%;
     background: $header-background-color;
     text-align: center;
 }

 /* Month list */
 .month ul {
     margin: 0;
     padding: 0;
 }

 .month ul li {
     color: white;
     font-size: 20px;
     text-transform: uppercase;
     letter-spacing: 3px;
 }

 /* Previous button inside month header */
 .month .prev {
     float: left;
     padding-top: 10px;
 }

 /* Next button */
 .month .next {
     float: right;
     padding-top: 10px;
 }

 .month .prev button,
 .month .next button {
     background-color: $header-background-color; 
     color: white;
     border: none;
 }

 /* Weekdays (Mon-Sun) */
 .weekdays {
     margin: 0;
     padding: 10px 0;
     background-color:#ddd;
 }

 .weekdays li {
     display: inline-block;
     width: $cal-column-widht;
     color: #666;
     text-align: right;
 }

 /* Days (1-31) */
 .days {
     padding: 10px 0;
     background: #eee;
     margin: 0;
 }

 .days li {
     list-style-type: none;
     display: inline-block;
     width: $cal-column-widht;
     text-align: right;
     margin-bottom: 5px;
     font-size:12px;
     color:#777;
 }

 /* Highlight the "current" day */
 .days li .active {
     padding: 5px;
     background: #1abc9c;
     color: white !important
 }

 .days li .innactive {
     padding: 5px;
     background: #dddddd;
     color: white !important
 }

 .week-header {
     background: #404a5b;
     color:white !important
 }
</style>
