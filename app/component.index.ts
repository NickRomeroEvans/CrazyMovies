import {Component, OnInit} from 'angular2/core';
import {Movie} from './movie';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {MovieService} from './movie.service';
import {MovieDetailComponent} from './component.movie-detail';

@Component({
    templateUrl: `./app/templates/index.html`,
	styleUrls: ['./app/css/myShopComponent.css'],
	directives: [ MovieDetailComponent, ROUTER_DIRECTIVES]
})

export class HomeComponent implements OnInit {
	public selectedMovie : Movie;

	public movieList : Movie[] = [];

	constructor(private _movieService: MovieService, private _router: Router) { }

	// Get all movies that the user hasn't marked
	getMovies() {
		this._movieService.getQueueMovies().then(movies => {
			this.movieList = movies;
			if (this.movieList.length > 0) {
				this.selectedMovie = this.movieList[0];
			}
		});
	}

	ngOnInit() {
		this.getMovies();
	}

	selectMovie(movie : Movie) {
		console.log(movie.title + ' was selected');
		this.selectedMovie = movie;
	}

	noticeMovie(movie : Movie, notice: string) {
		if (this.movieList.length > 0) {
			this._movieService.addNotice(movie, notice);
			this.movieList.splice(0, 1);
			if (this.movieList.length > 0) {
				this.selectedMovie = this.movieList[0];
			} else {
				this.selectedMovie = null;
			}
		}
	}

}
