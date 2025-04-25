#include <stdio.h>
#include <stdlib.h>

// Definition of a node in the cyclic linked list
typedef struct Node {
    int data;
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
    newNode->next = NULL;
    return newNode;
}

// Function to insert a node at the end of the list
void insertAtEnd(Node** head, int value) {
    Node* newNode = createNode(value);
    if (*head == NULL) {
        *head = newNode;
        newNode->next = *head; // Points to itself to form a cycle
        return;
    }

    Node* temp = *head;
    while (temp->next != *head) { // Traverse until the last node
        temp = temp->next;
    }
    temp->next = newNode;
    newNode->next = *head; // New node points back to the head
}

// Function to display the cyclic linked list
void displayList(Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }

    Node* temp = head;
    printf("Cyclic Linked List: ");
    do {
        printf("%d -> ", temp->data);
        temp = temp->next;
    } while (temp != head); // Stops when it loops back to the head
    printf("(back to head)\n");
}

// Function to detect a cycle in the linked list (Floyd's Cycle Detection Algorithm)
int detectCycle(Node* head) {
    if (head == NULL || head->next == NULL) {
        return 0; // No cycle
    }

    Node* slow = head;
    Node* fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;        // Move slow pointer one step
        fast = fast->next->next;  // Move fast pointer two steps
        if (slow == fast) {       // Cycle detected
            return 1;
        }
    }
    return 0; // No cycle
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
    displayList(head);

    // Detect cycle
    if (detectCycle(head)) {
        printf("Cycle detected in the linked list.\n");
    } else {
        printf("No cycle detected in the linked list.\n");
    }

    return 0;
}
