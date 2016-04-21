import {MOVIES} from './mock-movies';
import {ACCEPTED} from './mock-accepted';
import {REJECTED} from './mock-rejected';

import {Injectable} from 'angular2/core';
import {Movie} from './movie';
import {Notice} from './notice';
import {URLSearchParams, Http, Response, Headers } from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class MovieService {

	constructor(public authHttp: AuthHttp) {
	}

	getMovies() {
		return this.authHttp
                .get('http://localhost:8080/CrazyMovies/api/getAllMovies')
				.toPromise()
				.then(response => <Movie[]> response.json(), this.handleError)
				.then(data => { return data; });
	}

	getQueueMovies() {
		var search = new URLSearchParams();
		/*
		search.set('id', localStorage.getItem('id'));
		search.set('name', localStorage.getItem('name'));
		search.set('email', localStorage.getItem('email'));
	*/
		return this.authHttp
                .get('http://localhost:8080/CrazyMovies/api/getQueueMovies', {search})
				.toPromise()
				.then(response => <Movie[]> response.json(), this.handleError)
				.then(data => { return data; });
	}

	getMovieById(id : number) {
		var search = new URLSearchParams();
		/*
		search.set('id', String(id));
		*/
		return this.authHttp
                .get('http://localhost:8080/CrazyMovies/api/getMovieById', {search})
                .toPromise()
                .then((response) => <Movie> response.json(), this.handleError)
				.then(data => { console.log(data); return data; });
	}

	getNotices() {
		var search = new URLSearchParams();
		/*
		search.set('id', localStorage.getItem('id'));
		search.set('name', localStorage.getItem('name'));
		search.set('email', localStorage.getItem('email'));
		*/
		return this.authHttp
                .get('http://localhost:8080/CrazyMovies/api/getNotices', {search})
                .toPromise()
                .then((response) => response.json());
	}

	getAccepted() {
		var search = new URLSearchParams();
		/*
		search.set('id', localStorage.getItem('id'));
		search.set('name', localStorage.getItem('name'));
		search.set('email', localStorage.getItem('email'));
		*/
		return this.authHttp
                .get('http://localhost:8080/CrazyMovies/api/getAcceptNotices', {search})
                .toPromise()
                .then((response) => response.json());
	}

	getRejected() {
		/*var search = new URLSearchParams();

		search.set('id', localStorage.getItem('id'));
		search.set('name', localStorage.getItem('name'));
		search.set('email', localStorage.getItem('email'));
		*/
		return this.authHttp
                .get('http://localhost:8080/CrazyMovies/api/getRejectNotices', {})
                .toPromise()
                .then((response) => response.json());
	}

	addNotice(movie : Movie, status: string) {
		var search = new URLSearchParams();

		search.set('id', '0');
		search.set('movie_id', String(movie.id));
		search.set('user_id', localStorage.getItem('id'));
		search.set('status', status);

		let headers = new Headers({ 'Content-Type': 'application/json' });

		this.authHttp
			.post('http://localhost:8080/CrazyMovies/api/addNotice', '', {search})
			.subscribe(
				response => {
				  console.log('successful add');
				},
				error => {
				  alert(error.text());
				  console.log(error.text());
				}
			  );
	}

	editNotice(notice : Notice) {
		var search = new URLSearchParams();

		//search.set('id', String(notice.id));
		search.set('movie_id', String(notice.movie_id));
		search.set('user_id', String(notice.user_id));
		search.set('status', notice.status);

		this.authHttp
			.post('http://localhost:8080/CrazyMovies/api/editNotice', '', {search})
			.subscribe(
				response => {
				  console.log('successful edit');
				},
				error => {
				  alert(error.text());
				  console.log(error.text());
				}
			  );
	}

	deleteNotice(notice : Notice) {
		var search = new URLSearchParams();

		//search.set('id', String(notice.id));
		search.set('movie_id', String(notice.movie_id));
		search.set('user_id', String(notice.user_id));
		search.set('status', notice.status);

		this.authHttp
			.delete('http://localhost:8080/CrazyMovies/api/deleteNotice', {search})
			.subscribe(
				response => {
				  console.log('successful delete');
				},
				error => {
				  alert(error.text());
				  console.log(error.text());
				}
			  );
	}

	private handleError (error: any) {
	  // in a real world app, we may send the error to some remote logging infrastructure
	  // instead of just logging it to the console
	  console.error(error);
	  return Promise.reject(error.message || error.json().error || 'Server error');
	}
}