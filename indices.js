db.peliculas.createIndex({ titulo: 1 });
db.peliculas.getIndexes();

db.peliculas.find({ titulo: "El Abrazo de la Serpiente" });


db.proyecciones.createIndex({ sala: 1 });
db.proyecciones.getIndexes();

db.proyecciones.find({ sala: "Sala Principal" });


db.clientes.createIndex({ ciudad: 1, edad: 1 });
db.clientes.getIndexes();
db.clientes.find({
  ciudad: "Bogotá",
  edad: { $lt: 30 }});