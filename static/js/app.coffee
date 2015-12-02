
define ['boot/appcore'], (APPCore) ->

	calculateContentBoxWhenReize = () ->
		height = window.innerHeight - 60
		$('#content').height(height)

	globFnWatchResize () ->
		calculateContentBoxWhenReize()

	onLocationChange = (url)->
		routeMap = {
			'nav-welcome': ['/', '/home', '/index', '/welcome']
			'nav-atlas-list': "/atlas/list"
			'nav-atlas-publish': "/atlas/publish"
			'nav-my-atlas-list': "/my/atlas/list"
			'nav-atlas-list-timing': "/atlas/list/timing"
			'nav-applaunch-list': [/^\/applaunch/]
			'nav-atlas-top': "/atlas/list/top"

			'nav-sendverifycode': "/verifycode"

			'nav-user-list': ["/user/list", "/user/search"]
			'nav-user-recmd-list': "/user/recmd/list"
			'nav-user-list-active': ["/user/list/active", '/user/atlas/list']

			'nav-system-config': [/^\/system\/config/]
			'nav-publication-list': [/^\/publication/]
			'nav-config-list': [/^\/config/]
			'nav-label-list': [/^\/label/]
			'nav-order-list': [/^\/order\/list/]
			'nav-order-visual': [/^\/order\/visual/]
			'nav-music-list': [/^\/music/]
			'nav-feedback-list': [/^\/feedback/]
			'nav-withdraws-list': [/^\/withdraws/]
			'nav-recharge-list': [/^\/recharge/]
			'nav-recharge-list': [/^\/recharge/]
			'nav-message-by-group': [/^\/message\/by\/group/]
			'nav-report-list': [/^\/report/]
			'nav-version-list': [/^\/version/]
			'nav-brushperson-list': [/^\/brush/]
			'nav-auth-list': [/^\/auth/]
			'nav-category-list': [/^\/category/]
			'nav-poster-list': [/^\/poster/]
			'nav-coupon-list': [/^\/coupon/]
			'nav-notification-list': [/^\/notification/]
			'nav-topic-list': [/^\/topic/]
			'nav-stickers-list': ["/stickers/list", "/stickers/detail/list", "/stickers/type/list", '/stickers/publish']
			'nav-admin-list': ["/admin/list", "/admin/publish"]

			'nav-admin-permission': "/admin/permission"
			'nav-broadcast': "/broadcast"

			'nav-admin-notification': [/^\/admin\/notification\/\S+/]
			'nav-admin-dnu': [/^\/admin\/dnu/]
			'nav-user-data-analysis': [/^\/admin\/data\/analysis/]
		}
		url = url.split('?')[0]
		mapClassName = (url) ->
			for pro of routeMap
				filters = [].concat(routeMap[pro])
				for f in filters
					if typeof f == 'string'
						if url is f
							return pro
					else
						if f.test(url)
							return pro
			return null

		className = mapClassName(url)

		if $('#sideBar .' + className).hasClass('on')
			return

		if className
			$('#sideBar .navItem').not('.' + className).removeClass('on')
			$('#sideBar .' + className).addClass('on')

	class APP
		constructor: (opts) ->
			@bindEvents()
			a = new APPCore {
				onChange: (state, isLocation) ->
					onLocationChange(state.url)
					if isLocation
						return
					$('.widget-loading').remove();

					window['_SmartPipe_'].doPipeRequest(state);
				onHistoryChange: (e) ->
					window['_SmartPipe_'].reload()
					onLocationChange(e.state.url)
			}
		bindEvents: () ->
			$('.user-nav a.user').on 'click', (e)->
				$security = $('#security');
				if $security.hasClass('show')
					$security.removeClass('show');
				else
					$security.addClass('show');

				require ['main'], (mod) ->
					mod.init()
	return APP

