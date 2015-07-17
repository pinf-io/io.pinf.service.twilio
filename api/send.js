
require('org.pinf.genesis.lib').forModule(require, module, function (API, exports) {

	exports.sendMessage = function (args) {
		return API.Q.denodeify(function (callback) {

console.log("Send Twillio Message:", args);

			return callback(null);
		})();
	}

});
