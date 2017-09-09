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

        <ul class="weekdays">
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
            <li>Su</li>
        </ul>

        <ul class="days"> 
            <li v-for="d in days" v-bind:class="{innactive: d.isInnactive}">
                {{d.date}}
            </li>
        </ul>
    </div>
</template>

<script>
 let getCal =  (date) => {
     let d = new Date(date),
         locale = "en-us",
         month = d.toLocaleString(locale, { month: "long" }),
         year = d.getFullYear();

     let    m = d.getMonth(),
            days = [];

     d.setDate(1);
     let when = d.getDay() - 1;
     if (when < 0){
         when = when + 7;
     }
     d.setDate(1 - when);
     while(d.getMonth() !== (m + 1) % 12 || d.getDay() !== 1){
         days.push({date: d.getDate(), isInnactive: d.getMonth() !== m});
         d.setDate(d.getDate() + 1);
     }

     return {
         month: month,
         year: year,
         days: days
     }
 }
 
 export default {
     name: 'calendar',
     
     data () {
         let d = new Date(),
             cal = getCal(d);
         
         return {
             state: d,
             month: cal.month,
             year: cal.year,
             days: cal.days
         }
     },

     methods: {
         prevMonth: function () {
             this.state.setMonth(this.state.getMonth() - 1);
             let cal = getCal(this.state);
             this.month = cal.month;
             this.year = cal.year;
             this.days = cal.days;
         },
         
         nextMonth: function () {
             this.state.setMonth(this.state.getMonth() + 1);
             let cal = getCal(this.state);
             this.month = cal.month;
             this.year = cal.year;
             this.days = cal.days;
         }
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 $header-background-color: #1abc9c;
 
 ul {list-style-type: none;}
 body {font-family: Verdana, sans-serif;}

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
     width: 13.6%;
     color: #666;
     text-align: center;
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
     width: 13.6%;
     text-align: center;
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
</style>
