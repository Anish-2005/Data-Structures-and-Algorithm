#include <stdio.h>
#include <stdlib.h>
int SearchArray(int *arr, int n, int e)
{
	for(int i=0;i<n;i++)
	{
		if(arr[i]==e)
		{
			return i;
		}
	}
	return -1;
}
	
int RemoveDuplicate(int *arr, int *n)
{
	if(*n<=1)
		return *n;
	int j=0;
	for(int i=0;i<*n;i++)
	{
		int f=0;
		for(int k=0;k<=j;k++)
		{
			if(arr[i]==arr[k])
			{
				f=1;
				break;
			}
		}
		if(!f)
		{
			j++;
			arr[j]=arr[i];
		}
	}
	*n=j+1;
	return *n;	
}

void SortArray(int *arr,int n)
{
	for(int i=0;i<n;i++)
	{
		for(int j=i;j<n;j++)
		{
			if(arr[i]>arr[j])
			{
				int temp=arr[j];
				arr[j]=arr[i];
				arr[i]=temp;
			}
		}
	}
}

int main()
{
	int n,*arr,e,r=0,s=0;
	printf("Enter size of the array: ");
	scanf("%d",&n);
	arr=(int*) malloc(n*sizeof(int));
	printf("Populating the array: ");
	for(int i=0;i<n;i++)
	{
		scanf("%d",&arr[i]);
	}
	printf("Enter the element to be searched: ");
	scanf("%d",&e);
	r=SearchArray(arr,n,e);
	if(r!=-1)
	{
		printf("element %d found at index %d",e,r);
	}
	else
	{
		printf("element %d not found",e);
	}
	printf("\n");
	s=RemoveDuplicate(arr, &n);
	printf("Array elements after removing duplicate elements");
	for(int i=0;i<s;i++)
	{
		printf("%d ",arr[i]);
	}
	printf("\n");
	SortArray(arr,s);
	printf("Array after Sorting: ");
	for(int i=0;i<s;i++)
	{
		printf("%d ",arr[i]);
	}
	printf("\n");
	free(arr);
	return 0;
}
	





