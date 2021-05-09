export function selectColumnInRow(matrix, row = 0) {
    let min = 0;
    let column;

    for (let i = 1; i < matrix[row].length; i++) {
        if (matrix[row][i] < min) {
            min = matrix[row][i];
            column = i;
        }
    }

    return column;
}

export function selectRow(matrix, column) {
    let min = Infinity;
    let row = 1;

    for (let i = 1; i < matrix.length; i++) {
        if (calculateRowIndicator(matrix[i][0], matrix[i][column]) > 0 && calculateRowIndicator(matrix[i][0], matrix[i][column]) < min) {
            min = calculateRowIndicator(matrix[i][0], matrix[i][column]);
            row = i;
        }
    }

    return row;
}

function calculateRowIndicator(value, colValue) {
    return value / colValue;
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
