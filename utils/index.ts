export function withTimeout<T>(ms: number, promise: Promise<T>): Promise<T> {
  const timeout = new Promise<T>((_resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(`Timed out in ${ms}ms.`));
    }, ms);
  });

  return Promise.race([promise, timeout]);
}

export function getImageUrl(
  serverUrl: string | undefined,
  _id: string | undefined,
  ext: string | undefined
) {
  if (!(serverUrl && _id && ext)) return undefined;
  return serverUrl + "/" + _id + "." + ext;
}
