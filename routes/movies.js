const express =  require("express");
const app = express();
const Movie = require("../models/movie");

app.get("/movie", (req,res)=> {
    Movie
        .find()
        .then((moviesData)=> {
            res.render("movies", {moviesHbs: moviesData});
        })
        .catch((err)=> {
            res.send("error");
        })
})

app.get("/movie/detail/:movieId", (req,res)=> {
    Movie
        .findById(req.params.movieId)
        .then((movieData)=> {
            res.render("movie", {movieHbs: movieData});
        })
        .catch((err)=> {
            res.send("error");
        })
})

app.get("/movie/search", (req,res)=> {
    res.render("movieSearch");
})

app.get("/movie/search/results", (req,res)=> {
    console.log(req.query.title)
    Movie
        .find({title: req.query.title})
        .then((moviesData)=> {
            res.render("movies", {moviesHbs: moviesData});
        })
        .catch((err)=> {
            console.log("error", err);
        })
})

app.get("/movie/create", (req,res)=> {
    res.render("createMovie");
})

app.post("/movie/create", (req,res)=> {
    console.log(req.body);
    Movie
        .create({
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            duration: req.body.duration
        })
        .then((movie)=> {
            res.redirect(`/movie/detail/${movie._id}`);
        })
        .catch((err)=> {
            res.send("error");
        })
    // res.render("createMovie");
})

app.get("/movie/delete/:id", (req,res)=> {
    Movie
        .findByIdAndDelete(req.params.id)
        .then((movie)=> {
            res.redirect("/movie")
        })
        .catch(err=> {
            console.log("Err", err)
        })
})
app.get("/movie/update/:id", (req,res)=> {
    Movie
        .findById(req.params.id)
        .then((movieData)=> {
            res.render("updateMovie", {movieHbs: movieData});
        })
        .catch((err)=> {
            res.send("Error");
        })
})

app.post("/movie/update/:id", (req,res)=> {
    Movie
        .findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            duration: req.body.duration,
        })
        .then((movie)=> {
            res.redirect(`/movie/detail/${movie._id}`);
        })
        .catch((err)=> {
            res.send("err");
        })

})
module.exports = app;