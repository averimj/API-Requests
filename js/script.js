
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
