export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64data = (reader.result as string).split(",")[1]; // Extract Base64 part
      resolve(base64data);
    };
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(blob);
  });
}
