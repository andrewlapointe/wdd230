const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function createProphetSections() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        data.prophets.forEach(prophet => {
            // Create the section element
            const section = document.createElement('section');

            // Create child elements
            const heading = document.createElement('h2');
            heading.textContent = `${prophet.name} ${prophet.lastname}`;

            const details = document.createElement('p');
            details.innerHTML = `Birthdate: ${prophet.birthdate}<br>
                                 Birthplace: ${prophet.birthplace}<br>`;    

            const image = new Image();
            image.src = prophet.imageurl;
            image.alt = `Image of ${prophet.name} ${prophet.lastname}`;
            image.loading = "lazy";
            image.height = "300px";

            // Append child elements to the section
            section.appendChild(heading);
            section.appendChild(details);
            section.appendChild(image);

            // Append the section to the div
            cards.appendChild(section);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

createProphetSections();
