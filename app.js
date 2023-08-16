const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model")

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose")
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";


mongoose
  .connect(MONGODB_URI)
  .then((db) => console.log(`Connected to Mongo! Database name: "${db.connection.name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
// my solution
// app.post("/recipes", async(req, res, next)=>{
//     try {
//         let {title, instructions, level, ingredients, image, duration, isArchived} = req.body
//         if(!title|| !instructions|| !level|| !ingredients|| !image|| !duration||!isArchived){
//             return res.status(500).json({message: "internal server error"})
//         }
//         const createdRecipe = await Recipe.create({title, instructions, level, ingredients, image, duration, isArchived})
//         res.status(201).json(createdRecipe
//             )
//     } catch (error) {
//         console.log(error)
//     }
    
// })

// solution from lab is :
app.post("/recipes", (req, res)=>{
    // using req.body
    Recipe.create ({
        title: req.body.title,
        instructions:req.body.instrutions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image : req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
    }).then((createdRecipe)=>{
        res.status(201).json(createdRecipe)
    }).catch((error)=>{
        return res.status(500).json({message: "error while creating a new recipe"})
    })
    
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next)=>{

    Recipe.find ()
    .then((allRecipes)=>{
        res.status(200).json(allRecipes)
    }).catch((error)=>{
        return res.status(500).json({message: "error while getting all recipes"})
    })
    
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next)=>{

    // my alternative solution
    // try {
    //     const oneRecipe = await Recipe.findById(req.params.id)
    //     .populate("recipes")
    //     res.json(oneRecipe)

    // } catch (error) {
    //     console.log(error)
    // }
    Recipe.findById(req.params.id)
    .then((oneRecipe)=>{
        res.status(200).json(oneRecipe)
    }).catch((error)=>{
        return res.status(500).json({message: "error while getting one recipe"})
    })
    
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next)=>{

    // my alternative solution
    //app.put("/recipes/:id", async(req, res, next)=>{
    // try {
    //     const {title, ingredients, image, isArchived} = req.body
    //     const id= req.params.recipeId
       // const recipeToUpdate = req.body
    // const newRecipe = await Recipe.findByIdAndUpdate (id, recipeToUpdate, {new:true})
       //     res.status(200).json(updatedRecipe)

    // } catch (error) {
    //     return res.status(500).json({message: "error while updating a recipe"})
    // }

    const id= req.params.id
    const recipeToUpdate = req.body
    Recipe.findByIdAndUpdate(id, recipeToUpdate, {new:true} )
    .then((updatedRecipe)=>{
        res.status(200).json(updatedRecipe)
    }).catch((error)=>{
        return res.status(500).json({message: "error while updating a recipe"})
    })
    
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
// my alternative solution
// app.delete('/:recipes/:id', async(req, res, next)=>{
//     const id = req.params.id
//     try {
//         await Recipe.findByIdAndDelete(id)
//         res.status(204).json({message: `Recipe ${id} was deleted `})

//     } catch (error) {
//         return res.status(500).json({message: "error while deleting a recipe"})
//     }
// })

app.delete('/:recipes/:id', (req, res, next)=>{
    const id= req.params.id
    Recipe.findByIdAndDelete(id)
    .then(()=>{
        res.status(204).json({message: `Recipe ${id} was deleted `})
    }).catch((error)=>{
        return res.status(500).json({message: "error while deleting a recipe"})
    })


})





// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route


//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route


//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;