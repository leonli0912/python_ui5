sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/library",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"],function(Controller,mobileLibrary,JSONModel,Device){
	"use strict";

	var SplitAppMode = mobileLibrary.SplitAppMode;
	var oRouter;
	return Controller.extend("UI5_uploader.controller.TopicMasterController",{
		onInit:function(){
			var oModel = new JSONModel();
			oModel.setSizeLimit(10000);
			this.getView().setModel(oModel);
			oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("index").attachPatternMatched(this._onMatched,this);
//			oRouter.getRoute("topicId").attachPatternMatched(this._onTopicMatched,this);
		},

		_onTopicMatched:function(event){
			try{
				this.showMasterSide();
			}catch(e){
				jQuery.sap.log.error(e);
			}

		},
		_onMatched:function(){
			var splitApp = this.getView().getParent().getParent();
			splitApp.setMode(SplitAppMode.ShowHideMode);

			if(Device.system.desktop){
				jQuery.sap.delayedCall(0, this, function () {
//				this.getView().byId("searchField").getFocusDomRef().focus();
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