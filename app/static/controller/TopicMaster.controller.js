sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/library",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"],function(Controller,mobileLibrary,JSONModel,Device){
	"use strict";

	var SplitAppMode = mobileLibrary.SplitAppMode;
	return Controller.extend("UI5_uploader.controller.MasterController",{
		onInit:funtion(){
			var oModel = new JSONModel();
			oModel.setSizeLimit(10000);
			this.getView().setModel(oModel);

			this.getRouter().getRoute("topic").attachPatternMatched(this._onMatched,this);
			this.getRouter().getRoute("topicId").attachPatternMatched(this._onTopicMatched,this);
		},

		_onTopicMatched:funtion(event){
			try{
				this.showMasterSide();
			}catch(e){
				jQuery.sap.log.error(e);
			}

		},
		_onMatched:funtion(){
			var splitApp = this.getView().getParent().getParent();
			splitApp.setMode(SplitAppMode.ShowHideMode);

			if(Device.system.desktop){
				jQuery.sap.delayedCall(0, this, function () {
				this.getView().byId("searchField").getFocusDomRef().focus();
				});				
			}			
		},
		onNodeSelect:function(){},
		showMasterSide : function() {
			var splitApp = this.getSplitApp();
			splitApp.setMode(SplitAppMode.ShowHideMode);
		},
		getSplitApp: function() {
			return this.getView().getParent().getParent();
		}
	});
})