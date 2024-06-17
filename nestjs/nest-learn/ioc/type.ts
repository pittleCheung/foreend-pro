// 这是一个泛型接口，用于表示一个构造函数的类型。其中 T 是构造函数实例化后的类型。这个接口定义了一个 new 方法，
// 表示这个类型是一个构造函数，可以通过 new 运算符来实例化一个对象。它的参数列表是一个可变参数列表，
// 表示构造函数可以接受任意个数的参数，且这些参数的类型可以是任意类型。
export interface Type<T>{
    new(...args: any[]): T;
}

// 这个定义与之前的 interface 定义等价，也可以用于声明一个构造函数类型，表示这个构造函数返回的对象类型是 T。
// export type Type<T> = new(...args: any[]) => T;