interface Page {
	title: string;
	order: number;
	templates: {
		default: SectionObject
	};
	sections: SectionObject[]
}
