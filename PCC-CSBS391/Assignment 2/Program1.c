#include <stdio.h>
#include <stdlib.h>

void ConvertDiagonalMatrix(int** a,int n) 
{
    for (int i=0;i<n;i++) 
    {
        for (int j=0;j<n;j++)
        {
            if (i>=j) 
            {
                a[i][j]=0;
            }
        }
    }
}
int main() 
{
	    int n;
	    printf("Enter the number of rows and colums: ");
	    scanf("%d",&n);
	    int** a =(int**)malloc(n * sizeof(int*));
	    for(int i=0;i<n;i++)
	     {
		a[i]=(int*)malloc(n * sizeof(int));
    	     }
            printf("Enter the elements of the matrix:\n");
	    for(int i=0;i<n;i++)
	    {
		for(int j =0;j<n;j++) 
		{
		    printf("Element [%d][%d]: ",i,j);
		    scanf("%d", &a[i][j]);
		}
	    }
	    ConvertDiagonalMatrix(a,n);
	    printf("The diagonal matrix is:\n");
	    for(int i=0;i<n;i++) 
	    {
		for(int j=0;j<n;j++)
		{
		    printf("%d ",a[i][j]);
		}
		printf("\n");
	    }
	    for(int i=0;i<n;i++) 
	    {
		free(a[i]);
	    }
	    free(a);
	    return 0;
}
