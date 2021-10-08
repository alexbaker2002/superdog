/** Alex Baker 2021 
 * Created at Coder Foundry Bootcamp
 * 
 * Basic Website Template for showing challenges on Portfolio
 * 
 * Javascript 
 * 
 * 
 * 
 * ///
 * tableTemplate -- 5 table rows no headers
 * 
 * //sweet alert
 * Swal.fire(msg);
 */

var events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
]


// builds the dropdown of distinct cities
function buildDropDown() {

    let eventDD = document.getElementById("eventDropDown");
    //clear the dropdown box
    eventDD.innerHTML = "";
    let ddTemplate = document.getElementById("city-DD-template");

    let curEvents = events;
    // get unique values from array
    let distinctEvents = [...new Set(curEvents.map((e) => e.city))];
    // grabs and copies the node of the template for editing
    let ddItemNode = document.importNode(ddTemplate.content, true);
    // selecting the a tag from the template for use
    let ddItem = ddItemNode.querySelector("a");
    // adds data-string to a tag so we can write to the element properties 
    ddItem.setAttribute("data-string", "All"); // <li><a class="dropdow-item" **data-string="All"** onclick="getEvents(this)"></a></li>
    ddItem.textContent = "All"; // <li><a class="dropdow-item" data-string="All" onclick="getEvents(this)">**All**</a></li>
    // appended the list   
    eventDD.appendChild(ddItemNode);


    distinctEvents.forEach((city) => {
        ddItemNode = document.importNode(ddTemplate.content, true);
        ddItem = ddItemNode.querySelector("a");
        ddItem.setAttribute("data-string", city);
        ddItem.textContent = city;
        eventDD.appendChild(ddItemNode);

    })


}

function displayStats(filteredEvents) {
    // init var
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
// for events sent... grab each a sort out to the 4 vars
    filteredEvents.forEach((e) => {
        let currentAttendance = e.attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0 ) {
            least = currentAttendance;
        }
        average = total / filteredEvents.length;
    })
// send to html
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    // write as average
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits:0,
            maxFractionDigits:0
        }
    );
    document.getElementById("least").innerHTML = least.toLocaleString();
}





// get events for selected city
function getEvents(ddElement) {
    let cityName = ddElement.getAttribute("data-string");
    let filteredEvents = events;
    document.getElementById("statsHeader").innerHTML = `Stats for ${cityName} - `
// if  the city is selected to All filter all cities
    if (cityName != "All") {
        filteredEvents = events.filter((item) => {
            if (item.city == cityName) {
                return item;
            }
        })
    }
// call display stats
    displayStats(filteredEvents);
}