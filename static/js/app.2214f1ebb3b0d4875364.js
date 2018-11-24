webpackJsonp([13],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			isAdmin: false,
			show: false,
			name: ''
		};
	},
	created: function created() {
		this.name = sessionStorage.name;
		if (sessionStorage.userid) {
			this.isAdmin = true;
		}
	},

	methods: {
		showUserX: function showUserX() {
			this.show = true;
		},
		hideUserX: function hideUserX() {
			this.show = false;
		},
		logOut: function logOut() {
			if (sessionStorage.userid) {
				sessionStorage.id = '';
				sessionStorage.userid = '';
				sessionStorage.name = '';
			} else {
				sessionStorage.id = '';
				sessionStorage.name = '';
			}

			this.$router.push('/menu');
		}
	}
});

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_Header__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_Header___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_components_Header__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_Sidebar__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_Sidebar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_components_Sidebar__);





/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {};
	},
	mounted: function mounted() {
		var canvas = document.querySelector('canvas'),
		    ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.lineWidth = .3;
		ctx.strokeStyle = new Color(150).style;

		var mousePosition = {
			x: canvas.width - 100,
			y: canvas.height - 60
		};

		var dots = {
			nb: 250,
			distance: 100,
			d_radius: 150,
			array: []
		};

		function colorValue(min) {
			return Math.floor(Math.random() * 255 + min);
		}

		function createColorStyle(r, g, b) {
			return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
		}

		function mixComponents(comp1, weight1, comp2, weight2) {
			return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
		}

		function averageColorStyles(dot1, dot2) {
			var color1 = dot1.color,
			    color2 = dot2.color;

			var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
			    g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
			    b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
			return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
		}

		function Color(min) {
			min = min || 0;
			this.r = colorValue(min);
			this.g = colorValue(min);
			this.b = colorValue(min);
			this.style = createColorStyle(this.r, this.g, this.b);
		}

		function Dot() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;

			this.vx = -.5 + Math.random();
			this.vy = -.5 + Math.random();

			this.radius = Math.random() * 2;

			this.color = new Color();
		}

		Dot.prototype = {
			draw: function draw() {
				ctx.beginPath();
				ctx.fillStyle = this.color.style;
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				ctx.fill();
			}
		};

		function createDots() {
			for (var i = 0; i < dots.nb; i++) {
				dots.array.push(new Dot());
			}
		}

		function moveDots() {
			for (var i = 0; i < dots.nb; i++) {

				var dot = dots.array[i];

				if (dot.y < 0 || dot.y > canvas.height) {
					dot.vx = dot.vx;
					dot.vy = -dot.vy;
				} else if (dot.x < 0 || dot.x > canvas.width) {
					dot.vx = -dot.vx;
					dot.vy = dot.vy;
				}
				dot.x += dot.vx;
				dot.y += dot.vy;
			}
		}

		function connectDots() {
			for (var i = 0; i < dots.nb; i++) {
				for (var j = 0; j < dots.nb; j++) {
					var i_dot = dots.array[i];
					var j_dot = dots.array[j];

					if (i_dot.x - j_dot.x < dots.distance && i_dot.y - j_dot.y < dots.distance && i_dot.x - j_dot.x > -dots.distance && i_dot.y - j_dot.y > -dots.distance) {
						if (i_dot.x - mousePosition.x < dots.d_radius && i_dot.y - mousePosition.y < dots.d_radius && i_dot.x - mousePosition.x > -dots.d_radius && i_dot.y - mousePosition.y > -dots.d_radius) {
							ctx.beginPath();
							ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
							ctx.moveTo(i_dot.x, i_dot.y);
							ctx.lineTo(j_dot.x, j_dot.y);
							ctx.stroke();
							ctx.closePath();
						}
					}
				}
			}
		}

		function drawDots() {
			for (var i = 0; i < dots.nb; i++) {
				var dot = dots.array[i];
				dot.draw();
			}
		}

		function animateDots() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			moveDots();
			connectDots();
			drawDots();

			requestAnimationFrame(animateDots);
		}

		document.getElementById('home').addEventListener('mousemove', function (e) {
			mousePosition.x = e.pageX;
			mousePosition.y = e.pageY;
		});

		document.getElementById('home').addEventListener('mouseleave', function (e) {
			mousePosition.x = canvas.width / 2;
			mousePosition.y = canvas.height / 2;
		});


		createDots();
		requestAnimationFrame(animateDots);
	},

	components: {
		"v-header": __WEBPACK_IMPORTED_MODULE_0_components_Header___default.a,
		Sidebar: __WEBPACK_IMPORTED_MODULE_1_components_Sidebar___default.a
	}
});

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__static_js_Star__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_js_Moon__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__static_js_Meteor__ = __webpack_require__(187);






