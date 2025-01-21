#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void insertFront(Node** head, int data) {
    Node* newNode = createNode(data);
    newNode->next = *head;
    *head = newNode;
    printf("%d inserted at front\n", data);
}

void insertEnd(Node** head, int data) {
    Node* newNode = createNode(data);
    if (*head == NULL) {
        *head = newNode;
        printf("%d inserted at end\n", data);
        return;
    }
    Node* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
    printf("%d inserted at end\n", data);
}

void deleteFront(Node** head) {
    if (*head == NULL) {
        printf("List is empty, nothing to delete\n");
        return;
    }
    Node* temp = *head;
    *head = (*head)->next;
    printf("%d deleted from front\n", temp->data);
    free(temp);
}

void deleteEnd(Node** head) {
    if (*head == NULL) {
        printf("List is empty, nothing to delete\n");
        return;
    }
    if ((*head)->next == NULL) {
        printf("%d deleted from end\n", (*head)->data);
        free(*head);
        *head = NULL;
        return;
    }
    Node* temp = *head;
    while (temp->next && temp->next->next != NULL) {
        temp = temp->next;
    }
    printf("%d deleted from end\n", temp->next->data);
    free(temp->next);
    temp->next = NULL;
}

void display(Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }
    Node* temp = head;
    printf("List: ");
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

void reverse(Node** head) {
    if (*head == NULL || (*head)->next == NULL) {
        return;
    }
    Node* prev = NULL;
    Node* current = *head;
    Node* next = NULL;
    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    *head = prev;
    printf("List reversed\n");
}

void sort(Node** head) {
    if (*head == NULL || (*head)->next == NULL) {
        return;
    }
    Node* i = *head;
    Node* j;
    int temp;
    while (i != NULL) {
        j = i->next;
        while (j != NULL) {
            if (i->data > j->data) {
                temp = i->data;
                i->data = j->data;
                j->data = temp;
            }
            j = j->next;
        }
        i = i->next;
    }
    printf("List sorted\n");
}

int main() {
    Node* head = NULL;
    int choice, value;

    do {
        printf("\nSingly Linked List Operations\n");
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
