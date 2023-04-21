import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { IBreadcrumb } from '../Models/Menu';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {  }

  public breadcrumbs?: IBreadcrumb[];

  ngOnInit(): void {
    this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.build(this.activatedRoute.root);
    });
  }

  private build(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {

    let path = route.routeConfig && route.routeConfig.data ?
    route.routeConfig.path! : "";

    let label = route.routeConfig && route.routeConfig.data ?
    route.routeConfig.data['breadcrumb'] : ""

    const lastRoutePart = path.split('/').pop();
    const isLastPartDynamic = lastRoutePart?.startsWith(':');

    if(isLastPartDynamic && !!route.snapshot){
      const param = lastRoutePart?.substring(1);
      path = path?.replace(lastRoutePart!, route.snapshot.params[param!]);
      label = route.snapshot.params[param!];
    }

    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: IBreadcrumb = {
      label: label,
      url: nextUrl
    };

    const newBreadcrumbs = breadcrumb.label ? 
      [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if(route.firstChild) {
      return this.build(route.firstChild, nextUrl, newBreadcrumbs);
    }   
    
    return newBreadcrumbs;
  }

}