/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			login: false,
			customer: false,
			admin: false
		};
	},
	created: function created() {
		if (sessionStorage.id) {
			this.$router.push('/matters');
		}
	},
	mounted: function mounted() {
		var canvas = document.getElementById('canvas'),
		    ctx = canvas.getContext('2d'),
		    width = window.innerWidth,
		    height = window.innerHeight,
		    moon = new __WEBPACK_IMPORTED_MODULE_1__static_js_Moon__["a" /* default */](ctx, width, height),
		    stars = new __WEBPACK_IMPORTED_MODULE_0__static_js_Star__["a" /* default */](ctx, width, height, 200),
		    meteors = [],
		    count = 0;

		canvas.width = width;
		canvas.height = height;

		var meteorGenerator = function meteorGenerator() {
			var x = Math.random() * width + 800;
			meteors.push(new __WEBPACK_IMPORTED_MODULE_2__static_js_Meteor__["a" /* default */](ctx, x, height));

			setTimeout(function () {
				meteorGenerator();
			}, Math.random() * 2000);
		};

		var frame = function frame() {
			count++;
			count % 10 == 0 && stars.blink();
			moon.draw();
			stars.draw();

			meteors.forEach(function (meteor, index, arr) {
				if (meteor.flow()) {
					meteor.draw();
				} else {
					arr.splice(index, 1);
				}
			});
			requestAnimationFrame(frame);
		};
		meteorGenerator();
		frame();
	},

	methods: {
		customerLogin: function customerLogin() {
			this.login = true;
			this.customer = true;
		},
		adminLogin: function adminLogin() {
			this.login = true;
			this.admin = true;
		},
		back: function back() {
			this.login = false;
			this.customer = false;
			this.admin = false;
		}
	}
});

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'PanThumb',
  props: {
    image: {
      type: String,
      required: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '150px'
    }
  }
});

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directive_waves_index_js__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_PanThumb__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_PanThumb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_PanThumb__);




/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			sidebarList: [],
			adminSidebar: [{ content: '注意事项', url: '/matters' }, { content: '出租信息管理', url: '/renthouse' }, { content: '出售信息管理', url: '/sellhouse' }, { content: '求租信息管理', url: '/solicithouse' }, { content: '购买信息管理', url: '/buyhouse' }, { content: '会员信息管理', url: '/userlist' }, { content: '留言板管理', url: '/msgborlist' }]
		};
	},

	directives: {
		waves: __WEBPACK_IMPORTED_MODULE_0__directive_waves_index_js__["a" /* default */]
	},
	components: {
		PanThumb: __WEBPACK_IMPORTED_MODULE_1__components_PanThumb___default.a
	},
	created: function created() {
		this.sidebarList = this.sidebarList.concat(this.adminSidebar);
	},

	methods: {}
});

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__waves__ = __webpack_require__(107);


var install = function install(Vue) {
  Vue.directive('waves', __WEBPACK_IMPORTED_MODULE_0__waves__["a" /* default */]);
};

if (window.Vue) {
  window.waves = __WEBPACK_IMPORTED_MODULE_0__waves__["a" /* default */];
  Vue.use(install);
}

__WEBPACK_IMPORTED_MODULE_0__waves__["a" /* default */].install = install;
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__waves__["a" /* default */]);

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__waves_css__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__waves_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__waves_css__);



