# Acomo Mailrelay Users Public

This project is a serverless application that provides a public API to manage users in the Mailrelay platform.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/jofer6030/mailrelay-users.git
    ```
2. Navigate to the project directory:
    ```bash
    cd mailrelay-users
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Configure the Mailrelay API settings in the `.env.dev` file.
    ```bash
    cp .env.template .env.dev
    ```
2. Run the application:

    ```sh
    serverless offline --stage dev
    ```