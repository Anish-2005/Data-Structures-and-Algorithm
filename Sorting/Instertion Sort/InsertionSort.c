#include <stdio.h>

// Function to perform Insertion Sort
void insertionSort(int array[], int n) {
    for (int i = 1; i < n; i++) {
        int key = array[i];
        int j = i - 1;

        // Move elements of the sorted part that are greater than key
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key; // Place key in its correct position
    }
}

// Function to print the array
void printArray(int array[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
}

// Main function
int main() {
    int array[] = {12, 11, 13, 5, 6};
    int n = sizeof(array) / sizeof(array[0]);

    printf("Original array:\n");
    printArray(array, n);

    insertionSort(array, n);

    printf("Sorted array:\n");
    printArray(array, n);

    return 0;
}
