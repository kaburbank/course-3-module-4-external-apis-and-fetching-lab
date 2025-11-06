// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

//Function to fetch alerts
function fetchWeatherAlerts(state) {

  fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Invalid state abbreviation");
      };
      return response.json();
    })
    .then(data => {
      displayAlerts(data, state);
    })
    .catch(error => {
      console.log(error.message);
      showError(error.message);
    });
};

//Function to display alerts
function displayAlerts(data, state) {
  const alertsDiv = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  alertsDiv.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  const input = document.getElementById("state-input");

  if (!data.features || data.features.length === 0) {
    alertsDiv.textContent = `No active alerts for ${state}.`;
    input.value = "";
    return;
  };

  //Title of summary messasge
  const summary = document.createElement("h2");
  summary.textContent = `Weather Alerts: ${data.features.length}`;
  alertsDiv.append(summary);

  //List of alert headlines
  const list = document.createElement("ul");
  data.features.forEach(alert => {
    const item = document.createElement("li");
    item.textContent = alert.properties.headline;
    list.append(item);
  });
  alertsDiv.append(list);

  input.value = "";
};

//Clear input field
document.getElementById("state-input").value = "";


//Function for error handling
function showError(message) {
  const errorDiv = document.getElementById("error-message");
  const alertsDiv = document.getElementById("alerts-display");

  alertsDiv.innerHTML = "";
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
};

//Add event listener for button
document.getElementById("fetch-alerts").addEventListener("click", () => {
  const stateInput = document.getElementById("state-input").value.trim().toUpperCase();
  fetchWeatherAlerts(stateInput);
});

//Functions for loading spinner
function showLoadingSpinner() {
  spinnerElement.style.display = 'block';
};

function hideLoadingSpinner() {
  spinnerElement.style.display = 'none';
};