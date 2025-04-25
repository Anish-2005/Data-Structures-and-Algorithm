#include <stdio.h>

// Function to perform Bubble Sort
void bubbleSort(int arr[], int n) {
    // Outer loop for each pass
    for (int i = 0; i < n - 1; i++) {
        // Inner loop to compare adjacent elements
        for (int j = 0; j < n - i - 1; j++) {
            // Swap if the current element is greater than the next
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
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
    int arr[] = {64, 34, 25, 12, 22, 11, 90}; // Sample array
    int n = sizeof(arr) / sizeof(arr[0]);    // Calculate the number of elements

    printf("Original array: ");
    printArray(arr, n);

    bubbleSort(arr, n); // Sort the array

    printf("Sorted array: ");
    printArray(arr, n);

    return 0;
}
