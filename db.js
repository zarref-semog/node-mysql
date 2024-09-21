const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectCustomers() {
    const results = await client.query("SELECT * FROM customers;");
    return results[0];
}

async function selectCustomer(id) {
    const result = await client.query("SELECT * FROM customers WHERE id = ?;", [id]);
    return result[0];
}

async function insertCustomer(customer) {
    const values = [customer.nome, customer.idade, customer.uf];
    await client.query("INSERT INTO customers(nome, idade, uf) VALUES (?, ?, ?);", values);
}

async function updateCustomer(id, customerData) {
    const values = [customerData.nome, customerData.idade, customerData.uf, id];
    await client.query("UPDATE customers SET nome = ?, idade = ?, uf = ? WHERE id = ?", values);
}

async function deleteCustomer(id) {
    await client.query("DELETE FROM customers WHERE id = ?", [id]);
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
}