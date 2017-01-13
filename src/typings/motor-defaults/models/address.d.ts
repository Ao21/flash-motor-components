interface AddressObject {
	addressLine1: string;
	addressLine2: string;
	area: {
		text: string;
		id: string;
	};
	county: {
		text: string;
		id: string;
	}
	lookups: any[];
	selected: any[];
}