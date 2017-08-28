
let util = {};

//类型检测 is···
(function (util, arr) {
    let type = "";
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
            console.log(arr);
            return this.fn.apply(this, arr);
        }
        Chain.prototype.next = function () {
            return this.successor && this.successor.run.apply(this.successor, arguments);
        }
        return Chain;
    }
)();


export default util;