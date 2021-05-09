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

export function makeLegend(rows, columns, limitations) {
    let legend = {
        rows: [],
        columns: [],
        signs: limitations,
        selected: {
            rows: [],
            columns: [],
        }
    };

    for (let i = 0; i < rows; i++) {
        if (i === 0) {
            legend.rows[i] = "z";
            legend.signs.unshift(null);
        } else {
            legend.rows[i] = "U" + i;
        }
    }

    for (let i = 0; i < columns; i++) {
        if (i === 0) {
            legend.columns[i] = "f(x)";
        } else {
            legend.columns[i] = "x" + i;
        }
    }

    return legend;
}

export function changeLegendRowWithColumn(legend, row, column, phase) {
    let local = JSON.parse(JSON.stringify(legend));
    local.phase = phase;

    legend.phase !== phase ? local.iteration = 1 : local.iteration++;

    local.selected.rows = [row];
    local.selected.columns = [column];

    local.rows[row] = legend.columns[column];
    local.columns[column] = legend.rows[row];

    return local;
}
