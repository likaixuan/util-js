let util = {};


util.has = function (arr, name) {
    return arr.indexOf(name) > -1;
}

    (function (util, arr) {
        for (let i = 0, type; type = arr[i++];) {
            util['is' + type] = function (obj) {
                return Object.prototype.toString.call(obj) === '[object ' + type + ']';
            }
        }
    })(util, ['String', 'Array', 'Number', 'Object', 'Function', 'Null', 'Undefined']);

//职责链
util.Chain = (
    function () {
        let Chain = function (fn) {
            if (!(this instanceof Chain)) {
                return new Chain(fn);
            }
            this.fn = fn;
            this.successor = null;
        };

        Chain.prototype.setNext = function (successor) {
            return this.successor = successor;
        }
        Chain.prototype.run = function () {
            //第一次传参时
            if (!Chain.args) {
                Chain.args = Array.prototype.slice.call(arguments);
            }
            let arr = Array.prototype.concat.call(Chain.args, this.next.bind(this));
            return this.fn.apply(this, arr);
        }
        Chain.prototype.next = function () {
            return this.successor && this.successor.run.apply(this.successor, arguments);
        }
        return Chain;
    }
)();

util.eventBus = {
    list: {},
    cached: {},
    on: function (type, fun) {
        //绑定事件与回调
        if (!fun) {
            return
        }
        if (!this.list[type]) {
            this.list[type] = [];
        }
        //将重复过滤
        this.off(type, fun)
        this.list[type].push(fun)

        let args = this.cached[type]
        if (args && Array.isArray(args)) {
            fun.apply(null, args)
        }

    },
    off: function (type, fun) {
        //解除绑定

        var funArr = this.list[type];

        if (!funArr) {
            return false;
        }
        if (!fun) {
            this.cached[type] = null;
            this.list[type] = [];
        } else {
            for (var i = 0; i < funArr.length; i++) {
                if (fun === funArr[i]) {
                    funArr.splice(i, 1);
                }
            }
        }
    },
    emit: function (type) {
        //触发事件回调
        var args = Array.prototype.slice.call(arguments, 1);
        this.cached[type] = args
        var funArr = this.list[type];
        if (!funArr) {
            return false;
        }
        for (var i = 0; i < funArr.length; i++) {
            funArr[i].apply(this, args);
        }

    }

}

//节点路径查询
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
    return path;
}

export default util;
