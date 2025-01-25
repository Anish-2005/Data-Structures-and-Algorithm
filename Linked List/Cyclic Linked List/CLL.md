# Cyclic Linked List

A **cyclic linked list** is a variation of a linked list where the last node in the list points back to one of the previous nodes, forming a loop. This can be implemented as a singly or doubly linked list.

## Singly Cyclic Linked List
- Each node has a single pointer (`next`) that points to the next node.
- The `next` pointer of the last node points back to the first node (head).

## Doubly Cyclic Linked List
- Each node has two pointers: `next` (points to the next node) and `prev` (points to the previous node).
- The `prev` pointer of the head points to the last node, and the `next` pointer of the last node points to the head.

## Key Characteristics
1. The list forms a circular structure with no null pointers.
2. Traversal can continue indefinitely unless explicitly stopped.
3. Suitable for applications requiring repeated traversal, such as buffers and gaming.

## Advantages
1. Efficient circular traversal is possible.
2. Avoids null checks while traversing the list.

## Disadvantages
1. Requires careful handling to avoid infinite loops during traversal.
2. Cycle detection adds extra complexity.

## Applications
1. Implementing circular buffers.
2. Managing tasks in round-robin schedulers.
3. Multiplayer gaming for managing turn-based actions.

## Time and Space Complexity Table

| **Operation**          | **Singly Cyclic** | **Doubly Cyclic** |
|------------------------|-------------------|-------------------|
| Traversal              | O(n)             | O(n)             |
| Search (unsorted)      | O(n)             | O(n)             |
| Insert at Beginning    | O(1)             | O(1)             |
| Insert at End          | O(1)             | O(1)             |
| Insert at Position     | O(n)             | O(n)             |
| Delete from Beginning  | O(1)             | O(1)             |
| Delete from End        | O(n)             | O(1)             |
| Delete by Value        | O(n)             | O(n)             |
| Space Complexity       | O(1)             | O(1)             |

## Notes
1. Insertion and deletion at the beginning are always O(1) due to direct pointer updates.
2. Deletion at the end is O(1) in doubly cyclic linked lists because the `prev` pointer of the tail is accessible.
3. Traversal complexity is O(n) as each node must be visited once.

