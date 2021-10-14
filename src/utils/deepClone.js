const forEach = (array, iteratee) => {
    let index = -1;
    const length = array.length;
    while (++index < length) iteratee(array[index], index);
    return array;
}

const clone = (target, map = new WeakMap()) => {
    if (typeof target === 'object') {
        const isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};
        if (map.get(target)) return map.get(target);
        map.set(target, cloneTarget);
        isArray ? forEach(target, (value, index) => cloneTarget[index] = value) :
            forEach(Object.keys(target), (key) => cloneTarget[key] = target[key]);
        return cloneTarget;
    } else {
        return target;
    }
}

export default clone;