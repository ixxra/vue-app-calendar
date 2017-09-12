users = ["A", "B", "C"];

events = [{
    name: "Evento1",
    start_date: (new Date()).toISOString(),
    end_date: (new Date(2017, 11, 10)).toISOString(),
    participants:["A", "C"]}];

getCal =  (date, users, events) => {
    let d = new Date(date),
        locale = "en-us",
        month = d.toLocaleString(locale, { month: "long" }),
        year = d.getFullYear();
    
    let m = d.getMonth(),
        days = [],
        weeks = [];

    d.setHours(0,0,0,0);
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
            week_events = [];
            weeks.push({days: days, events: week_events});
        }

        
        days.push({date: d.getDate(), isInnactive: d.getMonth() !== m});

        let day_events = [];
        week_events.push(day_events);
        
        events.forEach(ev => {
            let d1 = new Date(ev.start_date), d2 = new Date(ev.end_date);
            d1.setHours(0,0,0,0);
            d2.setHours(0,0,0,0);
            
            if (d1 <= d && d <= d2){
                day_events.push(ev);
            }
        });
        
        d.setDate(d.getDate() + 1);
        count++;
    };
    
    return {
        month: month,
        year: year,
        weeks: weeks,
    };
};
