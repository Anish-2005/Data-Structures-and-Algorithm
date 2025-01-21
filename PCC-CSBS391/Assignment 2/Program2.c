#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int row;
    int col;
    int value;
} SparseElement;

void sparseToNonSparse(SparseElement *sparse, int nonSparse[][3], int numRows, int numCols, int numNonZero) {
    int **nonSparseMatrix = (int **)malloc(numRows * sizeof(int *));
    for (int i = 0; i < numRows; i++) {
        nonSparseMatrix[i] = (int *)malloc(numCols * sizeof(int));
    }

    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            nonSparseMatrix[i][j] = 0;
        }
    }

    for (int i = 0; i < numNonZero; i++) {
        nonSparseMatrix[sparse[i].row][sparse[i].col] = sparse[i].value;
    }

    printf("Non-Sparse Matrix:\n");
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            printf("%d ", nonSparseMatrix[i][j]);
        }
        printf("\n");
    }

    for (int i = 0; i < numRows; i++) {
        free(nonSparseMatrix[i]);
    }
    free(nonSparseMatrix);
}

int main() {
    SparseElement sparse[] = {
        {0, 0, 5},
        {1, 2, 8},
        {3, 3, 3}
    };
    int numRows = 4, numCols = 4, numNonZero = 3;

    sparseToNonSparse(sparse, NULL, numRows, numCols, numNonZero);

    return 0;
}
