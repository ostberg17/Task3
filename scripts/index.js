let herosList = document.querySelector("#heros");
const IMG_BASE_URL = 'https://starwars-visualguide.com/assets/img/characters/${id}.jpg'
let heros = []

const generateButtons = (index) => {
    return `
        <div id="list_element_${index}" class="list_element">
            <input type="text" id="input_${index}" />

            <button>
                Change name
            </button>
        </div>
    `
}

const generateHeroLayout = (heroData, index) => {
    const heroUrl = heroData.url
    const splitted = heroUrl.split('/');
    const heroId = splitted[splitted.length - 2];

    const heroImgUrl = IMG_BASE_URL.replace('${id}', heroId);

  return `<li class="hero-element">
    <div>
        <img src="${heroImgUrl}" alt=""/>
    </div>
    <div class="hero-details">
        <span>
        name: ${heroData.name}
        </span>
        <span>
            age: ${heroData.gender}
        </span>
        <span>
            age: ${heroData.birth_year}
        </span>

        ${generateButtons(index)}
    </div>
    </li>`;
};

const generateList = (heros) => {
    herosList.innerHTML = '';
  for (let i = 0; i < heros.length; i++) {
    herosList.insertAdjacentHTML("beforeend", generateHeroLayout(heros[i], i));
  }
};

const handleInputChange = (event) => {
    console.log(event.target.value)
}

const handleBtnClick = (heroName, index) => {
    const hero = heros[index]
    hero.name = heroName;
    generateList(heros)
    const lis = document.querySelectorAll('li')
    const toChangeLi = lis[index]

    toChangeLi.classList.add('red');
}


fetch("https://swapi.dev/api/people")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    heros = data.results
    generateList(heros);
   // const inputs = document.querySelectorAll('input')

    const listElements = document.querySelectorAll('.list_element') 
    
    for(let i = 0; i < listElements.length; i++) {
        const el = listElements[i];
        const [input, button] = el.children

        button.addEventListener('click', () => handleBtnClick(input.value, i))

       // input.addEventListener('input', handleInputChange);
    }
  });

// const herosListElements = document.getElementsByClassName('heros-element');
// const herosList = document.getElementById('heros');
// console.log(herosList);

// for(let i = 0; i < herosListElements.length; i++) {
//     herosListElements[i].classList.add('heros-list-element');
// }
