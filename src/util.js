let util = {}


// 检测包含
util.has = function (arr, name) {
    return arr.indexOf(name) > -1
}

// 类型检测
;(function (util, arr) {
    for (let i = 0, type; type = arr[i++];) {
        util['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']'
        }
    }
})(util, ['String', 'Array', 'Number', 'Object', 'Function', 'Null', 'Undefined'])


// 发布订阅
util.eventBus = {
    list: {},
    cached: {},
    on: function (type, fun) {
        // 绑定事件与回调
        if (!fun) {
            return
        }
        if (!this.list[type]) {
            this.list[type] = []
        }
        // 将重复过滤
        this.off(type, fun)
        this.list[type].push(fun)

        let args = this.cached[type]
        if (args && Array.isArray(args)) {
            fun.apply(null, args)
        }

    },
    once(...args) {
	if (args.length >= 2) {
	    args[1].once = true
	    this.on.apply(this, args)
	}
    },
    off: function (type, fun) {
        let funArr = this.list[type]
        if (!funArr) {
            return false
        }
        if (!fun) {
            this.cached[type] = null
            this.list[type] = []
        } else {
            for (let i = 0; i < funArr.length; i++) {
                if (fun === funArr[i]) {
                    funArr.splice(i, 1)
                }
            }
        }

    },
    emit: function (type) {
        let args = Array.prototype.slice.call(arguments, 1)
	this.cached[type] = args
	let funArr = this.list[type]
	if (!funArr) {
	    return false
	}
	this.list[type] = funArr.filter((item) => {
	    item.apply(this, args)
	    return !item.once
	})
    }

}

// 节点路径查询
util.searchTreePath(currentArr, id, idName, pidName, childArrName, path, originalArr) {
    path = path || []
    originalArr = originalArr || currentArr
    currentArr.forEach((item) => {
        if (item[idName] === id) {
            path.unshift(item[idName])
            if (item[pidName]) {
                this.searchPath(originalArr, item[pidName], idName, pidName, childArrName, path, originalArr)
            }
        } else if (item[childArrName]) {
            this.searchPath(item[childArrName], id, idName, pidName, childArrName, path, originalArr)
        }
    })
    return path
}

// 调试信息
util.log = function () {
    console.log.apply(console, arguments)
}


// 打印对象详情 
util.alertObj = function (obj) {
    let str = ""
    for (let key in obj) {
        str += key + '=' + obj[key] + '\n'
    }
    alert(str)
}


// 简易假深拷贝
export const deepCopy = function (obj, keys = []) {
    let copyObj = {}
    if (Array.isArray(keys) && keys.length > 1) {
        keys.forEach((item) => {
            copyObj[item] = obj[item]
        })
        return JSON.parse(JSON.stringify(copyObj))
    } else {
        return JSON.parse(JSON.stringify(obj))
    }
}

