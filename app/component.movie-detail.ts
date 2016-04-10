import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
	selector: 'movie-detail',
	template: `
	<div *ngIf="selectedMovie">
      <h2>{{selectedMovie.name}} details!</h2>
      <div><label>id: </label>{{selectedMovie.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectedMovie.name" placeholder="name"/>
      </div>
    </div>
	<button (click)="goBack()">Back </button>
	`
})
export class MovieDetailComponent{
	@Input()
	selectedMovie: Movie;
	
	constructor(
		private _movieService: MovieService,
		private _routeParams: RouteParams) {
	}
	
	ngOnInit(){
		let id = +this._routeParams.get('id');
		this._movieService.getMovieById(id)
		  .then(movie => this.selectedMovie = movie);
	}
	
	goBack() {
		window.history.back();
	}
	/*
	  
	  


*/
}