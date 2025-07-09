// metadataHelper.js
function updateMetadataField(rakennus, pathArray, editor, source) {
  if (!rakennus.metadata || rakennus.metadata.length === 0) {
    rakennus.metadata = [{
      id_rakennus: rakennus.id_rakennus,
      metadata: {}
    }];
  }

  let meta = rakennus.metadata[0].metadata;

  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    if (!meta[key]) {
      meta[key] = key.endsWith("Array") ? [] : {};
    }
    meta = meta[key];
  }

  const lastKey = pathArray[pathArray.length - 1];
  meta[lastKey] = { source: source, editedBy: editor };

  rakennus.metadata[0].updatedAt = new Date().toISOString();
}

module.exports = { updateMetadataField };
