// Typescript type definitions for Blockchain
export interface BlockchainTransaction {
    document_hash: string;
    uploader: string;
    timestamp: number;
}

export interface BlockchainBlock {
    index: number;
    timestamp: number;
    transactions: BlockchainTransaction[];
    previous_hash: string;
    hash: string;
}

export interface SelectedDocument {
    hash: string;
    history: BlockchainTransaction[];
}

export interface BlockchainData {
    blocks: BlockchainBlock[];
    integrity: boolean;
    issues: string[];
}