#include <stdio.h>

// Binary Search function
int binarySearch(int array[], int size, int target) {
    int low = 0, high = size - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents overflow

        if (array[mid] == target)
            return mid;  // Target found
        else if (array[mid] < target)
            low = mid + 1;  // Search right half
        else
            high = mid - 1; // Search left half
    }

    return -1;  // Target not found
}

// Main function
int main() {
    int array[] = {2, 3, 4, 10, 40};
    int size = sizeof(array) / sizeof(array[0]);
    int target = 10;

    int result = binarySearch(array, size, target);
    if (result != -1)
        printf("Element found at index %d\n", result);
    else
        printf("Element not found in the array\n");

    return 0;
}
