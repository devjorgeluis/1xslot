import React, { useEffect, useState } from 'react';
import '../../css/Auth.css';
import { callApi } from '../../utils/Utils';

const ProviderModal = ({ isOpen, onClose, onSelect, contextData, initialProviders = [], searchText = '' }) => {
    const [providers, setProviders] = useState(initialProviders || []);
    const [query, setQuery] = useState(searchText || '');
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        if (initialProviders && initialProviders.length > 0) {
            setProviders(initialProviders);
            return;
        }
        // fetch providers from API
        const fetchProviders = async () => {
            try {
                const resCallback = (result) => {
                    if (result && result.status !== 500 && result.status !== 422) {
                        const list = result.content || [];
                        setProviders(list);
                    }
                };
                // try common endpoint
                callApi(contextData, 'GET', '/get-providers', resCallback, null);
            } catch (e) {
                // ignore
            }
        };
        fetchProviders();
    }, [isOpen]);

    useEffect(() => setQuery(searchText || ''), [searchText]);

    const filtered = providers.filter(p => p.name && p.name.toLowerCase().includes(query.toLowerCase()));

    if (!isOpen) return null;

    return (
        <div className="auth-error-modal-overlay" onClick={onClose}>
            <div className="provider-modal" onClick={e => e.stopPropagation()}>
                {
                    !showSearch &&
                    <div className="provider-header">
                        <button className="back-btn" onClick={onClose}><span className="material-icons">arrow_back</span></button>
                        <div className="provider-title">Select providers</div>
                        <div className="provider-actions">
                            <button className={`search-btn${showSearch ? ' active' : ''}`} onClick={() => setShowSearch(!showSearch)}>
                                <span className="material-icons">{showSearch ? 'close' : 'search'}</span>
                            </button>
                        </div>
                    </div>
                }

                {
                    showSearch &&
                    <div className="provider-search">
                        <button
                            className="back-btn"
                            onClick={() => { setShowSearch(false), setQuery("") }}
                        >
                            <span className="material-icons">arrow_back</span>
                        </button>
                        <div className="search-container">
                            <i className="material-icons search-icon">search</i>
                            <input
                                className="search-input"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search providers"
                            />
                        </div>
                    </div>
                }


                <div className="provider-grid">
                    {(filtered || []).map((p, idx) => (
                        <div key={p.id || idx} className="provider-item" onClick={() => { onSelect && onSelect(p); onClose(); }}>
                            {p.imageDataSrc ? <img src={p.imageDataSrc} alt={p.name} /> : <div className="provider-name">{p.name}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProviderModal;
