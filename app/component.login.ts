import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { contentHeaders } from './headers';

@Component({
  selector: 'login',
  templateUrl:  './app/templates/login.html',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
})
export class loginComponent {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    
	if(username == 'user' && password == 'password'){
		localStorage.setItem('jwt', 1);
		console.log("Good login");
		this.router.parent.navigateByUrl('/home');
	} else {
		console.log("bad login");
	}
	
	/*this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().user_id);
          this.router.parent.navigateByUrl('/home');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );*/
  }

  signup(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/signup');
  }
}