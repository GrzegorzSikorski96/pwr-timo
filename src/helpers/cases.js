let localLegend = {};

export function SimplexEnd(iteration) {
    localLegend = iteration.legend;

    isBaseVariable(1);

    if (oneSolution(iteration.matrix)) {
        return oneSolution(iteration.matrix);
    }

    if (limitedManySolution(iteration.matrix)) {
        return limitedManySolution(iteration.matrix);
    }

    if (unlimitedNoSolutions(iteration.matrix)) {
        return unlimitedNoSolutions(iteration.matrix);
    }

    if (unlimitedManySolutions(iteration.matrix)) {
        return unlimitedManySolutions(iteration.matrix);
    }

    return false;
}

export function limitedManySolution(matrix) {
    for (let col = 1; col < matrix[0].length; col++) {
        if (isBaseVariable(col) && matrix[0][col] === 0) {
            if (matrix.slice(1).filter(x => x[col] > 0).length === (matrix.length - 1)) {
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
        if (isBaseVariable(col) && matrix[0][col] < 0) {
            if (matrix.slice(1).filter(x => x[col] <= 0).length === (matrix.length - 1)) {
                return "Zbiór nieograniczony - brak rozwiązań";
            }
        }
    }

    return false;
}

export function unlimitedManySolutions(matrix) {
    for (let col = 1; col < matrix[0].length; col++) {
        if (isBaseVariable(col) && matrix[0][col] === 0) {
            if (matrix.slice(1).filter(x => x[col] <= 0).length === (matrix.length - 1)) {
                return "Zbiór nieograniczony - wiele rozwiązań";
            }
        }
    }

    return false;
}

export function emptySet(matrix) {
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i][0] < 0) {
            if (matrix[i].filter(x => x > 0).length === matrix[i].length - 1) {
                return "Brak rozwiązań - zbiór pusty";
            }
        }
    }

    return false;
}

function isBaseVariable(index) {
    return Number(localLegend.columns[index].substring(1)) % 2;
}
