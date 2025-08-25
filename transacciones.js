const session = db.getMongo().startSession();
const dbSession = session.getDatabase("cinecolombiano");
session.startTransaction(); 
try {
      const clienteId = ObjectId("68ac5110c8c1c0b05018fc49");
      const salaNombre = "Sala Principal";
      const fechaEvento = "2025-06-25";
      const sala = db.salas.findOne({ nombre: salaNombre });
  if (!sala) {
    throw new Error("Sala no encontrada: " + salaNombre);
  }
    const nuevoBoleto = {
    sala: salaNombre,
    dia: fechaEvento,
    fechaCompra: new Date(),
    formato: sala.formato 
  };
   const resultadoUpdate = db.clientes.updateOne(
    { _id: clienteId },
    { $push: { boletos_comprados: nuevoBoleto } }
  );

  if (resultadoUpdate.modifiedCount === 0) {
    throw new Error("Cliente no encontrado o no se pudo actualizar");
  }
  const actualizarSala = db.salas.updateOne(
    { nombre: salaNombre },
    { $inc: { capacidad: -1 } } 
  );
   session.commitTransaction();
  print("✅ Boleto comprado exitosamente!");
  print("Cliente: Juan Pérez");
  print("Sala: " + salaNombre);
  print("Fecha: " + fechaEvento);
  print("Formato: " + sala.formato);

} catch (error) {
  session.abortTransaction();
  print(" Error en la transacción: " + error.message);
  
} finally {
  session.endSession();
}







session = db.getMongo().startSession();

try {
    session.startTransaction();

  const db = session.getDatabase("cinecolombiano");
  
  const clienteId = ObjectId("68ac5110c8c1c0b05018fc49");
  const salaNombre = "Sala Principal";
  const fechaBoleto = "2025-06-25";


  const resultadoEliminacion = db.clientes.updateOne(
    { 
      _id: clienteId,
      "boletos_comprados.sala": salaNombre,
      "boletos_comprados.dia": fechaBoleto
    },
    { 
      $pull: { 
        boletos_comprados: {
          sala: salaNombre,
          dia: fechaBoleto
        }
      } 
    }
  );

  if (resultadoEliminacion.modifiedCount === 0) {
    throw new Error("No se encontró el boleto para eliminar");
  }

  const resultadoSala = db.salas.updateOne(
    { nombre: salaNombre },
    { $inc: { capacidad: 1 } }
  );

  if (resultadoSala.modifiedCount === 0) {
    throw new Error("No se pudo actualizar la capacidad de la sala");
  }

  session.commitTransaction();
  print("Compra reversada exitosamente!");
  print("Boleto eliminado de: Juan Pérez");
  print("Sala: " + salaNombre);
  print("Fecha: " + fechaBoleto);
  print("Capacidad de sala incrementada en 1");

} catch (error) {
  session.abortTransaction();
  print(" Error en la reversión: " + error.message);
  
} finally {
  session.endSession();
}