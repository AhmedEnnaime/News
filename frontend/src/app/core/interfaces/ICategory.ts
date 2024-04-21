interface ICategory {
  name: string;
  parent_id?: number;
  parent: ICategory;
  children: ICategory[];
  created_at?: string;
  updated_at?: string;
}

export default ICategory;
