import getLastEvent from '../utils/getLastEvent';
import getLines from '../utils/getLines';
import getSelector from '../utils/getSelector';
import tracker from '../utils/tracker';

export function injectJsError() {
    console.log('injectJsError')

    //监听全局未捕获的错误
    window.addEventListener('error', function (event) {//错误事件对象
        console.log(event)
        let lastEvent = getLastEvent();//最后一个交互事件
        console.log('lastEvent', lastEvent);
        tracker.send({
            kind: 'stability',//监控指标的大类
            type: 'error',//小类型 这是一个错误
            errorType: 'jsError',//JS执行错误
            message: event.message,//报错信息
            filename: event.filename,//哪个文件报错了
            position: `${event.lineno}:${event.colno}`,
            stack: getLines(event.error.stack),
            // getSelector方法的作用 将 lastEvent.path 的数据结构转换成 字符串类型，如： body div#container div.content input
            selector: lastEvent ? getSelector(lastEvent.path) : '' //代表最后一个操作的元素
        });
    }, true);
}