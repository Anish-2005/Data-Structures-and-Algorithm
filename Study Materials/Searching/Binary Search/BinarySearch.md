# Binary Search

Binary Search is an efficient algorithm used to find the position of a target element in a sorted array. It works by repeatedly dividing the search interval in half. If the target is less than the middle element, the search continues in the left half; otherwise, it continues in the right half.

## Summary Table: Time and Space Complexity

| Criteria                     | Complexity     | Description                                                  |
|------------------------------|----------------|--------------------------------------------------------------|
| **Best Time Complexity**      | O(1)           | Target found at the middle in the first attempt.             |
| **Worst Time Complexity**     | O(log n)       | Requires halving the search space multiple times.            |
| **Average Time Complexity**   | O(log n)       | Efficient even for large datasets.                           |
| **Space Complexity**          | O(1) or O(log n) | O(1) for iterative; O(log n) for recursive due to stack usage. |
