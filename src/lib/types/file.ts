export type FileType = {
  height: number;
  name: string;
  size: number;
  type: string;
  uri: string;
  width: number;
};
export type FileTypeRes = {
  path: string;
  size: number;
  type: string;
  created_at: string | null;
  deleted_at: string | null;
  updated_at: string | null;
};
