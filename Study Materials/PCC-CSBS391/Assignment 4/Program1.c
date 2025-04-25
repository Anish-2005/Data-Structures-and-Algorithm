#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *array;
    int front;
    int rear;
    int capacity;
} Queue;

Queue* createQueue(int capacity) {
    Queue *queue = (Queue*)malloc(sizeof(Queue));
    queue->capacity = capacity;
    queue->front = queue->rear = -1;
    queue->array = (int*)malloc(capacity * sizeof(int));
    return queue;
}

void enqueue(Queue *queue) {
    int value;
    if (queue->rear == queue->capacity - 1) {
        printf("Queue Overflow\n");
    } else {
        if (queue->front == -1) {
            queue->front = 0;
        }
        printf("Enter value to enqueue: ");
        scanf("%d", &value);
        queue->rear++;
        queue->array[queue->rear] = value;
        printf("%d enqueued\n", value);
    }
}

void dequeue(Queue *queue) {
    if (queue->front == -1 || queue->front > queue->rear) {
        printf("Queue Underflow\n");
    } else {
        printf("%d dequeued\n", queue->array[queue->front]);
        queue->front++;
    }
}

void display(Queue *queue) {
    if (queue->front == -1 || queue->front > queue->rear) {
        printf("Queue is empty\n");
    } else {
        printf("Queue elements: ");
        for (int i = queue->front; i <= queue->rear; i++) {
            printf("%d ", queue->array[i]);
        }
        printf("\n");
    }
}

int main() {
    int choice, capacity;

    printf("Enter the capacity of the queue: ");
    scanf("%d", &capacity);

    Queue *queue = createQueue(capacity);

    do {
        printf("\nLinear Queue Operations\n");
        printf("1. Enqueue\n");
        printf("2. Dequeue\n");
        printf("3. Display\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: enqueue(queue); break;
            case 2: dequeue(queue); break;
            case 3: display(queue); break;
            case 4: printf("Exiting...\n"); break;
            default: printf("Invalid choice! Please try again.\n");
        }
    } while (choice != 4);

    free(queue->array);
    free(queue);

    return 0;
}
