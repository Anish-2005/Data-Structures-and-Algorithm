#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

// Create a new node
Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = newNode;  // Points to itself, as it's circular
    return newNode;
}

// Insert at the front of the circular linked list
void insertFront(Node** head, int data) {
    Node* newNode = createNode(data);
    if (*head == NULL) {
        *head = newNode;
    } else {
        Node* temp = *head;
        while (temp->next != *head) {
            temp = temp->next;
        }
        temp->next = newNode;
        newNode->next = *head;
        *head = newNode;
    }
    printf("%d inserted at front\n", data);
}

// Insert at the end of the circular linked list
void insertEnd(Node** head, int data) {
    Node* newNode = createNode(data);
    if (*head == NULL) {
        *head = newNode;
    } else {
        Node* temp = *head;
        while (temp->next != *head) {
            temp = temp->next;
        }
        temp->next = newNode;
        newNode->next = *head;
    }
    printf("%d inserted at end\n", data);
}

// Delete the front node of the circular linked list
void deleteFront(Node** head) {
    if (*head == NULL) {
        printf("List is empty, nothing to delete\n");
        return;
    }
    if (*head == (*head)->next) {
        printf("%d deleted from front\n", (*head)->data);
        free(*head);
        *head = NULL;
    } else {
        Node* temp = *head;
        while (temp->next != *head) {
            temp = temp->next;
        }
        temp->next = (*head)->next;
        printf("%d deleted from front\n", (*head)->data);
        free(*head);
        *head = temp->next;
    }
}

// Delete the last node of the circular linked list
void deleteEnd(Node** head) {
    if (*head == NULL) {
        printf("List is empty, nothing to delete\n");
        return;
    }
    if (*head == (*head)->next) {
        printf("%d deleted from end\n", (*head)->data);
        free(*head);
        *head = NULL;
    } else {
        Node* temp = *head;
        while (temp->next != *head) {
            temp = temp->next;
        }
        Node* prev = *head;
        while (prev->next != temp) {
            prev = prev->next;
        }
        prev->next = *head;
        printf("%d deleted from end\n", temp->data);
        free(temp);
    }
}

// Display the circular linked list
void display(Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }
    Node* temp = head;
    do {
        printf("%d ", temp->data);
        temp = temp->next;
    } while (temp != head);
    printf("\n");
}

// Reverse the circular linked list
void reverse(Node** head) {
    if (*head == NULL || (*head)->next == *head) {
        return; // No need to reverse for empty or single node
    }
    Node* prev = NULL;
    Node* current = *head;
    Node* next = NULL;
    Node* temp = *head;
    do {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    } while (current != *head);
    temp->next = prev;
    *head = prev;
    printf("List reversed\n");
}

// Sort the circular linked list
void sort(Node** head) {
    if (*head == NULL || (*head)->next == *head) {
        return; // No need to sort if list is empty or has only one node
    }
    Node* i = *head;
    Node* j;
    int temp;
    do {
        j = i->next;
        while (j != *head) {
            if (i->data > j->data) {
                temp = i->data;
                i->data = j->data;
                j->data = temp;
            }
            j = j->next;
        }
        i = i->next;
    } while (i != *head);
    printf("List sorted\n");
}

int main() {
    Node* head = NULL;
    int choice, value;

    do {
        printf("\nCircular Linked List Operations\n");
        printf("1. Insert at Front\n");
        printf("2. Insert at End\n");
        printf("3. Delete from Front\n");
        printf("4. Delete from End\n");
        printf("5. Display List\n");
        printf("6. Reverse List\n");
        printf("7. Sort List\n");
        printf("8. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: 
                printf("Enter value to insert at front: ");
                scanf("%d", &value);
                insertFront(&head, value);
                break;
            case 2:
                printf("Enter value to insert at end: ");
                scanf("%d", &value);
                insertEnd(&head, value);
                break;
            case 3:
                deleteFront(&head);
                break;
            case 4:
                deleteEnd(&head);
                break;
            case 5:
                display(head);
                break;
            case 6:
                reverse(&head);
                break;
            case 7:
                sort(&head);
                break;
            case 8:
                printf("Exiting...\n");
                break;
            default:
                printf("Invalid choice! Please try again.\n");
        }
    } while (choice != 8);

    return 0;
}
