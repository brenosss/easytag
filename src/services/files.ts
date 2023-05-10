async function blobUrlToBase64(blobUrl: string): Promise<string> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  const base64Promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read the Blob object.'));
    reader.readAsDataURL(blob);
  });

  // Wait for the promise to resolve and return the Base64 string
  return await base64Promise;
}

export { blobUrlToBase64 };
