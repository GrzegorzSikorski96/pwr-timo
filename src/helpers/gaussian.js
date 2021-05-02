export function outisdeSelected(yij, yik, yrj, yrk) {
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
