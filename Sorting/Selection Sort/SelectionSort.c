#include <stdio.h>

// Function to perform Selection Sort
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Assume the first unsorted element is the minimum
        int minIndex = i;

        // Find the minimum element in the unsorted part
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // Update the index of the minimum element
            }
        }

        // Swap the found minimum element with the first unsorted element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

// Function to print an array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {64, 25, 12, 22, 11}; // Sample array
    int n = sizeof(arr) / sizeof(arr[0]); // Calculate the number of elements

    printf("Original array: ");
    printArray(arr, n);

    selectionSort(arr, n); // Sort the array

    printf("Sorted array: ");
    printArray(arr, n);

    return 0;
}
