#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *array;
    int front;
    int rear;
    int capacity;
} Deque;

Deque* createDeque(int capacity) {
    Deque *deque = (Deque*)malloc(sizeof(Deque));
    deque->capacity = capacity;
    deque->front = -1;
    deque->rear = -1;
    deque->array = (int*)malloc(capacity * sizeof(int));
    return deque;
}

int isFull(Deque *deque) {
    return (deque->front == 0 && deque->rear == deque->capacity - 1) || (deque->rear == (deque->front - 1) % (deque->capacity - 1));
}

int isEmpty(Deque *deque) {
    return deque->front == -1;
}

void insertFront(Deque *deque) {
    int value;
    if (isFull(deque)) {
        printf("Deque Overflow\n");
        return;
    }
    printf("Enter value to insert at front: ");
    scanf("%d", &value);

    if (deque->front == -1) {
        deque->front = deque->rear = 0;
    } else if (deque->front == 0) {
        deque->front = deque->capacity - 1;
    } else {
        deque->front = deque->front - 1;
    }
    deque->array[deque->front] = value;
    printf("%d inserted at front\n", value);
}

void insertRear(Deque *deque) {
    int value;
    if (isFull(deque)) {
        printf("Deque Overflow\n");
        return;
    }
    printf("Enter value to insert at rear: ");
    scanf("%d", &value);

    if (deque->rear == -1) {
        deque->front = deque->rear = 0;
    } else if (deque->rear == deque->capacity - 1) {
        deque->rear = 0;
    } else {
        deque->rear = deque->rear + 1;
    }
    deque->array[deque->rear] = value;
    printf("%d inserted at rear\n", value);
}

void deleteFront(Deque *deque) {
    if (isEmpty(deque)) {
        printf("Deque Underflow\n");
        return;
    }
    printf("%d deleted from front\n", deque->array[deque->front]);

    if (deque->front == deque->rear) {
        deque->front = deque->rear = -1;
    } else if (deque->front == deque->capacity - 1) {
        deque->front = 0;
    } else {
        deque->front = deque->front + 1;
    }
}

void deleteRear(Deque *deque) {
    if (isEmpty(deque)) {
        printf("Deque Underflow\n");
        return;
    }
    printf("%d deleted from rear\n", deque->array[deque->rear]);

    if (deque->front == deque->rear) {
        deque->front = deque->rear = -1;
    } else if (deque->rear == 0) {
        deque->rear = deque->capacity - 1;
    } else {
        deque->rear = deque->rear - 1;
    }
}

void display(Deque *deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty\n");
        return;
    }
    printf("Deque elements: ");
    if (deque->front <= deque->rear) {
        for (int i = deque->front; i <= deque->rear; i++) {
            printf("%d ", deque->array[i]);
        }
    } else {
        for (int i = deque->front; i < deque->capacity; i++) {
            printf("%d ", deque->array[i]);
        }
        for (int i = 0; i <= deque->rear; i++) {
            printf("%d ", deque->array[i]);
        }
    }
    printf("\n");
}

int main() {
    int choice, capacity;

    printf("Enter the capacity of the deque: ");
    scanf("%d", &capacity);

    Deque *deque = createDeque(capacity);

    do {
        printf("\nDouble Ended Queue (Deque) Operations\n");
        printf("1. Insert Front\n");
        printf("2. Insert Rear\n");
        printf("3. Delete Front\n");
        printf("4. Delete Rear\n");
        printf("5. Display\n");
        printf("6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: insertFront(deque); break;
            case 2: insertRear(deque); break;
            case 3: deleteFront(deque); break;
            case 4: deleteRear(deque); break;
            case 5: display(deque); break;
            case 6: printf("Exiting...\n"); break;
            default: printf("Invalid choice! Please try again.\n");
        }
    } while (choice != 6);

    free(deque->array);
    free(deque);

    return 0;
}
