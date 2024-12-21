'use client';
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { 
    BlockchainData, 
    SelectedDocument, 
    BlockchainBlock,
    BlockchainTransaction 
} from './types/blockchain-types';

const BlockchainVerificationPage: React.FC = () => {
    const [blockchainData, setBlockchainData] = useState<BlockchainData>({
        blocks: [],
        integrity: false,
        issues: []
    });

    const [selectedDocument, setSelectedDocument] = useState<SelectedDocument | null>(null);

    const fetchBlockchainData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validate-blockchain`);
            if (!response.ok) {
                console.error('API Error:', response.status, response.statusText);
                return;
            }

            const data = await response.json();
            setBlockchainData({
                blocks: data.chain || [],
                integrity: data.valid,
                issues: data.issues || [],
            });
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleDocumentSelect = async (documentHash: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/document-history?hash=${documentHash}`);
            if (!response.ok) {
                console.error('API Error:', response.status, response.statusText);
                return;
            }

            const history: BlockchainTransaction[] = await response.json();
            setSelectedDocument({
                hash: documentHash,
                history,
            });
        } catch (error) {
            console.error('Document history fetch failed', error);
            setSelectedDocument({
                hash: documentHash,
                history: [],
            });
        }
    };

    useEffect(() => {
        fetchBlockchainData();
    }, []);

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 bg-gray-50 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Blockchain Verification Dashboard</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        {blockchainData.integrity ? (
                            <CheckCircle2 className="text-green-500" />
                        ) : (
                            <AlertCircle className="text-red-500" />
                        )}
                        <span className="text-lg">
                            Blockchain Integrity: 
                            {blockchainData.integrity ? " Verified" : " Compromised"}
                        </span>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-100 border-b">
                            <h3 className="text-xl font-semibold text-gray-700">Blockchain Blocks</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block Index</th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {blockchainData.blocks.map((block: BlockchainBlock, index: number) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-3 whitespace-nowrap">{block.index}</td>
                                            <td className="p-3 whitespace-nowrap">
                                                {new Date(block.timestamp * 1000).toLocaleString()}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {block.transactions.length} transactions
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                <button 
                                                    className="text-blue-500 hover:underline"
                                                    onClick={() => handleDocumentSelect(block.hash)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {selectedDocument && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 bg-gray-50 border-b">
                        <h3 className="text-xl font-bold text-gray-800">Document Verification History</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-700 mb-4">Document Hash: {selectedDocument.hash}</p>
                        {selectedDocument.history.length > 0 ? (
                            <table className="w-full border">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">Uploader</th>
                                        <th className="p-2 border">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedDocument.history.map((transaction, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-2 border">{transaction.uploader}</td>
                                            <td className="p-2 border">
                                                {new Date(transaction.timestamp * 1000).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No transaction history found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlockchainVerificationPage;
