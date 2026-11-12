import React from 'react';

export interface ServiceVisualProps {
  type: 'web' | 'auto' | 'bot' | 'aiv' | 'edit' | 'smm';
}

export default function ServiceVisual({ type }: ServiceVisualProps) {
  switch (type) {
    case 'web':
      return (
        <div className="pv pv-web" aria-hidden="true">
          <div className="bwin">
            <div className="bbar">
              <i></i>
              <i></i>
              <i></i>
              <span>yourbrand.com</span>
            </div>
            <div className="bhero">
              <b></b>
              <em></em>
              <em></em>
              <span className="bcta">Shop now</span>
            </div>
            <div className="bgrid">
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
          <div className="code">&lt;Hero /&gt;</div>
          <div className="speed">
            <b>98</b>
            <span>Speed</span>
          </div>
        </div>
      );
    case 'auto':
      return (
        <div className="pv pv-auto" aria-hidden="true">
          <div className="node">
            <span>⚡</span>New lead
          </div>
          <div className="wire">
            <i></i>
          </div>
          <div className="node ai">
            <span>✦</span>AI qualifies
          </div>
          <div className="wire">
            <i></i>
          </div>
          <div className="node">
            <span>▤</span>CRM updated
          </div>
          <div className="wire">
            <i></i>
          </div>
          <div className="node ok">
            <span>✓</span>Email sent
          </div>
        </div>
      );
    case 'bot':
      return (
        <div className="pv pv-bot" aria-hidden="true">
          <span className="u">Do you deliver to London?</span>
          <span className="b">Yes! Next-day delivery, free over £50 📦</span>
          <span className="u">Great, can I order now?</span>
          <span className="b typing">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </div>
      );
    case 'aiv':
      return (
        <div className="pv pv-aiv" aria-hidden="true">
          <div className="frame">
            <div className="av">
              <i className="hd"></i>
              <i className="bd"></i>
            </div>
            <span className="rec">● AI</span>
            <div className="wave">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
          <div className="langs">
            <span>EN</span>
            <span>UR</span>
            <span>AR</span>
            <span>+20</span>
          </div>
        </div>
      );
    case 'edit':
      return (
        <div className="pv pv-edit" aria-hidden="true">
          <div className="screen">
            <span className="cap">Wait for it…</span>
          </div>
          <div className="tracks">
            <div className="trk">
              <i style={{ width: '30%' }}></i>
              <i style={{ width: '22%' }}></i>
              <i style={{ width: '38%' }}></i>
            </div>
            <div className="trk t2">
              <i style={{ width: '18%', marginLeft: '12%' }}></i>
              <i style={{ width: '40%' }}></i>
            </div>
            <div className="trk t3">
              <i style={{ width: '88%' }}></i>
            </div>
            <b className="head"></b>
          </div>
        </div>
      );
    case 'smm':
      return (
        <div className="pv pv-smm" aria-hidden="true">
          <div className="post">
            <div className="ph">
              <i></i>
              <span>yourbrand</span>
            </div>
            <div className="img"></div>
            <div className="react">
              ♥ 2.4k <span>💬 186</span>
            </div>
          </div>
          <div className="stat">
            <small>REACH</small>
            <b>+128%</b>
            <div className="bars">
              <i style={{ height: '30%' }}></i>
              <i style={{ height: '45%' }}></i>
              <i style={{ height: '40%' }}></i>
              <i style={{ height: '62%' }}></i>
              <i style={{ height: '78%' }}></i>
              <i style={{ height: '100%' }}></i>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

