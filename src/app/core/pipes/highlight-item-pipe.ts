import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'highlight' })
export class HighlightItemPipe implements PipeTransform {
	transform(text: string, search: string): string {
		if (!text) {
			return ''
		}
		if (!search) {
			return text;
		}
		var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		pattern = pattern.split(' ').filter((t) => {
			return t.length > 0;
		}).join('|');
		var regex = new RegExp(pattern, 'gi');

		return search ? text.replace(regex, (match) => `<span class="highlight-item">${match}</span>`) : text;
	}
}