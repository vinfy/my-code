var app = app || {};//工具集

(function () {
	'use strict';

	app.Utils = {
		uuid: function () {//返回全球唯一id
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
					.toString(16);
			}

			return uuid;
		},

		pluralize: function (count, word) {//使成复数
			return count === 1 ? word : word + 's';
		},

		store: function (namespace, data) {//返回和设置localStorage
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}

			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];//每个todo应用都只存为一个storage
		},

		extend: function () {//继承
			var newObj = {};
			for (var i = 0; i < arguments.length; i++) {
				var obj = arguments[i];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {//严格模式下必须如此，即检查该对象是否有key
						newObj[key] = obj[key];
					}
				}
			}
			return newObj;
		}
	};
})();
