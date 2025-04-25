#include<stdio.h>
#include<stdlib.h>
struct node{
	int data;
	struct node*left;
	struct node*right;
};
struct node* createNode(int data)
{
	struct node*node=(struct node*)malloc(sizeof(struct node));
	node->data=data;
	node->left=NULL;
	node->right=NULL;
	return node;
}
struct node*buildTree()
{
	int data;
	struct node*node=createNode(data);
	printf("ENTER THE DATA(-1 FOR NO NODE):");
	scanf("%d",&data);
	if(data==-1){
		return NULL;
	}
	node->data=data;
	printf("THE LEFT CHILD OF %d\n",data);
	node->left=buildTree();
	printf("THE RIGHT CHILD OF %d\n",data);
	node->right=buildTree();
	return node;
}
void inorderTraversal(struct node*root)
{
	if(root==NULL){
		return;
	}
	inorderTraversal(root->left);
	printf("%d ",root->data);
	inorderTraversal(root->right);
}
void preorderTraversal(struct node*root)
{
	if(root==NULL){
		return;
	}
	printf("%d ",root->data);
	preorderTraversal(root->left);
	preorderTraversal(root->right);
}
void postorderTraversal(struct node*root)
{
	if(root==NULL){
		return;
	}
	preorderTraversal(root->left);
	preorderTraversal(root->right);
	printf("%d ",root->data);
}
int main()
{
	struct node*root=NULL;
	int choice;
	printf("BINARY TREE:\n");
	root=buildTree();
	while(1){
		printf("OPTION:\n");
		printf("1. INORDER TRAVERSAL 2. PREORDER TRAVERSAL 3. POSTORDER TRAVERSAL 4. EXIT\n");
		printf("ENTER YOUR CHOICE:");
		scanf("%d",&choice);
		switch(choice){
			case 1:
				printf("INORDER TRAVERSAL:\n");
				inorderTraversal(root);
				printf("\n");
				break;
			case 2:
				printf("PREORDER TRAVERSAL:\n");
				preorderTraversal(root);
				printf("\n");
				break;
			case 3:
				printf("POSTORDER TRAVERSAL:\n");
				postorderTraversal(root);
				printf("\n");
				break;
			case 4:
				printf("EXIT!!\n");
				exit(0);
				break;
			default:
				printf("INVALID CHOICE\n");
		}
	}
	return 0;
}
