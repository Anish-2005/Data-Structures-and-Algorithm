# Singly Linked List

A singly linked list is a linear data structure where each element (node) points to the next node in the sequence. Each node contains two components:
1. **Data**: The value stored in the node.
2. **Pointer**: A reference to the next node in the list.

## Key Characteristics:
1. The list starts with a "head" pointer pointing to the first node.
2. The last node points to `NULL`, indicating the end of the list.
3. Each node is dynamically allocated, allowing for efficient memory use.
4. It supports dynamic resizing, unlike arrays.

## Operations and Their Complexities:

| Operation             | Time Complexity | Space Complexity |
|-----------------------|-----------------|------------------|
| Traversal             | O(n)            | O(1)             |
| Search (unsorted)     | O(n)            | O(1)             |
| Insert at Beginning   | O(1)            | O(1)             |
| Insert at End         | O(n)            | O(1)             |
| Insert at a Position  | O(n)            | O(1)             |
| Delete from Beginning | O(1)            | O(1)             |
| Delete from End       | O(n)            | O(1)             |
| Delete by Value       | O(n)            | O(1)             |

## Key Advantages:
1. Efficient insertion and deletion compared to arrays (no need for shifting elements).
2. Dynamic resizing allows for better memory utilization.
3. Suitable for applications where frequent insertions and deletions occur.

## Key Disadvantages:
1. Cannot perform random access; traversal is required to access elements.
2. Extra memory is required for pointers.
3. Operations like searching are slower compared to arrays.

## Applications:
1. Dynamic memory allocation systems.
2. Implementing stacks and queues.
3. Polynomial arithmetic (to store terms of polynomials).
4. Managing symbolic expressions in compilers and interpreters.
