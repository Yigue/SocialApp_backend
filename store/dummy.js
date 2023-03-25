const db = {
  user: [
    {
      id: "1",
      name: "admin",
      password: "admin",
    },
    {
      id: " 0f120142-ce98-48f2-b748-cabbbf90dc9a",
      name: "paco",
      userName: "pacoppp",

    },
  ],
  auth: [
    {
      id: "0f120142-ce98-48f2-b748-cabbbf90dc9a",
      userName: "pacoppp",
      password: "$2b$05$2b6QTk6ME6IXU6bEi.bAHeZRmypBlZIJ8Cu1BVjFgH3M3vDePJrVa",
    },
  ],
};

async function list(tabla) {
  return db[tabla] || [];
}
async function get(tabla, id) {
  let col = await list(tabla);
  return col.filter((item) => item.id === id)[0] || null;
}


async function upsert(tabla, data) {
  console.log(data);
  if (!db[tabla]) {
    db[tabla]=[]
  }
    db[tabla].push(data);
    console.log(db);
}
async function query(tabla,q) {
    let col = await list(tabla);
    let keys=Object.keys(q)
    let key = keys[0];

    return col.filter((item) => item[keys[0]] === q[key])[0] || null;
 
}

async function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
