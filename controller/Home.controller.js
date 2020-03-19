sap.ui.define([
	"sap/ui/rickandmorty/controller/BaseController",
	"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
		"use strict";
		
		return BaseController.extend("sap.ui.rickandmorty.controller.Home", {
			onInit: function () {
				
				var oTemp = {
					charData: []
				};
				
				var oModel = new JSONModel(oTemp);
				this.getView().setModel(oModel);
				
				var oViewModel = new JSONModel ({
					searchTerm: "",
					busy: false
				});
				this.getView().setModel(oViewModel, "view");
				
				this._oModel = this.getView().getModel();
				
				this._oModel.loadData("https://rickandmortyapi.com/api/character/", null, true, "GET", true);
				
				this._oModel.attachRequestCompleted(this.onRequestCompleted, this);
				
			},
			
			onRequestCompleted: function(oEvt){
				
				this.getView().getModel("view").setProperty("/busy", true);
				
				var iNumChar = parseInt(this._oModel.getProperty("/info/count"),10);
				var oCharArray = this._oModel.getProperty("/charData");
				var iElements = 20;
				
				if(this._oModel.getProperty("/info/next") === "") iElements = iNumChar % 20;
				
				for(var i = 0; i < iElements; i++){
					oCharArray.push({
						id:this._oModel.getProperty("/results/" + i + "/id"),
						name:this._oModel.getProperty("/results/" + i + "/name"),
						status:this._oModel.getProperty("/results/" + i + "/status"),
						species:this._oModel.getProperty("/results/" + i + "/species"),
						type:this._oModel.getProperty("/results/" + i + "/type"),
						gender:this._oModel.getProperty("/results/" + i + "/gender"),
						origin:this._oModel.getProperty("/results/" + i + "/origin"),
						location:this._oModel.getProperty("/results/" + i + "/location"),
						image:this._oModel.getProperty("/results/" + i + "/image"),
						episode:this._oModel.getProperty("/results/" + i + "/episode"),
						url:this._oModel.getProperty("/results/" + i + "/url")
					});
				}
				this._oModel.setProperty("/charData", oCharArray);
				
				if(this._oModel.getProperty("/info/next") !== ""){
					var sNextUrl = this._oModel.getProperty("/info/next");
					this._oModel.loadData(sNextUrl, null, true, "GET", true);
				}
			},
			
			onSearch: function (oEvent) {
				 this._oModel.setProperty("/charData", []);
				
				var sCharName = this.getView().getModel("view").getProperty("/searchTerm");
				
				var sUrl = "https://rickandmortyapi.com/api/character/?name=" + sCharName;
				
				this.getView().getModel("view").setProperty("/busy", true);
				
				this._oModel.loadData(sUrl, null, true, "GET", true);
			},
			
			onItemPress: function (oEvent) {
				//var oItem = oEvent.getSource();
				
				this.getRouter().navTo("charDetail", {}, true);
			}
		});
	});