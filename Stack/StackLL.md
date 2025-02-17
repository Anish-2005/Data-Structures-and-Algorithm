# Stack (Linked List-based)

A **stack** is a linear data structure that operates on the **LIFO (Last In, First Out)** principle, where the last element inserted is the first one to be removed. Implementing a stack using a linked list allows for dynamic memory usage and eliminates the need for a fixed size.

## Key Characteristics:
1. Operates on LIFO principle.
2. No fixed size, as it dynamically allocates memory.
3. Can grow and shrink in size as elements are pushed and popped.

## Stack Operations:
1. **Push**: Add an element to the top of the stack.
2. **Pop**: Remove and return the top element of the stack.
3. **Peek (or Top)**: Retrieve the value of the top element without removing it.
4. **IsEmpty**: Check if the stack is empty.

## Advantages:
1. No size limit as it grows dynamically.
2. Memory is allocated only when required.
3. Efficient insertion and deletion (O(1)).

## Disadvantages:
1. Requires extra memory for the `next` pointer in each node.
2. Slower access compared to arrays due to pointer traversal.

## Implementation:

### Node Structure:
Each node contains:
1. **data**: The value stored in the node.
2. **next**: A pointer to the next node in the stack.

## Time and Space Complexity Table for Stack Using Linked List:

| Operation   | Time Complexity | Space Complexity |
|-------------|-----------------|------------------|
| **Push**    | O(1)            | O(1)             |
| **Pop**     | O(1)            | O(1)             |
| **Peek**    | O(1)            | O(1)             |
| **IsEmpty** | O(1)            | O(1)             |

### Notes:
1. All operations (Push, Pop, Peek, and IsEmpty) take constant time because they involve updating or reading a single node's pointer.
2. Space complexity for each operation is O(1) as no additional memory is required apart from pointer adjustments.
