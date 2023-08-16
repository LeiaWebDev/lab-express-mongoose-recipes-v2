// Your code here ...\
const {model, Schema} = require("mongoose")


// create schema
const receipeSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    instructions: {
        type: String, 
        required: true,
    },
    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: {
        type: [String],

    },
    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
        type: Number,
        min: 0,

    },
    isArchived: {
        type: Boolean,
        default: false,

    },
    created: {
        type: Date,
        default: Date.now
    }
})

// create a model
const Receipe = model ("Receipe", receipeSchema)
// const Receipe = mongoose.model ("Receipe", receipeSchema)
// if we have not imported model at the begining of the page

// export the model

module.exports = Receipe