export function outsideSelected(yij, yik, yrj, yrk) {
    return Number((yij - ((yik * yrj) / yrk)).toFixed(3));
}

export function inColumn(yij, yrk) {
    return Number((-(yij / yrk)).toFixed(3));
}

export function inRow(yij, yrk) {
    return Number((yij / yrk).toFixed(3));
}

export function onCross(yrk) {
    return Number((1 / yrk).toFixed(3));
}

export function calculate(matrix, row, column) {
    let table = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0))

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[row].length-1; j++) {
            if (i !== row) {
                if (j !== column) {
                    table[i][j] = outsideSelected(matrix[i][j], matrix[i][column], matrix[row][j], matrix[row][column]);
                } else {
                    table[i][j] = inColumn(matrix[i][j], matrix[row][column]);
                }
            } else {
                if (j !== column) {
                    table[i][j] = inRow(matrix[i][j], matrix[row][column]);
                } else {
                    table[i][j] = onCross(matrix[i][j]);
                }
            }
        }
    }

    return table;
}
