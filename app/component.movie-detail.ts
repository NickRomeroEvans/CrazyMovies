import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
	selector: 'movie-detail',
	template: `
	<div *ngIf="selectedMovie">
      <h2>{{selectedMovie.title}} details!</h2>
      <div><label>id: </label>{{selectedMovie.id}}</div>
      <div><label>Title: </label>{{selectedMovie.title}}</div>
    </div>
	`
})
export class MovieDetailComponent {
	@Input()
	selectedMovie: Movie;

	constructor(
		private _movieService: MovieService,
		private _routeParams: RouteParams) {
	}

	ngOnInit() {
		let id = +this._routeParams.get('id');
		console.log(id + ' Movie Detail');
	}

	goBack() {
		window.history.back();
	}

}