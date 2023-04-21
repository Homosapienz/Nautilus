import { Component } from '@angular/core';
import { User } from './Models/User';
import { LoadingService } from './services/loading.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Nautilus';
  isLoading$  = this.loadService.isLoading$;
  public user: User;

  constructor(private loadService: LoadingService, private apiService: ApiService) {

    this.user = new User();
    this.user.Uid = 'CO30452';
    this.user.Name = 'Antonio';  
    this.user.LastName = 'Di Martino';
  }
}
