interface Page {
	title: string;
	id: string;
	order: number;
	parentStage: string;
	uiOptions: {
		nextPage: string;
		prevPage: string;
		isComplete: boolean;
		isTitleHidden: boolean;
	}
	templates: {
		default: SectionObject,
		additionalDriver: SectionObject
	};
	sections: SectionObject[]
}
