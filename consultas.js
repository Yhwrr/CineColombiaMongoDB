//Operadores Regulares
db.peliculas.find({titulo:/^E/});

db.clientes.find({nombre:/Gómez/});

//Arreglos

db.clientes.find({ generos_favoritos: "Acción" });

//Aggregations

db.proyecciones.aggregate([
  {
    $group: {
      _id: "$sala",
      proyecciones: { $push: "$nombre" },
      totalProyecciones: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      sala: "$_id",
      totalProyecciones: 1,
      proyecciones: 1
    }
  }
])

db.proyecciones.aggregate([
  {
    $group: {
      _id: "duracion_minutos" ,
      promedioDuracion: { $avg: "$duracion_minutos" }
    }
  },
  {
    $project: {
      _id: 0,
      promedioDuracion: 1
    }
  }
])