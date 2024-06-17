// const EventTypes = ["click", "hover", "keypress"] as const
// type EventType = (typeof EventTypes)[number]
var EventType;
(function (EventType) {
    EventType["Click"] = "click";
    EventType["Hover"] = "hover";
    EventType["KeyPress"] = "keypress";
    // 添加其他类型
})(EventType || (EventType = {}));
console.log(EventType.Click);
class EventBus {
    constructor(listeners = {}) {
        this.listeners = listeners;
    }
    addEventListener(eventType, listener) {
        if (this.listeners[eventType]) {
            this.listeners[eventType].push(listener);
        }
        else {
            this.listeners[eventType] = [listener];
        }
    }
    removeEventListener(eventType, listener) {
        if (this.listeners[eventType]) {
            this.listeners[eventType] = this.listeners[eventType].filter((l) => l !== listener);
        }
    }
    dispatchEvent(eventType, data) {
        if (this.listeners[eventType]) {
            this.listeners[eventType].forEach((listener) => {
                listener(data);
            });
        }
    }
}
// 示例用法
const bus = new EventBus();
function onButtonClick(data) {
    console.log(`Button clicked with data: ${data}`);
}
function onKeyPress(data) {
    console.log(`Key pressed with data: ${data}`);
}
bus.addEventListener("button_click", onButtonClick);
bus.addEventListener("key_press", onKeyPress);
// 模拟触发事件
bus.dispatchEvent("button_click", "Button 1");
bus.dispatchEvent("key_press", "Enter key");
//# sourceMappingURL=5.js.map