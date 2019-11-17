import MatchService from "./match.service";
import AuctionService from "./auction.service";
import CommonService from "./common.service";

const services = {
	"match": {className: MatchService, instance: null},
	"auction": {className: AuctionService, instance: null},
	"common": {className: CommonService, instance: null}
};

export const singleton = function () {
	return {
		create : function(name, store) { 
			const service = services[name];
			if(!service.instance) {
				const selectedClass = service.className;
				console.log("no singleton has been created");
				service.instance = new selectedClass(store);
				return service.instance;
			} else {
				return service.instance;
			}
		}
	}
};