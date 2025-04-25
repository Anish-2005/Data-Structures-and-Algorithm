#include <stdio.h>

// Function to swap two elements
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Partition function
int partition(int array[], int low, int high) {
    int pivot = array[high]; // Choose the last element as pivot
    int i = low - 1;         // Index of smaller element

    for (int j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            swap(&array[i], &array[j]);
        }
    }
    swap(&array[i + 1], &array[high]); // Place pivot in correct position
    return i + 1;
}

// Quick Sort function
void quickSort(int array[], int low, int high) {
    if (low < high) {
        int pivotIndex = partition(array, low, high);
        quickSort(array, low, pivotIndex - 1);  // Sort left subarray
        quickSort(array, pivotIndex + 1, high); // Sort right subarray
    }
}

// Function to print the array
void printArray(int array[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
}

// Main function
int main() {
    int array[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(array) / sizeof(array[0]);

    printf("Original array:\n");
    printArray(array, n);

    quickSort(array, 0, n - 1);

    printf("Sorted array:\n");
    printArray(array, n);

    return 0;
}
