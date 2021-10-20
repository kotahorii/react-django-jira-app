export type LoginUser = {
  id: number;
  username: string;
};
export type File = Blob & {
  readonly lastModified: number;
  readonly name: string;
};
export type Profile = {
  id: number;
  user_profile: number;
  img: string | null;
};
export type PostProfile = {
  id: number;
  img: File | null;
};
export type Cred = {
  username: string;
  password: string;
};
export type JWT = {
  refresh: string;
  access: string;
};
export type User = {
  id: number;
  username: string;
};
export type AuthState = {
  isLoginView: boolean;
  loginUser: LoginUser;
  profile: Profile[];
};
export type ReadTask = {
  id: number;
  task: string;
  description: string;
  criteria: string;
  status: string;
  status_name: string;
  category: number;
  category_item: string;
  estimate: number;
  responsible: number;
  responsible_username: string;
  owner: number;
  owner_username: string;
  created_at: string;
  updated_at: string;
};
export type PostTask = {
  id: number;
  task: string;
  description: string;
  criteria: string;
  status: string;
  category: number;
  estimate: number;
  responsible: number;
};
export type Category = {
  id: number;
  item: string;
};
export type TaskState = {
  editedTask: PostTask;
  selectedTask: ReadTask;
};
export type SortState = {
  rows: ReadTask[];
  order: "desc" | "asc";
  activeKey: string;
};
