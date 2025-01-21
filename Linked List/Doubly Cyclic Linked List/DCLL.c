#include <stdio.h>
#include <stdlib.h>

// Definition of a node in the doubly cyclic linked list
typedef struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
} Node;

// Function to create a new node
Node* createNode(int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (!newNode) {
        printf("Memory allocation error\n");
        exit(1);
    }
    newNode->data = value;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

// Function to insert a node at the end of the doubly cyclic linked list
void insertAtEnd(Node** head, int value) {
    Node* newNode = createNode(value);

    if (*head == NULL) {
        *head = newNode;
        newNode->prev = newNode;
        newNode->next = newNode; // Points to itself to form a cycle
        return;
    }

    Node* tail = (*head)->prev; // Tail node (last node)

    tail->next = newNode;  // Update the last node's next
    newNode->prev = tail;  // Update the new node's prev
    newNode->next = *head; // Point new node's next to head
    (*head)->prev = newNode; // Update head's prev to point to the new node
}

// Function to display the doubly cyclic linked list in forward direction
void displayForward(Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }

    Node* temp = head;
    printf("Doubly Cyclic Linked List (Forward): ");
    do {
        printf("%d -> ", temp->data);
        temp = temp->next;
    } while (temp != head); // Stops when it loops back to the head
    printf("(back to head)\n");
}

// Function to display the doubly cyclic linked list in reverse direction
void displayReverse(Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }

    Node* tail = head->prev; // Get the last node
    Node* temp = tail;
    printf("Doubly Cyclic Linked List (Reverse): ");
    do {
        printf("%d -> ", temp->data);
        temp = temp->prev;
    } while (temp != tail); // Stops when it loops back to the tail
    printf("(back to tail)\n");
}

// Function to detect a cycle in the list
int detectCycle(Node* head) {
    if (head == NULL) {
        return 0; // No cycle
    }

    Node* slow = head;
    Node* fast = head;

    do {
        slow = slow->next;
        fast = fast->next ? fast->next->next : NULL;

        if (fast == NULL) {
            return 0; // No cycle
        }
    } while (slow != fast); // Cycle detected if slow meets fast

    return 1; // Cycle detected
}

// Main function
int main() {
    Node* head = NULL;

    // Insert nodes
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    insertAtEnd(&head, 40);

    // Display the list
    displayForward(head);
    displayReverse(head);

    // Detect cycle
    if (detectCycle(head)) {
        printf("Cycle detected in the doubly cyclic linked list.\n");
    } else {
        printf("No cycle detected in the doubly cyclic linked list.\n");
    }

    return 0;
}
