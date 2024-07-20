function search() {
  const http = new XMLHttpRequest();
  const apiKey = "2a11b8cc9ce522e3d90f0dcac21609e5";
  let searchText = text_input.value;

  if (searchText) {
    http.open(
      "get",
      `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}&units=metric`
    );
    http.send();
    http.onreadystatechange = () => {
      if (http.readyState == 4) {
        if (http.status == 200) {
          let weather = JSON.parse(http.responseText);
          text_input.value = "";
          const localTime = new Date().getTime();
          const localOffset = new Date().getTimezoneOffset() * 60000;
          const currentUtcTime = localOffset + localTime;
          const cityOffset = currentUtcTime + 1000 * weather.timezone;
          const cityTime = new Date(cityOffset);
          let dDate = String(cityTime).slice(0, 15);
          weatherinfo.innerHTML = `<div>
          <div class="w-container">
            <div class="w-g">
              <img
                src="https://openweathermap.org/img/wn/${
                  weather.weather[0].icon
                }@2x.png"
                alt=""
              />
              <p>${weather.weather[0].main}</p>
            </div>
            <div class="w-d">
              <p>${weather.name}, ${weather.sys.country}</p>
              <span>${Math.floor(weather.main.temp)}°c</span>
              <h3>${dDate}</h3>
            </div>
          </div>
          <div class="w-d-extra">
            <div class="w-cell">
              <p>Humidity</p>
              <span>${weather.main.humidity}%</span>
            </div>
            <div class="w-cell">
              <p>Wind</p>
              <span>${weather.wind.speed} Kmph</span>
            </div>
            <div class="w-cell">
              <p>Pressure</p>
              <span>${weather.main.pressure} Pa</span>
            </div>
          </div>
        </div>`;
        } else {
          weatherinfo.innerHTML =
            '<h3 id="msg" style="color:Tomato;">City not found !</h3>';
        }
      }
    };
  } else {
    weatherinfo.innerHTML =
      '<h3 id="msg" style="color:Tomato;">City name not valid !</h3>';
  }
}

let input = document.getElementById("text_input");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    search();
  }
});
