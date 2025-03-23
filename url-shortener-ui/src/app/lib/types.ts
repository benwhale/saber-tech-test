
interface UrlItem {
    slug: string;
    url: string;
    type: 'url';
    created_at: string;
}

interface FileItem {
    slug: string;
    filename: string;
    file_key: string;
    type: 'file';
    created_at: string;
}

export type Item = UrlItem | FileItem;
