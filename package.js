export default class Utilities {
	static Time = {
		months: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		inMilliseconds: {
			day: 24 * 60 * 60 * 1000,
			hour: 60 * 60 * 1000,
			minute: 60 * 1000,
			second: 1000,
		},
		ago: (time) => {
			switch (typeof time) {
				case 'number':
					break;
				case 'string':
					time = +new Date(time);
					break;
				case 'object':
					if (time.constructor === Date) time = time.getTime();
					break;
				default:
					time = +new Date();
			}

			let timeFormats = [
				[60, 'sec', 1], // 60
				[120, '1min ago', '1min from now'], // 60*2
				[3600, 'min', 60], // 60*60, 60
				[7200, '1h ago', '1h from now'], // 60*60*2
				[86400, 'h', 3600], // 60*60*24, 60*60
				[172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
				[604800, 'd', 86400], // 60*60*24*7, 60*60*24
				[1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
				[2419200, 'w', 604800], // 60*60*24*7*4, 60*60*24*7
				[4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
				[29030400, 'mon', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
				[58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
				[2903040000, 'y', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
				[5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
				[58060800000, 'cen', 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
			];
			let seconds = (+new Date() - time) / 1000,
				token = 'ago',
				listChoice = 1;

			if (seconds == 0) {
				return 'Just now';
			}
			if (seconds < 0) {
				seconds = Math.abs(seconds);
				token = 'from now';
				listChoice = 2;
			}
			let i = 0,
				format;
			while ((format = timeFormats[i++]))
				if (seconds < format[0]) {
					if (typeof format[2] == 'string') return format[listChoice];
					else return Math.floor(seconds / format[2]) + '' + format[1] + ' ' + token;
				}
			return time;
		},
		formatDate: (date, format) => {
			const year = date.getFullYear(),
				month =
					(date.getMonth() + 1).toString().length !== 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
				day = date.getDate().toString().length !== 1 ? date.getDate() : '0' + date.getDate(),
				hours = date.getHours().toString().length !== 1 ? date.getHours() : '0' + date.getHours(),
				minutes = date.getMinutes().toString().length !== 1 ? date.getMinutes() : '0' + date.getMinutes(),
				seconds = date.getSeconds().toString().length !== 1 ? date.getSeconds() : '0' + date.getSeconds();

			switch (format) {
				case 'EU':
					return `(${day}.${month}.${year}) ${hours}:${minutes}:${seconds}`;
				case 'US':
					return `(${month}/${day}/${year}) ${hour % 12 || 12}:${minutes}:${seconds} ${
						hour < 12 ? 'AM' : 'PM'
					}`;
				case 'ISO':
					return `(${year}-${month}-${day}) ${hours}:${minutes}:${seconds}`;
				default:
					// ISO
					return `(${year}-${month}-${day}) ${hours}:${minutes}:${seconds}`;
			}
		},
	};

	static Number = {
		formatCommas: (x, shorten = true) => {
			if (!shorten) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

			if (Math.abs(x) >= 1e9) {
				if (Math.abs(x) % 1e9 == 0) return (x / 1e9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'bil';
				else return (x / 1e9).toFixed(3) + 'bil';
			} else if (Math.abs(x) >= 1e6) {
				if (Math.abs(x) % 1e6 == 0) return x / 1e6 + 'mil';
				else return (x / 1e6).toFixed(3) + 'mil';
			} else if (Math.abs(x) >= 1e3) {
				if (Math.abs(x) % 1e3 == 0) return x / 1e3 + 'k';
			}

			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
	};
}
