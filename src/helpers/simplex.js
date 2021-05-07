export function selectColumnInRow(matrix, row = 0) {
    let min = matrix[row][1];
    let column = 1;

    for (let i = 1; i < matrix.length; i++) {
        if (matrix[row][i] < min && matrix[row][i] < 0) {
            min = matrix[row][i];
            column = i;
        }
    }

    return column;
}

export function selectRow(matrix, column) {
    let min = calculateRowIndicator(matrix[1][0], matrix[1][column]);
    let row = 1;

    for (let i = 1; i < matrix.length; i++) {
        if (calculateRowIndicator(matrix[i][0], matrix[i][column]) < min && calculateRowIndicator(matrix[i][0], matrix[i][column]) > 0) {
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
    let tmp = legend.rows[row];

    legend.rows[row] = legend.columns[column];
    legend.columns[column] = tmp;

    return legend;
}

export function createSimplexMatrix(base, limitations) {
    let matrix = new Array(limitations.length + 1).fill(0).map(() => new Array((limitations[0].variables.length * 2) + 1).fill(0))

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
