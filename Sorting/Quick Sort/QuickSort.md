# Quick Sort

Quick Sort is an efficient, comparison-based sorting algorithm that works by selecting a 'pivot' element and partitioning the array into two halves around the pivot, recursively sorting the sub-arrays.

## Summary Table: Time and Space Complexity

| Criteria                     | Complexity     | Description                                                  |
|------------------------------|----------------|--------------------------------------------------------------|
| **Best Time Complexity**      | O(n log n)     | Pivot divides the array into two equal halves at each step.   |
| **Worst Time Complexity**     | O(n²)          | Pivot repeatedly selects the smallest or largest element, resulting in unbalanced partitions. |
| **Average Time Complexity**   | O(n log n)     | Expected with balanced partitions or randomized pivot selection. |
| **Space Complexity**          | O(log n)       | Space used for the recursive stack (best/average case). O(n) in the worst case due to unbalanced calls. |
