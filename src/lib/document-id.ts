export function generateDocumentId() {
  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `DOC-${random}`;
}