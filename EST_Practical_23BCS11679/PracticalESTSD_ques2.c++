#include <iostream>
using namespace std;

class stock {
public:
    bool checkStock() {
        cout << "Stock available";
        return true;
    }
};

class Payment {
public:
    bool pay() {
        cout << "Payment successful";
        return true;
    }
};

class Email {
public:
    void sendReceipt() {
        cout << "Receipt sent to user email";
    }
};

class OrderFacade {
private:
    stock stock;
    Payment payment;
    Email email;

public:
    void placeOrder() {
        cout << "Placing Order...";

        if (stock.checkStock()) {
            if (payment.pay()) {
                email.sendReceipt();
                cout << "Order placed successfully";
            }
        } else {
            cout << "Order failed: Out of stock";
        }
    }
};

int main() {
    OrderFacade order;
    order.placeOrder();

    return 0;
}