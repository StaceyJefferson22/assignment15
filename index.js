const express = require("express");
const app = express();
const joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cars());

const upload = multer({dest: __dirname + "/public/images" });

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

let athletes = [{
    _id: 1,
    name: "Michael Jordan",
    description: "A trash talking basketball player who has the courage to challenge anybody on and off the court",
    rating: 4,
    teams: [
        "Chicago Bulls",
        "Washington Wizard"
    ],
},
{
    _id: 2,
    name: "Michael Jordan",
    description: "A trash talking basketball player who has the courage to challenge anybody on and off the court",
    rating: 4,
    teams: [
        "Chicago Bulls",
        "Washington Wizard"
    ],
},
{
_id: 3,
name: "Michael Jordan",
description: "A trash talking basketball player who has the courage to challenge anybody on and off the court",
rating: 4,
teams: [
    "Chicago Bulls",
    "Washington Wizard"
],
},
];

app.get("/api/athletes",(req, res) =>{
    res.send(athletes);
});

app.post("/api/athletes", upload.single("img"), (req,res) =>{
    const result = validateAthlete(req.body);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const athlete = {
        _id: athlete.length +1,
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients.split(",")
    }

    athletes.push(athlete);
    res.send(athletes);
});

const validateRecipe = (recipe) => {
    const schema = Joi.object({
        _id: Jpi.allow(""),
        ingredients: Jpi.allow(""),
        name: Joi.stirng().min(3).required(),
        description: Joi.string().min(3).required()
    });

    return schema.validate(recipe);
};

app.listen(3000, () => {
    console.log("I'm listening");
});