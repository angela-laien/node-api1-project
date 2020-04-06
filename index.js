const express = require("express");
const server = express();
const shortid = require("shortid")

const port = 5000;
server.listen(port, () => console.log(`\n == api on port ${port} == \n`));

let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    },
];

// middleware
server.use(express.json());

// endpoints
server.get("/", (req, res) => {
    res.json({ api: "running....."});
});

server.get("/api/users", (req, res) => {
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(500).json({ message: "The user information could not be retrieved." })
    }
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id

    const user = users.find((user) => user.id == id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
});

server.post("/api/users", (req, res) => {
    const userInfo = req.body;

    userInfo.id = shortid.generate();

    users.push(userInfo);

    res.status(201).json(users);
});