# AVL Tree

An AVL Tree is a self-balancing binary search tree where the difference between the heights of the left and right subtrees (balance factor) of any node is at most 1.


      30
     /  \
   20    40
  /  \      \
 10   25     50

## Operations and Their Complexities:

| Operation            | Time Complexity | Space Complexity |
|----------------------|-----------------|------------------|
| Insertion            | O(log n)        | O(log n)         |
| Deletion             | O(log n)        | O(log n)         |
| Search               | O(log n)        | O(1)             |
| In-order Traversal   | O(n)            | O(n)             |
| Pre-order Traversal  | O(n)            | O(n)             |
| Post-order Traversal | O(n)            | O(n)             |
