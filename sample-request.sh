#!/bin/bash
URL=http://localhost:3000/api/collection                # i.e. "http://localhost:3000/api/collection"
REQUEST=model.Collection                                # i.e. "Request"
RESPONSE=N/A                                            # i.e. "Response"
PROTO=model.proto                                       # i.e. "./Protocol.proto"

cat message.msg | protoc --encode $REQUEST $PROTO | curl -sS -X POST -H "Content-Type: application/octet-stream" --data-binary @- $URL