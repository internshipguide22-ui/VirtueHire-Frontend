import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Mail, CheckCircle, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import './VerifyEmail.css';

export default function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setEmail(params.get('email') || '');
        setRole(params.get('role') || 'candidate'); // default to candidate
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code || code.length < 6) {
            setStatus({ type: 'error', msg: 'Please enter a valid 6-digit code.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            const endpoint = role.toLowerCase() === 'hr' ? '/hrs/verify-email' : '/candidates/verify-email';
            const response = await api.post(endpoint, { email, code });

            setStatus({ type: 'success', msg: response.data.message });

            // Redirect after 2 seconds
            setTimeout(() => {
                if (role.toLowerCase() === 'hr') {
                    navigate('/hrs/login');
                } else {
                    navigate('/candidate/login');
                }
            }, 2500);
        } catch (err) {
            setStatus({
                type: 'error',
                msg: err.response?.data?.error || 'Invalid verification code. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vfy-page">
            <div className="vfy-card">
                <div className="vfy-icon-box">
                    <ShieldCheck size={48} className="vfy-main-icon" />
                </div>

                <h1 className="vfy-title">Verify Your Email</h1>
                <p className="vfy-subtitle">
                    We've sent a 6-digit verification code to <span className="vfy-email-highlight">{email}</span>.
                    Please enter it below to activate your {role.toUpperCase()} account.
                </p>

                {status.msg && (
                    <div className={`vfy-alert ${status.type}`}>
                        {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        <span>{status.msg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="vfy-form">
                    <div className="vfy-input-group">
                        <input
                            type="text"
                            maxLength="6"
                            placeholder="0 0 0 0 0 0"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            className="vfy-code-input"
                            disabled={loading || status.type === 'success'}
                        />
                    </div>

                    <button
                        type="submit"
                        className="vfy-submit-btn"
                        disabled={loading || status.type === 'success'}
                    >
                        {loading ? 'Verifying...' : 'Verify Account'}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="vfy-footer">
                    <p>Didn't receive the email?</p>
                    <button className="vfy-resend-btn" onClick={() => window.location.reload()}>
                        Resend Code
                    </button>
                </div>
            </div>
        </div>
    );
}
