const cds = require("@sap/cds");

async function manualTx() {
  const technicalUser = new cds.User({
    id: "id_of_user",
    tenant: null,
  });

  const request = new cds.Request({ user: technicalUser });

  const tx = cds.transaction(request);

  console.log("insert");
  try {
    await tx.run(
      INSERT.into(cds.entities.Books).entries({
        ID: 1234,
        title: "new book title",
      })
    );
  } catch (error) {
    console.error(error);
    await tx.rollback();
    console.log("rollback");
    throw error;
  }

  console.log("commit");
  await tx.commit();
}

cds.on("bootstrap", async (app) => {
  app.get("/manualtx", async (req, res) => {
    console.log("Insert record using manual transaction");

    try {
      await manualTx();
    } catch (error) {
      res.status(500).send(
        JSON.stringify({
          result: error,
        })
      );
      return;
    }

    res.type("json").send(
      JSON.stringify({
        result: "ok",
      })
    );
  });
});

cds.on("served", async (_services) => {});

// Delegate bootstrapping to built-in server.js
module.exports = cds.server;
