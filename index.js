let tickets;


 function fetchAll(){
    fetch(' http://localhost:3000/films')
    .then(res =>res.json())
    .then(data =>{
      //  console.log(data)
        fetchmovie(data)
    })
    .catch(error =>console.log(error))
}
///  search for sepecific movie using id 
function fetchMovieDetails(movie) {
    fetch(`http://localhost:3000/films/${movie.id}`)
      .then((res) => res.json())
      .then((data) => {
        displayAllDetails(data);
      })
      .catch((error) => console.log(error));
  }

// function to get the movie

    function fetchmovie(movies){
    const divListParent=document.querySelector('.movie-list') 

    // children
    
movies.forEach((movie, i) =>{
   const listItems=document.createElement('p');
   listItems.textContent=movie.title;

   // add event listener to the movie list
   listItems.addEventListener('click', ()=>{
    //call function 
    fetchMovieDetails(movie)})

//append  list to the parent element

   divListParent.appendChild(listItems);
   // set default page as the first movie 
   if (i === 0 ) {
    // Display the first movie by default
    fetchMovieDetails(movie)
    
  }

  
})
}
  
    function displayAllDetails(movie){
    const divDetailsParent=document.querySelector('.movie-details')
    //children
    divDetailsParent.textContent=''
    const movieTitle=document.createElement('h2');
    const moviePoster=document.createElement('img');
    const movieRuntime=document.createElement('p');
    const movieShowtime=document.createElement('p');
    const movieBuy=document.createElement('button');
    const AvailableTickets=document.createElement('span');
    // add content
    movieTitle.textContent=movie.title;
    moviePoster.src=movie.poster;
    movieRuntime.textContent=`Total minutes:  ${movie.runtime}   `
    movieShowtime.textContent= ` Start Time :  ${movie.showtime}`
    movieBuy.textContent=`buy Ticket `
   // check available tickets
    
   // add the tickets to the dom
   AvailableTickets.textContent = `Tickets Available: ${movie.capacity - movie.tickets_sold}`;
   
   movieRuntime.appendChild(AvailableTickets)
   //console.log(tickets)
   divDetailsParent.append( movieTitle,moviePoster,movieRuntime,movieShowtime,movieBuy)
   const congrats=document.createElement('p')
    congrats.textContent=''

    // buy tickets when button is cliked >>>>>>>>>>>>>>>>>>>>>>>
    //>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
movieBuy.addEventListener('click',(e)=>{
if (movie.capacity>movie.tickets_sold){
    

    alert('congrats you bought 1 movie ticket')
    Updatedata(movie,movie.tickets_sold+1)

 } 
      // Display congrats message for 2 seconds
      

      // Update the UI
      
      
      // Call Updatedata function after 2 seconds
     else{
   

   alert('sorry no tickets available')
 }
  
  
})

}
/// function to buy ticket when clicked>>>>>>>>>><<<<<<<<<<<

function Updatedata(movie,ticketssold){
   
    fetch(`http://localhost:3000/films/${movie.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickets_sold: ticketssold,
        }),
      })
    .then(res => res.json())
    
      .then(data =>{ fetchMovieDetails(data)})
}

// >>>>>>the DOM  <>>>>>>>>>>>>

document.addEventListener('DOMContentLoaded',fetchAll())