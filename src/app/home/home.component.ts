import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';
import { User } from '../_models';


@Component({
  selector: 'app-root',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.sass']
})
export class HomeComponent {
    loading = false;
    currentUser: User;

    constructor(
      private authenticationService: AuthenticationService

    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {

    }
}
