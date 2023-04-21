import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MenuItem, MenuFlatNode, MENU_DATA } from '../Models/Menu';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private _transformer = (node: MenuItem, level: number) => {
    return {
      expandable: !!node.Children && node.Children.length > 0,
      name: node.ItemText,
      link: node.RoutingValue,
      image: node.IconName,
      level: level
    };
  };

  treeControl = new FlatTreeControl<MenuFlatNode>(
    node => node.level,
    node => node.expandable,
  );


  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.Children
  );

  menuItems = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.menuItems.data = MENU_DATA;
  }

  hasChild = (_: number, node: MenuFlatNode) => node.expandable;
}
