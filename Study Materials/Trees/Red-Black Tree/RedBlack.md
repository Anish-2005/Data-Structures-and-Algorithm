# Red-Black Tree

A Red-Black Tree is a type of self-balancing binary search tree. It ensures that the height of the tree is approximately 𝑂(log𝑛), which keeps operations like search, insertion, and deletion efficient. Each node in a Red-Black Tree has an extra property: its color, which is either red or black.

## Example of a Red-Black Tree:

     20 (Black)
    /    \
10 (Black)  25 (Black)
    \         \
 15 (Red)    30 (Red)


## Key Properties of a Red-Black Tree:
1. **Node Color**:
   - Each node is either red or black.
   
2. **Root Property**:
   - The root node is always black.

3. **Red-Black Property**:
   - No two consecutive red nodes are allowed (a red node cannot have a red parent or child).

4. **Black-Height Property**:
   - Every path from the root to a leaf (or null) has the same number of black nodes.

5. **Balance Property**:
   - The longest path from the root to a leaf is at most twice as long as the shortest path.

## Operations and Their Complexities:

| Operation      | Time Complexity | Explanation                                  |
|----------------|-----------------|----------------------------------------------|
| **Search**     | O(log n)        | Height is logarithmic due to balancing.      |
| **Insertion**  | O(log n)        | May require rotations or color adjustments.  |
| **Deletion**   | O(log n)        | Involves rebalancing if necessary.           |
| **Traversal**  | O(n)            | Standard in-order traversal.                 |
