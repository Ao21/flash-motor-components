import * as _ from 'lodash';
import { Shape, Tween } from 'mo-js';

export class StrokeDashArray {
	path: any;
	begin: any;
	end: any;
	circular: boolean;
	public length: any;
	animationTimer = null;
	timer = null;


	constructor(path, begin?, end?, circular?) {
		this.path = path;
		this.length = path.getTotalLength();
		this.path.style.stroke = 'black';
		this.path.style.strokeDashoffset = this.length * 2;
		this.begin = typeof begin !== 'undefined' ? this.valueOf(begin) : 0;
		this.end = typeof end !== 'undefined' ? this.valueOf(end) : this.length;
		this.circular = typeof circular !== 'undefined' ? circular : false;
		this.draw(this.begin, this.end, 0, { circular: this.circular });
	}


    createTestShape(element, shape) {
		let s = new Shape({
            shape: shape,
			className: 'testObject',
			isShowStart: true,
			parent: element,
			fill: 'transparent',
			stroke: 'black',
			duration: 1500,
			radius: 16,
			scale: 1,
        })
		return element.querySelector('.testObject path')
	}
	initDraw() {
		this.draw(this.begin, this.end, 0, { circular: this.circular });
	}


	draw(begin, end, duration, options?) {
		this.circular = options && options.hasOwnProperty('circular') ? options.circular : false;
		if (duration) {
			var delay = options && options.hasOwnProperty('delay') ? parseFloat(options.delay) * 1000 : 0,
				easing = options && options.hasOwnProperty('easing') ? options.easing : null,
				callback = options && options.hasOwnProperty('callback') ? options.callback : null,
				that = this;

			this.stop();
			if (delay) {
				delete options.delay;
				this.timer = setTimeout(function () {
					that.draw(begin, end, duration, options);
				}, delay);
				return this.timer;
			}

			var startTime: any = new Date(),
				initBegin = this.begin,
				initEnd = this.end,
				finalBegin = this.valueOf(begin),
				finalEnd = this.valueOf(end);

			(function calc() {
				var now: any = new Date(),
					elapsed = (now - startTime) / 1000,
					time = (elapsed / parseFloat(duration)),
					t = time;

				if (typeof easing === 'function') {
					t = easing(t);
				}

				if (time > 1) {
					t = 1;
				} else {
					that.animationTimer = window.requestAnimationFrame(calc);
				}

				that.begin = initBegin + (finalBegin - initBegin) * t;
				that.end = initEnd + (finalEnd - initEnd) * t;

				that.begin = that.begin < 0 && !that.circular ? 0 : that.begin;
				that.begin = that.begin > that.length && !that.circular ? that.length : that.begin;
				that.end = that.end < 0 && !that.circular ? 0 : that.end;
				that.end = that.end > that.length && !that.circular ? that.length : that.end;

				if (that.end - that.begin <= that.length && that.end - that.begin > 0) {
					that.draw(that.begin, that.end, 0, { circular: that.circular });
				} else {
					if (that.circular && that.end - that.begin > that.length) {
						that.draw(0, that.length, 0, { circular: that.circular });
					} else {
						that.draw(that.begin + (that.end - that.begin), that.end - (that.end - that.begin), 0, { circular: that.circular });
					}
				}

				if (time > 1 && typeof callback === 'function') {
					return callback.call(that);
				}
			})();
		} else {
			this.path.style.strokeDasharray = this.strokeDasharray(begin, end).join();
		}
	};

	setPosition(begin, end, t) {

		var that = this;
		var startTime: any = new Date(),
			initBegin = this.begin,
			initEnd = this.end,
			finalBegin = this.valueOf(begin),
			finalEnd = this.valueOf(end);

		begin = initBegin + (finalBegin - initBegin) * t;
		end = initEnd + (finalEnd - initEnd) * t;

		this.path.style.strokeDasharray = this.strokeDasharray(begin, end).join();
	}

	getPosition(begin, end, t) {
		var that = this;
		var startTime: any = new Date(),
			initBegin = this.begin,
			initEnd = this.end,
			finalBegin = this.valueOf(begin),
			finalEnd = this.valueOf(end);

		begin = initBegin + (finalBegin - initBegin) * t;
		end = initEnd + (finalEnd - initEnd) * t;

		return _.map(this.strokeDasharray(begin, end), (e) => {
			return e;
		}).join(' ');
	}

	percent(value) {
		return parseFloat(value) / 100 * this.length;
	}

	valueOf(input): any {
		let val: any = parseFloat(input);
		if (typeof input === 'string' || input instanceof String) {
			if (~input.indexOf('%')) {
				var arr;
				if (~input.indexOf('+')) {
					arr = input.split('+');
					val = this.percent(arr[0]) + parseFloat(arr[1]);
				} else if (~input.indexOf('-')) {
					arr = input.split('-');
					if (arr.length === 3) {
						val = -this.percent(arr[1]) - parseFloat(arr[2]);
					} else {
						val = arr[0] ? this.percent(arr[0]) - parseFloat(arr[1]) : -this.percent(arr[1]);
					}
				} else {
					val = this.percent(input);
				}
			}
		}
		return val;
	}

	strokeDasharray(begin, end) {
		this.begin = this.valueOf(begin);
		this.end = this.valueOf(end);
		if (this.circular) {
			let s: any = this.begin / parseInt(this.length, 10)
			let e: any = this.end / parseInt(this.length, 10);
			let division = this.begin > this.end || (this.begin < 0 && this.begin < this.length * -1) ? parseInt(e, 10) : parseInt(s, 10);
			if (division !== 0) {
				this.begin = this.begin - this.length * division;
				this.end = this.end - this.length * division;
			}
		}
		if (this.end > this.length) {
			let plus = this.end - this.length;
			return [this.length, this.length, plus, this.begin - plus, this.end - this.begin]
		}
		if (this.begin < 0) {
			let minus = this.length + this.begin;
			if (this.end < 0) {
				return [this.length, this.length + this.begin, this.end - this.begin, minus - this.end, this.end - this.begin, this.length]
			} else {
				return [this.length, this.length + this.begin, this.end - this.begin, minus - this.end, this.length]
			}
		}
		return [this.length, this.length + this.begin, this.end - this.begin];
	}

	stop() {
		window.cancelAnimationFrame(this.animationTimer);
		this.animationTimer = null;
		clearTimeout(this.timer);
		this.timer = null;
	};
}