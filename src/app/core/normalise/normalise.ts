import { Injectable } from '@angular/core';

import { normalize, Schema, arrayOf} from 'normalizr';

const stage = new Schema('stages');
const page = new Schema('pages');
const sectionSchema = new Schema('sections');

sectionSchema.define({});

page.define({
	sections: arrayOf(sectionSchema)
});

stage.define({
	pages: arrayOf(page)
});

@Injectable()
export class Normalise {
	normaliseProductConfig(objectToBeNormalised) {
		return normalize(objectToBeNormalised, { stages: arrayOf(stage), pages: arrayOf(page), section: arrayOf(sectionSchema) });
	}
}