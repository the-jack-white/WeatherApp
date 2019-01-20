window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureContain = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/546f1d4f4a79f1b8b78db0ab8581257e/${lat},${long}`;

            fetch(api)
                .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                // Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // Set Icon
                setIcons(icon, document.querySelector('.icon'));

                // Change temperature to Celcius ---> function tempSwitch()
                temperatureContain.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        var tempC = (temperature - 32)* 5/9;
                        temperatureDegree.textContent = tempC.toFixed(2);
                        temperatureSpan.textContent = "C";
                    } else {
                        temperatureDegree.innerHTML = temperature;
                        temperatureSpan.textContent = "F";
                    }
                });
            });

        });
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});