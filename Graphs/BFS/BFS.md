# Breadth-First Search (BFS) Algorithm

Breadth-First Search (BFS) is a graph traversal algorithm that explores all the vertices at the current depth level before moving on to vertices at the next depth level. It uses a **queue** data structure to keep track of the vertices to visit.

---

## Key Characteristics of BFS
- Visits all vertices and edges **layer by layer**.
- Utilizes a **queue** for iterative implementation.
- Finds the **shortest path** in an unweighted graph.

### Common Use Cases
- **Shortest path algorithms**
- **Level-order traversal of trees**
- **Solving maze problems**

---

## Time and Space Complexity

### Time Complexity
- **O(V + E)**
  - **V**: Number of vertices
  - **E**: Number of edges

### Space Complexity
- **O(V)**
  - Space is required for the queue and visited array.

---

## Explanation

### 1. Graph Representation
- The graph is represented using an **adjacency list**.
- Each vertex has a list of its adjacent vertices.

### 2. BFS Function
- Uses a **queue** to keep track of vertices to visit.
- Marks vertices as **visited** and processes them in level order.

### 3. Main Function
- Creates a graph with 6 vertices.
- Adds edges to form a sample graph.
- Starts BFS from vertex 0.

---

## Python Implementation
```python
from collections import deque

class Graph:
    def __init__(self, vertices):
        self.vertices = vertices
        self.adj_list = {i: [] for i in range(vertices)}

    def add_edge(self, src, dest):
        self.adj_list[src].append(dest)
        self.adj_list[dest].append(src)

    def bfs(self, start):
        visited = [False] * self.vertices
        queue = deque([start])
        visited[start] = True

        while queue:
            current = queue.popleft()
            print(current, end=" ")

            for neighbor in self.adj_list[current]:
                if not visited[neighbor]:
                    queue.append(neighbor)
                    visited[neighbor] = True

# Example Usage
graph = Graph(6)
graph.add_edge(0, 1)
graph.add_edge(0, 2)
graph.add_edge(1, 3)
graph.add_edge(1, 4)
graph.add_edge(2, 5)

print("BFS Traversal starting from vertex 0:")
graph.bfs(0)
```

---

## Visual Representation
### Sample Graph
```
    0
   / \
  1   2
 / \    \
3   4    5
```

### BFS Traversal
- Starting from vertex **0**:
  - Visit: **0, 1, 2, 3, 4, 5** (layer by layer).

---

### Highlights
- **Simple to implement**.
- Ideal for **unweighted graphs**.
- **Real-world applications** include social networks, web crawlers, and GPS navigation systems.

---

### Contribute
Feel free to suggest improvements or share additional use cases!

---

### References
- [Wikipedia: Breadth-First Search](https://en.wikipedia.org/wiki/Breadth-first_search)
- [GeeksforGeeks: BFS](https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/)
