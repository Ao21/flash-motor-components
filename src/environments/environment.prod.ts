export const environment = {
	production: true,
	test: false,
	urls: {
		BASE_URL: 'http://localhost:5000/',
		GET_QUOTE_URL: 'http://localhost:5000' + '/motor/quote',
		GET_SECTION_URL: 'http://localhost:5000' + '/motor/section/',
		POST_UPDATE_PAGE_URL: 'http://localhost:5000' + '/motor/page/',
		GET_CONFIG_URL: 'http://localhost:5000' + '/motor/config',
		GET_ZENDESK_HELP_BY_ID: 'http://localhost:5000' + '/zendesk/article/',
		GET_ZENDESK_HELP_SEARCH: 'http://localhost:5000' + '/zendesk/search/',
		PUT_ADDRESS: 'http://localhost:5000' + '/motor/reference/address',
		POST_ADDRESS_SELECT: 'http://localhost:5000' + '/motor/reference/address/selected',
		GET_VEHICLE_REG: 'http://localhost:5000' + '/motor/reference/getVehicleRegistration/'
	}
};
