#include <stdio.h>
#include <stdlib.h>

enum Color { RED, BLACK };

typedef struct Node {
    int data;
    enum Color color;
    struct Node *left, *right, *parent;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->color = RED; // New nodes are always red initially
    newNode->left = newNode->right = newNode->parent = NULL;
    return newNode;
}

Node* rotateLeft(Node* root, Node* node) {
    Node* rightChild = node->right;
    node->right = rightChild->left;

    if (rightChild->left != NULL)
        rightChild->left->parent = node;

    rightChild->parent = node->parent;

    if (node->parent == NULL)
        root = rightChild;
    else if (node == node->parent->left)
        node->parent->left = rightChild;
    else
        node->parent->right = rightChild;

    rightChild->left = node;
    node->parent = rightChild;

    return root;
}

Node* rotateRight(Node* root, Node* node) {
    Node* leftChild = node->left;
    node->left = leftChild->right;

    if (leftChild->right != NULL)
        leftChild->right->parent = node;

    leftChild->parent = node->parent;

    if (node->parent == NULL)
        root = leftChild;
    else if (node == node->parent->left)
        node->parent->left = leftChild;
    else
        node->parent->right = leftChild;

    leftChild->right = node;
    node->parent = leftChild;

    return root;
}

void fixRedBlackTree(Node** root, Node* node) {
    Node* parent = NULL;
    Node* grandparent = NULL;

    while ((node != *root) && (node->color != BLACK) && (node->parent->color == RED)) {
        parent = node->parent;
        grandparent = parent->parent;

        if (parent == grandparent->left) {
            Node* uncle = grandparent->right;

            if (uncle != NULL && uncle->color == RED) {
                grandparent->color = RED;
                parent->color = BLACK;
                uncle->color = BLACK;
                node = grandparent;
            } else {
                if (node == parent->right) {
                    *root = rotateLeft(*root, parent);
                    node = parent;
                    parent = node->parent;
                }
                *root = rotateRight(*root, grandparent);
                enum Color temp = parent->color;
                parent->color = grandparent->color;
                grandparent->color = temp;
                node = parent;
            }
        } else {
            Node* uncle = grandparent->left;

            if (uncle != NULL && uncle->color == RED) {
                grandparent->color = RED;
                parent->color = BLACK;
                uncle->color = BLACK;
                node = grandparent;
            } else {
                if (node == parent->left) {
                    *root = rotateRight(*root, parent);
                    node = parent;
                    parent = node->parent;
                }
                *root = rotateLeft(*root, grandparent);
                enum Color temp = parent->color;
                parent->color = grandparent->color;
                grandparent->color = temp;
                node = parent;
            }
        }
    }
    (*root)->color = BLACK;
}

Node* insertNode(Node* root, Node* node) {
    if (root == NULL)
        return node;

    if (node->data < root->data) {
        root->left = insertNode(root->left, node);
        root->left->parent = root;
    } else if (node->data > root->data) {
        root->right = insertNode(root->right, node);
        root->right->parent = root;
    }

    return root;
}

void inorderTraversal(Node* root) {
    if (root == NULL)
        return;

    inorderTraversal(root->left);
    printf("%d (%s) ", root->data, root->color == RED ? "R" : "B");
    inorderTraversal(root->right);
}

void insert(Node** root, int data) {
    Node* newNode = createNode(data);
    *root = insertNode(*root, newNode);
    fixRedBlackTree(root, newNode);
}

int main() {
    Node* root = NULL;

    insert(&root, 10);
    insert(&root, 20);
    insert(&root, 30);
    insert(&root, 15);
    insert(&root, 25);

    printf("In-order Traversal of Red-Black Tree:\n");
    inorderTraversal(root);
    printf("\n");

    return 0;
}
