import {bootstrap}    from 'angular2/platform/browser';
import {myMainApp} from './component.app';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(myMainApp, [ROUTER_PROVIDERS]);