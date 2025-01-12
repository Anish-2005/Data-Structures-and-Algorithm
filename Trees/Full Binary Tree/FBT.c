#include <stdio.h>
#include <stdlib.h>

// Define the structure of a tree node
typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

// Function to create a new node
Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Function to insert nodes in a Full Binary Tree recursively
Node* insertFullBinaryTree(Node* root, int data, int* inserted) {
    if (root == NULL) {
        *inserted = 1;
        return createNode(data);
    }

    if (!*inserted && root->left == NULL) {
        root->left = insertFullBinaryTree(root->left, data, inserted);
    }

    if (!*inserted && root->right == NULL) {
        root->right = insertFullBinaryTree(root->right, data, inserted);
    }

    if (!*inserted) {
        root->left = insertFullBinaryTree(root->left, data, inserted);
    }

    return root;
}

// Wrapper function for inserting into a Full Binary Tree
Node* insert(Node* root, int data) {
    int inserted = 0;
    return insertFullBinaryTree(root, data, &inserted);
}

// Function for in-order traversal
void inOrderTraversal(Node* root) {
    if (root == NULL) {
        return;
    }
    inOrderTraversal(root->left);
    printf("%d ", root->data);
    inOrderTraversal(root->right);
}

// Main function to test the Full Binary Tree
int main() {
    Node* root = NULL;

    // Insert nodes
    root = insert(root, 1);
    root = insert(root, 2);
    root = insert(root, 3);
    root = insert(root, 4);
    root = insert(root, 5);
    root = insert(root, 6);
    root = insert(root, 7);

    printf("In-order Traversal of Full Binary Tree:\n");
    inOrderTraversal(root);
    printf("\n");

    return 0;
}
