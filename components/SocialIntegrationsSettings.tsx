/**
 * Social Media Integrations Settings
 * Connect Instagram, Facebook, TikTok, YouTube, Twitter, LinkedIn
 */

import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Linkedin,
  TrendingUp,
  BarChart3,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Unlink
} from 'lucide-react';

interface SocialAccount {
  id: string;
  platform: string;
  platform_user_id: string;
  platform_username: string;
  connected_at: string;
  last_synced_at?: string;
  metadata: any;
}

interface Analytics {
  insights?: any;
  recent_media?: any[];
  recent_posts?: any[];
}

export default function SocialIntegrationsSettings() {
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([]);
  const [analytics, setAnalytics] = useState<Record<string, Analytics>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load connected accounts on mount
  useEffect(() => {
    loadConnectedAccounts();
    
    // Check for OAuth callback success/error
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setSuccess(`${urlParams.get('platform')} connected successfully!`);
      loadConnectedAccounts();
      window.history.replaceState({}, '', '/settings/integrations');
    }
    if (urlParams.get('error') === 'true') {
      setError(`Failed to connect: ${urlParams.get('message')}`);
      window.history.replaceState({}, '', '/settings/integrations');
    }
  }, []);

  const loadConnectedAccounts = async () => {
    try {
      const response = await fetch('/auth/social/accounts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConnectedAccounts(data.accounts);
        
        // Load analytics for each account
        for (const account of data.accounts) {
          if (account.platform === 'instagram') {
            loadInstagramAnalytics(account.platform_user_id);
          } else if (account.platform === 'facebook') {
            loadFacebookAnalytics(account.platform_user_id);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load connected accounts:', err);
    }
  };

  const loadInstagramAnalytics = async (accountId: string) => {
    try {
      const response = await fetch(`/auth/social/analytics/instagram/${accountId}?days=7`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(prev => ({
          ...prev,
          [`instagram_${accountId}`]: data
        }));
      }
    } catch (err) {
      console.error('Failed to load Instagram analytics:', err);
    }
  };

  const loadFacebookAnalytics = async (pageId: string) => {
    try {
      const response = await fetch(`/auth/social/analytics/facebook/${pageId}?days=7`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(prev => ({
          ...prev,
          [`facebook_${pageId}`]: data
        }));
      }
    } catch (err) {
      console.error('Failed to load Facebook analytics:', err);
    }
  };

  const connectPlatform = async (platform: 'instagram' | 'facebook') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/auth/social/connect/${platform}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Redirect to Meta OAuth
        window.location.href = data.authorization_url;
      } else {
        setError('Failed to initiate OAuth flow');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const disconnectAccount = async (platform: string, platformUserId: string) => {
    if (!confirm(`Disconnect ${platform} account?`)) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/auth/social/accounts/${platform}/${platformUserId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        setSuccess(`${platform} disconnected`);
        loadConnectedAccounts();
      } else {
        setError('Failed to disconnect account');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
      description: 'Track posts, Reels, Stories, followers, and engagement',
      available: true
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: 'Monitor page insights, posts, likes, and audience growth',
      available: true
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: TrendingUp,
      color: 'bg-black',
      description: 'Analyze videos, trending sounds, and engagement metrics',
      available: false
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-600',
      description: 'Track videos, subscribers, views, and watch time',
      available: false
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      color: 'bg-sky-500',
      description: 'Monitor tweets, impressions, engagement, and followers',
      available: false
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      description: 'Track company page, posts, and professional engagement',
      available: false
    }
  ];

  const isConnected = (platformId: string) => {
    return connectedAccounts.some(acc => acc.platform === platformId);
  };

  const getAccount = (platformId: string) => {
    return connectedAccounts.find(acc => acc.platform === platformId);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const renderAnalytics = (platformId: string, accountId: string) => {
    const data = analytics[`${platformId}_${accountId}`];
    if (!data) return null;

    if (platformId === 'instagram') {
      const insights = data.insights || {};
      const media = data.recent_media || [];
      
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
          <h4 className="font-semibold text-sm text-gray-700">Last 7 Days</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                <Eye size={14} />
                <span>Reach</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatNumber(insights.reach || 0)}
              </p>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                <Users size={14} />
                <span>Impressions</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatNumber(insights.impressions || 0)}
              </p>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                <Heart size={14} />
                <span>Followers</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatNumber(insights.follower_count || 0)}
              </p>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                <BarChart3 size={14} />
                <span>Profile Views</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatNumber(insights.profile_views || 0)}
              </p>
            </div>
          </div>

          {media.length > 0 && (
            <div>
              <h5 className="font-semibold text-xs text-gray-600 mb-2">Recent Posts</h5>
              <div className="space-y-2">
                {media.slice(0, 3).map((post: any, idx: number) => (
                  <div key={idx} className="bg-white p-2 rounded shadow-sm flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 truncate">
                        {post.caption?.substring(0, 50)}...
                      </p>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart size={12} /> {formatNumber(post.like_count || 0)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={12} /> {formatNumber(post.comments_count || 0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Social Media Integrations</h2>
        <p className="mt-2 text-gray-600">
          Connect your social accounts to get real-time analytics and trending insights
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-green-800 font-medium">Success</p>
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        </div>
      )}

      {/* Platform Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {platforms.map((platform) => {
          const connected = isConnected(platform.id);
          const account = getAccount(platform.id);
          const Icon = platform.icon;

          return (
            <div
              key={platform.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${platform.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{platform.name}</h3>
                    {connected && account && (
                      <p className="text-sm text-gray-500">@{account.platform_username}</p>
                    )}
                  </div>
                </div>
                
                {connected ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-xs font-medium text-green-600">Connected</span>
                  </div>
                ) : !platform.available ? (
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                ) : null}
              </div>

              <p className="text-sm text-gray-600 mb-4">{platform.description}</p>

              {connected && account ? (
                <>
                  {renderAnalytics(platform.id, account.platform_user_id)}
                  
                  <button
                    onClick={() => disconnectAccount(platform.id, account.platform_user_id)}
                    disabled={loading}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Unlink size={16} />
                    Disconnect
                  </button>
                </>
              ) : platform.available ? (
                <button
                  onClick={() => connectPlatform(platform.id as 'instagram' | 'facebook')}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${platform.color} text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50`}
                >
                  <ExternalLink size={16} />
                  Connect {platform.name}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* What Mark Can Do */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">What Mark Can Do With Your Data</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Track Performance:</strong> Monitor followers, engagement, reach, and impressions across all platforms</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Identify Trends:</strong> See what content types perform best and when your audience is most active</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Optimize Strategy:</strong> Get recommendations based on your analytics and industry benchmarks</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
            <span><strong>Compare Platforms:</strong> Understand which channels drive the most value for your brand</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