/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding) {
    el.addEventListener('click', function (e) {
      var customOpts = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, binding.value);
      var opts = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({
        ele: el,
        type: 'hit',
        color: 'rgba(255,252,153,0.5)' }, customOpts);
      var target = opts.ele;
      if (target) {
        target.style.position = 'relative';
        target.style.overflow = 'hidden';
        var rect = target.getBoundingClientRect();
        var ripple = target.querySelector('.waves-ripple');
        if (!ripple) {
          ripple = document.createElement('span');
          ripple.className = 'waves-ripple';
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
          target.appendChild(ripple);
        } else {
          ripple.className = 'waves-ripple';
        }
        switch (opts.type) {
          case 'center':
            ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px';
            ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px';
            break;
          default:
            ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop || document.body.scrollTop) + 'px';
            ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft || document.body.scrollLeft) + 'px';
        }
        ripple.style.backgroundColor = opts.color;
        ripple.className = 'waves-ripple z-active';
        return false;
      }
    }, false);
  }
});

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_normalize_css_normalize_css__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_normalize_css_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_normalize_css_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_chalk_index_css__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_chalk_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_chalk_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_iview__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_iview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_iview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_router__ = __webpack_require__(46);












new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_4_element_ui___default.a, {
  size: 'medium' });

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_7_iview___default.a, {
  transfer: true,
  size: 'large'
});

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(164)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(101),
  /* template */
  __webpack_require__(184),
  /* scopeId */
  "data-v-6251cabc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(161)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(102),
  /* template */
  __webpack_require__(181),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(160)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(103),
  /* template */
  __webpack_require__(180),
  /* scopeId */
  "data-v-40165e4e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(163)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(104),
  /* template */
  __webpack_require__(183),
  /* scopeId */
  "data-v-54771c2b",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(165)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(105),
  /* template */
  __webpack_require__(185),
  /* scopeId */
  "data-v-e9102286",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 180:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "menu"
    }
  }, [_c('canvas', {
    staticClass: "canvas",
    attrs: {
      "id": "canvas"
    }
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-out"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.login),
      expression: "!login"
    }]
  }, [_c('div', {
    staticClass: "logo-bg"
  }), _vm._v(" "), _c('div', {
    staticClass: "nav"
  }, [_c('router-link', {
    attrs: {
      "to": "/customer-login"
    }
  }, [_c('a', {
    staticClass: "gv",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": function($event) {
        _vm.customerLogin()
      }
    }
  }, [_vm._v("客户登录")])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/admin-login"
    }
  }, [_c('a', {
    staticClass: "gv",
    attrs: {
      "href": "avascript:;"
    },
    on: {
      "click": function($event) {
        _vm.adminLogin()
      }
    }
  }, [_vm._v("管理员登录")])])], 1)])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-in"
    }
  }, [_c('router-view', {
    attrs: {
      "customer": _vm.customer,
      "login": _vm.login,
      "admin": _vm.admin
    },
    on: {
      "back": _vm.back
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "city"
  }), _vm._v(" "), _c('div', {
    staticClass: "moon"
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "home"
    }
  }, [_c('canvas', {
    staticClass: "canvas",
    attrs: {
      "id": "canvas"
    }
  }), _vm._v(" "), _c('v-header'), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('sidebar'), _vm._v(" "), _c('transition', [_c('router-view')], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 182:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pan-item",
    style: ({
      zIndex: _vm.zIndex,
      height: _vm.height,
      width: _vm.width
    })
  }, [_c('div', {
    staticClass: "pan-info"
  }, [_c('div', {
    staticClass: "pan-info-roles-container"
  }, [_vm._t("default")], 2)]), _vm._v(" "), _c('img', {
    staticClass: "pan-thumb",
    attrs: {
      "src": _vm.image
    }
  })])
},staticRenderFns: []}

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "header"
    }
  })
},staticRenderFns: []}

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "sidebar"
    }
  }, [_c('div', {
    staticClass: "component-item"
  }, [_c('pan-thumb', {
    attrs: {
      "width": "100px",
      "height": "100px",
      "image": "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"
    }
  })], 1), _vm._v(" "), _c('ul', _vm._l((_vm.sidebarList), function(item, index) {
    return _c('li', {
      staticClass: "list-item"
    }, [_c('router-link', {
      attrs: {
        "to": item.url
      }
    }, [_vm._v(_vm._s(item.content))])], 1)
  }))])
},staticRenderFns: []}

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Meteor {
    constructor(ctx, x, h) {
        this.ctx = ctx
        this.x = x
        this.y = 0
        this.h = h
        this.vx = -(4 + Math.random() * 4)
        this.vy = -this.vx
        this.len = Math.random() * 300 + 500
    }

    flow() {
        //判定流星出界
        if (this.x < -this.len || this.y > this.h + this.len) {
            return false
        }
        this.x += this.vx
        this.y += this.vy
        return true
    }

    draw() {
        let ctx = this.ctx,
            //径向渐变，从流星头尾圆心，半径越大，透明度越高
            gra = ctx.createRadialGradient(
                this.x, this.y, 0, this.x, this.y, this.len)

        const PI = Math.PI
        gra.addColorStop(0, 'rgba(255,255,255,1)')
        gra.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.save()
        ctx.fillStyle = gra
        ctx.beginPath()
        //流星头，二分之一圆
        ctx.arc(this.x, this.y, 1, PI / 4, 5 * PI / 4)
        //绘制流星尾，三角形
        ctx.lineTo(this.x + this.len, this.y - this.len)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Meteor;



/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Moon {
	constructor(ctx, width, height) {
		this.ctx = ctx
		this.width = width
		this.height = height
	}

	draw() {
		let ctx = this.ctx,
			gradient = ctx.createRadialGradient(100, 100, 60, 200, 200, 600)
			//月亮
			// gradient.addColorStop(0, 'rgba(255,255,255,0.5)')
			// gradient.addColorStop(0.01, 'rgb(70,70,80)')
			// gradient.addColorStop(0.2, 'rgb(40,40,50)')
			gradient.addColorStop(0.4, 'rgb(20,20,30)')
			gradient.addColorStop(1, 'rgb(0,0,10)')
			ctx.save()
			ctx.fillStyle = gradient
			ctx.fillRect(0, 0, this.width, this.height)
			ctx.restore()
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Moon;


/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Stars {
	constructor(ctx, width, height, amount) {
		this.ctx = ctx
		this.width = width
		this.height = height
		this.stars = this.getStars(amount)
	}

	//返回一堆的小星星
	getStars(amount) {
		let stars = []
		while(amount--) {
			// console.log(amount)
			// 创建一个星星的坐标及大小数据描述JSON对象，添加到stars数组
			stars.push({
				x: Math.random()*this.width,
				y: Math.random()*this.height,
				r: Math.random()+0.2
			})
		}
		return stars
	}

	//画满天星
	draw() {
		let ctx = this.ctx
		ctx.save()   //保存canvas当前绘制，一般新绘制前调用
		ctx.fillStyle = 'white'
		//star 是从stars里的一颗star 这里是function的参数
		this.stars.forEach(star => {
			ctx.beginPath()  //开始绘制
			ctx.arc(star.x, star.y, star.r, 0, 2*Math.PI)  //画椭圆
			ctx.fill()  //填充色
		})
		ctx.restore() //再次保存
	}

	//星星没隔10帧闪一下
	blink() {
		//map方法 找到合适的星星放进新数组 匹配
		this.stars = this.stars.map(star => {
			let sign = Math.random()>0.5 ? 1 : -1
			star.r += sign * 0.2
			if (star.r < 0) {
				star.r = -star.r
			} else if (star.r > 1){
				star.r -= 0.2
			// console.log(star.r)

			}
			return star
		})
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stars;


/***/ }),

/***/ 192:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Menu__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Home__);





__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
	linkActiveClass: 'active',
	routes: [{
		path: '/',
		component: __WEBPACK_IMPORTED_MODULE_2__components_Menu___default.a
	}, {
		path: '/menu',
		component: __WEBPACK_IMPORTED_MODULE_2__components_Menu___default.a,
		children: [{
			path: '/customer-login',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(76)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/admin-login',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(0/* duplicate */).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(76)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/regist',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(197)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}]
	}, {
		path: '/home',
		component: __WEBPACK_IMPORTED_MODULE_3__components_Home___default.a,
		children: [{
			path: '/matters',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(11).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(194)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/renthouse',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(9).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(198)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/sellhouse',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(199)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		},, {
			path: '/solicithouse',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(200)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/buyhouse',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(4).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(193)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/userinfo',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(8).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(201)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/modifypass',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(10).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(196)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/messageboard',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(5).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(195)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/userlist',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(6).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(203)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}, {
			path: '/msgborlist',

			component: function component(resolve) {
				return __webpack_require__.e/* require */(7).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(202)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
			}
		}]
	}]
}));

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(162)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(100),
  /* template */
  __webpack_require__(182),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

},[108]);
//# sourceMappingURL=app.2214f1ebb3b0d4875364.js.map