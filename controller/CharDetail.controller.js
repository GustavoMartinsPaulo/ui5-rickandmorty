sap.ui.define([
	"sap/ui/rickandmorty/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (BaseController, JSONModel, History) {
	"use strict";
	return BaseController.extend("sap.ui.rickandmorty.controller.CharDetail", {
		onInit: function () {
			var oModel = new JSONModel();
			this.getView().setModel(oModel, "personal");
			this._oModel = this.getView().getModel("personal");
			
			var originModel = new JSONModel();
			this.getView().setModel(originModel, "origin");
			
			var locationModel = new JSONModel();
			this.getView().setModel(locationModel, "location");
			
			var oEpData = {
				episodeData: []
			};
			var episodesModel = new JSONModel(oEpData);
			this.getView().setModel(episodesModel);
			
			var oRouter = this.getRouter();
			oRouter.getRoute("charDetail").attachMatched(this._onRouteMatched, this);
			
			this._oModel.attachRequestCompleted(this.onRequestCompleted, this);
			this.getView().getModel().attachRequestCompleted(this.onRequestEpisodesCompleted, this);
		},
		
		_onRouteMatched: function (oEvent) {
			this.getView().getModel().setProperty("/episodeData", []);
			
			var	oCharId = oEvent.getParameter("arguments").id;
			
			var sUrl = "https://rickandmortyapi.com/api/character/" + oCharId;
			
			this._oModel.loadData(sUrl);

		},
		
		onRequestEpisodesCompleted: function (oEvt) {
			var oEpUpdt = this.getView().getModel().getProperty("/episodeData");
			
			oEpUpdt.push({
				name: this.getView().getModel().getProperty("/name"),
				air_date: this.getView().getModel().getProperty("/air_date"),
				episode: this.getView().getModel().getProperty("/episode")
			});
			
			this.getView().getModel().setProperty("/episodeData", oEpUpdt);
			
		},
		
		onRequestCompleted: function (oEvt) {
			var sOriginUrl, sLocationUrl, oEpisode, iEpisodeNum, sEpisodeUrl;
			
			sOriginUrl = this._oModel.getProperty("/origin/url");
			sLocationUrl = this._oModel.getProperty("/location/url");
			oEpisode = this._oModel.getProperty("/episode");
			iEpisodeNum = oEpisode.length;
			
			for(var i = 0; i < iEpisodeNum; i++){
				sEpisodeUrl = oEpisode[i];
				this.getView().getModel().loadData(sEpisodeUrl, null, true, "GET", true);
			}
			
			if(sOriginUrl !== ""){
				this.getView().getModel("origin").loadData(sOriginUrl);
			}else{
				var oUnkOrigin = {
					name: "Origin name is unknown for this character.",
					type: "Origin type is unknown for this character.",
					dimension: "Origin dimension is unknown for this character."
				};
				this.getView().getModel("origin").setProperty("/", oUnkOrigin);
			}
			
			if(sLocationUrl !== ""){
				this.getView().getModel("location").loadData(sLocationUrl);
			}
		},
		
		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true);
			}
		}
	});
});