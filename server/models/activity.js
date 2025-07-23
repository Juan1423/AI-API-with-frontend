const mongoose = require('mongoose');
const child = require('./child');

const activitySchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child' },
  tipo: String,
  tema: String,
  edad: Number,
  nivel: String,
  contenido: String,
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // opcional
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
