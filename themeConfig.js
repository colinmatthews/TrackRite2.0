/*=========================================================================================
  File Name: themeConfig.js
  Description: Theme configuration
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - Clean Vue.js Dashboard Admin Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

// MAIN COLORS - VUESAX THEME COLORS
let colors = {
	primary: '#7367F0',
	success: '#2AC97A',
	danger: '#F2135D',
	warning: '#CFC357',
	dark: '#10100E',
}

import Vue from 'vue'
import Vuesax from 'vuesax'
Vue.use(Vuesax, { theme:{ colors } });


// CONFIGS
const themeConfig = {
	theme: 'semi-dark',						        // options[String]: 'light'(default), 'dark', 'semi-dark'
	sidebarCollapsed: true,			    // options[Boolean]: true, false(default)
	navbarColor: "#fff",				      // options[String]: HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
	navbarType: "floating",				    // options[String]: floating(default) / static / sticky / hidden
	footerType: "static",				      // options[String]: static(default) / sticky / hidden
	routerTransition: 'zoom-fade',		// options[String]: zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
	disableCustomizer: false,			    // options[Boolean]: true, false(default)
	hideScrollToTop: false,				    // options[Boolean]: true, false(default)
	disableThemeTour: false,					// options[Boolean]: true, false(default)

  // NOTE: themeTour will be disabled in screens < 1200. Please refer docs for more info.
}

export default themeConfig
