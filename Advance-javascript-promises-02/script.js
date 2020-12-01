//Creating method to fetch data using xmlHttpRequest and wrapping it using promise.
function fetchData(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status !== 200) {
                reject(`Error ${xhr.status}: ${xhr.statusText} : ${xhr.responseURL}`);
            } else {
                resolve(xhr.response);
            }
        }
    })
}

//Getting the data from rest-api and handling success and error scenarios 
fetchData('https://restcountries.eu/rest/v2/all').then((data) => {
    getAllCardsToDisplay(JSON.parse(data));
}).catch((errMsg) => {
    console.error(errMsg);
});

//Creating a dom element with properties elem, class,name and id. 
function createDomElement(elem, elemClass = '', elemName = '', elemId = '') {
    let element = document.createElement(elem);
    (elemClass !== '') && element.setAttribute('class', elemClass);
    (elemName !== '') && element.setAttribute('name', elemName);
    (elemId !== '') && element.setAttribute('id', elemId);
    return element;
}

//Creating a single card for country data provided.
function createCardsForCountries(data) {
    let cardCountryContainer = createDomElement('div', 'card');
    let cardCountryName = createDomElement('div', 'title');
    cardCountryName.innerText = data.name;

    let cardFlag = createDomElement('img', 'card-img-top');
    cardFlag.setAttribute('src', data.flag);

    let cardCountryDetails = createDomElement('div', 'card-body');

    let cardCountryCapital = createDomElement('h5', 'card-text');
    cardCountryCapital.innerHTML = `Capital : ${(data.capital === '' ? 'N/A' : data.capital)}`;

    let cardCountryCodes = createDomElement('h5', 'card-text');
    cardCountryCodes.innerHTML = `Country Codes : ${data.alpha2Code}, ${data.alpha3Code}`;

    let cardCountryRegion = createDomElement('h5', 'card-text');
    cardCountryRegion.innerHTML = `Region : ${data.region}`;

    let cardCountryLatLng = createDomElement('h5', 'card-text');
    cardCountryLatLng.innerHTML = `LatLng : ${data.latlng[0]}, ${data.latlng[1]}`;

    let cardCountryCurrency = createDomElement('h5', 'card-text');
    cardCountryCurrency.innerHTML = `Currency Code : ${data.currencies[0].code}`;

    cardCountryDetails.append(cardCountryCapital, cardCountryCodes, cardCountryRegion, cardCountryLatLng, cardCountryCurrency);
    cardCountryContainer.append(cardCountryName, cardFlag, cardCountryDetails);
    return cardCountryContainer;
}

//Creating cards for the list of countries provided.
function getAllCardsToDisplay(countries) {
    let countryDataContainer = createDomElement('div', 'country-data-container')
    countries.forEach((country) => {
        countryDataContainer.append(createCardsForCountries(country));
    })
    document.body.append(getHeaderForTheCountryData(), countryDataContainer);
}

//Creating the header for the country details
function getHeaderForTheCountryData() {
    let countryDataHeader = createDomElement('div', 'country-data-header');
    countryDataHeader.innerText = `Country Details`;
    return countryDataHeader;
}
