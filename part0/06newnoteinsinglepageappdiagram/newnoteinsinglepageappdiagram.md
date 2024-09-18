sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: browser sends data in JSON to the server
    activate server
    server-->>browser: HTTP status code 201 (created)
    deactivate server