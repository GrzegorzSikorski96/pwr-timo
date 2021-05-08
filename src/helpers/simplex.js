export function selectColumnInRow(matrix, row = 0) {
    let min = 0;
    let column;

    for (let i = 1; i < matrix[row].length; i++) {
        if (matrix[row][i] < min && matrix[row][i] < 0) {
            min = matrix[row][i];
            column = i;
        }
    }

    return column;
}

export function selectRow(matrix, column) {
    let min = 1000000;
    let row = 1;

    for (let i = 1; i < matrix.length; i++) {
        if (calculateRowIndicator(matrix[i][0], matrix[i][column]) > 0 && calculateRowIndicator(matrix[i][0], matrix[i][column]) < min) {
            min = calculateRowIndicator(matrix[i][0], matrix[i][column]);
            row = i;
        }
    }

    return row;
}

export function calculateRowIndicator(value, colValue) {
    return value / colValue;
}

export function changeLegendRowWithColumn(legend, row, column) {
    let local = JSON.parse(JSON.stringify(legend));

    local.rows[row] = legend.columns[column];
    local.columns[column] = legend.rows[row];

    return local;
}

export function createSimplexMatrix(base, limitations, n, m) {
    let matrix = new Array(m + 1).fill(0).map(() => new Array((n * 2) + 1).fill(0))

    for (let i = 0; i < matrix.length; i++) {
        let step = 1;
        for (let j = 0; j < matrix[i].length; j++) {
            if (i === 0 && j === 0) {
                matrix[i][j] = 0;
            }
            if (j % 2 !== 0) {
                if (i === 0) {
                    matrix[i][j] = -base[j - step];
                    step++;
                } else {
                    matrix[i][j] = limitations[i - 1].variables[j - step];
                    step++;
                }
            } else {
                if (j > 0) {
                    matrix[i][j] = -matrix[i][j - 1];
                } else {
                    if (i > 0) {
                        matrix[i][j] = limitations[i - 1].value;
                    }
                }
            }
        }
    }

    return matrix;
}

export function hasMajorityRestrictions(signs) {
    for (let sign of signs) {
        if (sign === "geq") {
            return true;
        }
    }

    return false;
}

export function hasLowerThanZeroLimitation(matrix) {
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i][0] < 0) {
            return true;
        }
    }

    return false;
}

export function changeMajoritySign(iteration) {
    let local = JSON.parse(JSON.stringify(iteration));

    for (let i = 1; i < local.legend.signs.length; i++) {
        if (local.legend.signs[i] === "geq") {
            local.legend.signs[i] = "leq";
            for (let col = 0; col < local.matrix[i].length; col++) {
                local.matrix[i][col] = -local.matrix[i][col];
            }
        }
    }

    return local;
}

export function lowestLimitationRowIndex(matrix) {
    let index = 1;
    let min = 0;

    for (let i = 1; i < matrix.length; i++) {
        let tmp = matrix[i][0];
        if (tmp < min && tmp < 0) {
            index = i;
            min = tmp;
        }
    }

    return index;
}


export function SimplexEnd(matrix) {

    if (limitedManySolution(matrix)) {
        return limitedManySolution(matrix);
    }

    if (oneSolution(matrix)) {
        return oneSolution(matrix);
    }

    if (unlimitedNoSolutions(matrix)) {
        return unlimitedNoSolutions(matrix);
    }

    if (unlimitedManySolutions(matrix)) {
        return unlimitedManySolutions(matrix);
    }

    return false;
}

export function limitedManySolution(matrix) {
    for (let col = 1; col < matrix[0].length; col++) {
        if (matrix[0][col] === 0) {
            let count = 0;
            for (let row = 1; row < matrix.length; row++) {
                if (matrix[row][col] > 0) {
                    count++;
                }
            }
            if (count === (matrix.length - 1)) {
                return "Zbiór ograniczony - wiele rozwiązań";
            }
        }
    }

    return false;
}

export function oneSolution(matrix) {
    if (!limitedManySolution(matrix)) {
        if (matrix[0].filter(x => x >= 0).length === matrix[0].length) {
            return "Istnieje jedno rozwiązanie optymalne: z=" + matrix[0][0];
        }
    }

    return false;
}

export function unlimitedNoSolutions(matrix) {
    for (let col = 1; col < matrix[0].length; col++) {
        if (matrix[0][col] < 0) {
            let count = 0;
            for (let row = 1; row < matrix.length; row++) {
                if (matrix[row][col] <= 0) {
                    count++;
                }
            }
            if (count === (matrix.length - 1)) {
                return "Zbiór nieograniczony - brak rozwiązań";
            }
        }
    }

    return false;
}

export function unlimitedManySolutions(matrix) {
    for (let col = 1; col < matrix[0].length; col++) {
        if (matrix[0][col] === 0) {
            let count = 0;
            for (let row = 1; row < matrix.length; row++) {
                if (matrix[row][col] <= 0) {
                    count++;
                }
            }
            if (count === (matrix.length - 1)) {
                return "Zbiór nieograniczony - wiele rozwiązań";
            }
        }
    }

    return false;
}
