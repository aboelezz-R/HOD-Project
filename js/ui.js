const css = `
  #hod-toast-wrap { position:fixed; top:20px; right:20px; z-index:9999; display:flex; flex-direction:column; gap:10px; pointer-events:none; }
  .hod-toast { background:#fff; border-radius:11px; box-shadow:0 4px 24px rgba(0,0,0,0.13); border:1px solid #e5e7eb; border-left:4px solid #e5e7eb; padding:14px 16px; display:flex; align-items:flex-start; gap:12px; min-width:280px; max-width:380px; pointer-events:all; animation:hod-in .22s ease; }
  .hod-toast.t-error  { border-left-color:#ef4444; }
  .hod-toast.t-success{ border-left-color:#10b981; }
  .hod-toast.t-info   { border-left-color:#25499b; }
  .hod-toast.t-warn   { border-left-color:#f59e0b; }
  .hod-toast-icon { flex-shrink:0; margin-top:1px; }
  .hod-toast-msg  { flex:1; font-size:13.5px; color:#111827; line-height:1.55; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
  .hod-toast-x    { background:none; border:none; color:#9ca3af; cursor:pointer; font-size:15px; line-height:1; padding:0; flex-shrink:0; }
  .hod-toast-x:hover { color:#374151; }
  @keyframes hod-in  { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:translateX(0)} }
  @keyframes hod-out { from{opacity:1;transform:translateX(0)}    to{opacity:0;transform:translateX(18px)} }

  #hod-confirm-ov { display:none; position:fixed; inset:0; background:rgba(15,29,66,.38); backdrop-filter:blur(3px); z-index:9000; align-items:center; justify-content:center; }
  #hod-confirm-ov.show { display:flex; }
  #hod-confirm-box { background:#fff; border-radius:16px; padding:28px; width:420px; max-width:calc(100vw - 40px); box-shadow:0 20px 60px rgba(0,0,0,0.18); font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
  .hod-c-icon { width:44px; height:44px; border-radius:11px; background:#fef2f2; display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
  #hod-c-title { font-size:15px; font-weight:700; color:#111827; margin-bottom:8px; }
  #hod-c-msg   { font-size:13.5px; color:#6b7280; line-height:1.6; margin-bottom:24px; }
  .hod-c-actions { display:flex; justify-content:flex-end; gap:10px; }
  #hod-c-cancel { background:#fff; border:1px solid #d1d5db; color:#374151; padding:9px 18px; border-radius:8px; font-size:13.5px; font-weight:500; cursor:pointer; font-family:inherit; }
  #hod-c-cancel:hover { background:#f9fafb; }
  #hod-c-ok { background:#dc2626; color:#fff; border:none; padding:9px 18px; border-radius:8px; font-size:13.5px; font-weight:600; cursor:pointer; font-family:inherit; transition:background .15s; }
  #hod-c-ok:hover { background:#b91c1c; }
  #hod-c-ok.ok-primary { background:#25499b; }
  #hod-c-ok.ok-primary:hover { background:#1e3d87; }
`

const styleEl = document.createElement('style')
styleEl.textContent = css
document.head.appendChild(styleEl)

const toastWrap = document.createElement('div')
toastWrap.id = 'hod-toast-wrap'
document.body.appendChild(toastWrap)

const confirmOv = document.createElement('div')
confirmOv.id = 'hod-confirm-ov'
confirmOv.innerHTML = `
  <div id="hod-confirm-box">
    <div class="hod-c-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </div>
    <div id="hod-c-title"></div>
    <div id="hod-c-msg"></div>
    <div class="hod-c-actions">
      <button id="hod-c-cancel">Cancel</button>
      <button id="hod-c-ok">Confirm</button>
    </div>
  </div>`
document.body.appendChild(confirmOv)

const ICONS = {
  error:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg>`,
  info:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25499b" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  warn:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
}

export function showToast(message, type = 'error') {
  const t = document.createElement('div')
  t.className = `hod-toast t-${type}`
  t.innerHTML = `
    <div class="hod-toast-icon">${ICONS[type] || ICONS.info}</div>
    <div class="hod-toast-msg">${message}</div>
    <button class="hod-toast-x" onclick="this.closest('.hod-toast').remove()">✕</button>`
  toastWrap.appendChild(t)
  setTimeout(() => {
    t.style.animation = 'hod-out .22s ease forwards'
    setTimeout(() => t.remove(), 220)
  }, 4500)
}

export function showConfirm(message, { title = 'Are you sure?', okLabel = 'Delete', danger = true } = {}) {
  return new Promise(resolve => {
    document.getElementById('hod-c-title').textContent = title
    document.getElementById('hod-c-msg').textContent = message
    const okBtn = document.getElementById('hod-c-ok')
    okBtn.textContent = okLabel
    okBtn.className = danger ? '' : 'ok-primary'
    confirmOv.classList.add('show')

    function done(result) {
      confirmOv.classList.remove('show')
      document.getElementById('hod-c-ok').onclick = null
      document.getElementById('hod-c-cancel').onclick = null
      resolve(result)
    }

    document.getElementById('hod-c-ok').onclick = () => done(true)
    document.getElementById('hod-c-cancel').onclick = () => done(false)
  })
}
