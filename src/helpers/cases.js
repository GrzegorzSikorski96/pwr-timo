let localLegend = {};

export function SimplexEnd(iteration) {
    localLegend = iteration.legend;

    if (oneSolution(iteration.matrix)) {
        return oneSolution(iteration.matrix);
    }

    if (limitedManySolution(iteration.matrix)) {
        return limitedManySolution(iteration.matrix);
    }

    if (unlimitedManySolutions(iteration.matrix)) {
        return unlimitedManySolutions(iteration.matrix);
    }

    if (unlimitedNoSolutions(iteration.matrix)) {
        return unlimitedNoSolutions(iteration.matrix);
    }

    return false;
}

export function limitedManySolution(matrix) {
    for (let col = 1; col < matrix[0].length; col++) {
        if (hasPairInRow(localLegend.columns[col]) >= 0 && matrix[0][col] === 0) {
            if (matrix.slice(1).filter(x => x[col] > 0).length >= 1) {
                return {
                    text: "Zbiór ograniczony - wiele rozwiązań",
                };
            }
        }
    }

    return false;
}

export function oneSolution(matrix) {
    if (!limitedManySolution(matrix)) {
        if (!unlimitedManySolutions(matrix)) {
            if (matrix[0].slice(1).filter(x => x >= 0).length === matrix[0].length - 1) {
                return {
                    text: "Istnieje jedno rozwiązanie optymalne",
                    value: matrix[0][0],
                    variables: getVariablesValues(matrix)
                };
            }
        }
    }
    return false;
}

export function unlimitedNoSolutions(matrix) {
    for (let col = 1; col < matrix[0].length; col++) {
        if (hasPairInRow(localLegend.columns[col]) >= 0 && matrix[0][col] < 0) {
            if (matrix.slice(1).filter(x => x[col] <= 0).length === (matrix.length - 1)) {
                return {
                    text: "Zbiór nieograniczony - brak rozwiązań",
                }
            }
        }
    }

    return false;
}

export function unlimitedManySolutions(matrix) {
    for (let col = 1; col < matrix[0].length; col++) {
        if (hasPairInRow(localLegend.columns[col]) >= 0 && matrix[0][col] === 0) {
            console.log("test");
            if (matrix.slice(1).filter(x => x[col] <= 0).length === (matrix.length - 1)) {
                return {
                    text: "Zbiór nieograniczony - wiele rozwiązań",
                }
            }
        }
    }

    return false;
}

export function emptySet(matrix) {
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i][0] < 0) {
            if (matrix[i].filter(x => x > 0).length === matrix[i].length - 1) {
                return {
                    text: "Brak rozwiązań - zbiór pusty",
                }
            }
        }
    }

    return false;
}

function getVariablesValues(matrix) {
    let values = new Array(matrix.length + matrix[0].length - 2).fill(0);
    let xCount = 0;
    for (let i = 1; i < localLegend.columns.length; i++) {
        if (localLegend.columns[i].substring(0, 1) === "x") {
            values[Number(localLegend.columns[i].substr(1)) - 1] = matrix[0][i];
            xCount++;
        } else {
            values[Number(localLegend.columns[i].substr(1)) - 1 + (localLegend.columns.length - 1)] = matrix[0][i];
        }
    }

    for (let i = 1; i < localLegend.rows.length; i++) {
        if (localLegend.rows[i].substring(0, 1) === "x") {
            values[Number(localLegend.rows[i].substr(1)) - 1] = matrix[i][0];
            xCount++;
        } else {
            values[Number(localLegend.rows[i].substr(1)) - 1 + (localLegend.columns.length - 1)] = matrix[i][0];
        }
    }

    let result = [];

    for (let i = 0; i < xCount; i++) {
        result.push(values[i] - values[i + 1]);
        i += 1;
    }

    return result;
}

export function hasPairInRow(legendItem) {
    if (legendItem.substr(0, 1) === "U") {
        return true;
    }

    let number = Number(legendItem.substr(1));

    if (number % 2 === 0) {
        return localLegend.columns.findIndex((x) => {
            if (x.substr(0, 1) === "x") {
                return Number(x.substr(1)) === number - 1;
            }
        })
    } else {
        return localLegend.columns.findIndex((x) => {
            if (x.substr(0, 1) === "x") {
                return Number(x.substr(1)) === number + 1;
            }
        })
    }
}

