import Template from '../../src/template';

const contents = {
  title: true,
  button: true,
  description: false,
};

const templates = {
  button: '<button>BUTTON</button>',
  title: '<h1>BUY MY BUTTONS {{data.name}}</h1>',
  description: 'footer',
};

const order = ['title', 'button', 'description'];

let template;

describe('Template class', () => {
  beforeEach(() => {
    template = new Template(templates, contents, order);
  });

  afterEach(() => {
    template = null;
  });

  describe('constructor', () => {
    it('sets templates, contents, and order from props', () => {
      assert.equal(template.templates, templates);
      assert.equal(template.contents, contents);
      assert.equal(template.order, order);
    });
  });

  describe('get masterTemplate', () => {
    it('returns a string template', () => {
      const expectedString = '<h1>BUY MY BUTTONS {{data.name}}</h1><button>BUTTON</button>';
      assert.equal(template.masterTemplate, expectedString);
    });
  });

  describe('render', () => {

    describe('without callback', () => {
      it('it puts data into the strings', () => {
        const expectedString = '<h1>BUY MY BUTTONS fool</h1><button>BUTTON</button>';
        const data = {
          name: 'fool',
        };
        const output = template.render({data});
        assert.equal(expectedString, output);
      });
    });

    describe('with callback', () => {
      it('it puts data into the strings and calls callback', () => {
        const expectedString = '<h1>BUY MY BUTTONS fool</h1><button>BUTTON</button>';
        const data = {
          name: 'fool',
        }
        const spy = sinon.spy();
        const output = template.render({data}, spy);
        assert.calledWith(spy, expectedString);
      });
    });
  });
});

