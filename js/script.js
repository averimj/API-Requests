
const search = document.getElementsByClassName('search-container');
const gallery = document.getElementById('gallery');

// FETCH FUNCTIONS

// fetching data, checks the status, converts the response into json and sends an error message is need be
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then( res => res.json() )
    .catch( error => console.log('Houston, we have a problem!', error) )
}

// promise.all is used when you have 2 or more api's to fetch ... wanted to use anyway
Promise.all([

  // returns 12 users with US nationality, picture, name, email, location, dob & phone
 fetchData('https://randomuser.me/api/?nat=us&inc=picture,name,email,location,dob,phone&results=12')
])

// takes the data we get back a generates a "employeeContainer" and a modalContainer
.then(data => {
   data[0].results.map(profile => generateEmployeeCard(profile));
   data[0].results.map(modalProfile => generateEmployeeModal(modalProfile));

  // const employeeProfile = data[0].results.map(profile => generateEmployeeCard() );
  // const modal = data[0].results.map(modalProfile => generateEmployeeModal() );

  generateEmployeeCard(employeeProfile);
  generateEmployeeModal(modal);
})

// HELPER FUNCTIONS

// ensures the response we get back is 200, if not gives us an error
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject( new Error(response.statusText) );
  }
}

// creates the cardDiv--which holds each employee's basic information
function generateEmployeeCard(data) {
 const cardDiv = document.createElement('div');
 cardDiv.setAttribute('class', 'card');

 const employeeContainer = `
    <div class='card-img-container'>
     <img class='card-img' src='${data.picture.large}' alt='profile picture'>
    </div>
    <div class='card-info-container'>
      <h3 id='name' class='card-name cap'>${data.name.first} ${data.name.last}</h3>
      <p class='card-text'>${data.email}</p>
      <p class='card-text cap'>${data.location.city}, ${data.location.state}</p>
    </div>
 `;
 cardDiv.innerHTML = employeeContainer;

 // appends cardDiv inside the gallery div
 gallery.appendChild(cardDiv);
}


// creates the modalContainer div--which when clicked, displays more information about the employee

function generateEmployeeModal(data) {
 const modalContainer = document.createElement('div');
 modalContainer.setAttribute('class', 'modal-container');

 const modal = `
  <div class='modal'>
    <button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>
    <div class='modal-info-container'>
        <img class='modal-img' src="${data.picture.large}" alt='profile picture'>
        <h3 id='name' class='modal-name cap'>${data.name.first} ${data.name.last}</h3>
        <p class='modal-text'>${data.email}</p>
        <p class='modal-text cap'>${data.location.city}</p>
        <hr>
        <p class='modal-text'>${data.phone}</p>
        <p class='modal-text'>${data.location.street.number} ${data.location.street.name}., ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
        <p class='modal-text'>${data.dob.date}</p>
    </div>
  </div>
  `;

 modalContainer.innerHTML = modal;

 // appends modalContainer div after the gallery div
 gallery.parentNode.insertBefore(modalContainer, gallery.nextSibling)
}

// EVENT LISTENERS
