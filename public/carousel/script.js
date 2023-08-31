
const paragraphElement = document.getElementById('paragraph');

const pageHeader = document.getElementById('page-header');
const pageBody = document.getElementById('page-body');
const eventLinks = document.getElementById('event-links');
const carouselControls = document.getElementById('controls');


const persons = [{
    name: 'INTERNFAIR',
    paragraph: 'Internship oppurtunities to IIT Guwahati students in startups.',
    image: 'static files/internfair-carousel.png',
    color: '#d64541',
},
{
    name: 'LECTURE SERIES',
    paragraph: 'Inspiring sessions with accompolished personalities in the startup world.',
    image: 'static files/ls-carousel.png',
    color: '#f5d76e',
},
{
    name: 'PMX',
    paragraph: 'India\'s 2nd Largest Product Management Case Study Competition',
    image: 'static files/pmx-carousel.png',
    color: '#00b16a',
},
{
    name: 'WORKSHOPS',
    paragraph: 'Sessions by industry experts to equip you with critical skills.',
    image: 'static files/Workshop-carousel.png',
    color: '#f27935',
},
{
    name: 'DISRUPT',
    paragraph: 'North East\'s Larget Pitching Battle.',
    image: 'static files/disrupt-carousel.png',
    color: '#f308e7',
},
];

let activeSlide = 0; // Default

loadApp();

function loadApp() {
    persons.map(({
        name,
        paragraph,
        image,
        color,
    }, index) => {
        console.log(name + ' ' + index);

        let pageImage =
            `
        <img src="${image}"
        class="page__image ${activeSlide !== index ? 'disabled' : ''}" alt="page image">
        `

        let pageInfo =
            `<div class="page-info ${activeSlide !== index ? 'disabled' : ''}">
            <span class="page__title">${name}</span
        </div>
        `;


        let carouselImage =
            `
            <div class=" carousel-img-row ${activeSlide === index ? 'active' : 'disabled'} " style="border-right: solid 5px ${color};">
            <img src="${image}" class = "carousel-image ${activeSlide === index ? 'active' : 'disabled'}"
             alt="page image"   data-id="${index}">
             </div>
             `

        carouselControls.innerHTML += carouselImage;
        pageHeader.innerHTML += pageImage + pageInfo;
    });

    let tmp = [...document.getElementsByClassName('event-links')];
    tmp = tmp.filter((e, i) => i !== 0);
    tmp.map((e) => {
        if (!e.classList.contains('disabled')) {
            e.classList.add('disabled');
        }
    });
    paragraphElement.innerHTML = persons[activeSlide].paragraph;
}
const slideControllers = [...document.getElementsByClassName('carousel-image')];
slideControllers.map((control) => {
    control.addEventListener('click', openSlider);
});

function openSlider(e) {
    let tmp = e.target.getAttribute('data-id')
    if (activeSlide == tmp) {
        console.log('It\'s opened');
    } else {
        activeSlide = tmp;
        let nextSlide = tmp;

        [...document.getElementsByClassName('carousel-image')].forEach(a => a.classList.remove('active'));
        [...document.getElementsByClassName('carousel-image')].forEach(a => a.classList.add('disabled'));
        e.target.classList.add('active');
        e.target.classList.remove('disabled');

        changeSlider(nextSlide);
    }

}

function changeSlider(next) {
    let nextSlide = next;
    console.log(nextSlide);
    const ids = [
        'page-info',
        'page__image',
        'carousel-img-row',
        'event-links'
    ];

    ids.map((id) => {
        let tmp = [...document.getElementsByClassName(id)];
        tmp = tmp.filter((e, i) => i !== nextSlide);
        tmp.map((e) => {
            if (!e.classList.contains('disabled')) {
                e.classList.add('disabled');
            }
        });
        document.getElementsByClassName(id)[nextSlide].classList.remove('disabled');
    });
    paragraphElement.textContent = persons[nextSlide].paragraph;

}