#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

typedef struct Node {
    char data;
    struct Node* left;
    struct Node* right;
} Node;

// Function to create a new node
Node* createNode(char data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Function to check if a character is an operator
int isOperator(char ch) {
    return (ch == '+' || ch == '-' || ch == '*' || ch == '/');
}

// Function to construct an expression tree from a postfix expression
Node* constructTree(char postfix[]) {
    Node* stack[100];  // Stack to store tree nodes
    int top = -1;
    
    for (int i = 0; postfix[i] != '\0'; i++) {
        char current = postfix[i];
        
        if (isOperator(current)) {
            Node* operatorNode = createNode(current);
            operatorNode->right = stack[top--];
            operatorNode->left = stack[top--];
            stack[++top] = operatorNode;
        } else if (isdigit(current)) {
            Node* operandNode = createNode(current);
            stack[++top] = operandNode;
        }
    }
    
    return stack[top];  // Root of the expression tree
}

// Function to evaluate the expression tree
int evaluateTree(Node* root) {
    if (root == NULL)
        return 0;
    
    if (!isOperator(root->data)) {
        return root->data - '0';  // Convert char to integer
    }

    int leftValue = evaluateTree(root->left);
    int rightValue = evaluateTree(root->right);

    switch (root->data) {
        case '+': return leftValue + rightValue;
        case '-': return leftValue - rightValue;
        case '*': return leftValue * rightValue;
        case '/': return leftValue / rightValue;
        default: return 0;
    }
}

// Function to print the infix expression from the tree
void printInfix(Node* root) {
    if (root == NULL)
        return;
    
    if (isOperator(root->data)) {
        printf("(");
        printInfix(root->left);
        printf(" %c ", root->data);
        printInfix(root->right);
        printf(")");
    } else {
        printf("%c", root->data);
    }
}

int main() {
    char postfix[100];
    
    printf("Enter a postfix expression: ");
    scanf("%s", postfix);
    
    // Construct the expression tree
    Node* root = constructTree(postfix);
    
    // Print the infix expression
    printf("Infix Expression: ");
    printInfix(root);
    printf("\n");
    
    // Evaluate the expression tree
    int result = evaluateTree(root);
    printf("Result of the expression: %d\n", result);

    return 0;
}
