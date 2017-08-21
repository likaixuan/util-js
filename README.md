### 1.类型检测
- 是否为数组
util.isArray()

- 是否为对象
util.isObject()

- 是否为数值
util.isNumber()

- 是否为函数
util.isFunction()

- 是否为字符串
util.isString()

- 是否为null
util.isNull()

- 是否为undefined
util.isUndefined()

> 源码解析

``` javascript
let util = {};
//利用立即执行函数为util添加静态方法
(function (util, arr) {
    let type = "";
    for (let i = 0, type; type = arr[i++];) {
        util['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    }

})(util, ['String', 'Array', 'Number', 'Object', 'Function', 'Null', 'Undefined']);

```

