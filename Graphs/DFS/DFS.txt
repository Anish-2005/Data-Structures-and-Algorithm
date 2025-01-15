Depth First Search (DFS) is a graph traversal algorithm that explores as far as possible along a branch before backtracking. It uses a stack data structure (can be implemented with recursion) to keep track of the vertices to visit.

Key Characteristics of DFS:
Visits all vertices and edges in a graph.
Recursive or iterative implementation.
Explores one branch completely before moving to another.
Used in:
Topological sorting
Detecting cycles
Solving mazes and puzzles
Finding connected components in a graph


Time and Space Complexity:
- Time Complexity: O(V + E)
  - V: Number of vertices
  - E: Number of edges
- Space Complexity: O(V) (due to recursion stack or explicit stack)


Explanation:
1. Graph Representation:
   - The graph is represented using an adjacency list.
   - Each vertex has a list of its adjacent vertices.

2. DFS Function:
   - Marks the current vertex as visited.
   - Recursively visits all unvisited adjacent vertices.

3. Main Function:
   - Creates a graph with 6 vertices.
   - Adds edges to form a sample graph.
   - Starts DFS from vertex 0.




   Time and Space Complexity Summary Table for DFS:

--------------------------------------------------------------
| Operation              | Time Complexity | Space Complexity |
--------------------------------------------------------------
| Graph Traversal        | O(V + E)        | O(V)             |
| Recursive Stack Space  | -               | O(V)             |
| Iterative DFS (with stack) | O(V + E)    | O(V)             |
--------------------------------------------------------------

Explanation:
- V: Number of vertices in the graph.
- E: Number of edges in the graph.
- Time complexity is O(V + E) because every vertex and edge is visited once.
- Space complexity is O(V) due to the storage of the visited array and recursion stack (or explicit stack in iterative DFS).
