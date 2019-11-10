/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: '/projects',
    name: 'Projects',
    slug: 'projects',
    icon: "FileIcon",
  },
  {
    url: '/marketplace',
    name: 'Marketplace',
    slug: 'marketplace',
    icon: "FileIcon",
  },
  {
    url: '/reports',
    name: 'Reports',
    slug: 'reports',
    icon: "FileIcon",
  },
  {
    url: '/checkout',
    name: 'Checkout',
    slug: 'checkout',
    icon: "FileIcon",
  },
  {
    url: '/admin',
    name: 'Admin',
    slug: 'admin',
    icon: "FileIcon",
  },

]
