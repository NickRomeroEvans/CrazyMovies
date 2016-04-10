import {MOVIES} from "./mock-movies";
import {ACCEPTED} from "./mock-accepted";
import {REJECTED} from "./mock-rejected";

import {Injectable} from 'angular2/core';
import {Movie} from './movie';

@Injectable()
export class MovieService{
	getMovies(){
		return Promise.resolve(MOVIES);
	}
	
	getMovieById(id : number){
		 return Promise.resolve(MOVIES).then(movies => movies.filter(movie => movie.id === id)[0]);
	}

	getAccepted(){
		return Promise.resolve(ACCEPTED);
	}
	
	getRejected(){
		return Promise.resolve(REJECTED);
	}
	
	addAccepted(movie : Movie){
		console.log(movie.name + " was accepted");
		ACCEPTED.push(movie);
		console.log(ACCEPTED);
	}
	
	addRejected(movie : Movie){
		console.log(movie.name + " was rejected");
		REJECTED.push(movie);
		console.log(REJECTED);
	}
}