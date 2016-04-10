import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router'; 
import { Http, HTTP_PROVIDERS  } from 'angular2/http';

import { LoggedInRouterOutlet } from './LoggedInOutlet';
import { homeComponent } from './component.index';
import { cartComponent } from './component.cart';
import { loginComponent } from './component.login';
import { signupComponent } from './component.signup';
import { MovieDetailComponent } from './component.movie-detail';
import { MovieService } from './movie.service';


@Component({
    selector: 'helloWorld',
	template: `
	<router-outlet></router-outlet>
	`,
	styleUrls: ['./app/css/myShopComponent.css'],
	directives: [LoggedInRouterOutlet],
	providers: [MovieService, HTTP_PROVIDERS]
})

@RouteConfig([
	{
		path: '/',
		redirectTo: ['/Homepage']
	},
	{
		path: '/home',
		component: homeComponent,
		name: 'Homepage'
	},
	{
		path: '/cart',
		component: cartComponent,
		name: 'MyFirstCart'
	},
	{
		path: '/detail/:id',
		component: MovieDetailComponent,
		name: 'MovieDetail'
	},
	{
		path: '/login',
		component: loginComponent,
		name: 'Login'
	},
	{
		path: '/signup',
		component: signupComponent,
		name: 'Signup'
	}
])

// Make cart keep track of amount in cart
export class myMainApp {
}
