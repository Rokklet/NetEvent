function haveSameKey(left, right) {
  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);

  if (
    leftEntries.length !==
    rightEntries.length
  ) {
    return false;
  }

  return leftEntries.every(
    ([field, direction], index) => {
      const [
        rightField,
        rightDirection,
      ] = rightEntries[index];

      return (
        field === rightField &&
        direction === rightDirection
      );
    }
  );
}

async function getIndexes(collection) {
  try {
    return await collection.indexes();
  } catch (error) {
    // La colección todavía no existe
    if (error?.code === 26) {
      return [];
    }

    throw error;
  }
}

async function ensureIndex(
  collection,
  key,
  options
) {
  const indexes =
    await getIndexes(collection);

  const equivalentIndex = indexes.find(
    index => haveSameKey(index.key, key)
  );

  if (equivalentIndex) {
    if (
      options.unique &&
      !equivalentIndex.unique
    ) {
      throw new Error(
        `El índice ${equivalentIndex.name} existe, pero no es unique`
      );
    }

    console.log(
      `Índice equivalente ya existente: ${equivalentIndex.name}`
    );

    return;
  }

  const createdIndex =
    await collection.createIndex(
      key,
      options
    );

  console.log(
    `Índice creado: ${createdIndex}`
  );
}

async function dropIndexIfExists(
  collection,
  indexName
) {
  const indexes =
    await getIndexes(collection);

  const exists = indexes.some(
    index => index.name === indexName
  );

  if (exists) {
    await collection.dropIndex(indexName);
  }
}

module.exports = {
  async up(db) {
    await ensureIndex(
      db.collection("users"),
      {
        correo: 1,
      },
      {
        unique: true,
        name: "users_correo_unique",
      }
    );

    await ensureIndex(
      db.collection("inscriptions"),
      {
        evento: 1,
        participante: 1,
      },
      {
        unique: true,
        name:
          "inscriptions_event_participant_unique",
      }
    );

    await ensureIndex(
      db.collection("events"),
      {
        organizador: 1,
      },
      {
        name: "events_organizer",
      }
    );

    await ensureIndex(
      db.collection("comments"),
      {
        evento: 1,
        createdAt: 1,
      },
      {
        name:
          "comments_event_created_at",
      }
    );
  },

  async down(db) {
    await dropIndexIfExists(
      db.collection("comments"),
      "comments_event_created_at"
    );

    await dropIndexIfExists(
      db.collection("events"),
      "events_organizer"
    );

    await dropIndexIfExists(
      db.collection("inscriptions"),
      "inscriptions_event_participant_unique"
    );

    await dropIndexIfExists(
      db.collection("users"),
      "users_correo_unique"
    );
  },
};