#include <stdio.h>
#include <stdlib.h>
typedef struct Term 
{
	 int coefficient;
	 int exponent;
} Term;
typedef struct Polynomial
{
	 Term terms[100];
	 int size;
} Polynomial;
Polynomial createPolynomial();
Polynomial addPolynomials(Polynomial p1,Polynomial p2);
void displayPolynomial(Polynomial p);
int main() 
{
	 Polynomial p1,p2,sum;
	 
	 printf("Enter the first polynomial:\n");
	 p1 = createPolynomial();
	 
	 printf("Enter the second polynomial:\n");
	 p2 = createPolynomial();
	 
	 sum = addPolynomials(p1, p2);
	 
	 printf("\nFirst Polynomial: ");
	 displayPolynomial(p1);
	 
	 printf("\nSecond Polynomial: ");
	 displayPolynomial(p2);
	 
	 printf("\nSum of Polynomials: ");
	 displayPolynomial(sum);
	 
	 return 0;
}
Polynomial createPolynomial() 
{
	 Polynomial p;
	 int num,coeff,expo,i;
	 printf("Enter the number of terms: ");
	 scanf("%d", &num);
	 p.size=num;
	 for (i=0;i<num;i++) 
	 {
		 printf("Enter coefficient and exponent for term %d: ", i + 1);
		 scanf("%d %d",&coeff, &expo);
		 p.terms[i].coefficient=coeff;
		 p.terms[i].exponent=expo;
	 }
	 return p;
}
Polynomial addPolynomials(Polynomial p1, Polynomial p2) 
{
	 Polynomial result;
	 result.size=0;
	 int i=0,j=0,k=0;
	 while (i<p1.size && j<p2.size) 
	 {
		 if (p1.terms[i].exponent==p2.terms[j].exponent) 
		 {
			 result.terms[k].coefficient=p1.terms[i].coefficient+p2.terms[j].coefficient;
			 result.terms[k].exponent=p1.terms[i].exponent;
			 i++;
			 j++;
		 } 
		 else if (p1.terms[i].exponent>p2.terms[j].exponent) 
		 {
			 result.terms[k]=p1.terms[i];
			 i++;
		 }
		  else 
		 {
			 result.terms[k]=p2.terms[j];
			 j++;
		 }
		 k++;
	 }
	 while (i<p1.size)
	 {
		 result.terms[k]=p1.terms[i];
		 i++;
		 k++;
	 }
	 while (j<p2.size)
	 {
		 result.terms[k]=p2.terms[j];
		 j++;
		 k++;
	 }
	 result.size = k;
	 return result;
}
void displayPolynomial(Polynomial p) 
{
	 for (int i=0;i<p.size;i++) 
	 {
		printf("%d*x^%d",p.terms[i].coefficient,p.terms[i].exponent);
		 if(i<p.size-1) 
		 {
		     printf("+");
		 }
	 }
	 printf("\n");
}
