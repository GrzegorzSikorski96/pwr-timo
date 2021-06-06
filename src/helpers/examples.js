export var examples = [
    {// Jedno rozwiązanie - x0=7.875 x1=2,625 x2=2,625
        parameters: {
            variables: 2,
            limitations: 3,
        },
        base: [2, 1],
        limitations: [{
            variables: [1, 1], sign: "geq", value: 5,
        }, {
            variables: [-1, 1], sign: "leq", value: 0,
        }, {
            variables: [6, 2], sign: "leq", value: 21,
        },]
    },
    { // Nieograniczony - wiele rozwiązań
        parameters: {
            variables: 2,
            limitations: 2,
        },
        base: [-2, 4],
        limitations: [{
            variables: [2, 1], sign: "leq", value: -4,
        }, {
            variables: [-1, 2], sign: "leq", value: -1,
        },]
    },
    {// Jedno rozwiązanie - x0=-6 x1=-2  x2=-2
        parameters: {
            variables: 2,
            limitations: 2,
        },
        base: [1, 2],
        limitations: [{
            variables: [-2, 1], sign: "geq", value: 2,
        }, {
            variables: [1, -2], sign: "geq", value: 2,
        },]
    },
    {// Nieograniczony - brak rozwiązań
        parameters: {
            variables: 2,
            limitations: 3,
        },
        base: [1, -1],
        limitations: [{
            variables: [-2, 1], sign: "leq", value: 2,
        }, {
            variables: [1, 1], sign: "leq", value: 6,
        }, {
            variables: [5, 2], sign: "leq", value: 20,
        },]
    },
    {//Jedno rozwiązanie - x0=-6600 x1=-2 x2=-2
        parameters: {
            variables: 2,
            limitations: 2,
        },
        base: [2100, 1200],
        limitations: [{
            variables: [-2, 1], sign: "geq", value: 2,
        }, {
            variables: [1, -2], sign: "geq", value: 2,
        },]
    },
    {//Zbiór ograniczony - wiele rozwiązań
        parameters: {
            variables: 2,
            limitations: 2,
        },
        base: [2, 1],
        limitations: [{
            variables: [-4, 3], sign: "leq", value: 2,
        }, {
            variables: [-2, -1], sign: "geq", value: 1,
        },]
    },
    {//Jedno rozwiązanie - x0=3.249 x1=-3.75 x2=-3.501
        parameters: {
            variables: 2,
            limitations: 3,
        },
        base: [1, -2],
        limitations: [{
            variables: [-4, 2], sign: "leq", value: 8,
        }, {
            variables: [2, -3], sign: "leq", value: 3,
        }, {
            variables: [3, 2], sign: "leq", value: 6,
        },]
    },
    {//Nieograniczony - brak rozwiązań
        parameters: {
            variables: 2,
            limitations: 4,
        },
        base: [1, 1],
        limitations: [{
            variables: [1, 1], sign: "geq", value: 2,
        }, {
            variables: [-1, 1], sign: "leq", value: 1,
        }, {
            variables: [1, 0], sign: "geq", value: 0,
        }, {
            variables: [0, 1], sign: "geq", value: 0,
        },]
    },
    {//Nieograniczony - brak rozwiązań
        parameters: {
            variables: 2,
            limitations: 3,
        },
        base: [-1, -6],
        limitations: [{
            variables: [2, 1], sign: "geq", value: 2,
        }, {
            variables: [-1, 1], sign: "leq", value: 3,
        }, {
            variables: [1, 1], sign: "leq", value: 6,
        },]
    },
    {//Nieograniczony - brak rozwiązań
        parameters: {
            variables: 3,
            limitations: 3,
        },
        base: [0.5, -1, -1],
        limitations: [{
            variables: [-0.5, 2, 1], sign: "leq", value: 2,
        }, {
            variables: [-0.5, 2, -1], sign: "geq", value: 3,
        }, {
            variables: [0, 1, -1], sign: "leq", value: 2,
        },]
    },
    {// Jedno rozwiązanie - x0=8 x1=-4 x2=-2
        parameters: {
            variables: 2,
            limitations: 2,
        },
        base: [-1, -2],
        limitations: [{
            variables: [-1, 1], sign: "leq", value: 2,
        }, {
            variables: [0, 1], sign: "geq", value: -2,
        },
        ]
    },
    {// Jedno rozwiązanie - x0=5.6 x1=-3.2 x2=-1.2
        parameters: {
            variables: 2,
            limitations: 2,
        },
        base: [-1, -2],
        limitations: [{
            variables: [-1, 1], sign: "leq", value: 2,
        }, {
            variables: [1, 4], sign: "geq", value: -8,
        },
        ]
    },
    {// Jedno rozwiązanie - x0=61, x1=-7 x2=12
        parameters: {
            variables: 2,
            limitations: 3,
        },
        base: [5, 8],
        limitations: [{
            variables: [3, 2], sign: "geq", value: 3,
        }, {
            variables: [1, 4], sign: "geq", value: 4,
        }, {
            variables: [1, 1], sign: "leq", value: 5,
        },]
    },
    {// Nieograniczone - brak rozwiązań
        parameters: {
            variables: 2,
            limitations: 2,
        },
        base: [-1, -4],
        limitations: [{
            variables: [-1, 1], sign: "leq", value: 2,
        }, {
            variables: [1, 2], sign: "geq", value: -8,
        },
        ]
    },
]
