
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
util.Chain = function (fn) {
    this.fn = fn;
    this.successor = null;
}

util.Chain.prototype.setNextSuccessor = function (successor) {
    //设置下一个节点
    return this.successor = successor;
}

util.Chain.prototype.passRequest = function () {

    //执行当前节点
    let ret = this.fn.apply(this, arguments, this.next);
    return ret;
};

util.Chain.prototype.next = function () {
    //执行下一个节点
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
}

export default util;