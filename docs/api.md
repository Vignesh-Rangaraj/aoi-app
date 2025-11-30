API Specification (Future Backend Proposal)
POST /aois

Create a new AOI.

Request:

{
  "name": "Area 1",
  "vertices": [
    { "lat": 51.23, "lng": 6.78 },
    { "lat": 51.24, "lng": 6.79 }
  ]
}


Response:

{
  "id": "uuid",
  "name": "Area 1",
  "visible": true,
  "vertices": [...],
  "createdAt": "2025-01-01T10:00:00Z"
}

GET /aois

Return all stored AOIs.

Response:

[
  {
    "id": "uuid",
    "name": "Area 1",
    "visible": true,
    "vertices": [...]
  }
]

DELETE /aois/:id

Delete an AOI by ID.

Response:

{ "success": true }