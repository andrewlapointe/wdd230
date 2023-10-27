// Create Key
const VISITS_KEY = 'site-visits';

// Check to see if key exists in local storage
// If does not exist, init key to 1
// Else increment key by 1
// Update the page with current visits
// Save new value for current visits

function calcSiteVisits() {
    let currentValue = localStorage.getItem(VISITS_KEY);
    let siteVisits = 1

    if (currentValue != null) {
        siteVisits = parseInt(currentValue) + 1;
    }
    localStorage.setItem(VISITS_KEY, `${siteVisits}`)
    return siteVisits
}

const counter = document.getElementById("visitcount");

counter.innerHTML = calcSiteVisits();