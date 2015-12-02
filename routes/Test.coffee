utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')
PageletManager = require('../libs/pagelet/manager')

Q = require('q')
template = require('evertpl')
_ = require('lodash')

exports.resource = (req, res) ->
	
	delay = req['query']['delay']
	type = req['query']['type']
	setTimeout ()-> 
			res.type('text/' + type)
			if type is 'css'
				res.write("body {background: red}");
			else
				res.write("console.log(+ new Date, 'from server')");
			res.end()
		, 1000 * parseInt(delay)

exports.view = (req, res) ->
	p = new Pagelet res, {
		autoEnd: true
		selector: '#main'
		template: 'test/view/main.html'
	}
	p.pipe()

exports.layout = (req, res) ->

	pageletLayout = new Pagelet res, {
		autoEnd: false
		selector: '#main'
		template: 'test/view/layout.html'
	}

	pageletA = new Pagelet res, {
		autoEnd: false
		template: 'test/view/a.html'
		selector: '.sub-a'
	}

	pageletB = new Pagelet res, {
		autoEnd: false
		template: 'test/view/b.html'
		selector: '.sub-b'
	}

	pageletA1 = new Pagelet res, {
		autoEnd: false
		template: 'test/view/a-1.html'
		selector: '.sub-a-1'
	}

	pageletA2 = new Pagelet res, {
		autoEnd: false
		template: 'test/view/a-2.html'
		selector: '.sub-a-2'
	}

	pageletA2Children1 = new Pagelet res, {
		autoEnd: false
		template: 'test/view/a-2-children1.html'
		selector: '.a-2-children1'
	}
	pageletA2Children2 = new Pagelet res, {
		autoEnd: false
		template: 'test/view/a-2-children2.html'
		selector: '.a-2-children2'
	}
	 

	pageletManager = new PageletManager {
		pagelet: pageletLayout
		children: [
			{
				pagelet: pageletB
				children: null
			}
			{
				pagelet: pageletA
				children: [
					{
						pagelet: pageletA1
					}
					{
						pagelet: pageletA2
						children: [
							{
								pagelet: pageletA2Children1
							}
							{
								pagelet: pageletA2Children2
							}
						]
					}
				]
			}
		]
	}

	pageletManager.pipe()

 
exports.load = (req, res) ->
	query = req.query
	page = query['page'] || 1
	limit = query['limit'] || 3
	pageletLayout = new Pagelet res, {
		template: 'test/view/load/load.html'
		op: if page is 1 then 'html' else 'append'
		selector: '#main'
		data: {
			page: page + 1
			limit
		}
	}
	pageletLayout.pipe()
 
exports.delay1 = (req, res) ->
	pageletLayout = new Pagelet res, {
		template: 'test/view/delay1.html'
		selector: '#main'
	}
	pageletLayout.pipe()

exports.delay2 = (req, res) ->
	pageletLayout = new Pagelet res, {
		template: 'test/view/delay2.html'
		selector: '#main'
	}
	pageletLayout.pipe()

exports.tmpl = (req, res) ->
	pageletLayout = new Pagelet res, {
		template: 'test/view/tmpl.html'
		selector: '#main'
		data: {
			xx: 'i come from template engine'
		}
	}
	pageletLayout.pipe()

			

