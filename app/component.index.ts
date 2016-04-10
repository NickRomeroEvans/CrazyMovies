import {Component, OnInit} from 'angular2/core';
import {Movie} from './movie';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {MovieService} from './movie.service';
import {MovieDetailComponent} from './component.movie-detail';

@Component({
    templateUrl: `./app/templates/index.html`, 
	styleUrls: ['./app/css/myShopComponent.css'],
	directives: [MovieDetailComponent, ROUTER_DIRECTIVES]
})
// Make cart keep track of amount in cart
export class homeComponent implements OnInit {
	public cartIndex = [];
	public rejectIndex = [];
	name = "Nick Evans";
	times = 0;
	premiumAccount = false;
	public selectedMovie : Movie;
	
	public movieList : Movie[] = [];
	
	mouseClickedMe(event){
		this.times++;
	}
	
	constructor(private _movieService: MovieService, private _router: Router) { }
	
	getMovies(){
		this._movieService.getMovies().then(movies => this.movieList = movies);
	}
	
	ngOnInit(){
		this.getMovies();
	}
	
	selectMovie(movie : Movie){
		console.log(movie.name + " was selected");
		this.selectedMovie = movie;
	}
	
	gotoDetail(movie: Movie) {
		let link = ['MovieDetail', { id: movie.id }];
		this._router.navigate(link);
	}
	
	acceptMovie(movie : Movie){
		this._movieService.addAccepted(movie);
	}
	
	rejectMovie(movie : Movie){
		this._movieService.addRejected(movie);
	}
	
	/* // TODO: Add User id to acceptMovie
	acceptMovie(movie : Movie){
		console.log(movie.name + " was accepted");
		this.cartIndex.push(movie.name);
		localStorage.cartItems = JSON.stringify(this.cartIndex);
	}
	
		// TODO: Add User id to acceptMovie
	rejectMovie(movie : Movie){
		console.log(movie.name + " was rejected");
		this.rejectIndex.push(movie.name);
		console.log(this.rejectIndex);
		localStorage.rejectItems = JSON.stringify(this.rejectIndex);
	}*/
}
