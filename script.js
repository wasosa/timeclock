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
    hours = pad(hours);
    let mins = pad(date.getMinutes());
    let secs = pad(date.getSeconds());
    return hours + ":" + mins + ":" + secs + " " + period;
}

function main()
{
    let current_time = document.getElementById("current-time");
    setInterval(
        () => {
            current_time.innerHTML = getTime(new Date());
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
            expected: "12:00:00 AM"
        },
        {
            date: new Date(0, 0, 0, 1, 0, 0),
            expected: "01:00:00 AM"
        },
        {
            date: new Date(0, 0, 0, 11, 0, 0),
            expected: "11:00:00 AM"
        },
        {
            date: new Date(0, 0, 0, 12, 0, 0),
            expected: "12:00:00 PM"
        },
        {
            date: new Date(0, 0, 0, 13, 0, 0),
            expected: "01:00:00 PM"
        },
        {
            date: new Date(0, 0, 0, 23, 0, 0),
            expected: "11:00:00 PM"
        },
    ]) {
        actual = getTime(params["date"]);
        assert_equal(actual, params["expected"]);;
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
