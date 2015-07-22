
require('org.pinf.genesis.lib/lib/api').forModule(require, module, function (API, exports) {

	var Send = function () {
		var self = this;

		self.$PLComponent = "io.pinf.service.twilio/send/0";

		self.sendMessage = function (messageOverrides) {

			return API.Q.denodeify(function (callback) {

				if (self.enabled === false) {
					API.console.debug("Skip sending mandrill email message due to 'enabled === false'");
					return callback(null);
				}

				API.ASSERT(typeof self.profile.accountSid, "string");
				API.ASSERT(typeof self.profile.authToken, "string");

				var client = API.TWILIO(self.profile.accountSid, self.profile.authToken);

				var defaultMessage = API.DEEPMERGE({
				    body: "<REPLACE>",
				    to: "<REPLACE>",
				    from: "<REPLACE>"
				}, self.message || {});

				var message = API.DEEPMERGE(defaultMessage, messageOverrides || {});

console.log("SMS message", message);

				return client.messages.create(message, function (err, result) {
					if (err) {
						if (!err.stack) {
							var _err = new Error();
							for (var name in err) {
								_err[name] = err[name];
							}
							err = _err;
						}
						return callback(err);
					}

console.log("SMS send result", result);

					return callback(null);
				});
			})();
		}
	}

	exports.PLComponent = function (config, groupConfig) {

		return {
			"$io.pinf.service.twilio/send/0": API.EXTEND(true, new Send(), config)
		};
	}

});

