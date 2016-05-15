/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {//代码分离得很好
	'use strict';

	var Utils = app.Utils;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.TodoModel = function (key) {//创建一个todo应用
		this.key = key;//给予一个key存储在storage
		this.todos = Utils.store(key);//读取已有的todo或者创建一个空数组
		this.onChanges = [];//暂不懂
	};

	app.TodoModel.prototype.subscribe = function (onChange) {//订阅，添加一个改变函数
		this.onChanges.push(onChange);
	};

	app.TodoModel.prototype.inform = function () {//通知
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) { cb(); });//执行每个onchange
	};

	app.TodoModel.prototype.addTodo = function (title) {//增加todo
		this.todos = this.todos.concat({//以数组方式增加todo
			id: Utils.uuid(),
			title: title,
			completed: false
		});

		this.inform();//存储并调用onchanges
	};

	app.TodoModel.prototype.toggleAll = function (checked) {//统一反转所有todo的complete
		// Note: it's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map() and filter() everywhere instead of mutating the array or
		// todo items themselves.
		this.todos = this.todos.map(function (todo) {//改变每一个todo，map返回新数组
			return Utils.extend({}, todo, {completed: checked});
		});

		this.inform();//存储并调用onchanges
	};

	app.TodoModel.prototype.toggle = function (todoToToggle) {//单个todo的complete反转，todoToToggle是一个todo
		this.todos = this.todos.map(function (todo) {//巧妙使用了map更新了todos数组
			return todo !== todoToToggle ? //如果是该todo则改变complete值
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});//其实这里可以使用to.complete=!complete
		});

		this.inform();//存储并调用onchanges
	};

	app.TodoModel.prototype.destroy = function (todo) {//销毁单个todo
		this.todos = this.todos.filter(function (candidate) {//返回新数组，只有返回true才会增加到新数组
			return candidate !== todo; //返回除销毁todo外的所有todo
		});

		this.inform();//存储并调用onchanges
	};

	app.TodoModel.prototype.save = function (todoToSave, text) {//改变一个todo
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});

		this.inform();//
	};

	app.TodoModel.prototype.clearCompleted = function () {//清除掉已经完成的todo
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed; //只有没有完成的todo才会形成新数组
		});

		this.inform();//
	};

})();
