const search = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body');



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

  generateForm();
  generateCardContainer(employeeData);
  generateModalContainer(employeeData);
})


 // creates the search box
 function generateForm() {
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
   const cardContainer = data.map(employee => {
     return `
       <div class='card'>
         <div class='card-img-container'>
           <img class='card-img' src='${employee.picture.large}' alt='profile picture'>
         </div>
         <div class='card-info-container'>
           <h3 id='name' class='card-name cap'>${employee.name.first} ${employee.name.last}</h3>
           <p class='card-text'>${employee.email}</p>
           <p class='card-text cap'>${employee.location.city}, ${employee.location.state}</p>
         </div>
       </div>
     `;
   }).join('');
   gallery.innerHTML = cardContainer;
 }


//*creates the modal with all employee information*//
function generateModalContainer(data) {
  const modalContainer = data.map(employee => {
  return `
    <div class='modal-container'>
      <div class='modal'>
        <button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>
        <div class='modal-info-container'>
          <img class='modal-img' src='${employee.picture.large}' alt='profile picture'>
          <h3 id='name' class='modal-name cap'>${employee.name.first} ${employee.name.last}</h3>
          <p class='modal-text'>${employee.email}</p>
          <p class='modal-text cap'>${employee.location.city}</p>
          <hr>
          <p class='modal-text'>${employee.phone}</p>
          <p class='modal-text'>${employee.location.street.number} ${employee.location.street.name}., ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
          <p class='modal-text'>Birthday:${employee.dob.date.slice(0,10).split("-").reverse().join("/")}</p>
        </div>
      </div>
    </div>
  `;


  //*EVENT LISTENER -- to close the modal  DOESN'T WORK *//
  let modalContainerDiv = document.querySelectorAll('.modal-container');
  let closeButton = document.querySelectorAll('.modal-close-btn');

  closeButton.addEventListener('click', () => {
    modalContainerDiv.style.display = 'none'
  });


  // ends the generateModalContainer function
  }).join('');
  document.querySelectorAll('.modal-container').style.display = 'none';
  document.body.innerHTML = modalContainer;
}


//*EVENT LISTENER --to open the modal DOESN'T WORK *//
gallery.addEventListener('click', (e) => {
  let employeeCard = e.target;
  let cards = document.querySelectorAll('card');

  for (let i = 0; i < cards.length; i++){
    let oneCard = cards[i];
     if(oneCard === employeeCard) {
        generateModalContainer(employeeCard);
     }
   }
 });
