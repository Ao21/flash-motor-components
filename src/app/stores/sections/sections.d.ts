interface SectionObject {
	id: string;
	type: string;
	name?: string;
	title?: string;
	questions?: QuestionBase<any>[];
	order?: number;
}