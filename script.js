const API_KEY = "eeb28473d5d20647c58785f7a22dd5a8";

const submitButton = document.querySelector("#btn");

const getTemp = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&lang=pt_br`
    );

    if (!response.ok) {
      throw new Error("Request Failed");
    }

    const data = await response.json();
    const nomeCidade = data.name;
    const nomePais = data.sys.country;
    const tempAtual = kelvinCelsius(parseInt(data.main.temp));
    const weather = data.weather[0].main;

    let currentWeatherSVG;

    switch (weather) {
      case "Clear":
        currentWeatherSVG = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sun text-yellow-300"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>`;
        break;
      case "Rain":
        currentWeatherSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-rain text-slate-500"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`;
        break;
      case "Snow":
        currentWeatherSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-snowflake text-blue-300"><path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/></svg>`;
        break;
      case "Clouds":
        currentWeatherSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloudy text-slate-500"><path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/></svg>`;
        break;
      default:
        currentWeatherSVG = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-sun text-yellow-300"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>`;
    }

    const containerTemp = document.querySelector("#weatherContainer");
    containerTemp.classList.add(
      "mt-8",
      "flex",
      "justify-between",
      "items-center",
      "gap-2"
    );
    containerTemp.innerHTML = `
      <div class="imgweather h-full w-1/2">
         ${currentWeatherSVG}
        </div>
        <div class="bg-slate-100 w-1 h-20"></div>
        <div class="weatherinfo">
          <h3 id="currentCity" class="text-slate-400">${nomeCidade}, ${nomePais}</h3>
          <h1 id="currentTemp" class="mt-2 text-5xl font-bold text-slate-500">
            ${tempAtual}°C
          </h1>
        </div>
      
      `;
  } catch (error) {
    console.log(error);
  }
};

function kelvinCelsius(temp) {
  const tempCelsius = temp - 273;
  return tempCelsius;
}

submitButton.addEventListener("click", () => {
  const form = document.querySelector("#busca");
  const cityName = form.value;
  getTemp(cityName);
});

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const form = document.querySelector("#busca");
    const cityName = form.value;
    getTemp(cityName);
  }
});
