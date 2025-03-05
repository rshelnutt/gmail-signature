export function parseGDriveUri(uri: string) {
  if (uri.includes('drive.google.com')) {
    // Drive format: https://drive.google.com/file/d/1GibWhe4MS3XRLvMOSvjTpWj8GXIQz688/view?usp=sharing
    // User content format: https://lh3.googleusercontent.com/d/1GibWhe4MS3XRLvMOSvjTpWj8GXIQz688
    return uri
      .split('?')[0]
      .replace('drive.google.com/file/', 'lh3.googleusercontent.com/')
      .replace('/view', '')
  }
  
  return uri
}
