const iframeStyles = {
  width: '100%',
  overflow: 'hidden',
  border: 'none',
};

const iframeAttrs = {
  horizontalscrolling: 'no',
  verticalscrolling: 'no',
  allowTransparency: 'true',
  frameBorder: '0'
};

export default class iframe {
  constructor(appendFn) {
    this.el = document.createElement('iframe');
    this.el.scrolling = false;
    Object.keys(iframeStyles).forEach((key) => {
      this.el.style[key] = iframeStyles[key];
    });
    Object.keys(iframeAttrs).forEach((key) => this.el.setAttribute(key, iframeAttrs[key]));

    this.div = document.createElement('div');
    this.div.appendChild(this.el);
    appendFn(this.div);
  }

  get document() {
    return this.el.contentDocument;
  }
}