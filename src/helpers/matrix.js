export function makeLegend(rows, columns) {
    let legend = {
        rows: [],
        columns: [],
    };

    for (let i = 0; i < rows; i++) {
        if (i === 0) {
            legend.rows[i] = "z";
        } else {
            legend.rows[i] = "U" + i;
        }
    }

    for (let i = 0; i < columns; i++) {
        if (i === 0) {
            legend.columns[i] = "f(x)";
        } else {
            legend.columns[i] = i;
        }
    }

    return legend;
}
