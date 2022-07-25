const path = require('path') //In built into nodejs
const express = require('express') //Had to download it
const hbs = require('hbs') //Had to DL again
const forecast = require('./utils/forecast.js')
const geoCode = require('./utils/geocode.js')

// console.log(__dirname) //Display the directory name from root, __filename can be used to get filename
// console.log(path.join(__dirname, '../public')) // .. means going back once, to use it again seperate by slash ../..

const app = express()
// const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //When we customize the name of views To Templates
const partialsPath = path.join(__dirname, '../templates/partials') 

//Setup handlebars engine and 'views' location, Default name for it is views
app.set('view engine','hbs') //Set a value for given Express Setting, key: value, This line setups Handlebars] Finds it in default location
app.set('views', viewsPath) //The first parameter must be same as what we first put in the folder,
hbs.registerPartials(partialsPath) //register a partial, Which will help in easier reuseability

//Setup static directory to serve, connects public directory to source directory where we dealing with most of our important stuffs
app.use(express.static(publicDirectoryPath))
//app.com
//app.com/help
//app.com/about

app.get('', (req, res) => { //First parameter is domains seen above, 2nd is request and response
    // res.render('index') //Displayed in the main page, we have send which directly sends and render
    res.render('index', { //Hardcoding it to get us a dynamic page which remains same in all pages
        title: 'Weatherpedia', //This will help us control the thing from node.js
        name: 'Shoaib Bhutia'
    })
})
app.get('/about', (req, res) => { 
    res.render('about', { 
        title: 'About this Page', 
        name: 'Shoaib Bhutia'
    })
})
app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help/FAQ', 
        name: 'Shoaib Bhutia'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address must be provided"
        })
    }
    geoCode(req.query.address, (error, {lat, lon, loc} = {}) => { //Setting lat, lon = {}, default value is empty array rather than undefined
        if (error) {
            return res.send({ error })
        } 
        forecast(lat, lon, (error,forecastData) => { //Unique name
            if (error) {
            return res.send({ error })
            }
            res.send({
                    // Geocode and Forecast methods here using Query String, which will give us JSON data
                forecast: forecastData,
                location: loc,
                address: req.query.address
            })
        })
    })
})
//     res.send({
// Geocode and Forecast methods here using Query String
//         forecast: "It's Mario", 
//         location: "India",
//         address: req.query.address
//     })
// })

// app.get('/products', (req, res) => {
//     console.log(req.query.search)
//     if(!req.query.search){
//         return res.send({ //This is so that once we return error, it doesn't dispaly the wrong title, we respond once once here
//             error: "You must provide a search term" // query is bad or wrong
//         })

//     }
//     console.log(req.query) //This line will show whatever key value pair we give after ?
//     res.send({title: []}) //Static JSON
// })





// app.get('/help', (req, res) => { //First parameter is domains seen above, 2nd is request and response
//     res.send([{
//             name: 'Shoaib',
//             age: 22
//         },
//         {
//             name: 'Ashley',
//             age: 17
//         }]
//     )
// })

// app.get('/about', (req, res) => { //First parameter is domains seen above, 2nd is request and response
//     res.send('<h1>About</h1>') //Using HTML tags here
// })


//404 Page, Kept at last, if not above then has to be this
app.get('/help/*', (req, res) => { 
    res.render('error', {
        title: "404",
        errorMessage: "This HELP directory doesn't exist",
        name: 'Shoaib Bhutia'
    })
})  

app.get('/about/*', (req, res) => { 
    res.render('error', {
        title: "404",
        errorMessage: "This ABOUT directory doesn't exist",
        name: 'Shoaib Bhutia'
    })
})  



app.get('*', (req, res) => { // This * indicates if any other besides the above mention then go into this block
    res.render('error', {
        title: "404",
        errorMessage: "Error Not Found",
        name: 'Shoaib Bhutia'
    })
})  



//To start the server, we need this only
app.listen(process.env.PORT || 3000, () => {
    console.log('Server has been started at Port 3000') //Only be displayed in the console
}) //Start the server at Port 3000 (temporary port), Stays up and keeps on running