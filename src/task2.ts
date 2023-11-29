type Avalue = A | string | number | undefined

interface A {
    [key: string]: { cvalue: Avalue } | undefined
}

enum PossibleTypes {
    Undefined = 'undefined',
    Number = 'number',
    String = 'string',
    Object = 'object',
}


function totalValue(obj: A): number {
    return Object.keys(obj).reduce((sum, el) => {
        const element = obj[el];
        if (typeof element === PossibleTypes.Undefined) return sum + 2021
        else {
            const value = element?.cvalue
            switch (typeof value) {
                case PossibleTypes.Undefined:
                    return sum + 2021
                case PossibleTypes.Number:
                    return sum + Number(value)
                case PossibleTypes.String:
                    return sum + Number(value) || 2021
                case PossibleTypes.Object:
                    return sum + totalValue(value as A)
                default:
                    return sum
            }
        }
    }, 0)
}


const emptyObject: A = {};

const undefinedValue: A = {
    test: {cvalue: undefined},
};

const stringValue: A = {
    test: {cvalue: 'Hello'},
};

const numberValue: A = {
    test: {cvalue: 42},
};

const nestedObject: A = {
    parent: {
        cvalue: {
            child1: {cvalue: '1'},
            child2: {cvalue: 2},
        },
    },
};

const mixedValues: A = {
    mix: {
        cvalue: {
            nested: {cvalue: '5'},
            nested2: {cvalue: 10},
            nested3: {cvalue: undefined}
        },

    },
};

console.log("Empty Object:", totalValue(emptyObject)); // 0
console.log("Undefined Value:", totalValue(undefinedValue)); // 2021
console.log("String Value:", totalValue(stringValue)); // 2021 (as it's converted to a number)
console.log("Number Value:", totalValue(numberValue)); // 42
console.log("Nested Object:", totalValue(nestedObject)); // 3 (1 + 2)
console.log("Mixed Values:", totalValue(mixedValues)); // 2036