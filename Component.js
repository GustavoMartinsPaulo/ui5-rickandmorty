sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
	], function (UIComponent, JSONModel) {
		"use strict";
		
		return UIComponent.extend("sap.ui.rickandmorty.Component", {
			metadata: {
				manifest: "json"
			},
				
			init: function () {
				
				UIComponent.prototype.init.apply(this, arguments);
				
				// var oTemp = {
				// 	charData: []
				// };
				
				// var oModel = new JSONModel(oTemp);
				// this.setModel(oModel);
				
				// var oViewModel = new JSONModel ({
				// 	searchTerm: "",
				// 	busy: false
				// });
				// this.setModel(oViewModel, "view");
				
				this.getRouter().initialize();
				
			}
		});
	});