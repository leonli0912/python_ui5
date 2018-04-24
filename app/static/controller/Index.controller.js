sap.ui.define(['sap/ui/core/mvc/Controller'
], function(Controller) {
	"use strict";

	return Controller.extend("UI5_uploader.controller.Index", {
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {

			
		},
		onGotoLoad:function(oEvt){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("load");
		}
	});
});
