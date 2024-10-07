import { fetchTempInfo, fetchWeeklyHourlyInfo } from './fetchAPI.js'
import { cityTextSet } from './cities.js';

// Graph Values
var xValues = [];
var yValues = [];

// Generating Graph
function generateGraph() {
    // Ensure the DOM is fully loaded before running the script
    document.addEventListener('DOMContentLoaded', async function () {

        // Replace with your OpenWeatherMap API key and city
        const city = 'Lahore'; // Replace with your city

        let data = await fetchWeeklyHourlyInfo(city)

        // Extract timestamps and temperatures from the API response
        const xValues = data.list.map(item => {
            const date = new Date(item.dt * 1000);
            return `${date.getHours()}:00`;
        });

        yValues = data.list.map(item => item.main.temp);
        // console.log(yValues)

        new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    fill: true, // This fills the area below the line
                    lineTension: 0.5, // Makes the line smooth
                    pointRadius: 0, // Removes the dots/points
                    borderWidth: 0,
                    borderColor: "rgba(255, 0, 0, 0.3)", // Line color (optional)
                    backgroundColor: "rgba(255, 0, 0, 0.3)", // Fill color below the line
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    fontSize: 16,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false // Disable grid lines for the x-axis
                        },
                        ticks: {
                            display: false // Disable numbers/labels on the x-axis
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false // Disable grid lines for the y-axis
                        },
                        ticks: {
                            display: false // Disable numbers/labels on the y-axis
                        }
                    }]
                }
            }
        });

    });

}

function sideBar() {

    let hamburgerIcon = document.getElementById('hamburger-icon')
    // console.log(hamburgerIcon)
    let sidebar = document.querySelector('.side-bar')
    // console.log(sidebar)

    hamburgerIcon.addEventListener("click", (e) => {
        e.stopPropagation()
        sidebar.classList.toggle('appear')
    })

    // Close sidebar when clicking outside of modal content
    window.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && event.target !== hamburgerIcon) {
            sidebar.classList.remove('appear');
            // console.log('Clicked')
        }
    });

}


function convertSecondsToDate(seconds) {
    // Create a new Date object using the seconds (multiplied by 1000 to convert to milliseconds)
    const date = new Date(seconds * 1000);

    // Format the date as a readable string
    const formattedDate = date.toLocaleString('en-US', {
        timeZone: 'Asia/Karachi',
        weekday: 'long',   // Day of the week
        year: 'numeric',   // Year
        month: 'long',     // Month
        day: 'numeric',    // Day of the month
        hour: '2-digit',   // Hours
        minute: '2-digit', // Minutes
        // second: '2-digit', // Seconds
        hour12: true       // Use 12-hour format
    });

    return formattedDate;
}


async function navbarSet() {
    // Function to fetch the weather information
    let information = await fetchTempInfo("Sheikhupura");
    // console.log(information);

    let currentTime = document.getElementById('currTime');
    let currentDate = document.getElementById('currDate');
    let currentYear = document.getElementById('year');
    let mdr = document.getElementById('meridian');

    // Function to update the displayed time and date
    const updateDisplay = () => {
        let currDate = convertSecondsToDate(information.dt).split(" ");
        // console.log(currDate);

        let day = currDate[0];
        let mnth = currDate[1];
        let date = currDate[2];
        let year = currDate[3];
        let time = currDate[5];
        let meridian = currDate[6];

        // Update the inner text of the elements
        currentTime.innerText = `${time}`;  // Update time with AM/PM
        currentDate.innerText = `${date} ${mnth}`;      // Update day and month
        currentYear.innerText = `${year}`;  
        mdr.innerText = `${meridian}`             // Update year
    };

    // Initial display update
    updateDisplay();

    // Set an interval to update the display every second
    setInterval(() => {
        // You can update `information.dt` if necessary.
        let currentTimestamp = Math.floor(Date.now() / 1000);
        information.dt = currentTimestamp; // Simulating the current time for demonstration

        updateDisplay(); // Update the display
    }, 1000); // Update every second
}



async function heroTempRightSet() {

    let information = await fetchTempInfo("Sheikhupura")
    // console.log(information)
    // console.log(information.main.temp)

    let celsiusTemp = information.main.temp - 273.15
    let windSpeed = information.wind.speed
    let city = information.name
    let windDirection = information.wind.deg

    let HeroTemp = document.getElementById('hero-temp')
    let WindSpeed = document.getElementById('wind-speed')
    let City = document.getElementById('city')
    let windDir = document.getElementById('wind-dir')
    // console.log(HeroTemp)

    HeroTemp.innerText = `${Math.floor(celsiusTemp)}°`
    WindSpeed.innerText = `WIND: WSW ${windSpeed} MPH`
    City.innerText = `- ${city.toUpperCase()} CITY`
    windDir.innerText = `${windDirection}°N`

}

