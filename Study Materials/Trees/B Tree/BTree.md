# B-Tree

A B-Tree is a self-balancing search tree designed for systems that read and write large blocks of data. It generalizes the concept of a binary search tree by allowing nodes to have more than two children. B-Trees are widely used in databases and file systems to efficiently store and retrieve large amounts of data.

## Key Properties:
1. **Order (m)**: The maximum number of children a node can have.
   - A B-Tree of order m has:
     - At most m children per node.
     - At least ⌈m/2⌉ children per internal node (except the root).
     - Between ⌈m/2⌉ - 1 and m - 1 keys per node.
2. **Balanced**: All leaf nodes are at the same depth.
3. **Sorted**: Keys within a node are sorted; subtrees follow the binary search property.
4. **Efficient Disk Access**: Nodes are optimized to fit into a single disk block.

## Example of a B-Tree (Order 3):
**Keys**: 10, 20, 30, 40, 50, 60, 70


## Operations and Their Complexities:

| Operation            | Time Complexity | Space Complexity |
|----------------------|-----------------|------------------|
| Search               | O(log n)        | O(n)             |
| Insertion            | O(log n)        | O(n)             |
| Deletion             | O(log n)        | O(n)             |
| Traversal            | O(n)            | O(n)             |
