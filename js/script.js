
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

// takes the data we get back a generates a "userContainer" and a modalContainer
.then(data => {
   data[0].results.map(profile => generateUserContainer(profile));
   data[0].results.map(modalProfile => generateModalContainer(modalProfile));

  // const userProfile = data[0].results.map(profile => generateUserContainer() );
  // const modal = data[0].results.map(modalProfile => generateModalContainer() );

  generateUserContainer(userProfile);
  generateModalContainer(modal);
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
