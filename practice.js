const protobuf = require("protocol-buffers");
const fs = require("fs");

let messages = protobuf(fs.readFileSync('model.proto'));

let buf1 = messages.Collection.encode(
    {
        id: "1",
        name: "bob",
        description: "description bob",
        created_ts_micros: 123456,
        subscriber_ids: [],
        items: []
    }
);

let buf2 = messages.Collection.encode(
    {
        id: "2",
        name: "alice",
        description: "description alice",
        created_ts_micros: 123456,
        subscriber_ids: ["1","2","3","4","5"],
        items: []
    }
);

console.log(buf1);
console.log(buf2);

let obj2 = messages.Collection.decode(buf2);
console.log(obj2);