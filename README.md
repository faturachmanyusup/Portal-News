# Portal-News
Group Project P2W1
Users Routes

POST /register : Create new user

- Request Header
    Not required.

- Request Body

    {
        "name": "<user's name>"
        "email": "<user's email>",
        "password": "<user's password>"
    }

- Response 201: Created

    {
        "id": <given id by system>,
        "email": "<posted user's email>",
        "name": "<posted user's name>",
        "password": "<posted user's password>",
        "createdAt": "<date given by system>",
        "updatedAt": "<date given by system>"
    }

- Response 400: Bad Request

    {
        "type": "Bad Request",
        "errors": [
            {
                "message": "Username Required."
            },
            {
                "message": "Email Required."
            },
            {
                "message": "Password Required."
            }
        ]
    }

- Response 500: Internal server error

    {
        type: "Internal Server Error", <show error>
    }

POST /login : login to user's account

- Request Header
    Not required.

- Request Body
    {
        "email": "<user's email>",
        "password": "<user's password>"
    }

- Response 200: OK

    {
        "id": <user's id>,
        "email": "<user's email>",
        "name": "<user's name>",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXlhbmFAZW1haWwuY29tIiwibmFtZSI6Im1heWEiLCJpYXQiOjE1OTQzNjQxNTB9.RgwDwM4MYu5_6x1nQrJ_CKj44-WkR32ZM6_dBZItp9w"
    }

- Response 400: Bad Request

    {
        "errors": [
                    {
                        "message": "Invalid email/password"
                    }
                ]
    }

- Response 500: Internal server error

    {
        type: "Internal Server Error", <show error>
    }

POST /login/google : login to user's account through third-party API (google)

- Request Header
    Not required.

- Request Body

    {
        "email": "<user's email>",
        "password": "<user's password>"
    }

- Response 200: OK

    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXlhbmFAZW1haWwuY29tIiwibmFtZSI6Im1heWEiLCJpYXQiOjE1OTQzNjQxNTB9.RgwDwM4MYu5_6x1nQrJ_CKj44-WkR32ZM6_dBZItp9w"
    }

- Response 400: Bad Request

    {
        "errors": [
                    {
                        "message": "Invalid email/password"
                    }
                ]
    }

- Response 500: Internal server error

    {
        type: "Internal Server Error", <show error>
    }


POST /currency : hit Currency API to generate Currency request on Client Side

- Request Header
    {
        "access_token":"<access token>"
    }

- Request Body

    {
        from: <input Initial currency>,
        to: <input Comparison currency>
    }

- Response 200: OK

    <Currency result>

- Response 500: Internal server error

    {
        type: "Internal Server Error", <show error>
    }