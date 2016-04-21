import {bootstrap}    from 'angular2/platform/browser';
import {MyMainApp} from './component.app';
import {ROUTER_PROVIDERS} from 'angular2/router';
import { provide } from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

bootstrap(MyMainApp, [
HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	provide(AuthConfig, { useFactory: () => {
    return new AuthConfig();
  }}),
	AuthHttp
]);