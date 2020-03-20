sap.ui.define([
	"sap/ui/rickandmorty/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	return BaseController.extend("sap.ui.rickandmorty.controller.CharDetail", {
		onInit: function () {
			var oModel = new JSONModel();
			this.getView().setModel(oModel);
			this._oModel = this.getView().getModel();
			
			var oRouter = this.getRouter();
			oRouter.getRoute("charDetail").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched: function (oEvent) {
			var	oCharId = oEvent.getParameter("arguments").id;
			
			var sUrl = "https://rickandmortyapi.com/api/character/" + oCharId;
			
			this._oModel.loadData(sUrl);
		}
	});
});