const grid_div = document.getElementById('directory-cards');
const list_section = document.getElementById('directory-list');
const grid_button = document.getElementById('grid-view-button');
const list_button = document.getElementById('list-view-button');

grid_button.addEventListener('click', setViewGrid);
list_button.addEventListener('click', setViewList);

function setViewGrid() {
    // Use style.display to change CSS property
    list_section.style.display = "none";
    grid_div.style.display = 'block';

    grid_button.classList.add('button-focus');
    list_button.classList.remove('button-focus');
}

function setViewList() {
    // Use style.display to change CSS property
    grid_div.style.display = 'none';
    list_section.style.display = "block";

    list_button.classList.add('button-focus');
    grid_button.classList.remove('button-focus');
}







// JSON Functions
// 
// 
function createCards() {
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {

            data.companies.forEach(company => {
                const companyDiv = document.createElement('section');
                companyDiv.classList.add('company');

                const name = document.createElement('h2');
                name.textContent = company.name;

                const address = document.createElement('p');
                address.textContent = `Address: ${company.address}`;

                const phone = document.createElement('p');
                phone.textContent = `Phone: ${company.phone_number}`;

                const website = document.createElement('a');
                website.href = company.website_url;
                website.textContent = 'Visit Website';
                website.target = '_blank';

                const image = document.createElement('img');
                image.src = `images/logos/${company.image_file}`;
                image.alt = `${company.name} Logo`;
                image.loading = 'lazy';
                image.classList.add("width-80pc");

                const membership = document.createElement('p');
                membership.textContent = `Membership Level: ${company.membership_level}`;

                const br = document.createElement('br');

                companyDiv.appendChild(name);
                companyDiv.appendChild(image);
                companyDiv.appendChild(br);
                companyDiv.appendChild(website);
                companyDiv.appendChild(phone);
                companyDiv.appendChild(address);
                companyDiv.appendChild(membership);

                grid_div.appendChild(companyDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function createList() {
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {

            data.companies.forEach(company => {
                const companyDiv = document.createElement('div');
                companyDiv.classList.add('company');

                const name = document.createElement('h2');
                name.textContent = company.name;

                const address = document.createElement('p');
                address.textContent = `Address: ${company.address}`;

                const phone = document.createElement('p');
                phone.textContent = `Phone: ${company.phone_number}`;

                const website = document.createElement('a');
                website.href = company.website_url;
                website.textContent = 'Visit Website';
                website.target = '_blank';

                const membership = document.createElement('p');
                membership.textContent = `Membership Level: ${company.membership_level}`;

                companyDiv.appendChild(name);
                companyDiv.appendChild(website);
                companyDiv.appendChild(phone);
                companyDiv.appendChild(address);
                companyDiv.appendChild(membership);
                companyDiv.style.marginBottom = '20px';
                companyDiv.style.paddingBottom = '5px';
                companyDiv.style.borderBottom = '1px solid black';

                list_section.appendChild(companyDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
createCards()
createList()