async function boxOneSet() {

    let Lhr = await fetchTempInfo("Lahore")
    let LhrcelsiusTemp = Lhr.main.temp - 273.15
    let Lhrcity = Lhr.name
    let LhrwindDirection = Lhr.wind.deg

    let Isl = await fetchTempInfo("Islamabad")
    let IslcelsiusTemp = Isl.main.temp - 273.15
    let Islcity = Isl.name
    let IslwindDirection = Isl.wind.deg

    let Khi = await fetchTempInfo("Karachi")
    let KhicelsiusTemp = Khi.main.temp - 273.15
    let Khicity = Khi.name
    let KhiwindDirection = Khi.wind.deg

    // console.log(Lhr) 
    // console.log(Isl) 
    // console.log(Khi)

    let boxes = document.querySelector('.city-temp-boxes')
    // console.log(boxes)

    boxes.innerHTML = boxes.innerHTML + `<div class="box h-fit w-[152px] mlg:w-[37%]">
                                            <div class="temp m-5 text-5xl text-[#3c4b6f]">
                                                <span>${Math.floor(LhrcelsiusTemp)}&deg;</span>
                                            </div>
                                            <span class="latitude text-[#3c4b6f] mx-2 text-sm">${LhrwindDirection}&deg;N</span><br>
                                            <span class="city text-[#3c4b6f] mx-2 text-sm">${Lhrcity}</span>

                                            <div class="bars my-5 w-[90%] mx-auto">
                                                <div class="bg-cyan-400 rounded-full h-1 w-[95%] my-2"></div>
                                                <div class="bg-cyan-400 bg-opacity-[.5] rounded-full h-1 w-[85%] my-2"></div>
                                            </div>
                                        </div>`

    boxes.innerHTML = boxes.innerHTML + `<div class="box h-fit w-[152px] mlg:w-[37%]">
                                            <div class="temp m-5 text-5xl text-[#3c4b6f]">
                                                <span>${Math.floor(IslcelsiusTemp)}&deg;</span>
                                            </div>
                                            <span class="latitude text-[#3c4b6f] mx-2 text-sm">${IslwindDirection}&deg;N</span><br>
                                            <span class="city text-[#3c4b6f] mx-2 text-sm">${Islcity}</span>

                                            <div class="bars my-5 w-[90%] mx-auto">
                                                <div class="bg-orange-400 rounded-full h-1 w-[95%] my-2"></div>
                                                <div class="bg-orange-400 bg-opacity-[.5] rounded-full h-1 w-[85%] my-2"></div>
                                            </div>
                                        </div>`

    boxes.innerHTML = boxes.innerHTML + `<div class="box h-fit w-[152px] mlg:w-[37%]">
                                            <div class="temp m-5 text-5xl text-[#3c4b6f]">
                                                <span>${Math.floor(KhicelsiusTemp)}&deg;</span>
                                            </div>
                                            <span class="latitude text-[#3c4b6f] mx-2 text-sm">${KhiwindDirection}&deg;N</span><br>
                                            <span class="city text-[#3c4b6f] mx-2 text-sm">${Khicity}</span>

                                            <div class="bars my-5 w-[90%] mx-auto">
                                                <div class="bg-blue-700 rounded-full h-1 w-[95%] my-2"></div>
                                                <div class="bg-blue-700 bg-opacity-[.5] rounded-full h-1 w-[85%] my-2"></div>
                                            </div>
                                        </div>`

}


async function tempBarSet() {

    let avgTempSet = document.getElementById('avgTemp')
    let weatherStat = document.getElementById('weather-stat')
    let windDirectionSet = document.getElementById('wind-dir')
    // console.log(weatherStat)

    let information = await fetchTempInfo("Sheikhupura")
    // console.log(information)
    // console.log(information.main.temp)

    let celsiusTemp = information.main.temp - 273.15
    let weatherStatus = information.weather[0].main
    // console.log(weatherStatus)
    let windDirection = information.wind.deg

    avgTempSet.innerText = `${Math.floor(celsiusTemp)}°`
    windDirectionSet.innerText = `${windDirection}°N`
    weatherStat.innerText = `${weatherStatus}`

}



// Main Function
function main() {

    // Navbar Background Color Appears On Scroll

    let navbar = document.getElementById('navbar')
    // console.log(navbar)

    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            navbar.style.backgroundColor = 'rgba(60, 75, 111, 0.95)'
        }
        else {
            navbar.style.backgroundColor = 'transparent'
        }
    })

    //  Graph Generating Function Call
    generateGraph()

    // Side Bar Function Call
    sideBar()

    // Show live data fetched from API
    heroTempRightSet()

    // Boxes text setup
    boxOneSet()

    // Temp bar text set
    tempBarSet()

    // Set navbar content
    navbarSet()

    // Set other city content
    cityTextSet()

}

main()
