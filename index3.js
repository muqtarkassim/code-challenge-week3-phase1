let tickets; // Store the ticket count for the selected movie

function fetchAll() {
  fetch('http://localhost:3000/films')
    .then((res) => res.json())
    .then((data) => {
      fetchmovie(data);
    })
    .catch((error) => console.log(error));
}

function fetchmovie(movies, index) {
  const divListParent = document.querySelector('.movie-list');

  movies.forEach((movie, i) => {
    const listItems = document.createElement('p');
    listItems.textContent = movie.title;
    listItems.addEventListener('click', () => {
      tickets = movie.capacity - movie.tickets_sold;
      displayAllDetails(movie, tickets);
    });
    divListParent.appendChild(listItems);

    if (index === 0 || (i === 0 && index === undefined)) {
      tickets = movie.capacity - movie.tickets_sold;
      displayAllDetails(movie, tickets);
    }
  });
}

function displayAllDetails(movie, tickets) {
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
  movieBuy.textContent = `Buy Ticket`;
  // add the tickets to the DOM
  AvailableTickets.textContent = `  Tickets Available: ${tickets}`;
  movieRuntime.appendChild(AvailableTickets);
  divDetailsParent.append(
    movieTitle,
    moviePoster,
    movieRuntime,
    movieShowtime,
    movieBuy
  );
  const congrats = document.createElement('p');
  congrats.textContent = '';

  // buy tickets when button is clicked
  movieBuy.addEventListener('click', () => {
    if (tickets > 0) {
      tickets = tickets - 1;
      congrats.textContent = `congrats you bought 1 movie ticket`;
      // Update the UI
      AvailableTickets.textContent = `  Tickets Available: ${tickets}`;
      // Update the database with the new tickets_sold value
      updateTicketsSold(movie.id, movie.tickets_sold + 1);
      // Disable the button if tickets are sold out
      if (tickets === 0) {
        movieBuy.textContent = 'Sold Out';
        movieBuy.disabled = true;
      }
      divDetailsParent.append(congrats);
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchAll);

function fetchAll() {
  fetch('http://localhost:3000/films')
    .then((res) => res.json())
    .then((data) => {
      fetchMovies(data);
    })
    .catch((error) => console.log(error));
}

function fetchMovies(movies) {
  const divListParent = document.querySelector('.movie-list');

  movies.forEach((movie, i) => {
    const listItems = document.createElement('p');
    listItems.textContent = movie.title;
    listItems.addEventListener('click', () => {
      fetchMovieDetails(movie);
    });
    divListParent.appendChild(listItems);

    if (i === 0) {
      fetchMovieDetails(movie);
    }
  });
}

function fetchMovieDetails(movie) {
  fetch(`http://localhost:3000/films/${movie.id}`)
    .then((res) => res.json())
    .then((data) => {
      displayMovieDetails(data);
    })
    .catch((error) => console.log(error));
}

function displayMovieDetails(movie) {
  const divDetailsParent = document.querySelector('.movie-details');
  divDetailsParent.textContent = '';

  const movieTitle = document.createElement('h2');
  const moviePoster = document.createElement('img');
  const movieRuntime = document.createElement('p');
  const movieShowtime = document.createElement('p');
  const movieBuy = document.createElement('button');
  const AvailableTickets = document.createElement('span');

  movieTitle.textContent = movie.title;
  moviePoster.src = movie.poster;
  movieRuntime.textContent = `Total minutes: ${movie.runtime}`;
  movieShowtime.textContent = `Start Time: ${movie.showtime}`;
  movieBuy.textContent = `Buy Ticket`;
  AvailableTickets.textContent = `Tickets Available: ${movie.capacity - movie.tickets_sold}`;

  movieRuntime.appendChild(AvailableTickets);
  divDetailsParent.append(
    movieTitle,
    moviePoster,
    movieRuntime,
    movieShowtime,
    movieBuy
  );

  movieBuy.addEventListener('click', () => {
    if (movie.tickets_sold < movie.capacity) {
      updateTicketsSold(movie.id, movie.tickets_sold + 1);
    }
  });
}

function updateTicketsSold(movieId, newTicketsSold) {
  fetch(`http://localhost:3000/films/${movieId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tickets_sold: newTicketsSold,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //fetchAll(); // Refresh the movie list and details
      fetchMovieDetails(data)
    })
    .catch((error) => {
      console.error('Error updating tickets_sold:', error);
    });
}