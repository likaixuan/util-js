
let util = {};

//类型检测 is···
(function (util, arr) {
    let type = "";
    for ( let i = 0, type; type = arr[i++]; ) {
        util['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object '+type+']';
        }
    }

})(util, ['String', 'Array', 'Number','Object','Function','Null','Undefined']);

export default util;