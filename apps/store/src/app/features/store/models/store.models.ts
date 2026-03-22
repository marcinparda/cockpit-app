export interface StoreMeta {
  key: string;
  type: string;
  version: number;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface StoreEnvelope {
  meta: StoreMeta;
  data: unknown;
}

export interface StoreWriteRequest {
  type: string;
  tags?: string[];
  data: unknown;
}

export interface StorePatchRequest {
  data: unknown;
}

export interface RecentBrowse {
  prefix: string;
  category: string;
}
