#include <stdio.h>
#include <stdlib.h>

#define ORDER 3 // Order of the B-Tree (maximum children per node)

typedef struct BTreeNode {
    int keys[ORDER - 1];        // Array of keys
    struct BTreeNode* children[ORDER]; // Array of child pointers
    int numKeys;               // Current number of keys
    int isLeaf;                // 1 if leaf, 0 otherwise
} BTreeNode;

// Function to create a new B-Tree node
BTreeNode* createNode(int isLeaf) {
    BTreeNode* newNode = (BTreeNode*)malloc(sizeof(BTreeNode));
    newNode->numKeys = 0;
    newNode->isLeaf = isLeaf;
    for (int i = 0; i < ORDER; i++) {
        newNode->children[i] = NULL;
    }
    return newNode;
}

// Function to perform an in-order traversal of the B-Tree
void traverse(BTreeNode* root) {
    if (root != NULL) {
        for (int i = 0; i < root->numKeys; i++) {
            // Traverse the left child before the key
            if (!root->isLeaf) {
                traverse(root->children[i]);
            }
            printf("%d ", root->keys[i]);
        }
        // Traverse the rightmost child
        if (!root->isLeaf) {
            traverse(root->children[root->numKeys]);
        }
    }
}

// Function to search for a key in the B-Tree
BTreeNode* search(BTreeNode* root, int key) {
    int i = 0;
    // Find the first key greater than or equal to the key
    while (i < root->numKeys && key > root->keys[i]) {
        i++;
    }

    // If the found key is equal to the key, return the node
    if (i < root->numKeys && root->keys[i] == key) {
        return root;
    }

    // If the node is a leaf, the key is not present
    if (root->isLeaf) {
        return NULL;
    }

    // Recur to the appropriate child
    return search(root->children[i], key);
}

// Function to insert a new key in a non-full node
void insertNonFull(BTreeNode* node, int key) {
    int i = node->numKeys - 1;

    // If the node is a leaf, insert the key
    if (node->isLeaf) {
        // Shift keys to the right to make space for the new key
        while (i >= 0 && key < node->keys[i]) {
            node->keys[i + 1] = node->keys[i];
            i--;
        }
        node->keys[i + 1] = key;
        node->numKeys++;
    } else {
        // Find the child that will have the new key
        while (i >= 0 && key < node->keys[i]) {
            i--;
        }
        i++;

        // If the child is full, split it
        if (node->children[i]->numKeys == ORDER - 1) {
            splitChild(node, i);
            // After splitting, the middle key moves up; decide where to insert
            if (key > node->keys[i]) {
                i++;
            }
        }
        insertNonFull(node->children[i], key);
    }
}

// Function to split a full child of a node
void splitChild(BTreeNode* parent, int i) {
    BTreeNode* child = parent->children[i];
    BTreeNode* newChild = createNode(child->isLeaf);
    newChild->numKeys = (ORDER - 1) / 2;

    // Move the second half of the keys to the new child
    for (int j = 0; j < (ORDER - 1) / 2; j++) {
        newChild->keys[j] = child->keys[j + (ORDER / 2)];
    }

    // Move the second half of the children to the new child (if not a leaf)
    if (!child->isLeaf) {
        for (int j = 0; j <= (ORDER - 1) / 2; j++) {
            newChild->children[j] = child->children[j + (ORDER / 2)];
        }
    }

    child->numKeys = (ORDER - 1) / 2;

    // Shift the parent's children to make room for the new child
    for (int j = parent->numKeys; j >= i + 1; j--) {
        parent->children[j + 1] = parent->children[j];
    }

    // Link the new child to the parent
    parent->children[i + 1] = newChild;

    // Move the middle key of the child up to the parent
    for (int j = parent->numKeys - 1; j >= i; j--) {
        parent->keys[j + 1] = parent->keys[j];
    }
    parent->keys[i] = child->keys[(ORDER - 1) / 2];
    parent->numKeys++;
}

// Function to insert a key into the B-Tree
void insert(BTreeNode** root, int key) {
    BTreeNode* rootNode = *root;

    // If the root is full, split it
    if (rootNode->numKeys == ORDER - 1) {
        BTreeNode* newRoot = createNode(0);
        newRoot->children[0] = rootNode;
        splitChild(newRoot, 0);
        insertNonFull(newRoot, key);
        *root = newRoot;
    } else {
        insertNonFull(rootNode, key);
    }
}

// Main function to demonstrate B-Tree operations
int main() {
    BTreeNode* root = createNode(1); // Create an empty tree

    // Insert keys
    insert(&root, 10);
    insert(&root, 20);
    insert(&root, 5);
    insert(&root, 6);
    insert(&root, 12);
    insert(&root, 30);
    insert(&root, 7);
    insert(&root, 17);

    // Print the B-Tree
    printf("B-Tree in-order traversal:\n");
    traverse(root);
    printf("\n");

    // Search for a key
    int key = 12;
    BTreeNode* result = search(root, key);
    if (result) {
        printf("Key %d found in B-Tree.\n", key);
    } else {
        printf("Key %d not found in B-Tree.\n", key);
    }

    return 0;
}
