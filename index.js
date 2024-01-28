class Movie {
    constructor(title) {
        this.title = title;
    }
}

class User {
    constructor() {
        this.name = this.random();
    }

    random() {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let count = 0; count < 10; count += 1) {
            const randomPosition = Math.floor(Math.random() * charset.length);
            randomString += charset.substring(randomPosition, randomPosition + 1);
        }    
        return randomString;
    }
}

const randomUser = new User();

console.log('\nUser has been generated with random username as: ', randomUser.name);

class MovieStore {
    #Movies;
    #Rented;

    constructor(title) {
        this.title = title;
        this.#Movies = []; //movie list in the store
        this.#Rented = {
            [randomUser.name]: [] // we only have one user with a randomly generated username as the name
        };
    }

    addMovies({ title, totalNumber = 1 }) {
        const _title = title.trim();
        const movie = new Movie(_title);

        const _movie = {
            movie,
            totalNumber
        };
        // This is not considered when the movie already exists
        this.#Movies.push(_movie);
    }

    getMovies() {
        return this.#Movies;
    }

    getMoviesByTitle(title) {
        const movie = this.#Movies.find(_movie => _movie.movie.title.toLowerCase() === title.toLowerCase().trim());
        return movie;
    }

    rent(title) {
        const movie = this.getMoviesByTitle(title);
        if (!movie || !movie.totalNumber) {
            return 'Movie not found or not available';
        }

        movie.totalNumber = movie.totalNumber - 1;

        this.#Rented[randomUser.name].push(movie.movie.title.toLowerCase());

        const { totalNumber, ..._movie } = movie;
        return _movie;
    }

    returnMovie(title) {
        const movie = this.getMoviesByTitle(title);
        if (!movie || !movie.totalNumber) {
            return 'Movie not found or not available';
        }

        // this holds all the movies rented by our random user
        const userMovies = this.#Rented[randomUser.name];

        // remove the movie with the provided title from the list of the user's movies
        this.#Rented[randomUser.name] = userMovies.filter((_movie) => _movie !== movie.movie.title.toLowerCase());

        this.#Movies.map((_movie) => {
            if (_movie.movie.title === title) {
                _movie.totalNumber = _movie.totalNumber + 1; //increase of total number of available movies
                return _movie;
            }
        });

        return this.getMovies();
    }

    getRentedMovies() {
        return this.#Rented;
    }
}

console.log('*******************A new Movie Store********************');
const movieStore = new MovieStore('Joy of the Town');
console.log('Successfully made a New Movie Store in Town');

console.log('*******************Adding new movies to the store*******************\n');
movieStore.addMovies({ title: 'Lift', totalNumber: 10 });
movieStore.addMovies({ title: '60 Minutes', totalNumber: 4 });
movieStore.addMovies({ title: 'Wonka', totalNumber: 2 });
movieStore.addMovies({ title: 'Home', totalNumber: 15 });
movieStore.addMovies({ title: 'Gifted', totalNumber: 9 });
console.log('Show available movies\n');
console.log(movieStore.getMovies());

console.log('*****************Renting Movies from the Store********************\n');
const rented1 = movieStore.rent('Gifted');
console.log('Rented Successfully', rented1);

const rented2 = movieStore.rent('Wonka');
console.log('Rented Successfully', rented2);

const rented3 = movieStore.rent('Home');
console.log('Rented Successfully', rented3);

const rented4 = movieStore.rent('Lift');
console.log('Rented Successfully', rented4);

console.log('\nGetting all Movies');
console.log(movieStore.getMovies());

console.log('Show rented Movies\n');
console.log(movieStore.getRentedMovies());

console.log('****************Returning rented Movies*******************');
movieStore.returnMovie('Gifted');

movieStore.returnMovie('Lift');

console.log('Getting all Movies');
console.log(movieStore.getMovies());