// 首字母大写
util.capitalize =  function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// 日期
util.date = {
	cloneDate: function (date) {
		return new Date(date)
	},
	getCurrentMonthFirstDay: function (date) {
		// date 所在月份第一天
		date = this.cloneDate(date)
		return new Date(date.setDate(1))
	},
	getCurrentMonthLastDay: function (date) {
		// date 所在月份最后一天
		let currentMonth = date.getMonth()
		let nextMonth = ++currentMonth
		let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
		let oneDay = 1000 * 60 * 60 * 24
		return new Date(nextMonthFirstDay - oneDay)
	},
	getCurrentWeekLastDay: function (date) {
		// date 所在周最后一天
		date = this.cloneDate(date)
		let lastDate = date.setDate(date.getDate() + (7 - date.getDay()))
		return new Date(lastDate)
	},
	getCurrentWeekFirstDay: function (date) {
		// date 所在周第一天
		date = this.cloneDate(date)
		let firstDate = date.setDate(date.getDate() - (date.getDay() - 1))
		return new Date(firstDate)
	},
	getNextDay: function (date) {
		// date 下一天
		date = this.cloneDate(date)
		return new Date(date.setDate(date.getDate() + 1))
	},
	getPrevDay: function (date) {
		// date 上一天
		date = this.cloneDate(date)
		return new Date(date.setDate(date.getDate() - 1))
	},
	getNextWeekFirstDay: function (date) {
		// date 所在周的下一周的第一天
		date = this.cloneDate(date)
		let weekLastDate = this.getCurrentWeekLastDay(date)
		return new Date(weekLastDate.setDate(weekLastDate.getDate() + 1))
	},
	getPrevWeekFirstDay: function (date) {
		// date 所在周的上一周的第一天
		date = this.cloneDate(date)
		let weekFirstDate = this.getCurrentWeekFirstDay(date)
		return new Date(weekFirstDate.setDate(weekFirstDate.getDate() - 7))
	},
	getNextMonthFirstDay: function (date) {
		// date 所在月的下一月的第一天
		date = this.cloneDate(date)
		let monthLastDate = this.getCurrentMonthLastDay(date)
		return new Date(monthLastDate.setDate(monthLastDate.getDate() + 1))
	},
	getPrevMonthFirstDay: function (date) {
		// date 所在月的上一月的第一天
		date = this.cloneDate(date)
		let monthFirstDate = this.getCurrentMonthFirstDay(date)
		let prevMonthLastDate = new Date(monthFirstDate.setDate(monthFirstDate.getDate() - 1))
		return this.getCurrentMonthFirstDay(prevMonthLastDate)
	}

}


// 获取外联样式
util.getStyle = function (obj, attr) {
	if(!!obj.currentStyle) {
		return obj.currentStyle[attr]
	} else {
		return window.getComputedStyle(obj, null)[attr] 
	}
}

/**
 * @author乐意黎 （http://blog.csdn.net/aerchi/article/details/51697592）
 * 
 * 获取浏览器信息
 */
util.getBrowser = function (getVersion) {
	// 注意关键字大小写
	var ua_str = navigator.userAgent.toLowerCase(), ie_Tridents, trident, match_str, ie_aer_rv, browser_chi_Type;

	// 判断IE 浏览器, 
	// blog: http://blog.csdn.net/aerchi/article/details/51697592
	if ("ActiveXObject" in self) {
		// ie_aer_rv:  指示IE 的版本.
		// It can be affected by the current document mode of IE.
		ie_aer_rv = (match_str = ua_str.match(/msie ([\d.]+)/)) ? match_str[1] :
			(match_str = ua_str.match(/rv:([\d.]+)/)) ? match_str[1] : 0;

		// ie: Indicate the really version of current IE browser.
		ie_Tridents = { "trident/7.0": 11, "trident/6.0": 10, "trident/5.0": 9, "trident/4.0": 8 };
		// 匹配 ie8, ie11, edge
		trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/)) ? match_str[1] : undefined;
		browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? "ie" : undefined;
	} else {
		// 判断 windows edge 浏览器
		// match_str[1]: 返回浏览器及版本号,如: "edge/13.10586"
		// match_str[1]: 返回版本号,如: "edge" 
		// 若要返回 "edge" 请把下行的 "ie" 换成 "edge"。 注意引号及冒号是英文状态下输入的
		browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/)) ? "ie" :
			// 判断firefox 浏览器
			(match_str = ua_str.match(/firefox\/([\d.]+)/)) ? "firefox" :
				// 判断chrome 浏览器
				(match_str = ua_str.match(/chrome\/([\d.]+)/)) ? "chrome" :
					// 判断opera 浏览器
					(match_str = ua_str.match(/opera.([\d.]+)/)) ? "opera" :
						// 判断safari 浏览器
						(match_str = ua_str.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined;
	}

	// 返回浏览器类型和版本号
	var verNum, verStr;
	verNum = trident && ie_Tridents[trident] ? ie_Tridents[trident] : match_str[1];
	verStr = (getVersion != undefined) ? browser_chi_Type + "/" + verNum : browser_chi_Type;
	return verStr;
}

export default util
