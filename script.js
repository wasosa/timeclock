// Trivial clock page

function pad(value)
{
    if (value < 10) {
        return "0" + value.toString();
    } else {
        return value.toString();
    }
}

function parseTime(date)
{
    let hours = date.getHours();
    let period;
    if (hours < 12) {
        period = "AM";
    } else {
        period = "PM";
    }
    if (hours == 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    return {
        hours12: pad(hours),
        hours24: pad(date.getHours()),
        minutes: pad(date.getMinutes()),
        seconds: pad(date.getSeconds()),
        period: period,
    }
}

function formatTime12(time, seconds)
{
    if (seconds) {
        return time.hours12 + ":" + time.minutes + ":" + time.seconds + " " + time.period;
    } else {
        return time.hours12 + ":" + time.minutes + " " + time.period;
    }
}

function formatTime24(time, seconds)
{
    if (seconds) {
        return time.hours24 + ":" + time.minutes + ":" + time.seconds;
    } else {
        return time.hours24 + ":" + time.minutes;
    }
}

function formatTime(time, format)
{
    if (format["hours"] == "12") {
        return formatTime12(time, format["seconds"])
    } else if (format["hours"] == "24") {
        return formatTime24(time, format["seconds"])
    } else {
        console.error("Unknown time format; defaulting to 12-hour format")
        return formatTime12(time, format["seconds"])
    }
}

function getTime(date, format)
{
    time = parseTime(date)
    return formatTime(time, format)
}

function getFormat()
{
    let hour_format = document.getElementsByName('hour_format');
    let second_format = document.getElementsByName('second_format');
    let seconds = second_format[0].checked;
    let hours;
    for (e of hour_format) {
        if (e.checked) {
            hours = e.value;
        }
    }
    return { hours: hours, seconds: seconds }
}

function main()
{
    let current_time = document.getElementById("current-time");
    setInterval(
        () => {
            current_time.innerHTML = getTime(new Date(), getFormat());
        },
        100
    );
}

// ---------- start of testing code ----------

function assert_equal(actual, expected)
{
    if (actual !== expected) {
        throw new Error(`\n\nExpected: ${expected}\n  Actual: ${actual}\n`)
    }
}

function test_getTime()
{
    for (params of [
        {
            date: new Date(0, 0, 0, 0, 0, 0),
            expected12: "12:00 AM",
            expected24: "00:00",
            expected12s: "12:00:00 AM",
            expected24s: "00:00:00",
        },
        {
            date: new Date(0, 0, 0, 1, 0, 0),
            expected12: "01:00 AM",
            expected24: "01:00",
            expected12s: "01:00:00 AM",
            expected24s: "01:00:00",
        },
        {
            date: new Date(0, 0, 0, 11, 0, 0),
            expected12: "11:00 AM",
            expected24: "11:00",
            expected12s: "11:00:00 AM",
            expected24s: "11:00:00",
        },
        {
            date: new Date(0, 0, 0, 12, 0, 0),
            expected12: "12:00 PM",
            expected24: "12:00",
            expected12s: "12:00:00 PM",
            expected24s: "12:00:00",
        },
        {
            date: new Date(0, 0, 0, 13, 0, 0),
            expected12: "01:00 PM",
            expected24: "13:00",
            expected12s: "01:00:00 PM",
            expected24s: "13:00:00",
        },
        {
            date: new Date(0, 0, 0, 23, 0, 0),
            expected12: "11:00 PM",
            expected24: "23:00",
            expected12s: "11:00:00 PM",
            expected24s: "23:00:00",
        },
    ]) {
        actual = getTime(params["date"], { hours: "12", seconds: false });
        assert_equal(actual, params["expected12"]);;
        actual = getTime(params["date"], { hours: "24", seconds: false });
        assert_equal(actual, params["expected24"]);;
        actual = getTime(params["date"], { hours: "12", seconds: true });
        assert_equal(actual, params["expected12s"]);;
        actual = getTime(params["date"], { hours: "24", seconds: true });
        assert_equal(actual, params["expected24s"]);;
    }
}

function test()
{
    // We are not running inside a browser!
    console.log("Not in the browser");
    console.log("Running tests!");

    test_getTime();
    console.log("All tests passed!");
}

// ---------- end of testing code ----------

if (typeof document === 'undefined') {
    test();
} else {
    main();
}
