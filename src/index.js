const dogUrl = 'http://localhost:3000/pups'

const dogNameDiv = document.getElementById('dog-bar')

// step 2: add pups to dog bar
fetch (dogUrl)
.then(r => r.json())
.then(data => renderDogNames(data))

function renderDogNames(dogs) {
    dogs.forEach((singleDog) => {
        const dogName = document.createElement('span')
        dogName.innerText = singleDog.name
        dogName.classList.add('dog-name')
        dogName.onclick = () => renderDogInfo(singleDog)

        dogNameDiv.append(dogName)
    })
}

// step 3: show pup info in dog info div
const dogInfoDiv = document.getElementById('dog-summary-container')

function renderDogInfo(dog) {
    dogInfoDiv.innerText = ""
    const dogImg = document.createElement('img')
    dogImg.src = dog.image

    const dogName = document.createElement('h2')
    dogName.innerText = dog.name

    const dogButton = document.createElement('button')
    if (dog.isGoodDog) {
        dogButton.innerText = 'Good dog!'
    } else {
        dogButton.innerText = 'Bad dog!'
    }

    dogInfoDiv.append(dogImg, dogName, dogButton)
}