const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const ajax_section = document.querySelector(".ajax-section");

const apiKey = "239af70f5369477b927217251d265b46";

form.addEventListener("submit", e => {
    e.preventDefault();
    const listItems = list.querySelectorAll(".ajax-section .city");
    const inputVal = input.value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    // response.status == 404 ? ajax_section.innerHTML = "<h2 class='text-danger'>ERROR 404 - Not Found</h2>" : console.log(hello)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const { main, name, sys, weather, wind } = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]
                }@2x.png`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          ${sys.country == undefined ? "" : '<sup>' + sys.country + '</sup>'}
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
          </figure>
          <span class="windSpeed"><i class="fa-solid fa-wind fa-fade mx-2"></i>Wind Speed: ${wind.speed}</span><br>
          <span class="humidity"><i class="fa-solid fa-droplet-percent fa-fade mx-2"></i>Humidity: ${main.humidity} %</span><br>
      `;
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = "Please enter a valid city";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});