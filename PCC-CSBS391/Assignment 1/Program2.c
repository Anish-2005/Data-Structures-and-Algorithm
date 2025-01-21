#include <stdio.h>
#include <stdlib.h>

// Function declarations
void credit(float *balance, float amount);
void debit(float *balance, float amount);
void check_balance(float balance);
void display_statement(float transactions[], int count);

int main() {
    int choice;
    float balance = 0.0;
    float transactions[100];
    int transaction_count = 0;

    while(1) {
        // Display menu
        printf("\nMenu:\n");
        printf("1. Credit an amount\n");
        printf("2. Debit from the account\n");
        printf("3. Check account balance\n");
        printf("4. Display account statement\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch(choice) {
            case 1: {
                float amount;
                printf("Enter amount to credit: ");
                scanf("%f", &amount);
                credit(&balance, amount);
                transactions[transaction_count++] = amount;  // Record the transaction
                break;
            }
            case 2: {
                float amount;
                printf("Enter amount to debit: ");
                scanf("%f", &amount);
                debit(&balance, amount);
                transactions[transaction_count++] = -amount;  // Record the transaction
                break;
            }
            case 3:
                check_balance(balance);
                break;
            case 4:
                display_statement(transactions, transaction_count);
                break;
            case 5:
                exit(0);
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}

void credit(float *balance, float amount) {
    if (amount > 0) {
        *balance += amount;
        printf("Amount credited successfully.\n");
    } else {
        printf("Invalid amount. Please enter a positive number.\n");
    }
}

void debit(float *balance, float amount) {
    if (amount > 0 && amount <= *balance) {
        *balance -= amount;
        printf("Amount debited successfully.\n");
    } else {
        printf("Invalid amount. Please enter a positive number less than or equal to the current balance.\n");
    }
}

void check_balance(float balance) {
    printf("Current balance: $%.2f\n", balance);
}

void display_statement(float transactions[], int count) {
    printf("Account statement:\n");
    for (int i = 0; i < count; i++) {
        if (transactions[i] > 0) {
            printf("Credited: $%.2f\n", transactions[i]);
        } else {
            printf("Debited: $%.2f\n", -transactions[i]);
        }
    }
}
