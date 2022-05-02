$(document).ready(function () {

    let weather = {
        apiKey: 'a7eaa5b8a84df75a8d20e3e13bb25010',
        fetchWeather: function (city) {
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
            city + 
            '&units=metric&appid=' + 
            this.apiKey)
            .then((response) => {
                if (!response.ok) {
                    alert('No weather found');
                    throw new Error('No weather found');
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
        },
        displayWeather: function (data) {

            // Setting up local time, local sunrise and local sunset

            let utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
            let localTime = new Date(utc + (1000 * data.timezone));
            let date = localTime.toLocaleDateString('en-gb', {day:'numeric', month:'long', year:'numeric'});
            let time = localTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).slice(0, 5);
            let sunrise = moment.utc(data.sys.sunrise, 'X').add(data.timezone, 'seconds').format('HH:mm');
            let sunset = moment.utc(data.sys.sunset, 'X').add(data.timezone, 'seconds').format('HH:mm');
            let backgroundUrl = `https://source.unsplash.com/1600x900/?${data.name}`;

            // Displaying information

            $('.city').text(data.name);
            $('.temperature').text(`${Math.round(data.main.temp)} °C`);
            $('.flex img').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            $('.description').text(data.weather[0].description);
            $('.feels-like').text(`Feels like ${Math.round(data.main.feels_like)} °C`);
            $('.pressure').text(`${data.main.pressure} hPa`);
            $('.wind-speed').text(`${data.wind.speed.toFixed(1)} m/s`);
            $('.humidity').text(`${data.main.humidity} %`);
            $('.sunrise').text(`Sunrise at ${sunrise}`);
            $('.sunset').text(`Sunset at ${sunset}`);
            $('.date').text(date);
            $('.time').text(time);
            $('body').css('background-image', 'url(" '+ backgroundUrl +' ")');
        },
        search: function () {
            this.fetchWeather($('#search-bar').val());
        },
    };

    $('.search button').click(function (event) {
        weather.search();
    });

    $('#search-bar').keyup(function (event) {
        if (event.key == 'Enter') {
            weather.search();
        }
    });

    weather.fetchWeather('Sofia');

})