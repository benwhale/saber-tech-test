
interface UrlItem {
    slug: string;
    url: string;
    type: 'url';
    createdAt: string;
}

interface FileItem {
    slug: string;
    filename: string;
    file_key: string;
    type: 'file';
    createdAt: string;
}

export type Item = UrlItem | FileItem;
