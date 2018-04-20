sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller'],
	function(MessageToast, Controller) {
	"use strict";

	var ControllerController = Controller.extend("UI5_uploader.controller.Browse", {
		
		f:null,
		handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
				var sMsg = "";
				var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
				if (m[1] == "200") {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Success)";
					oEvent.getSource().setValue("");
				} else {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Error)";
				}

				MessageToast.show(sMsg);
			}
		},

		handleUploadPress: function(oEvent) {
			var oFileUploader = this.getView().byId("fileUploader");
			oFileUploader.upload();
		},

		onPressParse:function(oEvent){
			$.ajax({
					type: "GET",
					// data: "POST CONTENT DATA",
					crossDomain: true,
					url: 'parse',
					// headers: {'key1':'value1','key2':'value2'}
					// contentType: "application/json",
					success: function (res, status, xhr) {
							// success code
						console.log(res)
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log("Got an error response: " + textStatus + errorThrown);
					}
			});
		},
		
		

		onDownload:function(oEvent){
			if (this.f)
				this.f.submit();
			else{
				this.f = document.createElement("form");
				this.f.setAttribute('method',"get");
				this.f.setAttribute('action',"download");
				document.body.appendChild(this.f);
				this.f.submit();
			}
			/*var singleton=function(fn){
			    var result;
			    return function() {
			        return result || ( result = fn.apply(this,arguments));
			    }
			};
			var createForm = singleton(function(){
				this.f = document.createElement("form");
				this.f.setAttribute('method',"get");
				this.f.setAttribute('action',"download");
				return document.body.appendChild(f);		   
			});
			this.f.submit();*/
		}
		
		});

	return ControllerController;

});
