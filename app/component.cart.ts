import {Component, Input, OnInit } from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Movie} from './movie';
import {MovieService} from './movie.service';
import {Notice} from './notice';
//
@Component({
    template: `
	<div id="accepted">
		<h3> Accepted: </h3>
		<ul>
			<li *ngFor="#acceptItem of accepted"> {{acceptItem.movie_title}}</li>
		</ul>
	</div>
	<br>
	<div id="Rejected">
		<h3> Rejected </h3>
		<ul>
			<li *ngFor="#rejectItem of rejected"> {{rejectItem.movie_title}} </li>
		</ul>
	</div>
	<button (click)="goBack()">Back </button>
	`,
	providers: [MovieService]
})

export class CartComponent {
	accepted : Notice[];
	rejected : Notice[];

	constructor(private _movieService: MovieService) { }

	getAccepted() {
		this._movieService.getAccepted().then(movies => this.accepted = movies);
	}

	getRejected() {
		this._movieService.getRejected().then(movies => this.rejected = movies);
	}

	ngOnInit() {
		this.getAccepted();
		this.getRejected();
	}

	goBack() {
	  window.history.back();
	}
}