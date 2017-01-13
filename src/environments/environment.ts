// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
	production: false,
	test: false,
	urls: {
		BASE_URL: 'http://localhost:5000/',
		GET_SECTION_URL: 'http://localhost:5000' + '/motor/section/',
		GET_QUOTE_URL: 'http://localhost:5000' + '/motor/quote',
		POST_UPDATE_PAGE_URL: 'http://localhost:5000' + '/motor/page/',
		GET_CONFIG_URL: 'http://localhost:5000' + '/motor/config',
		GET_ZENDESK_HELP_BY_ID: 'http://localhost:5000' + '/zendesk/article/',
		GET_ZENDESK_HELP_SEARCH: 'http://localhost:5000' + '/zendesk/search/',
		PUT_ADDRESS: 'http://localhost:5000' + '/motor/reference/address',
		POST_ADDRESS_SELECT: 'http://localhost:5000' + '/motor/reference/address/selected',
		GET_VEHICLE_REG: 'http://localhost:5000' + '/motor/reference/getVehicleRegistration/'
	}
};
