/**
 *	Question Base Model
 */

interface QuestionBase<T> {
	value?: T;
	key: string;
	label: string;
	required: boolean;
	validators?: any[];
	order: number;
	controlType?: string;
	timeline?: boolean;
	trigger?: any;
	disabled?: boolean;
}

/**
 *	Autocomplete Options
 *	@param {'all' | 'search' | 'options'} type - The type of autocomplete
 *	@param {string} serviceUrl - The url of the service the autocomplete will connect to
 *	@param {AutocompleteItem[]} options - The AutocompleteItems available
 *	@param {string} placeholder - The placeholder text
 */

interface AutocompleteOptions extends QuestionBase<AutocompleteItem>{
	type?: string;
	serviceUrl?: string,
	options?: AutocompleteItem[];
	placeholder?: string,
}

/**
 *	Autocomplete Item
 *	@param {string} id - The value of the option
 *	@param {string} text - What will be displayed for the options
 */

interface AutocompleteItem {
	id: string;
	text: string;
}

/**
 *	Counter Options
 *	@param {number} min - The min value of the counter
 *	@param {number} min - The max value of the counter
 */
interface CounterOptions extends QuestionBase<string>{
	min: number;
	max: number;
}

/**
 *	Date Options
 */
interface DateOptions extends QuestionBase<string>{}

/**
 *	Dropdown Options
 *	@param {string[]} options - The Options in the dropdown
 *	@param {string} placeholder - The placeholder text
 */

interface DropdownOptions extends QuestionBase<string>{
	placeholder?: string,
	options: string[];
}

/**
 *	Question Text Options
 *	@param {string} context - The content of the question text
 */

interface QuestionTextOptions extends QuestionBase<string>{
	content: string;
}

/**
 *	Radio Options
 *	@param {string[]} options - The Options in the radio group
 */
interface RadioOptions extends QuestionBase<string>{
	options: string[];
}


/**
 *	Slider Options
 *	@param {number} min - The minimum slider value
 *	@param {number} max - The maximum slider value
 *	@param {number} steps - The multiplier on the slider values
 *	@param {number[]} values - Use Values instead of min/max/steps
 */
interface SliderOptions extends QuestionBase<string>{
	min: number;
	max: number;
	steps: number;
	values: number[];
}

/**
 *	TextBox Options
 *	@param {string} type - Text | Number | Email
 *	@param {string} autocapitalize - Is autocapitalize enabled (iOS)
 *	@param {string} autocomplete - Is autocomplete enabled
 *	@param {string} autocorrect - Is autocorrect enabled (iOS)
 *	@param {string} placeholder - The placeholder text
 *	@param {number} rows - The amount of rows in a textfield
 *	@param {number} cols - The amount of columns in a textfield
 *	@param {'hard' | 'soft'} wrap - How does the textbox wrap text
 */
interface TextBoxOptions extends QuestionBase<string>{
	type: string;
	autocapitalize: string;
	autocomplete: string;
	autocorrect: string;
	placeholder: string;

	// Text Area Fields
	rows: number;
	cols: number;
	wrap: 'soft' | 'hard';
}
