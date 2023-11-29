"use strict";
var PossibleTypes;
(function (PossibleTypes) {
    PossibleTypes["Undefined"] = "undefined";
    PossibleTypes["Number"] = "number";
    PossibleTypes["String"] = "string";
    PossibleTypes["Object"] = "object";
})(PossibleTypes || (PossibleTypes = {}));
function totalValue(obj) {
    return Object.keys(obj).reduce((sum, el) => {
        const element = obj[el];
        if (typeof element === PossibleTypes.Undefined)
            return sum + 2021;
        else {
            const value = element === null || element === void 0 ? void 0 : element.cvalue;
            switch (typeof value) {
                case PossibleTypes.Undefined:
                    return sum + 2021;
                case PossibleTypes.Number:
                    return sum + Number(value);
                case PossibleTypes.String:
                    return sum + Number(value) || 2021;
                case PossibleTypes.Object:
                    return sum + totalValue(value);
                default:
                    return sum;
            }
        }
    }, 0);
}
const emptyObject = {};
const undefinedValue = {
    test: { cvalue: undefined },
};
const stringValue = {
    test: { cvalue: 'Hello' },
};
const numberValue = {
    test: { cvalue: 42 },
};
const nestedObject = {
    parent: {
        cvalue: {
            child1: { cvalue: '1' },
            child2: { cvalue: 2 },
        },
    },
};
const mixedValues = {
    mix: {
        cvalue: {
            nested: { cvalue: '5' },
            nested2: { cvalue: 10 },
            nested3: { cvalue: undefined }
        },
    },
};
console.log("Empty Object:", totalValue(emptyObject)); // 0
console.log("Undefined Value:", totalValue(undefinedValue)); // 2021
console.log("String Value:", totalValue(stringValue)); // 2021 (as it's converted to a number)
console.log("Number Value:", totalValue(numberValue)); // 42
console.log("Nested Object:", totalValue(nestedObject)); // 3 (1 + 2)
console.log("Mixed Values:", totalValue(mixedValues)); // 2036
