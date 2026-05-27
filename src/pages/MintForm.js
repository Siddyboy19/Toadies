import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { formatSpots } from '../utils/metrics';
import './MintForm.css';

/* ── Tweet text (close to 280 chars) ── */
const SITE   = 'https://toadies.xyz';
const TASKS_LINK = `${SITE}/mint-permit#tasks`;

const TWEET_TEXT = encodeURIComponent(
  `🐸 Just dropped my Mint Permit request for @Toadies_!\n\n4,444 unique Toadies are hopping onto Ethereum — the most dedicated frogs get Guaranteed WL & FCFS spots. No promises, just pure swamp energy 🌿⚡\n\nAre you in? Come join the swamp 👇\n${TASKS_LINK}\n\n#ToadiesNFT #NFT #Ethereum #Web3`
);
const SHARE_URL = `https://twitter.com/intent/tweet?text=${TWEET_TEXT}`;

function validate(fields) {
  const errs = {};

  if (!fields.twitter_profile.trim())
    errs.twitter_profile = 'Your X / Twitter profile URL is required';
  else if (!/^https?:\/\/(twitter|x)\.com\//i.test(fields.twitter_profile))
    errs.twitter_profile = 'Must be a valid x.com or twitter.com profile URL';

  if (!fields.tweet_url.trim())
    errs.tweet_url = 'Paste the link to your Toadies tweet';
  else if (!/^https?:\/\/(twitter|x)\.com\/.+\/status\//i.test(fields.tweet_url))
    errs.tweet_url = 'Must be a link to a specific tweet (…/status/…)';

  if (!fields.has_frog_emoji)
    errs.has_frog_emoji = 'Please add 🐸 to your X display name first';

  if (!fields.wallet_address.trim())
    errs.wallet_address = 'Ethereum wallet address is required';
  else if (!/^0x[a-fA-F0-9]{40}$/.test(fields.wallet_address.trim()))
    errs.wallet_address = 'Must be a valid Ethereum address (0x + 40 hex chars)';

  if (!fields.twitter_username.trim())
    errs.twitter_username = 'Your X @username is required';

  return errs;
}

/* ── Particles ── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.round(Math.random() * 100 * 10) / 10,
  y: Math.round(Math.random() * 100 * 10) / 10,
  size: 12 + (i * 7) % 20,
  dur: 4 + (i * 1.3) % 5,
  delay: (i * 0.9) % 4,
  emoji: ['🐸','🌿','💚','⚡','🌊','💎'][i % 6],
}));

export default function MintForm() {
  const [fields, setFields] = useState({
    twitter_profile:   '',
    tweet_url:         '',
    has_frog_emoji:    false,
    wallet_address:    '',
    twitter_username:  '',
    telegram_username: '',
  });
  const [errors,    setErrors]    = useState({});
  const [status,    setStatus]    = useState('idle');
  const [errMsg,    setErrMsg]    = useState('');
  const [spotCount, setSpotCount] = useState(null);

  /* fetch spot count */
  useEffect(() => {
    (async () => {
      if (!supabase) return;
      const { count } = await supabase
        .from('mint_permit_submissions')
        .select('*', { count: 'exact', head: true });
      setSpotCount(count ?? 0);
    })();
  }, []);

  /* scroll to #tasks if hash present */
  useEffect(() => {
    if (window.location.hash === '#tasks') {
      setTimeout(() => {
        document.getElementById('tasks-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, []);

  const set = (key, val) => {
    setFields(p => ({ ...p, [key]: val }));
    setErrors(p => { const n = { ...p }; delete n[key]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');

    const payload = {
      twitter_profile:   fields.twitter_profile.trim(),
      tweet_url:         fields.tweet_url.trim(),
      has_frog_emoji:    fields.has_frog_emoji,
      wallet_address:    fields.wallet_address.trim().toLowerCase(),
      twitter_username:  fields.twitter_username.trim().replace(/^@/, ''),
      telegram_username: fields.telegram_username.trim().replace(/^@/, '') || null,
    };

    if (!supabase) {
      await new Promise(r => setTimeout(r, 1200));
      setStatus('success');
      setSpotCount(p => (p ?? 0) + 1);
      return;
    }

    const { error } = await supabase
      .from('mint_permit_submissions')
      .insert([payload]);

    if (error) {
      setErrMsg(error.code === '23505'
        ? 'This wallet has already been registered.'
        : 'Something went wrong — please try again.');
      setStatus('error');
    } else {
      setStatus('success');
      setSpotCount(p => (p ?? 0) + 1);
    }
  };

  /* ══════════════════════════════════════════
     SUCCESS SCREEN
  ══════════════════════════════════════════ */
  if (status === 'success') {
    return (
      <div className="mf-page">
        {PARTICLES.map(p => (
          <span key={p.id} className="mf-particle"
            style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:p.size,
                     animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }}>
            {p.emoji}
          </span>
        ))}
        <div className="mf-inner">
          <div className="mf-success">
            <div className="mf-success__frog">🐸</div>
            <h2 className="mf-success__title">You're in the Swamp!</h2>
            <p className="mf-success__sub">
              Your permit request has been received.<br/>
              We'll be watching your account — keep tweeting, engaging,
              and showing love. The most dedicated frogs get rewarded 💚
            </p>
            <div className="mf-success__badge">✦ PERMIT SUBMITTED ✦</div>

            {/* Share on X */}
            <div className="mf-success__share-wrap">
              <p className="mf-success__share-label">
                📣 Share to <strong>boost your chances</strong> — active shillers get noticed!
              </p>
              <a
                href={SHARE_URL}
                target="_blank"
                rel="noreferrer"
                className="mf-share-btn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share on X to Increase Your Chances
              </a>
              <p className="mf-success__share-hint">
                Clicking opens X with your tweet pre-filled — one tap to post!
              </p>
            </div>

            <a href={SITE} className="mf-success__home">← Back to Toadies</a>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     MAIN FORM
  ══════════════════════════════════════════ */
  return (
    <div className="mf-page">
      {PARTICLES.map(p => (
        <span key={p.id} className="mf-particle"
          style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:p.size,
                   animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }}>
          {p.emoji}
        </span>
      ))}

      <div className="mf-inner">

        {/* ── HEADER ── */}
        <div className="mf-header">
          <div className="mf-header__ticket">
            <img src="/mint-ticket.png" alt="Toadies Mint Permit Ticket" className="mf-header__ticket-img" />
          </div>
          <span className="mf-header__badge">MINT PERMIT · FCFS PHASE OPEN</span>
          <h1 className="mf-header__title">Toadies Mint Permit</h1>
          <p className="mf-header__sub">
            Filling this form <strong>does not guarantee</strong> a spot.<br/>
            We keep a close eye on every account that tweets, engages, and genuinely
            supports Toadies. The most dedicated frogs — those who shill from the heart 💚 —
            will earn <strong>Guaranteed WL</strong> or <strong>FCFS spots</strong>.
          </p>

          {spotCount !== null && (
            <div className="mf-counter">
              <span className="mf-counter__num">{formatSpots(spotCount)}</span>
              <span className="mf-counter__label">Permit Requests Submitted</span>
            </div>
          )}
        </div>

        {/* ── TASKS ── */}
        <div id="tasks-section" className="mf-tasks">
          <h2 className="mf-tasks__title">📋 Complete These Tasks First</h2>
          <div className="mf-task-cards">

            <div className="mf-task-card">
              <div className="mf-task-card__num">01</div>
              <div className="mf-task-card__icon">🐦</div>
              <div className="mf-task-card__body">
                <div className="mf-task-card__title">Follow @Toadies_ on X</div>
                <div className="mf-task-card__desc">
                  Follow our official X account and stay updated on all announcements.
                </div>
                <a href="https://x.com/Toadies_" target="_blank" rel="noreferrer"
                   className="mf-task-card__btn">Follow on X →</a>
              </div>
            </div>

            <div className="mf-task-card mf-task-card--highlight">
              <div className="mf-task-card__num">02</div>
              <div className="mf-task-card__icon">📢</div>
              <div className="mf-task-card__body">
                <div className="mf-task-card__title">Post a Dedicated Tweet About Toadies</div>
                <div className="mf-task-card__desc">
                  Share why you love Toadies NFTs! Mention <strong>@Toadies_</strong>, use
                  <strong> #ToadiesNFT</strong>, and link <strong>toadies.xyz</strong> — genuine posts get noticed.
                  Then paste your tweet link in the form below.
                </div>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🐸 Excited for @Toadies_ — 4,444 unique Toadies hopping onto Ethereum! The most dedicated frogs earn WL spots. Join the swamp 🌿⚡\n\ntoadies.xyz\n\n#ToadiesNFT #NFT #Ethereum`)}`}
                  target="_blank" rel="noreferrer"
                  className="mf-task-card__btn mf-task-card__btn--glow"
                >
                  Post a Tweet →
                </a>
              </div>
            </div>

            <div className="mf-task-card">
              <div className="mf-task-card__num">03</div>
              <div className="mf-task-card__icon">✏️</div>
              <div className="mf-task-card__body">
                <div className="mf-task-card__title">Add 🐸 to Your X Display Name</div>
                <div className="mf-task-card__desc">
                  Edit your X profile and add the frog emoji 🐸 to your display name to show
                  you're part of the swamp.
                </div>
                <a href="https://x.com/settings/profile" target="_blank" rel="noreferrer"
                   className="mf-task-card__btn">Edit X Profile →</a>
              </div>
            </div>

          </div>
        </div>

        {/* ── FORM ── */}
        <form className="mf-form" onSubmit={handleSubmit} noValidate>
          <h2 className="mf-form__title">📝 Submit Your Permit</h2>

          {/* Twitter profile */}
          <div className={`mf-field ${errors.twitter_profile ? 'mf-field--err' : ''}`}>
            <label className="mf-label">
              <span className="mf-label__icon">🐦</span>
              Your X / Twitter Profile URL
            </label>
            <input className="mf-input" type="url"
              placeholder="https://x.com/yourhandle"
              value={fields.twitter_profile}
              onChange={e => set('twitter_profile', e.target.value)} />
            {errors.twitter_profile && <p className="mf-err">{errors.twitter_profile}</p>}
          </div>

          {/* Tweet URL */}
          <div className={`mf-field ${errors.tweet_url ? 'mf-field--err' : ''}`}>
            <label className="mf-label">
              <span className="mf-label__icon">🔗</span>
              Link to Your Dedicated Toadies Tweet
              <span className="mf-label__hint">Complete Task 02 above first, then paste your tweet link here</span>
            </label>
            <input className="mf-input" type="url"
              placeholder="https://x.com/yourhandle/status/1234567890..."
              value={fields.tweet_url}
              onChange={e => set('tweet_url', e.target.value)} />
            {errors.tweet_url && <p className="mf-err">{errors.tweet_url}</p>}
          </div>

          {/* Frog emoji */}
          <div className={`mf-field mf-field--check ${errors.has_frog_emoji ? 'mf-field--err' : ''}`}>
            <label className="mf-check-label">
              <input type="checkbox" className="mf-checkbox"
                checked={fields.has_frog_emoji}
                onChange={e => set('has_frog_emoji', e.target.checked)} />
              <span className="mf-check-box">{fields.has_frog_emoji ? '✓' : ''}</span>
              <span className="mf-check-text">
                I have added <strong>🐸</strong> to my X display name (Task 03 complete)
              </span>
            </label>
            {errors.has_frog_emoji && <p className="mf-err">{errors.has_frog_emoji}</p>}
          </div>

          {/* Wallet + X username */}
          <div className="mf-row">
            <div className={`mf-field ${errors.wallet_address ? 'mf-field--err' : ''}`}>
              <label className="mf-label">
                <span className="mf-label__icon">💎</span>
                Ethereum Wallet Address
              </label>
              <input className="mf-input mf-input--mono" type="text"
                placeholder="0x..." maxLength={42}
                value={fields.wallet_address}
                onChange={e => set('wallet_address', e.target.value)} />
              {errors.wallet_address && <p className="mf-err">{errors.wallet_address}</p>}
            </div>

            <div className={`mf-field ${errors.twitter_username ? 'mf-field--err' : ''}`}>
              <label className="mf-label">
                <span className="mf-label__icon">@</span>
                Your X Username
              </label>
              <input className="mf-input" type="text"
                placeholder="@yourhandle"
                value={fields.twitter_username}
                onChange={e => set('twitter_username', e.target.value)} />
              {errors.twitter_username && <p className="mf-err">{errors.twitter_username}</p>}
            </div>
          </div>

          {/* Telegram */}
          <div className="mf-field">
            <label className="mf-label">
              <span className="mf-label__icon">✈️</span>
              Telegram Username
              <span className="mf-label__hint">Optional — recommended for mint announcements</span>
            </label>
            <input className="mf-input" type="text"
              placeholder="@yourtelegram"
              value={fields.telegram_username}
              onChange={e => set('telegram_username', e.target.value)} />
          </div>

          {status === 'error' && <div className="mf-alert">{errMsg}</div>}

          <button type="submit"
            className={`mf-submit ${status === 'loading' ? 'mf-submit--loading' : ''}`}
            disabled={status === 'loading'}>
            {status === 'loading'
              ? <><span className="mf-spinner" /> Submitting Permit…</>
              : <>🐸 Submit My Mint Permit</>}
          </button>

          <p className="mf-disclaimer">
            ⚠️ Submitting this form <strong>does not guarantee</strong> a mint spot.
            We monitor all submitted accounts for genuine engagement — tweeting, shilling, and
            supporting Toadies from the heart gives you the best chance at a
            Guaranteed WL or FCFS spot. Stay active, stay in the swamp 🌿
          </p>
        </form>

      </div>
    </div>
  );
}
