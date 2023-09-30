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
    let hours24 = date.getHours();
    let hours12 = hours24
    let period;
    if (hours12 < 12) {
        period = "AM";
    } else {
        period = "PM";
    }
    if (hours12 == 0) {
        hours12 = 12;
    }
    if (hours12 > 12) {
        hours12 = hours12 - 12;
    }
    return {
        hours12: pad(hours12),
        hours24: pad(hours24),
        minutes: pad(date.getMinutes()),
        seconds: pad(date.getSeconds()),
        period: period,
    }
}

function formatTime12(time)
{
    return time.hours12 + ":" + time.minutes + ":" + time.seconds + " " + time.period;
}

function formatTime24(time)
{
    return time.hours24 + ":" + time.minutes + ":" + time.seconds;
}

function formatTime(time, format)
{
    if (format["hours"] == 12) {
        return formatTime12(time)
    } else if (format["hours"] == 24) {
        return formatTime24(time)
    } else {
        console.error("Unknown time format; defaulting to 12-hour format")
        return formatTime12(time)
    }
}

function getTime(date, format)
{
    time = parseTime(date)
    return formatTime(time, format)
}

function main()
{
    let current_time = document.getElementById("current-time");
    let hours = document.currentScript.getAttribute("hours");
    setInterval(
        () => {
            current_time.innerHTML = getTime(new Date(), { hours: hours });
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
            expected12: "12:00:00 AM",
            expected24: "00:00:00",
        },
        {
            date: new Date(0, 0, 0, 1, 0, 0),
            expected12: "01:00:00 AM",
            expected24: "01:00:00",
        },
        {
            date: new Date(0, 0, 0, 11, 0, 0),
            expected12: "11:00:00 AM",
            expected24: "11:00:00",
        },
        {
            date: new Date(0, 0, 0, 12, 0, 0),
            expected12: "12:00:00 PM",
            expected24: "12:00:00",
        },
        {
            date: new Date(0, 0, 0, 13, 0, 0),
            expected12: "01:00:00 PM",
            expected24: "13:00:00",
        },
        {
            date: new Date(0, 0, 0, 23, 0, 0),
            expected12: "11:00:00 PM",
            expected24: "23:00:00",
        },
    ]) {
        actual = getTime(params["date"], { hours: 12 });
        assert_equal(actual, params["expected12"]);;
        actual = getTime(params["date"], { hours: 24 });
        assert_equal(actual, params["expected24"]);;
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
