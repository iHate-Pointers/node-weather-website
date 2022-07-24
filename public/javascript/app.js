console.log('Client side JS file has been Loaded')
//Getting the data into the Client SIde

//We are using fetch into javascript, can only be accessed in javascript, and not in nodejs
//Fetch is something that a browser supports but it isn't exactly a JS thingy
// fetch("https://puzzle.mead.io/puzzle").then(response => {
//     response.json().then(data => {
//         console.log(data)
//     })
// })

//Client SIDE JS
// fetch("http://localhost:3000/weather?address=Bangladesh").then(response => {
//     response.json().then(data => {
//         if(data.error) {
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form') //To get the whole of form
const search = document.querySelector('input') //Get the value user types
const messageOne = document.querySelector('.mess-1')
const messageTwo = document.querySelector('.mess-2')

messageOne.textContent = "Please Enter a Location above to get it's Weather Details!";
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    //Browser refreshed/reloads once we submit which is default behaviour
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then(res =>{
        res.json().then(data => {
            if (data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        })
    })
})