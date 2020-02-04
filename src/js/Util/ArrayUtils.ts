export class ArrayUtils {
    static flatten<T>(array: Array<Array<T>>): Array<T> {
        return Array.prototype.concat.apply([], array);
    }

    static randomElement<T>(array: Array<T>): T {
        return array[array.length * Math.random() << 0];
    }
}
