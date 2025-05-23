# Full Binary Tree

## Definition:
A Full Binary Tree (also known as a Proper or Strict Binary Tree) is a type of binary tree in which every node has either:
1. Zero children (leaf nodes), or
2. Exactly two children (internal nodes).
   
No node in a full binary tree has only one child.

## Properties of a Full Binary Tree:
1. **Number of Nodes**:
   - If the height of the tree is h (where the root is at height 0), the total number of nodes n in a full binary tree is:
     - `n = 2^(h+1) - 1`
2. **Number of Leaf Nodes**:
   - The number of leaf nodes L is:
     - `L = (n + 1) / 2`
3. **Number of Internal Nodes**:
   - The number of internal nodes I (nodes with two children) is:
     - `I = L - 1`
4. **Height**:
   - The height h of a full binary tree with n nodes is:
     - `h = log2(n + 1) - 1`
5. **Balanced Structure**:
   - A full binary tree is not necessarily balanced unless additional constraints are applied (e.g., it is also complete or perfect).

## Example of a Full Binary Tree:

    1
  /   \
 2     3
/ \   / \
4  5  6  7


- **Root node**: 1
- **Internal nodes**: 1, 2, 3
- **Leaf nodes**: 4, 5, 6, 7

## Key Differences Between Full, Complete, and Perfect Binary Trees:

| Type                  | Description                                                   |
|-----------------------|---------------------------------------------------------------|
| **Full Binary Tree**   | Each node has 0 or 2 children.                                |
| **Complete Binary Tree**| All levels except possibly the last are completely filled, and the last level is filled from left to right. |
| **Perfect Binary Tree** | All internal nodes have two children, and all leaf nodes are at the same level. |

## Applications of Full Binary Trees:
- Used in binary heaps (when combined with the complete property).
- Foundation for decision trees in algorithms.
- Efficient data storage in prefix codes like Huffman coding.

## Time and Space Complexity Table for Full Binary Tree:

| Operation                               | Time Complexity | Space Complexity      |
|-----------------------------------------|-----------------|-----------------------|
| **Search**                              | O(log n)        | O(n) (due to tree nodes) |
| **Insertion**                           | O(log n)        | O(n)                  |
| **Deletion**                            | O(log n)        | O(n)                  |
| **Traversal (In-order, Pre-order, Post-order)** | O(n)             | O(n) (for recursion stack) |
| **Height Calculation**                  | O(log n)        | O(1)                  |

