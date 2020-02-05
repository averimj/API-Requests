
const search = document.getElementsByClassName('search-container');
const gallery = document.getElementById('gallery');

// creates the card-div
const card = document.createElement('div');
card.className = 'card';

// creates the modal-div
const modal = document.createElement('div')
modal.className = 'modal-container';



// FETCH FUNCTIONS

// fetching data, checks the status, converts the response into json and sends an error message if need be
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then( res => res.json() )
    .catch( error => console.log('Houston, we have a problem!', error) )
}

// returns 12 users with US nationality, picture, name, email, location, dob & phone
 fetchData('https://randomuser.me/api/?nat=us&inc=picture,name,email,location,dob,phone&results=12')
  .then(data => data.results)

// HELPER FUNCTIONS


// creates the search box
function generateForm() {
  const form = `
    <form action='#' method='get'>
      <input type='search' id='search-input' class='search-input' placeholder='Search...'>
      <input type='submit' value='&#x1F50D;' id='search-submit' class='search-submit'>
  </form>
  `;
  // search.appendChild(form);
  search.innerHTMl = form;
}


// creates the card with employee pictures
function generateCardContainer() {
  const imageContainer = `
    <div class='card-img-container'>
        <img class='card-img' src='https://placehold.it/90x90' alt='profile picture'>
    </div>
  `;
}


// creates the card with employee basic information
function generateInfoContainer() {
  const infoContainer = `
    <div class='card-info-container'>
        <h3 id='name' class='card-name cap'>first last</h3>
        <p class='card-text'>email</p>
        <p class='card-text cap'>city, state</p>
    </div>
  `;
}


// creates the modal with all employee information (dob, phone, address etc.)
function generateModal() {
  const modalContainer = `
    <div class='modal'>
      <button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>
      <div class='modal-info-container'>
        <img class='modal-img' src='https://placehold.it/125x125' alt='profile picture'>
        <h3 id='name' class='modal-name cap'>name</h3>
        <p class='modal-text'>email</p>
        <p class='modal-text cap'>city</p>
        <hr>
        <p class='modal-text'>(555) 555-5555</p>
        <p class='modal-text'>123 Portland Ave., Portland, OR 97204</p>
        <p class='modal-text'>Birthday: 10/21/2015</p>
      </div>
    </div>
  `;
}


// allows user to navigate to the previous and next employee modal
function generateModalButtons() {
 const modButton = `
   <div class='modal-btn-container'>
       <button type='button' id='modal-prev' class='modal-prev btn'>Prev</button>
       <button type='button' id='modal-next' class='modal-next btn'>Next</button>
   </div>
 `;
}


// puts the dob in stanard mm/dd/yyyy format
function birthday() {

}


// ensures the response we get back is 200, if not gives us an error
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject( new Error(response.statusText) );
  }
}
