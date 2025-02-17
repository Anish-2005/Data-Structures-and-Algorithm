# Doubly Cyclic Linked List

A **doubly cyclic linked list** is a type of linked list where:
1. Each node has two pointers:
   - `next`: Points to the next node.
   - `prev`: Points to the previous node.
2. The `next` pointer of the last node points back to the first node (head).
3. The `prev` pointer of the first node (head) points back to the last node (tail), forming a circular structure in both directions.

## Key Characteristics:
1. Traversal is possible in both forward and backward directions due to the presence of `prev` and `next` pointers.
2. The circular structure ensures no null pointers in the list.
3. Suitable for use cases requiring bidirectional traversal and repeated cycling through elements.

## Advantages:
1. Easy to traverse in both forward and backward directions.
2. Efficient insertion and deletion at both ends of the list.
3. Circular structure ensures seamless cycling.

## Disadvantages:
1. More memory is required due to an additional `prev` pointer for each node.
2. Slightly more complex to implement and maintain compared to singly cyclic linked lists.

## Applications:
1. Round-robin schedulers.
2. Circular buffers where both forward and reverse traversal are needed.
3. Music playlists with bidirectional navigation.

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
2. **Insertion/Deletion at Beginning**: O(1) due to direct pointer updates to the head and tail.
3. **Insertion/Deletion at End**: O(1) because the `prev` and `next` pointers of the tail are easily accessible.
4. **Search**: O(n) as each node may need to be visited.
5. **Space**: O(1) for pointer updates during operations.

## Summary:
The doubly cyclic linked list provides efficient operations at both ends and supports bidirectional traversal. However, it requires extra memory for the `prev` pointer and involves slightly more complex pointer updates compared to singly cyclic linked lists.

