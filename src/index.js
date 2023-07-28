const dogUrl = 'http://localhost:3000/pups'

const dogDiv = document.getElementById('dog-bar')

// step 2: add pups to dog bar
fetch (dogUrl)
.then(r => r.json())
.then(data => renderDogs(data))

function renderDogs(dogs) {
    dogs.forEach((singleDog) => {
        const dogName = document.createElement('span')
        dogName.innerText = singleDog.name

        dogDiv.append(dogName)
    })
}

