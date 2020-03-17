sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
	], function (Controller, JSONModel) {
		"use strict";
		
		return Controller.extend("sap.ui.rickandmorty.controller.App", {
			onInit: function () {
				var oModel = new JSONModel("https://rickandmortyapi.com/api/character");
				this.getView().setModel(oModel);
				this._oModel = oModel;
				
				var oViewModel = new JSONModel ({
					searchTerm: "",
					busy: false
				});
				this.getView().setModel(oViewModel, "view");
			},
			
			onSearch: function (oEvent) {
				var sCharName = this.getView().getModel("view").getProperty("/searchTerm");
				
				var sUrl = "https://rickandmortyapi.com/api/character?name=" + sCharName;
				
				this.getView().getModel("view").setProperty("/busy", true);
				
				this._oModel.loadData(sUrl);
			}
		});
	});