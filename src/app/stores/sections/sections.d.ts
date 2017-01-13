interface SectionObject {
	id: string;
	type: string;
	name?: string;
	title?: string;
	questions?: QuestionBase<any>[] | string[] | any;
	fields?: any;
	order?: number;

	// Template Fields
	hasQuestionsByDefault?: boolean;
	additional?: boolean;
}

interface ClaimsSection extends SectionObject {
	userHasClaim: boolean;
	activeClaim: string;
}

interface PenaltiesSection extends SectionObject {
	userHasPenalty: boolean;
	activePenalty: string;
}