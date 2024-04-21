import ICategory from './ICategory';

interface INews {
  title: string;
  content: string;
  category_id?: number;
  category?: ICategory;
  debut_date: string;
  expiration_date: string;
  created_at?: string;
  updated_at?: string;
}

export default INews;
