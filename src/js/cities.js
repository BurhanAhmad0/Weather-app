import { fetchWeeklyHourlyInfo } from "./fetchAPI.js"

function convertTo12HourFormat(time) {
    // Split the input time into hours and minutes
    let [hour, minute] = time.split(":").map(Number);
    
    // Determine AM or PM
    let meridian = hour >= 12 ? "PM" : "AM";
    
    // Convert hour from 24-hour to 12-hour format
    hour = hour % 12; // Convert hour (0 becomes 12)
    hour = hour ? hour : 12; // If hour is 0, set it to 12

    // Format the time
    return `${hour}:${minute < 10 ? '0' + minute : minute} ${meridian}`;
}

export async function cityTextSet() {

    let data = await fetchWeeklyHourlyInfo('Sheikhupura')
    // console.log(data);

    // Extract timestamps and temperatures from the API response
    const timestamps = data.list.map(item => {
        const date = new Date(item.dt * 1000);
        return `${date.getHours()}:00`;
    });
    // console.log(timestamps)

    let hourlyTempReport = data.list.map(item => item.main.temp);
    // console.log(hourlyTempReport)

    let icons = data.list.map((item) => {
        return item.weather[0].icon
    })
    // console.log(icons)

    let citiesContainer = document.querySelector('.cities')
    // console.log(citiesContainer)

    for (let index = 0; index <= 4; index++) {
        const time = convertTo12HourFormat(timestamps[index]);
        const temp = hourlyTempReport[index];
        const icon = icons[index];

        let card = `<div class="card flex justify-around items-center my-[20px] py-3">
                        <span class="city-name">
                            ${time}
                        </span>
                        <span class="city-temp">
                            ${Math.floor(temp)}°C
                        </span>
                        <span class="icon">
                            <img width="35px" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
                        </span>
                    </div>`

        citiesContainer.innerHTML = citiesContainer.innerHTML + card
        
    }
    
}
