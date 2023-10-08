let tickets;
let  updatedTicketsSold ;

 function fetchAll(){
    fetch(' http://localhost:3000/films')
    .then(res =>res.json())
    .then(data =>{
      //  console.log(data)
        fetchmovie(data)
    })
    .catch(error =>console.log(error))
}

// function to get the movie

    function fetchmovie(movies,index){
    const divListParent=document.querySelector('.movie-list') 

    // children
    
movies.forEach((movie, i) =>{
   const listItems=document.createElement('p');
   listItems.textContent=movie.title;
   //tickets=movie[i].capacity-movie[i].tickets_sold
   listItems.addEventListener('click', ()=>{//console.log('cliked')
    
    fetch(`http://localhost:3000/films/${movie.id}`)
    .then(res =>res.json())
    .then(movie => {

  tickets=movie.capacity-movie.tickets_sold ;
    displayAllDetails(movie,tickets)
    console.log(tickets)
   // tickets= movie.capacity-movie.tickets_sold
    })
     
})
   divListParent.appendChild(listItems);
   if (index === 0 || (i === 0 && index === undefined)) {
    // Display the first movie by default
   tickets= movie.capacity-movie.tickets_sold ;
    displayAllDetails(movie,tickets);
  }

  
})
}

    function displayAllDetails(movie,tickets){
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
   console.log(tickets)
   divDetailsParent.append( movieTitle,moviePoster,movieRuntime,movieShowtime,movieBuy)
   const congrats=document.createElement('p')
    congrats.textContent=''

    // buy tickets when button is cliked >>>>>>>>>>>>>>>>>>>>>>>
    //>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
movieBuy.addEventListener('click',(e)=>{
    e.preventDefault()
  //  console.log(tickets-1)
   BuyWhencliked(divDetailsParent, congrats, AvailableTickets,movieBuy,movie)
    
   
   Updatedata(movie)
  
})

}
/// function to buy ticket when clicked>>>>>>>>>><<<<<<<<<<<
function BuyWhencliked(divDetailsParent, congrats, AvailableTickets,movieBuy,movie){

    
  
    
  
        if(tickets>0){
           tickets=tickets-1
         
            if (tickets>0){
             
                congrats.textContent=`congrats you bought 1 movie ticket`
                Updatedata(movie)
        
            }else{
                congrats.textContent=`sorry no Available tickets`
                movieBuy.textContent='sold out'
                movieBuy.disabled = true;
            }
            divDetailsParent.append(congrats)
            AvailableTickets.textContent=`  Tickets Available: ${tickets}`;
        }

    }
function Updatedata(movie){
   updatedTicketsSold = movie.tickets_sold + 1;
    fetch(`http://localhost:3000/films/${movie.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickets_sold: updatedTicketsSold,
        }),
      })
    .then(res => res.json())
    
      .then(data =>{ fetchAll()})
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
// >>>>>>the DOM  <>>>>>>>>>>>>

document.addEventListener('DOMContentLoaded',fetchAll())