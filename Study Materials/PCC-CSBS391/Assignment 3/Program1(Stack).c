#include <stdio.h>
#include <stdlib.h>

int *stack;
int top = -1;
int capacity = 1;

void resizeStack() 
{
    capacity *= 2;
    stack=realloc(stack, capacity * sizeof(int));
    if (stack==NULL)
    {
        printf("Stack is Empty\n");
        exit(1);
    }
}

void push() 
{
    int val;
    if (top==capacity-1) 
    {
        resizeStack();
    }
    printf("Enter the value to push: ");
    scanf("%d", &val);
    stack[++top]=val;
    printf("Value pushed successfully\n");
}

void pop() 
{
    if (top==-1) 
    {
        printf("Stack underflow\n");
    } 
    else 
    {
        printf("Popped value: %d\n",stack[top--]);
    }
}

void display() 
{
    if(top==-1) 
    {
        printf("Stack is empty\n");
    }
    else 
    {
       printf("Stack elements are:\n");
       for (int i=top;i>= 0;i--)
        {
           printf("%d\n",stack[i]);
        }
    }
}

int main()
 {
    stack=(int*)malloc(capacity * sizeof(int));
    if (stack==NULL)
     {
        printf("Stack is empty\n");
        return 1;
     }

    int ch;
    while (1) 
    {
      
        printf("1. Push\n");
        printf("2. Pop\n");
        printf("3. Display\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d",&ch);
        switch (ch) 
        {
            case 1:
                push();
                break;
            case 2:
                pop();
                break;
            case 3:
                display();
                break;
            case 4:
                free(stack);
                exit(0);
            default:
                printf("Invalid choice\n");
        }
    }
    return 0;
}
