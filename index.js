sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "sap.ui.rickandmorty",
		settings : {
			id : "rickandmorty"
		},
		async: true
	}).placeAt("content");
});