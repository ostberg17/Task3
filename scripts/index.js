let herosList = document.querySelector("#heros");
let items = document.querySelector('#pagination');
const IMG_BASE_URL = 'https://starwars-visualguide.com/assets/img/characters/${id}.jpg'
let heros = []
let notesOnPage = 2;

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

const paginated = (heros) => {

  items.innerHTML = '';
  for(let i = 1; i < Math.ceil(heros.length/notesOnPage) + 1; i++){
    items.insertAdjacentHTML("beforeend", selectPage(i));
  }
  let listOfPages = document.getElementsByClassName("numberOfPage");
  for(let i = 0; i < listOfPages.length; i++){
    listOfPages[i].addEventListener('click', () => swiftPage(listOfPages[i], listOfPages));
  }  
  
}


const generateHeroList = (heros, selectedPage) => {

    herosList.innerHTML = '';  
    let start = notesOnPage * selectedPage;
    let end =  start + notesOnPage;
    let paginatedItems = heros.slice(start, end)

    for(let i = 0; i < paginatedItems.length; i++){
      herosList.insertAdjacentHTML("beforeend", generateHeroLayout(paginatedItems[i], i));
    }
};

const swiftPage = (button, listOfPages) => {
    selectedPage = button.innerText - 1;
    generateHeroList(heros, selectedPage);
    for(i = 0; i < listOfPages.length; i++){
      if(listOfPages[i].innerText - 1 == selectedPage){
        listOfPages[i].classList.add('selected-page');
      }
      else{
        listOfPages[i].classList.remove('selected-page');
      }
    }
}

let selectedPage = 1;
const selectPage = (number) => {
  return `<li class="button-element" id="button-element">
  <button class="numberOfPage">
      ${number}
  </button>
  </li>`;
};


const handleInputChange = (event) => {
    console.log(event.target.value)
}

const handleBtnClick = (heroName, index) => {
    const hero = heros[index]
    hero.name = heroName;
    generateHeroList(heros)
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
    generateHeroList(heros, selectedPage-1);
    paginated(heros);

    const listElements = document.querySelectorAll('.list_element') 
    
    for(let i = 0; i < listElements.length; i++) {
        const el = listElements[i];
        const [input, button] = el.children

        button.addEventListener('click', () => handleBtnClick(input.value, i))

    }
  });
