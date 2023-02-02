//Alan Yuan 2/1/22 WebDev period 7-8 Even
// Programs communicate with each other through their backends. If one part of the backend doesn't work then the rest of the program would not work as intended.
//With this project I became able to learn how to use the concepts from the backend tutorials into a real-life situation. 
//This project could be further exntended by adding more songs.

const express = require('express');
const app = express();
app.use(express.json());

const songs = [
    {id: 1, genre: 'Jazz', name: 'What a Wonderful World', year: 1967, month: 9},
    {id: 2, genre: 'Blues', name: 'The Thrill is Gone', year: 1969, month: 12},
    {id: 3, genre: 'Rap', name: '712PM', year: 2022, month: 4},
    {id: 4, genre: 'Classical', name: 'Moonlight Sonata', year: 1801, month: 6},
    {id: 5, genre: 'Hip Hop', name: 'Hotel Lobby', year: 2022, month: 5},
    {id: 6, genre: 'Pop', name: 'Billie Jean', year: 1983, month: 1},
    {id: 7, genre: 'Rock', name: 'Bohemian Rhapsody', year: 1975, month: 10},
    {id: 8, genre: 'Electronic', name: 'Electric', year: 2021, month: 5},
];

// Get
app.get('/', (req, res) => 
{
    res.send('By Alan Yuan ');
});
app.get('/songs', (req, res) => 
{
    res.send(songs);
});
app.get('/songs/:id', (req, res) => 
{
    const song = songs.find(c => c.id === parseInt(req.params.id));
    if (!song) 
    {
        res.status(404).send("Song(s) with the given ID doesn't exist");
    } else 
    {
        res.send(song);
    }
});
app.get('/songs/year/:year', (req, res) => 
{
    let Year = [];
    for (let song of songs) 
    {
        if (song.year == req.params.year) 
        {
            Year.push(song);
        }
    }
    if (Year.length !== 0)
    {
        res.send(Year);
    } else 
    {
        res.status(404).send("Songs(s) with the given year were not found");
    }
});
app.get('/songs/month/:month', (req, res) => 
{
    let Months = [];
    for (let song of songs) 
    {
        if (song.month == req.params.month) 
        {
            Months.push(song);
        }
    }
    if (Months.length !== 0) 
    {
        res.send(Months);
    } else 
    {
        res.status(404).send("Song(s) with the given month was not found");
    }
});

// Delete
app.delete('/songs', (req, res) => 
{
    FirstSong = songs[req.body.id - 1];
    index = songs.indexOf(FirstSong);
    if (FirstSong !== undefined) 
    {
        songs.splice(index, 1);
        res.send(FirstSong);
    } else 
    {
        res.status(404).send("Song with the given ID does not exist");
    }
})

// Post
app.post('/songs', (req, res) => 
{
    let song;
    if (req.body.genre.length >= 3 && req.body.name.length >= 3) 
    {
        song = 
        {
            id: songs.length + 1,
            genre: req.body.genre,
            name: req.body.name,
            year: req.body.year,
            month: req.body.month
        }
        songs.push(song);
        res.send(songs);
    } else 
    {
        res.send('Genre, name, year, & month are needed & Genre & name have to be at least 3 characters long');
    }
});

// Put
app.put('/songs/:id', (req, res) => 
{
    const FirstSong = songs.find(c => c.id === parseInt(req.params.id));
    let newSong;
    if (req.body.genre.length >= 3 && req.body.name.length >= 3) 
    {
        newSong = 
        {
            id: FirstSong.id,
            genre: req.body.genre,
            name: req.body.name,
            year: req.body.year,
            month: req.body.month
        }
        songs[FirstSong.id - 1] = newSong;
        res.send(newSong);
    } else 
    {
        res.send('Genre, name, year, & month are needed & Genre&name have to be at least 3 characters long');
    }
});

app.listen(3000, () => 
{
    console.log('Listening on port 3000 ...');
})