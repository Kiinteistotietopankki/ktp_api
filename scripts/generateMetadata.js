export function generateMetadata(rakennus) {
  const defaultMeta = { source: "Ympäristö.fi", editedBy: "testikäyttäjä" };

  const wrap = () => ({ ...defaultMeta });

  const metadata = {};

  for (const key in rakennus) {
    const value = rakennus[key];

    if (Array.isArray(value)) {
      // Handle array of objects (e.g., rakennustiedotArray)
      metadata[key] = value.map(item => {
        const itemMetadata = {};
        for (const field in item) {
          itemMetadata[field] = wrap();
        }
        return itemMetadata;
      });
    } else if (typeof value === 'object' && value !== null) {
      // Object field (if any)
      const objectMetadata = {};
      for (const field in value) {
        objectMetadata[field] = wrap();
      }
      metadata[key] = objectMetadata;
    } else {
      // Simple value
      metadata[key] = wrap();
    }
  }

  return metadata;
}
