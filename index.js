class Movie {
    constructor(title) {
        this.title = title;
    }
}

class User {
    constructor() {
        this.name = this.randomRealName();
    }

    randomRealName() {
        const firstNames = ['Mara', 'Sommy', 'Uche', 'Ola', 'Michael', 'Olivia', 'David', 'Sophia'];
        const lastNames = ['Nweke', 'Ike', 'Williams', 'Femi', 'Henry', 'Ekete', 'Chuks', 'Aneke'];

        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return `${randomFirstName} ${randomLastName}`;
    }
}

const randomUser = new User();

console.log('\nUsername:', randomUser.name);

class MovieStore {
    #Movies;
    #Rented;

    constructor(title) {
        this.title = title;
        this.#Movies = [];
        this.#Rented = {
            [randomUser.name]: []
        };
    }

    addMovies({ title, totalNumber = 1 }) {
        const _title = title.trim();
        const movie = new Movie(_title);

        const _movie = {
            movie,
            totalNumber
        };

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

        const userMovies = this.#Rented[randomUser.name];
        this.#Rented[randomUser.name] = userMovies.filter((_movie) => _movie !== movie.movie.title.toLowerCase());

        this.#Movies.map((_movie) => {
            if (_movie.movie.title === title) {
                _movie.totalNumber = _movie.totalNumber + 1;
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
console.log('Welcome to Joy of the Town Movie Store');

console.log('*******************Adding new movies to the store*******************\n');
movieStore.addMovies({ title: 'Lift', totalNumber: 13 });
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
