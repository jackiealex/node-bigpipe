define () ->
	updateBasics = () ->
		$('#security .basics .submit').on 'click', (e) ->
			$form = $(@).parents('form')
			$nickname = $('#security .basics input[name="nickname"]')
			nickname = $nickname.val() || ''
			nickname = $.trim(nickname)

			$email = $('#security .basics input[name="email"]')
			email = $email.val() || ''
			email = $.trim(email)

			$content = $('#security .basics textarea')
			content = $content.val() || ''
			content = $.trim(content)

			if !nickname
				return utils.bubble('昵称不能为空')

			if !email
				return utils.bubble('邮箱不能为空')

			$form.ajaxSubmit {
				method: 'post',
				success: (rs, succ) ->
					if rs['node_code'] != 20000
						return utils.bubble(rs['data']['msg']);
					utils.bubble('修改成功');
					location.reload()
				error: () ->
			}

	_bindEvents = ($scope) ->
		updateBasics()

	return {
		init: () ->
			$scope = $('#security');
			_bindEvents($scope)
	}