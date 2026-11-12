import React from 'react';

interface ProjectArtProps {
  artType: 'postly' | 'aidigital' | 'bitsnbobs' | 'viralzy' | 'chatbot' | 'timera';
}

export default function ProjectArt({ artType }: ProjectArtProps) {
  switch (artType) {
    case 'postly':
      return (
        <div className="pa-postly">
          <div className="pp-side">
            <b>Postly</b>
            <i className="on" />
            <i />
            <i />
            <i />
          </div>
          <div className="pp-main">
            <div className="pp-head">
              <span>New post</span>
              <em>Scheduled ✓</em>
            </div>
            <div className="pp-plat">
              <span>f</span>
              <span>IG</span>
              <span>in</span>
              <span>▶</span>
              <span>♪</span>
              <span>P</span>
            </div>
            <div className="pp-cap">
              <i />
              <i />
              <i />
            </div>
            <div className="pp-cal">
              <i />
              <i className="g" />
              <i />
              <i className="g" />
              <i />
              <i />
              <i className="g" />
            </div>
          </div>
        </div>
      );
    case 'aidigital':
      return (
        <div className="pa-site cni">
          <div className="bw">
            <i />
            <i />
            <i />
            <span>aidigitaldivision.com</span>
          </div>
          <div className="cn-hero">
            <small>AI &amp; DIGITAL DIVISION</small>
            <b>
              Where Intelligence
              <br />
              Meets Growth.
            </b>
            <div className="cn-btn">
              <span />
              <span />
            </div>
          </div>
          <div className="cn-nodes">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      );
    case 'bitsnbobs':
      return (
        <div className="pa-site bnb">
          <div className="bw">
            <i />
            <i />
            <i />
            <span>bitsnbobs.co</span>
          </div>
          <div className="bb-bar">
            <b>Bits&apos;N&apos;Bobs</b>
            <span>Wholesale</span>
          </div>
          <div className="bb-cats">
            <span>Cosmetics</span>
            <span>DIY</span>
            <span>First Aid</span>
            <span>Hardware</span>
            <span>Household</span>
            <span>Stationery</span>
          </div>
        </div>
      );
    case 'viralzy':
      return (
        <div className="pa-site vz">
          <div className="bw">
            <i />
            <i />
            <i />
            <span>viralzy.com</span>
          </div>
          <div className="vz-top">
            <b>Viralzy</b>
            <div className="vz-search">Search viral videos…</div>
          </div>
          <div className="vz-chips">
            <span className="on">Filter videos</span>
            <span>Transcribe</span>
            <span>Saved</span>
          </div>
          <div className="vz-grid">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      );
    case 'chatbot':
      return (
        <div className="pa-bot">
          <span className="u">How much is a website?</span>
          <span className="b">
            Every project gets a fixed quote after a free call. Can I take your name and email?
          </span>
          <span className="u">Sure — Sarah, sarah@shop.co.uk</span>
          <span className="b dots">
            <i />
            <i />
            <i />
          </span>
        </div>
      );
    case 'timera':
      return (
        <div className="pa-site tm">
          <div className="bw">
            <i />
            <i />
            <i />
            <span>timerawatches.store</span>
          </div>
          <div className="tw-body">
            <div className="tw-txt">
              <small>TIMERA</small>
              <b>
                Time,
                <br />
                Redefined.
              </b>
              <span>Shop watches</span>
            </div>
            <div className="tw-watch">
              <i className="h" />
              <i className="m" />
            </div>
          </div>
          <div className="tw-strip">
            <span>Stainless Steel</span>
            <span>Arabic Dial</span>
            <span>Strap</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}

