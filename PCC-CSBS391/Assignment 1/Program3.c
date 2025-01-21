#include <stdio.h>

#define NUM_EMPLOYEES 3

// Define the Employee structure
struct Employee {
    int id;
    char name[100];
    float salary;
};

int main() {
    struct Employee employees[NUM_EMPLOYEES];
    struct Employee *highestPaidEmployee = NULL;

    // Input data for three employees
    for (int i = 0; i < NUM_EMPLOYEES; i++) {
        printf("Enter details for employee %d:\n", i + 1);
        printf("ID: ");
        scanf("%d", &employees[i].id);
        printf("Name: ");
        scanf("%s", employees[i].name);
        printf("Salary: ");
        scanf("%f", &employees[i].salary);
    }

    // Find the highest salary
    highestPaidEmployee = &employees[0];
    for (int i = 1; i < NUM_EMPLOYEES; i++) {
        if (employees[i].salary > highestPaidEmployee->salary) {
            highestPaidEmployee = &employees[i];
        }
    }

    // Display information of the employee with the highest salary
    printf("\nEmployee with the highest salary:\n");
    printf("ID: %d\n", highestPaidEmployee->id);
    printf("Name: %s\n", highestPaidEmployee->name);
    printf("Salary: %.2f\n", highestPaidEmployee->salary);

    return 0;
}
