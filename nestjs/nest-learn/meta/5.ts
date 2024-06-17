type Listener = (data: any) => void
// const EventTypes = ["click", "hover", "keypress"] as const
// type EventType = (typeof EventTypes)[number]

enum EventType {
  Click = "click",
  Hover = "hover",
  KeyPress = "keypress",
  // 添加其他类型
}

type EventTypeName = keyof typeof EventType

console.log(EventType.Click)

class EventBus {
  constructor(private listeners: { [key: string]: Listener[] } = {}) {}

  addEventListener(eventType: string, listener: Listener): void {
    if (this.listeners[eventType]) {
      this.listeners[eventType].push(listener)
    } else {
      this.listeners[eventType] = [listener]
    }
  }

  removeEventListener(eventType: string, listener: Listener): void {
    if (this.listeners[eventType]) {
      this.listeners[eventType] = this.listeners[eventType].filter(
        (l) => l !== listener,
      )
    }
  }

  dispatchEvent(eventType: string, data: any): void {
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach((listener) => {
        listener(data)
      })
    }
  }
}

// 示例用法
const bus = new EventBus()

function onButtonClick(data: any) {
  console.log(`Button clicked with data: ${data}`)
}

function onKeyPress(data: any) {
  console.log(`Key pressed with data: ${data}`)
}

bus.addEventListener("button_click", onButtonClick)
bus.addEventListener("key_press", onKeyPress)

// 模拟触发事件
bus.dispatchEvent("button_click", "Button 1")
bus.dispatchEvent("key_press", "Enter key")
