import { Component } from '@angular/core';
import { User } from '../user';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-tprofile',
  templateUrl: './tprofile.component.html',
  styleUrls: ['./tprofile.component.sass']
})
export class TprofileComponent {
  user: User = {
    id: 2,
    username: "hello",
    first_name: "hello",
    last_name: "world",
    is_tutor: true,
    rating: 10.0,
    subjects: [{name: "Reading"}, {name: "Math"}],
    email: "hello@world.com",
    phone: "000-000-0000",
    about: "Foo bar, foo bar. Foo foo foo, foo bar bar.",
    grade: 0
  }

  constructor(private profileService: ProfileService) { 
    this.profileService.getProfile()
      .subscribe(user => this.user = user);
  }
}
