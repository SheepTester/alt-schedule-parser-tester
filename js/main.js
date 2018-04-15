const CalendarURL = "https://www.googleapis.com/calendar/v3/calendars/"
  + encodeURIComponent("u5mgb2vlddfj70d7frf3r015h0@group.calendar.google.com/events?singleEvents=true&fields=items(description,end(date,dateTime),start(date,dateTime),summary)&key=AIzaSyDBYs4DdIaTjYx5WDz6nfdEAftXuctZV0o");

let colContainer;

let alternates;

function regenColumns() {
  let columns = document.createDocumentFragment();
  alternates.forEach(alt => {
    let col = document.createElement("div");
    col.classList.add("column");
    ["date", "orig-title", "orig-string", "parsed"].forEach(cl => {
      let entry = document.createElement("div");
      entry.classList.add(cl);
      switch (cl) {
        case "date":
          // https://stackoverflow.com/questions/439630/how-do-you-create-a-javascript-date-object-with-a-set-timezone-without-using-a-s
          let date = new Date(alt.start.dateTime || alt.start.date);
          date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
          entry.textContent = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
          break;
        case "orig-title":
          entry.textContent = alt.summary;
          entry.title = alt.summary;
          break;
        case "orig-string":
          entry.textContent = alt.description;
          break;
        case "parsed":
          try {
            let schedule = parseAlternate(alt.summary, alt.description);
            if (schedule === null) {
              entry.classList.add("no-school");
              entry.textContent = "no school!";
            } else if (Array.isArray(schedule)) {
              schedule.forEach(p => {
                let period = document.createElement("div");
                period.classList.add("period");
                period.classList.add(p.period.replace(/[^a-z-]/gi, "") || "idk");
                period.textContent = p.period;
                entry.appendChild(period);
              });
            } else {
              entry.classList.add("debug");
              entry.textContent = schedule + "";
            }
          } catch (err) {
            entry.classList.add("error");
            entry.classList.add("debug");
            entry.textContent = err;
          }
          break;
      }
      col.appendChild(entry);
    });
    columns.appendChild(col);
  });
  colContainer.appendChild(columns);
}

function main() {
  colContainer = document.getElementById("container");

  Promise.resolve(localStorage.getItem("[gunn-web-app] test.rawAlts")).then(JSON.parse).then(json => {
    if (typeof json !== "object" || json === null) throw new Error("not an object!");
    alternates = json;
  }).catch(err => {
    localStorage.setItem("[gunn-web-app] test.rawAlts", "[]");
    alternates = [];
  }).then(regenColumns);

  document.getElementById("fetch").addEventListener("click", e => {
    Promise.all(times.slice(0, -1).map((timeMin, i) => get(CalendarURL + `&timeMin=${timeMin}&timeMax=${times[i + 1]}`).then(JSON.parse).catch(err => console.log("problem parsing JSON")))).then(function(events) {
      alternates = [].concat(...events.map(ev => ev.items)).filter(ev => /(schedule|extended|holiday|no\s*students|break)/i.test(ev.summary));
      localStorage.setItem("[gunn-web-app] test.rawAlts", JSON.stringify(alternates));
      regenColumns();
    }).catch(err => console.log(err));
  }, false);
}

document.addEventListener("DOMContentLoaded", main, false);
