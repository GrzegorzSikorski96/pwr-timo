export function selectColumnInRow(matrix, row = 0) {
    let min = matrix[row][1];
    let column = 1;

    for (let i = 1; i < matrix.length; i++) {
        if (matrix[row][i] < min) {
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
