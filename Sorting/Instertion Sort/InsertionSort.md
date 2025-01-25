# Insertion Sort

Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It works much like how we sort playing cards in our hands, picking up one card at a time and inserting it into its correct position.

## Summary Table: Time and Space Complexity

| Criteria                     | Complexity     | Description                                                  |
|------------------------------|----------------|--------------------------------------------------------------|
| **Best Time Complexity**      | O(n)           | Occurs when the array is already sorted. Only n comparisons are performed. |
| **Worst Time Complexity**     | O(n²)          | Occurs when the array is sorted in reverse order. Each element needs to be compared with all others. |
| **Average Time Complexity**   | O(n²)          | On average, each element is compared with half of the elements in the sorted portion. |
| **Space Complexity**          | O(1)           | In-place algorithm; no additional space is required apart from the input array. |
