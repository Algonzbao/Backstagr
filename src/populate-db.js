// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require('mongoose');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { faker } = require('@faker-js/faker');  // Asegúrate de que se importa correctamente

// Define la URI de conexión a tu base de datos
const uri = 'mongodb://localhost/nest'; // Reemplaza con tu URI

// Define los modelos de tus esquemas (incluye todos los esquemas)
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  avatar: String,
  description: String,
  favoriteArtists: [String],
  attendedConcerts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Concert' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  settings: Object,
});

const ConcertSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: Date,
  venue: String,
  artist: String,
  capacity: Number,
  description: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  taggedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  media: [String],
  concert: { type: mongoose.Schema.Types.ObjectId, ref: 'Concert' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  text: String,
});

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  isRead: Boolean,
});

// Define los modelos de Mongoose
const User = mongoose.model('User', UserSchema);
const Concert = mongoose.model('Concert', ConcertSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Message = mongoose.model('Message', MessageSchema);
const Post = mongoose.model('Post', PostSchema);

async function crearColeccionAleatoria() {
  try {
    await mongoose.connect(uri);

    // Limpia las colecciones (opcional)
    await User.deleteMany({});
    await Concert.deleteMany({});
    await Comment.deleteMany({});
    await Message.deleteMany({});
    await Post.deleteMany({});

    const usuarios = [];
    for (let i = 0; i < 10; i++) {
      const usuario = new User({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(), // No hashing in this example - hash in your app!
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 65 }),
        avatar: faker.image.avatar(),
        description: faker.lorem.paragraph(),
        favoriteArtists: [faker.lorem.word(), faker.lorem.word()],
        settings: { theme: 'dark', notifications: true },
      });
      usuarios.push(usuario);
    }
    const usuariosGuardados = await Promise.all(usuarios.map(u => u.save()));

    const conciertos = [];
    for (let i = 0; i < 5; i++) {
      const concierto = new Concert({
        name: faker.lorem.words(2),
        location: faker.location.city(), // Cambiado para usar 'faker.location'
        date: faker.date.future(),
        venue: faker.company.name(),
        artist: faker.person.firstName(),  // Cambiado para usar 'faker.person'
        capacity: faker.number.int({ min: 100, max: 1000 }), // Cambiado
        description: faker.lorem.paragraph(),
      });
      conciertos.push(concierto);
    }
    const conciertosGuardados = await Promise.all(conciertos.map(c => c.save()));

    const publicaciones = [];
    for (let i = 0; i < 15; i++) {
        const publicacion = new Post({
            content: faker.lorem.paragraph(),
            author: usuariosGuardados[Math.floor(Math.random() * usuariosGuardados.length)]._id,
            media: [faker.image.url(), faker.image.url()], // Cambiado a 'faker.image.url()'
            concert: conciertosGuardados[Math.floor(Math.random() * conciertosGuardados.length)]._id,
        });
        publicaciones.push(publicacion);
    }
    const publicacionesGuardadas = await Promise.all(publicaciones.map(p => p.save()));

    const comentarios = [];
    for (let i = 0; i < 20; i++) {
      const comentario = new Comment({
        text: faker.lorem.sentence(),
        author: usuariosGuardados[Math.floor(Math.random() * usuariosGuardados.length)]._id,
        post: publicacionesGuardadas[Math.floor(Math.random() * publicacionesGuardadas.length)]._id,
      });
      comentarios.push(comentario);
    }
    const comentariosGuardados = await Promise.all(comentarios.map(c => c.save()));

    const mensajes = [];
    for (let i = 0; i < 30; i++) {
      const mensaje = new Message({
        message: faker.lorem.sentence(),
        sender: usuariosGuardados[Math.floor(Math.random() * usuariosGuardados.length)]._id,
        receiver: usuariosGuardados[Math.floor(Math.random() * usuariosGuardados.length)]._id,
        isRead: faker.datatype.boolean(),
      });
      mensajes.push(mensaje);
    }
    const mensajesGuardados = await Promise.all(mensajes.map(m => m.save()));

    console.log('Colección creada con éxito.');
  } catch (error) {
    console.error('Error al crear la colección:', error);
  } finally {
    await mongoose.disconnect();
  }
}

crearColeccionAleatoria();