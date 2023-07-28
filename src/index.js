const dogUrl = 'http://localhost:3000/pups'

const dogNameDiv = document.getElementById('dog-bar')
const dogInfoDiv = document.getElementById('dog-summary-container')

fetchData()

// step 2: add pups to dog bar
function fetchData() {
    fetch(dogUrl)
        .then(r => r.json())
        .then(data => renderDogNames(data))
}

function renderDogNames(dogs) {
    dogs.forEach((singleDog) => {
        const dogName = document.createElement('span')
        dogName.classList.add('single-dog')
        dogName.innerText = singleDog.name
        dogName.onclick = () => renderDogInfo(singleDog)

        const isGoodDog = document.createElement('p')
        isGoodDog.classList.add('good-or-bad')
        isGoodDog.innerText = singleDog.isGoodDog
        isGoodDog.style.display = 'none'

        dogName.appendChild(isGoodDog)

        dogNameDiv.appendChild(dogName)
    })
}

// step 3: show pup info in dog info div
function renderDogInfo(dog) {
    dogInfoDiv.innerText = ''
    const dogImg = document.createElement('img')
    dogImg.src = dog.image

    const dogName = document.createElement('h2')
    dogName.innerText = dog.name

    const dogButton = document.createElement('button')
    if (dog.isGoodDog === false) {
        dogButton.innerText = 'Say, "Good dog!"'
    } else {
        dogButton.innerText = 'Say, "Bad dog!"'
    }

    dogButton.onclick = () => {
        if (dogButton.innerText === 'Say, "Good dog!"') {
            dogButton.innerText = 'Say, "Bad dog!"'
            dog.isGoodDog = true
        } else {
            dogButton.innerText = 'Say, "Good dog!"'
            dog.isGoodDog = false
        }
        updateDatabase(dog)
    }

    dogInfoDiv.append(dogImg, dogName, dogButton)
}

// step 4: toggle good dog/bad dog
function updateDatabase(dog) {
    fetch(dogUrl + '/' + dog.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/JSON',
            'Accept': 'application/JSON'
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog
        })
    })
    dogNameDiv.innerText = ''
    fetchData()
}

// bonus! step 5: filter good dogs
const dogFilterButton = document.getElementById('good-dog-filter')
dogFilterButton.onclick = () => {
    if (dogFilterButton.innerText === 'Filter good dogs: TURN ON') {
        dogFilterButton.innerText = 'Filter good dogs: TURN OFF';
        filterGoodDogs()
    } else {
        dogFilterButton.innerText = 'Filter good dogs: TURN ON'
        dogNameDiv.innerText = ''
        fetchData()
    }
}

function filterGoodDogs() {
    const allDogs = document.getElementsByClassName('good-or-bad')
    const allDogsArray = Array.from(allDogs)

    for (let dog of allDogsArray) {
        if (dog.innerText === 'false') {
            dog.parentNode.style.display = 'none'
        }
    }
}

// FIX: If filter is on, pushing "Say, bad dog!" will display all dogs in the name div.