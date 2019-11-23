export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer'
        },
        {
            name: 'Customers',
            url: '/dashboard/customer',
            icon: 'icon-drop',
        },
        {
            name: 'Inventory',
            url: '/dashboard/inventory',
            icon: 'icon-drop',
        },
        {
            name: 'Suppliers',
            url: '/dashboard/suppliers',
            icon: 'icon-user',
        },
        {
            name: 'Employees',
            url: '/theme/typography',
            icon: 'icon-people',
        },
        {
            name: 'Manage Items',
            url: '/theme/typography',
            icon: 'icon-wrench',
            children: [
                {
                    name: 'Add New Item',
                    url: '/buttons/buttons',
                    icon: 'icon-plus',
                },
                {
                    name: 'Bulk Upload',
                    url: '/buttons/buttons',
                    icon: 'icon-cloud-upload',
                },
                {
                    name: 'Manage Item',
                    url: '/buttons/buttons',
                    icon: 'icon-settings',
                },
                {
                    name: 'Item List',
                    url: '/buttons/buttons',
                    icon: 'icon-list',
                },                
                {
                    name: 'Manage Attribute',
                    url: '/dashboard/manage-attributes',
                    icon: 'icon-tag',
                },
                {
                    name: 'Manage UOM',
                    url: '/dashboard/manage-uom',
                    icon: 'icon-calculator',
                },
                {
                    name: 'Attribute Value',
                    url: '/dashboard/manage-attribute-value',
                    icon: 'icon-cursor',
                }
            ]
        },
        {
            name: 'Manage Purchase',
            url: '/theme/typography',
            icon: 'icon-pie-chart',
        },
        {
            name: 'Manage Orders',
            url: '/theme/typography',
            icon: 'icon-basket-loaded',
        },
        {
            name: 'Manage Sales',
            url: '/theme/typography',
            icon: 'icon-handbag',
        },
        {
            name: 'Report',
            url: '/theme/typography',
            icon: 'icon-doc',
        }       
    ]
};
