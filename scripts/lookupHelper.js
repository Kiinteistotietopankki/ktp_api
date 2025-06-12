
export async function getLookupCode(model, name) {
  if (!name) return null;
  const record = await model.findOne({ where: { name } });
  return record ? record.code : name;  // fallback to name if not found
}


export async function getLookupName(model, code) {
  if (!code) return null;
  const record = await model.findOne({ where: { code } });
  return record ? record.name : code;  // fallback to code if no match
}