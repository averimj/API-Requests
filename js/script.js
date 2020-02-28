const search = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const modalDiv = document.createElement('div');
modalDiv.className = 'modal-container';


//*FETCH FUNCTIONS*//

//fetches data, checks the status, converts the response into json and sends an error message if needed
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then( res => res.json() )
    .catch( error => console.log('Houston, we have a problem!', error) )
}


// ensures the response is 200, if not returns an error
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject( new Error(response.statusText) );
  }
}


// returns 12 users with US nationality, picture, name, email, location, dob & phone
fetchData('https://randomuser.me/api/?nat=us&inc=picture,name,email,location,dob,phone&results=12')

// returns the promise
.then(data => {

  const employeeData = data.results;

  generateSeachForm();
  generateCardContainer(employeeData);
  generateModalContainer(employeeData);
})


// formats dob in mm/dd/yyyy
function formatBirthday(employeeData) {
  const regex = /(\d{4})-(\d{2})-(\d{2}).*/;
  const replacement = '$2/$3/$1';
  return employeeData.dob.date.replace(regex, replacement);
}


// creates the search box
function generateSeachForm() {
  const form = `
   <form action='#' method='get'>
   <input type='search' id='search-input' class='search-input' placeholder='Search...'>
   <input type='submit' value='&#x1F50D;' id='search-submit' class='search-submit'>
   </form>
   `;
   search.innerHTML = form;
}


//*creates the card with basic employee information*//
function generateCardContainer(data) {
 const cardContainer = data.map( (employee, index) =>
   `
    <div 'id=cardNumber${index}' class='card'>
       <div class='card-img-container'>
         <img class='card-img' src='${employee.picture.large}' alt='profile picture'>
       </div>
       <div class='card-info-container'>
         <h3 id='name' class='card-name cap'>${employee.name.first} ${employee.name.last}</h3>
         <p class='card-text'>${employee.email}</p>
         <p class='card-text cap'>${employee.location.city}, ${employee.location.state}</p>
       </div>
     </div>
    `
  ).join('');

  gallery.innerHTML = cardContainer;

  // EVENT LISTENER -- DOESN'T WORK YET (WIP)
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {

      // ** code below doesn't work but thats my way of thinking **
      // if(cardNumber.id === modalNumber.id){
      //   modalDiv.style.display = 'block';
      // }
    });
  })

}


function generateModalContainer(data) {
  const modalContainer = data.map( (employee, index) =>
  `
      <div 'id=modalNumber${index}' class='modal'>
        <button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>
        <div class='modal-info-container'>
          <img class='modal-img' src='${employee.picture.large}' alt='profile picture'>
          <h3 id='name' class='modal-name cap'>${employee.name.first} ${employee.name.last}</h3>
          <p class='modal-text'>${employee.email}</p>
          <p class='modal-text cap'>${employee.location.city}</p>
          <hr>
          <p class='modal-text'>${employee.phone}</p>
          <p class='modal-text'>${employee.location.street.number} ${employee.location.street.name}., ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
          <p class='modal-text'>Birthday:${formatBirthday(employee)}</p>
        </div>
      </div>
  `).join('');

  modalDiv.innerHTML = modalContainer;
  body.append(modalDiv)
  modalDiv.style.display = 'none';

  // //*EVENT LISTENER -- to close the modal *//
  document.querySelector('.modal-close-btn').addEventListener('click', () => {
    modalDiv.style.display = 'none';
  });
}
