module.exports = async function dbConnection(){
    const client = new client({
        user:"postgres",
        password:"1234",
        host:"localhost",
        port:5432,
        database:"c9_game",
    });
    await client.connect();
    return client;
}