# Acomo Mailrelay Users Public

This project is a serverless application that provides a public API to manage users in the Mailrelay
platform.

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

# Registro de Usuario

## Estructura del Request

Al registrar un usuario, la estructura del request varía según el valor de `level`:

### Caso 1: `level = 30`

Si el usuario a registrar tiene `level = 30`, el request debe contener un objeto con las siguientes
propiedades:

```json
{
  "email": "example@example.com",
  "name": "Nombre",
  "nacimiento": "YYYY-MM-DD",
  "department": "Departamento",
  "cellphone": "123456789",
  "lname_p": "Apellido Paterno",
  "lname_m": "Apellido Materno",
  "content_promo": true,
  "level": 30
}
```

### Caso 2: `level` distinto de 30

Si el usuario tiene un `level` diferente de `30`, el request debe contener únicamente las siguientes
propiedades:

```json
{
  "_id": "unique_user_id",
  "content_promo": true
}
```

## Notas

- `content_promo` es un campo booleano que indica si el usuario acepta recibir promociones.
- `_id` es el identificador único del usuario cuando `level` no es `30`.
- En el caso de `level = 30`, los campos adicionales son obligatorios para registrar correctamente
  al usuario.

# Actualizar Usuario

# Operation Signed

Aqui varia el email dependiendo del level del usuario es 31 o 32 se necesita el email de la
compañia, sino solo el email del usuario

```json
{
  "_id": "unique_user_id",
  "level": "30",
  "company": {
    "_id": "unique_company_id",
    "email": "example-company@example.com"
  },
  "email": "example@example.com",
  "operation": {
    "transac_contraparte": {
      "origin_bank": "",
      "destiny_bank": ""
    },
    "action": "",
    "created_at": ""
  }
}
```
