sap.ui.define([
	"sap/ui/core/UIComponent",
	"UI5_uploader/controller/Models"
], function(UIComponent, models) {
	"use strict";

	return UIComponent.extend("UI5_uploader.Component", {

		metadata: {
			manifest: "json",
			includes : [
					"css/style.css"
				]
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();
		},
		createContent: function() {
			// create root view
			return sap.ui.view("index", {
				viewName: "UI5_uploader.view.Index",
				type: "XML"
			});
		}
	});
});
