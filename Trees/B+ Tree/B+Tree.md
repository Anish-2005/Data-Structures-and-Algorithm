# B+ Tree

A B+ Tree is an advanced version of a B-Tree that provides faster sequential access to data. It is widely used in database systems and file systems for indexing large amounts of data efficiently.

## Key Properties of B+ Tree:
1. **Order (m)**: Determines the maximum number of children a node can have.
   - Internal nodes have ⌈m/2⌉ to m children.
   - Leaf nodes have ⌈m/2⌉ - 1 to m - 1 keys.
2. **Leaf Node Storage**:
   - All keys are stored in the leaf nodes.
   - Internal nodes only store keys for routing.
3. **Leaf Node Linked List**:
   - Leaf nodes are linked for efficient sequential access.
4. **Balanced Tree**:
   - All leaf nodes are at the same depth, ensuring balance.
5. **Efficient Range Queries**:
   - Sequential access via linked leaf nodes allows fast range queries.
6. **Search Time Complexity**:
   - O(log n) for finding the appropriate leaf node.
7. **Insertion/Deletion Time Complexity**:
   - O(log n) for locating the leaf and modifying the structure.
8. **Traversal Time Complexity**:
   - O(n) for in-order traversal.

## Comparison: B-Tree vs. B+ Tree

| Feature               | B-Tree              | B+ Tree             |
|-----------------------|---------------------|---------------------|
| **Key Storage**       | Keys stored in both | Keys stored only in |
|                       | internal and leaf   | leaf nodes.         |
|                       | nodes.              |                     |
| **Internal Node Role**| Stores both keys    | Stores only keys for|
|                       | and data.           | routing purposes.   |
| **Sequential Access** | Slower, as no       | Faster, due to      |
|                       | linked list exists. | linked leaf nodes.  |
| **Range Queries**     | Less efficient.     | Highly efficient    |
|                       |                     | (via linked leaves).|
| **Tree Height**       | Slightly taller due | Slightly shorter as |
|                       | to key distribution.| all keys are in     |
|                       |                     | leaves.             |

## Operations and Their Complexities:

| Operation            | Time Complexity | Space Complexity |
|----------------------|-----------------|------------------|
| Search               | O(log n)        | O(n)             |
| Insertion            | O(log n)        | O(n)             |
| Deletion             | O(log n)        | O(n)             |
| Traversal            | O(n)            | O(n)             |
