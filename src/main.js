import  util from './util.js';



//测试职责链

let order500 = function (orderType, pay, stock, next) {
    // console.log(next,555);
    if (orderType === 1 && pay === true) {
        console.log("交过五百定金");
    } else {
        console.log("三秒后出结果");
        setTimeout(next,3000);

    }
}
let order200 = function (orderType, pay, stock, next) {
    if (orderType === 2 && pay === true) {
        console.log("交过二百定金");
    } else {
        next();
    }
}
let orderNormal = function (orderType, pay,stock) {
    if (stock > 0) {
        console.log("没交过定金");
    } else {
        console.log('手机库存不足');
    }
}
var a500 = util.Chain(order500),
    a200 = util.Chain(order200),
    aNormal = util.Chain(orderNormal);
a500.setNext(a200).setNext(aNormal);
a500.run(3, true, 500);