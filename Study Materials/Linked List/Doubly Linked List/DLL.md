# Doubly Linked List

A **doubly linked list** is a linear data structure where:
1. Each node contains:
   - `data`: The value stored in the node.
   - `prev`: Points to the previous node in the list.
   - `next`: Points to the next node in the list.
2. The `prev` pointer of the head is `NULL`, and the `next` pointer of the tail is also `NULL`.

## Key Characteristics:
1. Allows bidirectional traversal due to the presence of `prev` and `next` pointers.
2. The list starts with a "head" pointer and ends with a "tail" pointer.
3. Each node maintains links to both its previous and next nodes.

## Advantages:
1. Facilitates traversal in both directions.
2. Deletion of a node is easier compared to a singly linked list, as both previous and next pointers are maintained.
3. Supports efficient insertion and deletion at both ends in O(1) time.

## Disadvantages:
1. Requires extra memory to store the `prev` pointer for each node.
2. Implementation and maintenance are slightly more complex compared to singly linked lists.

## Applications:
1. Browser navigation systems (forward and backward buttons).
2. Undo and redo functionality in text editors.
3. Implementation of Deques (Double-Ended Queues).
4. Managing playlists or data with bidirectional movement.

## Time and Space Complexity Table:

| **Operation**          | **Time Complexity** | **Space Complexity** |
|------------------------|---------------------|-----------------------|
| Traversal              | O(n)               | O(1)                 |
| Search (unsorted)      | O(n)               | O(1)                 |
| Insert at Beginning    | O(1)               | O(1)                 |
| Insert at End          | O(1)               | O(1)                 |
| Insert at Position     | O(n)               | O(1)                 |
| Delete from Beginning  | O(1)               | O(1)                 |
| Delete from End        | O(1)               | O(1)                 |
| Delete by Value        | O(n)               | O(1)                 |

## Notes:
1. **Traversal**: O(n) because all nodes must be visited.
2. **Insertion/Deletion at Beginning**: O(1) due to direct pointer updates.
3. **Insertion/Deletion at End**: O(1) because the `prev` and `next` pointers of the tail are easily accessible.
4. **Search**: O(n) as each node may need to be visited.
5. **Space**: O(1) for pointer updates during operations.

## Summary:
The doubly linked list provides efficient operations at both ends and supports bidirectional traversal. However, it requires extra memory for the `prev` pointer and involves slightly more complex pointer updates compared to singly linked lists.

