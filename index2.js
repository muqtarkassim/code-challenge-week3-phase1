let tickets;

function fetchAll() {
  fetch('http://localhost:3000/films')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchmovie(data);
    })
    .catch((error) => console.log(error));
}

// function to get the movie
function fetchmovie(movies, index) {
  const divListParent = document.querySelector('.movie-list');

  movies.forEach((movie) => {
    const listItems = document.createElement('p');
    listItems.textContent = movie.title;
    listItems.addEventListener('click', () => {
      console.log('clicked');
      displayAllDetails(movie);
    });
    divListParent.appendChild(listItems);
  });
}

function displayAllDetails(movie) {
  const divDetailsParent = document.querySelector('.movie-details');
  //children
  divDetailsParent.textContent = '';
  const movieTitle = document.createElement('h2');
  const moviePoster = document.createElement('img');
  const movieRuntime = document.createElement('p');
  const movieShowtime = document.createElement('p');
  const movieBuy = document.createElement('button');
  const AvailableTickets = document.createElement('span');
  // add content
  movieTitle.textContent = movie.title;
  moviePoster.src = movie.poster;
  movieRuntime.textContent = `Total minutes:  ${movie.runtime}   `;
  movieShowtime.textContent = ` Start Time :  ${movie.showtime}`;
  movieBuy.textContent = `buy Ticket`;
  // check available tickets
  tickets = movie.capacity - movie.tickets_sold;
  // add the tickets to the dom
  AvailableTickets.textContent = `  Tickets Available: ${tickets}`;
  movieRuntime.appendChild(AvailableTickets);
  console.log(tickets);
  divDetailsParent.append(
    movieTitle,
    moviePoster,
    movieRuntime,
    movieShowtime,
    movieBuy
  );

  movieBuy.addEventListener('click', () => {
    console.log(tickets - 1);
    const congrats = document.createElement('p');
    congrats.textContent = '';
    if (tickets > 0) {
      tickets = tickets - 1;
      if (tickets > 0) {
        congrats.textContent = `congrats you bought 1 movie ticket`;
      } else {
        congrats.textContent = `sorry no Available tickets`;
        // Disable the button or handle the sold-out scenario as needed
        movieBuy.disabled = true;
      }
      divDetailsParent.append(congrats);
      // Update the available tickets count and refresh the display
      AvailableTickets.textContent = `  Tickets Available: ${tickets}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchAll);