const express = require("express");

const app = express();
app.use(express.json());

var users = [
  {
    name: "Amandeep",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: true,
      },
    ],
  },
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", function (req, res) {
  let johnKidneys = users[0].kidneys;
  let numOfKidneys = johnKidneys.length;
  let healthyKidneys = 0;
  johnKidneys.filter((kidney) => {
    if (kidney.healthy) {
      healthyKidneys++;
    }
  });
  let nonHealthyKidneys = numOfKidneys - healthyKidneys;

  res.send({
    numOfKidneys,
    healthyKidneys,
    nonHealthyKidneys,
  });
});

app.post("/", function (req, res) {
  const healthy = req.body.healthy;
  users[0].kidneys.push({
    healthy: healthy,
  });
  res.json({
    msg: "Done !!!!",
  });
});

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
});

app.delete("/", function (req, res) {
  if (isThereAtleastOneUnhealthyKidney()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidneys;
    res.json(users[0].kidneys);
  }
  else{
    res.status(400).json({
      msg:"You have no bad kidneys!!!!"
    })
  }
});

function isThereAtleastOneUnhealthyKidney() {
  let atleastOneUnhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atleastOneUnhealthyKidney = true;
      break; // Exit early since we've found an unhealthy kidney
    }
  }
  return atleastOneUnhealthyKidney;
}

app.listen(3000);
