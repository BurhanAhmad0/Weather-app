export async function fetchTempInfo(query) {

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query},PK&appid=d621b085828926bc540eb642d104976b`)
    let data = await response.json()

    // console.log(data)

    return data
    
}

export async function fetchWeeklyHourlyInfo(query) {

    let city = query
    let apikey = 'd621b085828926bc540eb642d104976b'

    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`)
    let data = await response.json()

    // console.log(data)

    return data
    
}
