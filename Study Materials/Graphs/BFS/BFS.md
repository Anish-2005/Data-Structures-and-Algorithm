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

## C Implementation
```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

// Structure for the adjacency list node
typedef struct Node {
    int vertex;
    struct Node* next;
} Node;

// Structure for the graph
typedef struct Graph {
    int numVertices;
    Node** adjLists;
    bool* visited;
} Graph;

// Structure for the queue
typedef struct Queue {
    int items[MAX_VERTICES];
    int front;
    int rear;
} Queue;

// Function to create a queue
Queue* createQueue() {
    Queue* q = malloc(sizeof(Queue));
    q->front = -1;
    q->rear = -1;
    return q;
}

// Check if the queue is empty
bool isEmpty(Queue* q) {
    return q->front == -1;
}

// Enqueue an element
void enqueue(Queue* q, int value) {
    if (q->rear == MAX_VERTICES - 1) {
        printf("Queue is full!\n");
        return;
    }
    if (q->front == -1) q->front = 0;
    q->items[++q->rear] = value;
}

// Dequeue an element
int dequeue(Queue* q) {
    if (isEmpty(q)) {
        printf("Queue is empty!\n");
        return -1;
    }
    int item = q->items[q->front];
    if (q->front >= q->rear) {
        q->front = -1;
        q->rear = -1;
    } else {
        q->front++;
    }
    return item;
}

// Function to create a graph
Graph* createGraph(int vertices) {
    Graph* graph = malloc(sizeof(Graph));
    graph->numVertices = vertices;
    graph->adjLists = malloc(vertices * sizeof(Node*));
    graph->visited = malloc(vertices * sizeof(bool));

    for (int i = 0; i < vertices; i++) {
        graph->adjLists[i] = NULL;
        graph->visited[i] = false;
    }
    return graph;
}

// Function to add an edge
void addEdge(Graph* graph, int src, int dest) {
    Node* newNode = malloc(sizeof(Node));
    newNode->vertex = dest;
    newNode->next = graph->adjLists[src];
    graph->adjLists[src] = newNode;

    // Add edge for undirected graph
    newNode = malloc(sizeof(Node));
    newNode->vertex = src;
    newNode->next = graph->adjLists[dest];
    graph->adjLists[dest] = newNode;
}

// BFS algorithm
void bfs(Graph* graph, int startVertex) {
    Queue* q = createQueue();

    graph->visited[startVertex] = true;
    enqueue(q, startVertex);

    while (!isEmpty(q)) {
        int currentVertex = dequeue(q);
        printf("%d ", currentVertex);

        Node* temp = graph->adjLists[currentVertex];
        while (temp) {
            int adjVertex = temp->vertex;

            if (!graph->visited[adjVertex]) {
                graph->visited[adjVertex] = true;
                enqueue(q, adjVertex);
            }
            temp = temp->next;
        }
    }
}

// Main function
int main() {
    Graph* graph = createGraph(6);

    addEdge(graph, 0, 1);
    addEdge(graph, 0, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 1, 4);
    addEdge(graph, 2, 5);

    printf("BFS Traversal starting from vertex 0:\n");
    bfs(graph, 0);

    return 0;
}
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
