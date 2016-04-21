import { Component } from 'angular2/core';
import {ROUTER_PROVIDERS, Router, RouterOutlet, RouteConfig, RouterLink, Location, ROUTER_DIRECTIVES } from 'angular2/router';
import { URLSearchParams, Http, HTTP_PROVIDERS, Headers   } from 'angular2/http';
import { LoggedInRouterOutlet } from './LoggedInOutlet';
import { HomeComponent } from './component.index';
import { CartComponent } from './component.cart';
import { NotLoginComponent } from './component.notlogin';
import { MovieDetailComponent } from './component.movie-detail';
import { MovieService } from './movie.service';
import 'rxjs/Rx';
import { AUTHCLIENT } from './auth-client';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;


@Component({
    selector: 'app',
	templateUrl: './app/templates/app.html',
	styleUrls: ['./app/css/myShopComponent.css'],
	directives: [LoggedInRouterOutlet, RouterLink],
	providers: [MovieService, HTTP_PROVIDERS]
})

@RouteConfig([
	{
		path: '/home',
		component: HomeComponent,
		name: 'Homepage'
	},
	{
		path: '/',
		component: NotLoginComponent,
		name: 'NotLoginComponent'
	},
	{
		path: '/cart',
		component: CartComponent,
		name: 'Cart'
	},
	{
		path: '/detail/:id',
		component: MovieDetailComponent,
		name: 'MovieDetail'
	}
])

// Make cart keep track of amount in cart
export class MyMainApp {

	constructor(public router: Router, public authHttp: AuthHttp) {
	}

	lock = new Auth0Lock(AUTHCLIENT.id, AUTHCLIENT.name);
	jwtHelper: JwtHelper = new JwtHelper();

	login() {
		var self = this;
		this.lock.show({
			authParams: {
				scope: 'openid email name'
			},
			gravatar:  false,
			disableSignupAction: true
			}
			,
			(err: string, profile, id_token: string) => {
			if (err) {
			  throw new Error(err);
			}

			localStorage.setItem('profile', JSON.stringify(profile));
			localStorage.setItem('id_token', id_token);

			var search = new URLSearchParams();

			search.set('id', '0');
			search.set('name', profile.name);
			search.set('email', profile.email);
			search.set('facebookId', profile.user_id.split('|')[1]);

			this.authHttp
                .get('http://localhost:8080/CrazyMovies/api/loginFB', {search})
                .toPromise()
                .then((response) => {

					localStorage.setItem('name', response.json().name);
					localStorage.setItem('email', response.json().email);
					localStorage.setItem('id', response.json().id);

					self.router.navigateByUrl('/home');
				});

		});
    }

    logout() {
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
		localStorage.removeItem('id');
		localStorage.removeItem('email');
		localStorage.removeItem('name');

		this.loggedIn();
    }

    loggedIn() {
      return tokenNotExpired();
    }
}
