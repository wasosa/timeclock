// Trivial clock page

let current_time = document.getElementById("current-time");
let now = new Date();
current_time.innerHTML = now.getHours() + ":" + now.getMinutes();
