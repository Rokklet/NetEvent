const bcrypt = require("bcryptjs");
const {
  ObjectId,
} = require("mongodb");

const ids = {
  organizer: new ObjectId("670000000000000000000001"),

  participantOne: new ObjectId("670000000000000000000002"),

  participantTwo: new ObjectId("670000000000000000000003"),

  eventOne: new ObjectId("670000000000000000000101"),

  eventTwo: new ObjectId("670000000000000000000102"),

  inscriptionOne: new ObjectId("670000000000000000000201"),

  inscriptionTwo: new ObjectId("670000000000000000000202"),

  commentOne: new ObjectId("670000000000000000000301"),
};

module.exports = {
  async up(db) {
    const now = new Date();

    const passwordHash = await bcrypt.hash("Demo1234!",10);

    await db.collection("users").bulkWrite([
      {
        updateOne: {
          filter: {
            _id: ids.organizer,
          },
          update: {
            $setOnInsert: {
              nombre:
                "Empresa Organizadora Demo",
              correo:
                "organizador@netevent.demo",
              password: passwordHash,
              role: "organizer",
              descripcion:
                "Organizador creado por la migración inicial",
              foto: "/seed/organizador1.webp",
              createdAt: now,
              updatedAt: now,
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: {
            _id: ids.participantOne,
          },
          update: {
            $setOnInsert: {
              nombre:
                "Participante Demo Uno",
              correo:
                "participante1@netevent.demo",
              password: passwordHash,
              role: "participant",
              descripcion:
                "Participante interesado en tecnología",
              foto: "/seed/participante1.webp",
              createdAt: now,
              updatedAt: now,
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: {
            _id: ids.participantTwo,
          },
          update: {
            $setOnInsert: {
              nombre:
                "Participante Demo Dos",
              correo:
                "participante2@netevent.demo",
              password: passwordHash,
              role: "participant",
              descripcion:
                "Participante interesado en negocios",
              foto: "/seed/participante2.webp",
              createdAt: now,
              updatedAt: now,
            },
          },
          upsert: true,
        },
      },
    ]);

    await db.collection("events").bulkWrite([
      {
        updateOne: {
          filter: {
            _id: ids.eventOne,
          },
          update: {
            $setOnInsert: {
              titulo:
                "Encuentro de Tecnología Empresarial",
              descripcion:
                "Evento demo para empresas y profesionales del sector tecnológico.",
              fecha: new Date(
                "2026-12-10T18:00:00.000Z"
              ),
              ubicacion:
                "Centro de Convenciones",
              tags: [
                "Tecnología",
                "Software",
                "Networking",
              ],
              imagenes: [
                "/seed/principal_evento1.webp",
                "/seed/charla1_evento1.webp",
                "/seed/charla2_evento1.webp",
              ],
              charlas: [
                {
                  persona:
                    "Especialista Demo",
                  titulo:
                    "Transformación digital",
                  inicio: "18:30",
                  fin: "19:15",
                },
                {
                  persona:
                    "Empresario Demo",
                  titulo:
                    "Networking para empresas",
                  inicio: "19:30",
                  fin: "20:15",
                },
              ],
              organizador:
                ids.organizer,
              estado: true,
              createdAt: now,
              updatedAt: now,
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: {
            _id: ids.eventTwo,
          },
          update: {
            $setOnInsert: {
              titulo:
                "Ronda de Negocios Demo",
              descripcion:
                "Ronda empresarial creada como dato inicial.",
              fecha: new Date(
                "2026-12-15T17:00:00.000Z"
              ),
              ubicacion:
                "Auditorio Empresarial",
              tags: [
                "Negocios",
                "Empresas",
                "Networking",
              ],
              imagenes: [
                "/seed/principal_evento2.webp",
                "/seed/charla1_evento2.webp"
              ],
              charlas: [
                {
                  persona:
                    "Consultor Demo",
                  titulo:
                    "Oportunidades comerciales",
                  inicio: "17:30",
                  fin: "18:30",
                },
              ],
              organizador:
                ids.organizer,
              estado: true,
              createdAt: now,
              updatedAt: now,
            },
          },
          upsert: true,
        },
      },
    ]);

    await db.collection("inscriptions").bulkWrite([
        {
          updateOne: {
            filter: {
              evento: ids.eventOne,
              participante:
                ids.participantOne,
            },
            update: {
              $setOnInsert: {
                _id:
                  ids.inscriptionOne,
                evento: ids.eventOne,
                participante:
                  ids.participantOne,
                createdAt: now,
                updatedAt: now,
              },
            },
            upsert: true,
          },
        },
        {
          updateOne: {
            filter: {
              evento: ids.eventOne,
              participante:
                ids.participantTwo,
            },
            update: {
              $setOnInsert: {
                _id:
                  ids.inscriptionTwo,
                evento: ids.eventOne,
                participante:
                  ids.participantTwo,
                createdAt: now,
                updatedAt: now,
              },
            },
            upsert: true,
          },
        },
      ]);

    await db.collection("comments").updateOne(
      {
        _id: ids.commentOne,
      },
      {
        $setOnInsert: {
          evento: ids.eventOne,
          autor: ids.participantOne,
          texto:
            "¡Hola! Me interesa contactar a otros participantes de tecnología.",
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        upsert: true,
      }
    );
  },

  async down(db) {
    await db.collection("comments").deleteMany({_id: {$in: [ids.commentOne],},});

    await db.collection("inscriptions").deleteMany({
        _id: {
          $in: [
            ids.inscriptionOne,
            ids.inscriptionTwo,
          ],
        },
      });

    await db.collection("events").deleteMany({
      _id: {
        $in: [
          ids.eventOne,
          ids.eventTwo,
        ],
      },
    });

    await db.collection("users").deleteMany({
      _id: {
        $in: [
          ids.organizer,
          ids.participantOne,
          ids.participantTwo,
        ],
      },
    });
  },
};