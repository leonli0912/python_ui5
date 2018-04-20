sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller'],
	function(MessageToast, Controller) {
	"use strict";

	var ControllerController = Controller.extend("UI5_uploader.controller.Browse", {
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
					//data: "POST CONTENT DATA",
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
			var f = document.createElement("form");
			f.setAttribute('method',"get");
			f.setAttribute('action',"download");
			document.body.appendChild(f);
			f.submit();
		},
		onDownload1:function(oEvent){
			$.ajax({
				type: "GET",
				//data: "POST CONTENT DATA",
				crossDomain: true,
				url: 'download',
				// headers: {'key1':'value1','key2':'value2'}
				// contentType: "application/json",
				success: function (res, status, xhr) {
						// success code
					console.log(res);
					sap.ui.require('UI5_uploader/controller/FileSaver');
					  if ('Blob' in window) {
						    var fileName = prompt('Please enter file name to save', 'Untitled.txt');
						    if (fileName) {
						      //var textToWrite = res.value.replace(/\n/g, '\r\n');
						      var textFileAsBlob = new Blob([res], { type: 'text/plain' });

						      if ('msSaveOrOpenBlob' in navigator) {
						        navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
						      } else {
						        var downloadLink = document.createElement('a');
						        downloadLink.download = fileName;
						        downloadLink.innerHTML = 'Download File';
						        if ('webkitURL' in window) {
						          // Chrome allows the link to be clicked without actually adding it to the DOM.
						          downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
						        } else {
						          // Firefox requires the link to be added to the DOM before it can be clicked.
						          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
						          downloadLink.onclick = destroyClickedElement;
						          downloadLink.style.display = 'none';
						          document.body.appendChild(downloadLink);
						        }

						        downloadLink.click();
						      }
						    }
						  } else {
						    alert('Your browser does not support the HTML5 Blob.');
						  }
						
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log("Got an error response: " + textStatus + errorThrown);
				}
		});
		}
	});

	return ControllerController;

});
