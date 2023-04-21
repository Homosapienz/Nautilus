import { Component, OnInit, } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit  {

  public isQueryPage: boolean = false;

  constructor(public router: Router) {
    router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        let p = router.config
          .find(r => r.component?.name == QueryComponent.name)?.path;
        this.isQueryPage = event.url == `/${p}`;
      }
    });
  }

  ngOnInit(): void {
    
  }


}
