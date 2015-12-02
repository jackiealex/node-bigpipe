template = require('evertpl')
module.exports = (req, res, next) ->
	
	# __pipe__：一个来自前端ajax的参数
	isPipe = req.query['__pipe__']
	token = req.cookies['XPUSS']

	# 非常简单的工作流（workflow ）程设计
	# 工作流 识别全刷新和局部刷新
	# 全刷就先进行最小主框架framework输出，然后根据路由进行局部pagelet输出
	if not isPipe
		html = template.renderFile 'test/pagelet.demo/index.html', {}
		res.write(html)
		next()
	else
		next()

