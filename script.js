// Trivial clock page

function pad(value)
{
    if (value < 10) {
        return "0" + value.toString();
    } else {
        return value.toString();
    }
}

function getTime(date)
{
    let hours = date.getHours();
    let period = "AM";
    if (hours > 12) {
        hours = hours - 12;
        period = "PM";
    }
    hours = pad(hours);
    let mins = pad(date.getMinutes());
    let secs = pad(date.getSeconds());
    return hours + ":" + mins + ":" + secs + " " + period;
}

let current_time = document.getElementById("current-time");
setInterval(
    () => {
        current_time.innerHTML = getTime(new Date());
    },
    100
);
