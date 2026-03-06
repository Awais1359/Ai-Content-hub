export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          created_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          content: string;
          image_url: string;
          category_id: string;
          published: boolean;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          content: string;
          image_url: string;
          category_id: string;
          published?: boolean;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          content?: string;
          image_url?: string;
          category_id?: string;
          published?: boolean;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

export type Category = Database['public']['Tables']['categories']['Row'];
export type Article = Database['public']['Tables']['articles']['Row'];

export type ArticleWithCategory = Article & {
  categories: Category;
};
