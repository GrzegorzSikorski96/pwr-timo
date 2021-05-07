export function makeLegend(rows, columns, limitations) {
    let legend = {
        rows: [],
        columns: [],
        signs: limitations,
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
