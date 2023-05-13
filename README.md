# Telecommunication Services Price Calculator

This project aims to create a price calculator for a telecommunications company's services. The goal is to build an application view that allows users to check the prices of services they would like to order.

## Requirements

The price should be calculated when the user adds selected services to the list and chooses the year in which they would apply. The calculator should have a price list declaration for the years 2023, 2024, and 2025, allowing customers to modify it by adding additional years and services.

### List of Services

- Internet
- Television
- Phone Subscription
- 4K Decoder

Service prices may vary depending on the selected year. The current prices are as follows:

- Internet costs 39 PLN in 2023, 49 PLN in 2024, and 59 PLN in 2025.
- Television costs 49 PLN in 2023, 49 PLN in 2024, and 59 PLN in 2025.
- The "Internet + Television" package costs less - 79 PLN in 2023, 89 PLN in 2024, and 99 PLN in 2025.
- The "Internet + Phone Subscription" package costs 64 PLN in each year.
- Phone Subscription costs 29 PLN.
- 4K Decoder costs 29 PLN, but it is available for free in the "Internet + Television" package.

It doesn't make sense for a customer to order a "4K Decoder" without ordering television.

Ensure that the program calculates the most favorable solution for the customer, and no discount applies twice.

The application view should allow users to select services from the list, add them to a list, and calculate the final price of the selected services.

## Technology

This application is built using React, a JavaScript library for building user interfaces. The code should follow best programming practices, ensuring high code cleanliness and maintainability.

## Installation

To run the Telecommunication Services Price Calculator locally, follow these steps:

1. Clone the repository:
```shell
git clone https://github.com/ichmowgli/sp-next.git
```

2. Navigate to the project directory:
```shell
cd sp-next
```

3. Install the dependencies:
```shell
npm install
```

4. Start the development server:
```shell
npm start
```

5. Open your browser and visit `http://localhost:3000` to access the application.

## Usage

Upon opening the application, you will be presented with a list of services. Select the desired services, choose the year, and add them to the list. The calculator will display the final price of the selected services.

To modify the price list for different years or add new services, please refer to the codebase and follow the instructions provided in the relevant files.

## License

This project is licensed under the MIT License. Feel free to modify and distribute it as needed.