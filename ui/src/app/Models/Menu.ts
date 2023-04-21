export interface MenuItem {

    ItemText: string;
    RoutingValue: string;
    IconName: string;
    Children?: MenuItem[];
}

export interface MenuFlatNode {
    expandable: boolean;
    name: string;
    link: string;
    image: string;
    level: number;
}

export const MENU_DATA: MenuItem[] = [
    {
      ItemText: 'HomePage',
      IconName: 'home',
      RoutingValue: ''
    },
    {
      ItemText: 'Query',
      IconName: 'image_search',
      RoutingValue: '/query',
      Children: [
        {
          ItemText: 'Taxon',
          IconName: 'biotech',
          RoutingValue: '/query/taxon'
        },
        {
          ItemText: 'Assemblage',
          IconName: 'visibility',
          RoutingValue: '/query/assemblage'
        },
        {
            ItemText: 'Bibliography',
            IconName: 'menu_book',
            RoutingValue: '/query/bibliography'
            
        }
      ]
    },
    {
      ItemText: 'Insert Taxon',
      IconName: 'post_add',
      RoutingValue: '/'
    },
    {
      ItemText: 'Utilities',
      IconName: 'build',
      RoutingValue: '/utilities'
    }
  ];

export interface IBreadcrumb {
  url: string;
  label: string;
}