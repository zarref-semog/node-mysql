require("dotenv").config();

const db = require("./db");

const express = require("express");

const app = express();

app.use(express.json());

app.delete("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.deleteCustomer(id);
    res.sendStatus(204);
});

app.patch("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const customer = req.body;
    await db.updateCustomer(id, customer);
    res.sendStatus(200);
});

app.post("/clientes", async (req, res) => {
    const customer = req.body;
    await db.insertCustomer(customer);
    res.sendStatus(201);
});

app.get("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.selectCustomer(id);
    res.json(result);
});

app.get("/clientes", async (req, res) => {
    const results = await db.selectCustomers();
    res.json(results);
});

app.get("/", (req, res, next) => {
    res.json({
        status: "Success",
        message: "It's working!"
    });
});

app.listen(process.env.PORT, () => {
    console.log("Application is running!")
});