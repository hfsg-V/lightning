		(function($) {
			function Feature(selector, options) {
				this.box = $(selector);
				this.gallery = this.box.find('.feature-gallery').eq(0);
				this.btnPrev = this.box.find('.feature-prev').eq(0);
				this.btnNext = this.box.find('.feature-next').eq(0);
				this.pos = [{
					top: 63,
					left: -210,
					display: 'block',
					width: 188,
					height: 108,
					opacity: 0
				}, {
					top: 63,
					left: -210,
					display: 'block',
					width: 188,
					height: 108,
					opacity: 1
				}, {
					top: 39,
					left: 0,
					display: 'block',
					width: 276,
					height: 156,
					opacity: 1
				}, {
					top: 0,
					left: 298,
					display: 'block',
					width: 414,
					height: 234,
					opacity: 1
				}, {
					top: 39,
					left: 734,
					display: 'block',
					width: 276,
					height: 156,
					opacity: 1
				}, {
					top: 63,
					left: 1032,
					display: 'block',
					width: 188,
					height: 108,
					opacity: 1
				}, {
					top: 63,
					left: 1032,
					display: 'block',
					width: 188,
					height: 108,
					opacity: 0
				}];
				this.duration = options.duration >= 0 ? options.duration : -options.duration;
				this.timer = null;
				this.delay = options.delay >= 0 ? options.delay : -options.delay;
				this.init();
				this.addEvtListener();
			}
			Feature.prototype.init = function() {
				var lis = this.gallery.find('li');
				lis.eq(0).removeClass('curr').css(this.pos[0]).find('img').removeClass('grayscale-off');
				lis.eq(1).removeClass('curr').css(this.pos[1]).find('img').removeClass('grayscale-off');
				lis.eq(2).removeClass('curr').css(this.pos[2]).find('img').removeClass('grayscale-off');
				lis.eq(3).addClass('curr').css(this.pos[3]).find('img').addClass('grayscale-off');
				lis.eq(4).removeClass('curr').css(this.pos[4]).find('img').removeClass('grayscale-off');
				lis.eq(5).removeClass('curr').css(this.pos[5]).find('img').removeClass('grayscale-off');
				lis.eq(6).removeClass('curr').css(this.pos[6]).find('img').removeClass('grayscale-off');

				this.autoPlay();
			};

			Feature.prototype.autoPlay = function() {
				var that = this;

				that.timer = setInterval(function() {
					that.gallery.find('li:first').appendTo(that.gallery);
					that.animate();
				}, that.delay);
			};

			Feature.prototype.animate = function() {
				var lis = this.gallery.find('li');

				lis.eq(0).removeClass('curr').animate(this.pos[0], this.duration).find('img').removeClass('grayscale-off');
				lis.eq(1).removeClass('curr').animate(this.pos[1], this.duration).find('img').removeClass('grayscale-off');
				lis.eq(2).removeClass('curr').animate(this.pos[2], this.duration).find('img').removeClass('grayscale-off');
				lis.eq(3).addClass('curr').animate(this.pos[3], this.duration).find('img').addClass('grayscale-off');
				lis.eq(4).removeClass('curr').animate(this.pos[4], this.duration).find('img').removeClass('grayscale-off');
				lis.eq(5).removeClass('curr').animate(this.pos[5], this.duration).find('img').removeClass('grayscale-off');
				lis.eq(6).removeClass('curr').animate(this.pos[6], this.duration).find('img').removeClass('grayscale-off');
			};

			Feature.prototype.addEvtListener = function() {
				var that = this;

				that.btnPrev.on('click', function() {
					that.gallery.find('li:last').prependTo(that.gallery);
					that.animate();
				});

				that.btnNext.on('click', function() {
					that.gallery.find('li:first').appendTo(that.gallery);
					that.animate();
				});

				that.box.on('mouseenter', function() {
					clearTimeout(that.timer);
				}).on('mouseleave', function() {
					that.autoPlay();
				});
			};

			$.fn.feature = function(options) {
				options = $.extend({}, $.fn.feature.defaults, options);
				return this.each(function() {
					if($(this).data('feature') == undefined) {
						$(this).data('feature', new Feature(this, options));
					}
				});
			};

			$.fn.feature.defaults = {
				duration: 200,
				delay: 3000
			};
		})(jQuery);
		var pullload = {
			init: function() {
				this.hasMore = true;
				this.isAjaxing = false;
				this.scrollTop = $(window).scrollTop();
				this.direction = 'down';
				this.filter = {
					page: 0,
					perPageCount: 30
				};
				this.ajaxNewsList();
				this.addEvtListener();
			},
			ajaxNewsList: function() {
				var that = this;

				$.ajax({
					type: 'GET',
					url: '/en/news/getArticle/',
					data: that.filter,
					dataType: 'json',
					beforeSend: function() {
						that.isAjaxing = true;
						$('#jPullload').html('Loading');
					},
					success: function(result) {
						if(result.success) {
							that.filter.page++;
							that.printNewsList(result.data);
						} else {
							alert(result.msg);
						}
					},
					error: function() {
						// alert('Request error, please try again later!');
					},
					complete: function() {
						that.isAjaxing = false;
						$('#jPullload').html('Pull down to load more');
					}
				});
			},
			printNewsList: function(data) {
				if(data.length == 0) {
					this.hasMore = false;
					$('#jPullload').html('There\'s no more things!');
				} else {
					this.hasMore = true;

					var tmpl = [];
					for(var i = 0, len = data.length; i < len; i++) {
						var item = data[i];

						tmpl.push('<a href="/en/news/detail/' + item['id'] + '.html" class="item">');
						tmpl.push('<img class="item-light grayscale grayscale-fade" src="' + item['thumb'] + '" />');
						tmpl.push('<div class="item-overlay"></div>');
						tmpl.push('<h4 class="item-title">' + item['title'] + '</h4>');
						if(item['is_new']) {
							tmpl.push('<i class="icon-new"></i>');
						}
						tmpl.push('</a>');
					}
					$('#jNewsList').append(tmpl.join(''));
				}
			},
			addEvtListener: function() {
				var that = this;

				$(window).on('scroll', function() {
					var scrollTop = $(window).scrollTop(),
						height = $(window).height()
					if(scrollTop > that.scrollTop) {
						that.direction = 'down';
					} else {
						that.direction = 'up';
					}

					that.scrollTop = scrollTop;

					if(that.direction == 'down' && that.hasMore && !that.isAjaxing && (scrollTop + height) >= top) {
						that.ajaxNewsList();
					}
				});
			}
		};

		$(function() {
			$('#feature').feature();
			pullload.init();
		});